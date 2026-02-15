/**
 * Black Hole Raytracer
 *
 * Raytraced black hole with Newtonian gravitational lensing,
 * a procedural FBM-textured accretion disk, and a starfield
 * background that visibly bends around the event horizon.
 *
 * Physics model (simplified):
 *   Light rays are stepped through space. At each step,
 *   the ray velocity is deflected toward the singularity
 *   by an inverse-square gravitational acceleration:
 *     a = G * M / r^2  (Newton)
 *   Rays that cross the event horizon are absorbed (black).
 *   Rays that escape sample a procedural starfield, producing
 *   visible lensing arcs around the hole.
 *
 * Ported from Genuary 2026 Day 31 (blackhole.frag).
 *
 * @author guinetik
 * @date 2026-01-31
 */

// ── Constants ──────────────────────────────────────────────
#define PI 3.1415927

// Camera
#define CAMERA_DIST 2.0
#define CAMERA_ANGLE_V (PI * 0.48)
#define ORBIT_SPEED 0.08
#define FOV_FACTOR 1.5

// Black hole physics
#define EVENT_HORIZON_RADIUS 0.1
#define GRAVITY_STRENGTH 0.005
#define CAPTURE_THRESHOLD 0.001

// Raymarching
#define MAX_STEPS 150
#define STEP_SIZE 0.02
#define ADAPTIVE_NEAR 0.8
#define ADAPTIVE_FAR 1.5
#define ADAPTIVE_INNER 0.2
#define ADAPTIVE_OUTER 1.5

// Accretion disk
#define DISK_TORUS_MAJOR 1.0
#define DISK_TORUS_MINOR 1.2
#define DISK_FLATTEN 40.0
#define DISK_ROTATION_SPEED 0.6
#define DISK_INTENSITY 0.5
#define DISK_FALLOFF 100.0
#define DOPPLER_STRENGTH 0.7
#define FBM_OCTAVES 4

// Accretion disk colors (hot white center → orange → deep red edge)
#define OUTER_DISK_COLOR vec3(0.5, 0.12, 0.02)
#define MID_DISK_COLOR vec3(1.0, 0.55, 0.12)
#define INNER_DISK_COLOR vec3(1.0, 0.85, 0.6)

// Ambient glow near event horizon
#define GLOW_COLOR vec3(0.8, 0.5, 0.2)
#define GLOW_INTENSITY 0.00006

// Photon ring (Einstein ring) — warm white band at photon sphere
#define PHOTON_SPHERE_RADIUS 0.15
#define PHOTON_RING_WIDTH 0.02
#define PHOTON_RING_COLOR vec3(0.9, 0.7, 0.4)
#define PHOTON_RING_INTENSITY 0.0015

// Starfield
#define STAR_CELL_SIZE 50.0
#define STAR_THRESHOLD 0.97
#define STAR_BRIGHTNESS 0.4
#define STAR_POINT_SIZE 0.2
#define STAR_COLOR vec3(0.9, 0.95, 1.0)

// Post-processing
#define GAMMA vec3(0.45)

// ── Signed Distance Functions ──────────────────────────────

/** Distance from point p to a sphere at origin. */
float sdfSphere(vec3 p, float radius) {
    return length(p) - radius;
}

/**
 * Distance from point p to a torus.
 * t.x = major radius, t.y = minor radius.
 */
float sdfTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}

// ── Procedural Noise ───────────────────────────────────────

/** Hash function — pseudo-random from 2D input. */
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

/**
 * Smooth value noise — bilinear interpolation between grid cells.
 * Unlike raw hash(), this slides smoothly as input changes.
 */
float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // Hermite smoothstep
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

/**
 * Fractal Brownian Motion — layered smooth noise for organic textures.
 * 4 octaves, each at double frequency and half amplitude.
 */
float fbmNoise(vec2 p) {
    float total = 0.0;
    float amplitude = 1.0;
    for (int i = 0; i < FBM_OCTAVES; i++) {
        total += amplitude * valueNoise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return total;
}

// ── Starfield ──────────────────────────────────────────────

/**
 * Procedural starfield from ray direction.
 * Uses spherical coordinates for uniform distribution, then
 * places a point-star per cell with Gaussian falloff.
 */
vec3 starfield(vec3 rd) {
    // Spherical projection — avoids stretching at poles/edges
    vec2 sph = vec2(atan(rd.z, rd.x), asin(clamp(rd.y, -1.0, 1.0)));
    vec2 uv = sph * STAR_CELL_SIZE;
    vec2 cell = floor(uv);
    vec2 frac = fract(uv);

    // Check this cell and its neighbors to avoid cutoff at edges
    vec3 col = vec3(0.0);
    for (int dx = -1; dx <= 1; dx++) {
        for (int dy = -1; dy <= 1; dy++) {
            vec2 neighbor = cell + vec2(float(dx), float(dy));
            float h = hash(neighbor);
            if (h > STAR_THRESHOLD) {
                // Star position within its cell
                vec2 starPos = vec2(hash(neighbor + 7.0), hash(neighbor + 13.0));
                vec2 delta = (vec2(float(dx), float(dy)) + starPos) - frac;
                float d = length(delta) / STAR_POINT_SIZE;
                float brightness = exp(-d * d * 8.0);
                brightness *= (h - STAR_THRESHOLD) / (1.0 - STAR_THRESHOLD);
                vec3 tint = STAR_COLOR + vec3(hash(neighbor + 1.0) - 0.5,
                                               hash(neighbor + 2.0) - 0.5,
                                               hash(neighbor + 3.0) - 0.5) * 0.2;
                col += tint * brightness * STAR_BRIGHTNESS;
            }
        }
    }
    return col;
}

// ── Main ───────────────────────────────────────────────────

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // UV setup with aspect correction
    vec2 uv = fragCoord / iResolution.xy;
    vec2 screenPos = uv * 2.0 - 1.0;
    screenPos.x *= iResolution.x / iResolution.y;

    // Camera: slow horizontal orbit around the black hole
    float cameraAngleH = PI * 0.5 + iTime * ORBIT_SPEED;

    vec3 cameraPos = vec3(
        CAMERA_DIST * cos(cameraAngleH) * sin(CAMERA_ANGLE_V),
        CAMERA_DIST * cos(CAMERA_ANGLE_V),
        CAMERA_DIST * sin(cameraAngleH) * sin(CAMERA_ANGLE_V)
    );

    // Camera orientation (look-at origin)
    vec3 forward = normalize(-cameraPos);
    vec3 right = normalize(cross(vec3(0.0, 1.0, -0.1), forward));
    vec3 up = normalize(cross(forward, right));

    // Ray for this pixel
    vec3 rayDir = normalize(forward * FOV_FACTOR + right * screenPos.x + up * screenPos.y);

    // ── Raytrace with gravitational lensing ────────────────

    vec3 rayPos = cameraPos;
    vec3 rayVel = rayDir;
    vec3 finalColor = vec3(0.0);
    float notCaptured = 1.0;

    for (int i = 0; i < MAX_STEPS; i++) {

        // Gravity: bend ray toward singularity
        vec3 toBH = -rayPos; // black hole at origin
        float dist = length(toBH);
        float distSq = dist * dist;

        // Adaptive step size: smaller near event horizon
        float adaptiveStep = STEP_SIZE * mix(ADAPTIVE_NEAR, ADAPTIVE_FAR,
                                              smoothstep(ADAPTIVE_INNER, ADAPTIVE_OUTER, dist));

        // Advance ray
        rayPos += rayVel * adaptiveStep * notCaptured;

        // Newton's inverse-square acceleration
        rayVel += normalize(toBH) * (GRAVITY_STRENGTH / distSq);

        // Check capture
        float distToHorizon = dist - EVENT_HORIZON_RADIUS;
        notCaptured = smoothstep(0.0, 0.666, distToHorizon);

        if (notCaptured < CAPTURE_THRESHOLD) break;

        // ── Accretion disk ─────────────────────────────────

        float diskRadius = length(toBH.xz);
        float diskAngle = atan(toBH.x, toBH.z);

        // Rotating angle for Kerr disk spin
        float rotAngle = diskAngle + iTime * DISK_ROTATION_SPEED;

        // FBM turbulence — visible clumps that rotate with the disk
        vec2 diskUV = vec2(diskRadius * 8.0, rotAngle * 5.0);
        float turbulence = fbmNoise(diskUV) * 0.5 + 0.5;
        // Second layer at different scale for finer detail
        turbulence *= fbmNoise(diskUV * 2.3 + 7.0) * 0.4 + 0.6;

        // Doppler beaming — approaching side much brighter, receding side dim
        float doppler = 1.0 + cos(rotAngle) * DOPPLER_STRENGTH;

        // Radial heat gradient: hot white center → orange → deep red edge
        float distFromBH = dist - EVENT_HORIZON_RADIUS;
        float t = clamp(pow(max(distFromBH, 0.0), 1.5), 0.0, 1.0);
        vec3 diskColor = mix(INNER_DISK_COLOR, MID_DISK_COLOR, smoothstep(0.0, 0.4, t));
        diskColor = mix(diskColor, OUTER_DISK_COLOR, smoothstep(0.3, 1.0, t));
        diskColor *= turbulence * doppler;
        diskColor *= DISK_INTENSITY / (0.001 + distFromBH * DISK_FALLOFF);

        // Disk shape: flattened torus SDF
        vec3 flatPos = rayPos * vec3(1.0, DISK_FLATTEN, 1.0);
        float diskMask = smoothstep(0.0, 1.0, -sdfTorus(flatPos, vec2(DISK_TORUS_MAJOR, DISK_TORUS_MINOR)));

        finalColor += max(vec3(0.0), diskColor * diskMask * notCaptured);

        // Subtle ambient glow near event horizon
        finalColor += GLOW_COLOR * (1.0 / distSq) * GLOW_INTENSITY * notCaptured;

        // Photon ring (Einstein ring) — bright blue-white band at photon sphere
        float ringDist = abs(dist - PHOTON_SPHERE_RADIUS);
        float ring = exp(-ringDist * ringDist / (PHOTON_RING_WIDTH * PHOTON_RING_WIDTH));
        finalColor += PHOTON_RING_COLOR * ring * PHOTON_RING_INTENSITY * notCaptured;
    }

    // ── Starfield background (for escaped rays) ────────────
    if (notCaptured > CAPTURE_THRESHOLD) {
        vec3 stars = starfield(normalize(rayVel));
        finalColor += stars * notCaptured;
    }

    // ── Post-processing ────────────────────────────────────
    // Gamma correction
    finalColor = pow(max(finalColor, vec3(0.0)), GAMMA);

    fragColor = vec4(finalColor, 1.0);
}
