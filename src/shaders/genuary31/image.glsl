/**
 * Genuary 2026 Day 31: GLSL Day
 * @author guinetik
 * @date 2026-01-31
 *
 * Synthwave terrain with Sierpinski fractal sky and Black Hole.
 * A kitchen-sink shader combining multiple techniques as a Genuary finale:
 * raymarched triangular-grid terrain, Sierpinski-triangle sky dome,
 * raytraced black hole with gravitational lensing and accretion disk,
 * animated bird flocks, and a Matrix-rain glyph overlay.
 *
 * Features:
 * - Raymarched triangular grid terrain with dramatic peaks and canyon
 * - Terminal green color palette throughout
 * - Sierpinski triangle pattern projected onto the sky dome
 * - Raytraced black hole with gravitational lensing and accretion disk
 * - Bird flocks flying across the sky in periodic waves
 * - Mouse-controlled camera rotation (yaw/pitch)
 * - Matrix rain overlay with procedural katakana-like glyphs
 * - Scanline and vignette post-processing
 *
 * Based on "another synthwave sunset thing" by stduhpf
 * Original: https://www.shadertoy.com/view/tsScRK
 *
 * @project Genuary 2026
 * @see https://genuary2026.guinetik.com
 */

// ============================================
// CONSTANTS
// ============================================
#define PI 3.1415927

// ============================================
// CONFIGURATION - Tweak these!
// ============================================

// Camera
#define CAM_SPEED 10.0            // Forward travel speed — higher = faster flythrough.
#define CAM_HEIGHT 1.5            // Camera altitude above terrain — raise to see more terrain.
#define CAM_START_Z 20000.0       // Starting Z offset — large value avoids terrain edge artifacts at start.
#define CAM_YAW_SENS 0.8          // Mouse-X sensitivity for horizontal camera rotation.
#define CAM_PITCH_SENS 0.08       // Mouse-Y sensitivity for vertical camera tilt.
#define CAM_VIEW_OFFSET 0.15      // Vertical UV offset — tilts default view slightly downward.
#define CAM_FOV 1.333             // 4/3 aspect FOV factor — higher = narrower field of view.

// Terrain
#define TERRAIN_HEIGHT 3.0        // Peak terrain height from triangular noise.
#define TERRAIN_WAVE_FREQ 0.15    // Frequency of rolling wave ridges along Z — higher = tighter waves.
#define TERRAIN_WAVE_SPEED 2.0    // Speed of wave ridge animation — higher = faster rolling.
#define TERRAIN_WAVE_AMP 0.3      // Amplitude of rolling waves — higher = taller ridges.
#define TERRAIN_WAVE_FADE 5.0     // X-distance at which waves fade in — prevents center canyon disruption.
#define TERRAIN_CANYON_WIDTH 0.02  // Gaussian width of the central canyon — smaller = narrower canyon.
#define TERRAIN_CANYON_DEPTH 0.8   // Depth of the central canyon groove.
#define TERRAIN_SPIKE_FREQ 0.5    // How often spike formations repeat along Z.
#define TERRAIN_SPIKE_PERIOD 8.0  // Period of spike repetition pattern.
#define TERRAIN_SPIKE_HEIGHT 1.5  // Maximum height of dramatic spike peaks.

// Grid
#define GRID_GLOW_THRESH 0.08     // Distance from triangle edge where glow activates — wider = thicker lines.
#define GRID_PULSE_SPEED 3.0      // Speed of the grid brightness pulsing.
#define GRID_PULSE_SCALE 0.1      // Spatial frequency of the pulse wave along Z.
#define GRID_COLOR vec3(0.0, 1.0, 0.3)       // Bright neon green grid line color.
#define GRID_GLOW_COLOR vec3(0.0, 0.4, 0.15) // Softer green for the grid bloom/glow halo.

// Raymarching
#define MARCH_MAX_ITER 500        // Maximum raymarch iterations — higher = more detail but slower.
#define MARCH_STEP_MULT 0.5       // Step size multiplier (relaxation) — 0.5 is conservative/safe,
                                  // 0.8+ is faster but may cause surface artifacts.
#define MARCH_HIT_THRESH 0.003    // Surface hit threshold — smaller = more precise but more iterations.
#define MARCH_MAX_DIST 150.0      // Maximum ray travel distance before giving up.
#define MARCH_MAX_Y 4.0           // Y height above which aggressive stepping is used (above terrain).

// Sky (Sierpinski fractal dome)
#define SKY_LAYER1_SCALE 60.0     // Scale of the largest Sierpinski layer — smaller = bigger triangles.
#define SKY_LAYER2_SCALE 120.0    // Medium Sierpinski layer scale.
#define SKY_LAYER3_SCALE 200.0    // Finest Sierpinski layer scale.
#define SKY_DRIFT_SPEED vec2(2.0, 1.5)    // Drift velocity of fractal layers across the sky dome.
#define SKY_PATTERN_INTENSITY 0.38         // Brightness of the Sierpinski pattern — 0 = invisible, 1 = full.
#define SKY_BG_COLOR vec3(0.0, 0.10, 0.03) // Deep green-black sky background.
#define SKY_HAZE_COLOR vec3(0.0, 0.22, 0.07)   // Horizon haze color — green-tinged fog.
#define SKY_PATTERN_COLOR vec3(0.1, 0.55, 0.22) // Color of the Sierpinski fractal triangles.

// Black hole
#define BH_POSITION vec2(0.5, 0.5)   // Screen-space position of the black hole (0-1 range).
#define BH_SIZE 0.08                  // Visual size scaling — smaller = smaller black hole on screen.
#define BH_CAM_DIST 2.0              // Camera distance from the black hole center.
#define BH_CAM_ANGLE 0.48            // Camera elevation angle (multiplied by PI) — ~86 deg from pole.
#define BH_EVENT_HORIZON 0.1         // Radius of the event horizon — light inside is fully captured.
#define BH_GRAVITY 0.005             // Gravitational lensing strength — higher = more bending.
#define BH_STEP_SIZE 0.02            // Base integration step for light ray bending.
#define BH_DISK_OUTER vec3(0.1, 0.5, 0.2)  // Outer accretion disk color (cooler, green-tinted).
#define BH_DISK_INNER vec3(0.4, 1.0, 0.6)  // Inner accretion disk color (hotter, bright green).
#define BH_GLOW_COLOR vec3(0.3, 1.0, 0.5)  // Point-source glow around the singularity.
#define BH_COUNTER_YAW 0.7           // Counter-rotation factor to keep BH fixed when camera pans.
#define BH_COUNTER_PITCH 0.06        // Counter-pitch factor for vertical camera movement.

// Birds
#define BIRD_FLOCK_COUNT 4.0     // Number of independent bird flocks.
#define BIRD_FLOCK_OFFSET 6.0    // Time offset between flock appearances (seconds).
#define BIRD_CYCLE_TIME 25.0     // Full cycle duration (active + rest) per flock.
#define BIRD_ACTIVE_TIME 18.0    // How long a flock is visible during its cycle.
#define BIRD_SIZE 12.0           // Wingspan in pixels — larger = bigger birds.
#define BIRD_LINE_THICK 1.5      // Stroke thickness of the V-shaped bird silhouette.
#define BIRD_Y_MIN 0.55          // Minimum normalized Y position for flock path.
#define BIRD_Y_RANGE 0.30        // Range of vertical variation for flock paths.
#define BIRD_COUNT_MIN 6.0       // Minimum birds per flock.
#define BIRD_COUNT_RANGE 7.0     // Random range added to min — so 6 to 13 birds per flock.
#define BIRD_SPREAD_X 80.0       // Horizontal scatter of birds within a flock (pixels).
#define BIRD_SPREAD_Y 50.0       // Vertical scatter of birds within a flock (pixels).
#define BIRD_WING_SPEED 12.0     // Wing flapping frequency — higher = faster flapping.
#define BIRD_COLOR vec3(0.1, 0.9, 0.4) // Bird silhouette color (bright green to match theme).

// Matrix rain (Quine style)
#define MATRIX_CYCLE 30.0        // Full cycle time — rain triggers once per cycle.
#define MATRIX_BURST 5.0         // Duration of the initial burst window when new drops start.
#define MATRIX_CELL_W 11.0       // Width of each character cell in pixels.
#define MATRIX_CELL_H 18.0       // Height of each character cell in pixels.
#define MATRIX_DENSITY 0.35      // Fraction of columns that are active — 0.35 = 35% have rain.
#define MATRIX_DELAY_MAX 2.5     // Max random start delay for staggered drops (seconds).
#define MATRIX_TICK 0.07         // Time per discrete drop step — smaller = faster rain.
#define MATRIX_TAIL_MIN 25.0     // Minimum tail length in character rows.
#define MATRIX_TAIL_RANGE 25.0   // Random additional tail length — so 25 to 50 rows.
#define MATRIX_HEAD_COLOR vec3(0.95, 1.0, 0.98)  // Bright white-green head of each rain drop.
#define MATRIX_HEAD_GLOW 0.4     // Bloom intensity around the leading character.
#define MATRIX_TAIL_COLOR vec3(0.0, 0.85, 0.35)  // Classic Matrix green for the trailing tail.
#define MATRIX_BG_FLICKER 0.02   // Probability of a random background glyph flickering on.
#define MATRIX_CHAR_CHANGE 15.0  // Speed of character mutation — higher = glyphs change faster.

// Post-processing
#define SCANLINE_MIN 0.95        // Minimum brightness in scanline troughs — 1.0 = no scanlines.
#define SCANLINE_RANGE 0.05      // Amplitude of scanline brightness variation.
#define SCANLINE_FREQ 2.0        // Spatial frequency of scanlines — higher = tighter lines.
#define VIGNETTE_STRENGTH 0.5    // Corner darkening intensity — 0 = off, 1 = heavy.

// Terrain colors
#define TERRAIN_BASE_COLOR vec3(0.0, 0.12, 0.05)  // Base terrain diffuse color (dark green).
#define FOG_DECAY vec3(0.2, 0.08, 0.25)           // Per-channel exponential fog falloff rates.
                                                    // Lower = fog extends farther in that channel.

// ============================================
// GLOBALS
// ============================================
float jTime;

// ============================================
// FORWARD DECLARATIONS
// ============================================
// Utilities
float amp(vec2 p);
float pow512(float a);
float pow1d5(float a);
float bhHash(vec2 p);
float fbmNoise(vec2 p);
float hash21(vec2 co);
float hash(vec2 uv);
float edgeMin(float dx, vec2 da, vec2 db, vec2 uv);
vec2 trinoise(vec2 uv);

// SDFs
float sdfSphere(vec3 p, float radius);
float sdfTorus(vec3 p, vec2 t);

// Raymarching
vec2 map(vec3 p);
vec3 grad(vec3 p);
vec2 intersect(vec3 ro, vec3 rd);

// Sky
float sierpinski(vec2 p, float iterations);
float sierpinskiSky(vec3 rd, float time);
vec3 gsky(vec3 rd, vec3 ld, bool mask);

// Black hole
vec4 renderBlackHole(vec2 screenPos, float time);

// Birds
float birdShape(vec2 p, float angle, float wingFlap);
vec3 renderBirds(vec2 fragCoord, vec2 resolution, float time);

// Matrix rain
float matrixGlyph(vec2 uv, float seed);
vec3 renderMatrix(vec2 fragCoord, vec2 resolution, float time);

// ============================================
// MAIN IMAGE
// ============================================
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    const float shutter_speed = 0.25;
    float dt = fract(hash21(fragCoord) + iTime) * shutter_speed;
    jTime = mod(iTime - dt * 0.016, 4000.0);

    // Mouse interaction: camera control
    vec2 mouse = vec2(0.0);
    if (iMouse.z > 0.0) {
        mouse = (iMouse.xy / iResolution.xy) * 2.0 - 1.0;
    }
    float camYaw = mouse.x * CAM_YAW_SENS;
    float camPitch = mouse.y * CAM_PITCH_SENS;

    // Camera position
    vec3 ro = vec3(0.0, CAM_HEIGHT, (-CAM_START_Z + jTime * CAM_SPEED));

    // Ray direction with view offset
    vec2 viewUV = uv;
    viewUV.y += CAM_VIEW_OFFSET;
    vec3 rd = normalize(vec3(viewUV, CAM_FOV));

    // Apply camera rotation
    float cy = cos(camYaw), sy = sin(camYaw);
    rd.xz = mat2(cy, -sy, sy, cy) * rd.xz;
    float cp = cos(camPitch), sp = sin(camPitch);
    rd.yz = mat2(cp, -sp, sp, cp) * rd.yz;

    // Raymarching
    vec2 i = intersect(ro, rd);
    float d = i.x;

    // Lighting
    vec3 ld = normalize(vec3(0.0, 0.125 + 0.05 * sin(0.1 * jTime), 1.0));

    // Fog and sky
    vec3 fog = d > 0.0 ? exp2(-d * FOG_DECAY) : vec3(0.0);
    vec3 sky = gsky(rd, ld, d < 0.0);

    // Terrain shading
    vec3 p = ro + d * rd;
    vec3 n = normalize(grad(p));
    float diff = dot(n, ld) + 0.1 * n.y;
    vec3 col = TERRAIN_BASE_COLOR * diff;

    // Reflection
    vec3 rfd = reflect(rd, n);
    vec3 rfcol = gsky(rfd, ld, true);
    col = mix(col, rfcol, 0.05 + 0.95 * pow(max(1.0 + dot(rd, n), 0.0), 5.0));

    // Grid lines glow - with pulsing intensity
    float gridGlow = smoothstep(GRID_GLOW_THRESH, 0.0, i.y);
    float gridPulse = 0.7 + 0.3 * sin(jTime * GRID_PULSE_SPEED + p.z * GRID_PULSE_SCALE);
    col = mix(col, GRID_COLOR * gridPulse, gridGlow);
    col += GRID_GLOW_COLOR * gridGlow * gridGlow * gridPulse;
    col = mix(sky, col, fog);

    // Bird flocks
    col += renderBirds(fragCoord, iResolution.xy, jTime);

    // Post-processing: scanlines
    col *= SCANLINE_MIN + SCANLINE_RANGE * sin(fragCoord.y * SCANLINE_FREQ);

    // Post-processing: vignette
    vec2 vUv = fragCoord / iResolution.xy;
    float vig = 1.0 - length(vUv - 0.5) * VIGNETTE_STRENGTH;
    col *= vig;

    // Black hole overlay (counter-rotated to stay fixed)
    vec2 bhScreenPos = uv;
    bhScreenPos.x += mouse.x * BH_COUNTER_YAW;
    bhScreenPos.y += mouse.y * BH_COUNTER_PITCH;
    vec4 bh = renderBlackHole(bhScreenPos, jTime);
    float bhAlpha = d < 0.0 ? bh.a : 0.0;
    col = mix(col, bh.rgb, bhAlpha);

    // Matrix rain overlay
    col += renderMatrix(fragCoord, iResolution.xy, jTime);

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
float amp(vec2 p) {
    return smoothstep(1.0, 8.0, abs(p.x));
}

float pow512(float a) {
    a *= a; a *= a; a *= a; a *= a;
    a *= a; a *= a; a *= a; a *= a;
    return a * a;
}

float pow1d5(float a) {
    return a * sqrt(abs(a));
}

float bhHash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float fbmNoise(vec2 p) {
    float total = 0.0;
    float amplitude = 1.0;
    for (int i = 0; i < 4; i++) {
        total += amplitude * bhHash(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return total;
}

float hash21(vec2 co) {
    return fract(sin(dot(co.xy, vec2(1.9898, 7.233))) * 45758.5433);
}

float hash(vec2 uv) {
    float a = amp(uv);
    if (a <= 0.0) return 0.0;
    float h = hash21(uv);
    float h2 = hash21(uv * 0.5 + vec2(17.3, 31.7));
    float h3 = hash21(uv * 0.25 + vec2(53.1, 97.2));
    float combined = h * 0.5 + h2 * 0.3 + h3 * 0.2;
    combined = pow(max(combined, 0.0), 0.8);
    return a * pow1d5(combined) * 1.2;
}

float edgeMin(float dx, vec2 da, vec2 db, vec2 uv) {
    uv.x += 5.0;
    vec3 c = fract((floor(vec3(uv, uv.x + uv.y) + 0.5)) * (vec3(0, 1, 2) + 0.61803398875));
    return min(min((1.0 - dx) * db.y, da.x), da.y);
}

vec2 trinoise(vec2 uv) {
    const float sq = sqrt(3.0 / 2.0);
    uv.x *= sq;
    uv.y -= 0.5 * uv.x;
    vec2 d = fract(uv);
    uv -= d;
    bool c = dot(d, vec2(1)) > 1.0;
    vec2 dd = 1.0 - d;
    vec2 da = c ? dd : d;
    vec2 db = c ? d : dd;
    float nn = hash(uv + float(c));
    float n2 = hash(uv + vec2(1, 0));
    float n3 = hash(uv + vec2(0, 1));
    float nmid = mix(n2, n3, d.y);
    float ns = mix(nn, c ? n2 : n3, da.y);
    float dx = da.x / db.y;
    return vec2(mix(ns, nmid, dx), edgeMin(dx, da, db, uv + d));
}

// ============================================
// SDFs
// ============================================
float sdfSphere(vec3 p, float radius) {
    return length(p) - radius;
}

float sdfTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}

// ============================================
// RAYMARCHING
// ============================================
vec2 map(vec3 p) {
    vec2 n = trinoise(p.xz);

    // Base terrain height
    float h = n.x * TERRAIN_HEIGHT;

    // Add rolling wave ridges that travel forward
    float waveZ = p.z * TERRAIN_WAVE_FREQ + jTime * TERRAIN_WAVE_SPEED;
    float wave = sin(waveZ) * TERRAIN_WAVE_AMP;
    wave *= smoothstep(0.0, TERRAIN_WAVE_FADE, abs(p.x));

    // Pulsing central canyon - deeper in the middle
    float canyon = exp(-p.x * p.x * TERRAIN_CANYON_WIDTH) * TERRAIN_CANYON_DEPTH;

    // Dramatic spikes at certain intervals
    float spikeDist = abs(mod(p.z * TERRAIN_SPIKE_FREQ, TERRAIN_SPIKE_PERIOD) - TERRAIN_SPIKE_PERIOD * 0.5);
    float spike = smoothstep(1.0, 0.0, spikeDist) * smoothstep(3.0, 6.0, abs(p.x));
    spike *= (0.5 + 0.5 * sin(p.z * 0.2)) * TERRAIN_SPIKE_HEIGHT;

    // Combine: terrain + waves + canyon depth + spikes
    h = h + wave + spike - canyon;

    return vec2(p.y - h, n.y);
}

vec3 grad(vec3 p) {
    const vec2 e = vec2(0.005, 0);
    float a = map(p).x;
    return vec3(
        map(p + e.xyy).x - a,
        map(p + e.yxy).x - a,
        map(p + e.yyx).x - a
    ) / e.x;
}

vec2 intersect(vec3 ro, vec3 rd) {
    float d = 0.0, h = 0.0;

    // Early-out: if looking up and starting above terrain, skip entirely
    if (rd.y > 0.1 && ro.y > 2.0) return vec2(-1);

    for (int i = 0; i < MARCH_MAX_ITER; i++) {
        vec3 p = ro + d * rd;

        // Aggressive early-out when above terrain and ray going up
        if (p.y > MARCH_MAX_Y) {
            if (rd.y > 0.0) return vec2(-1);  // Looking up = sky
            // Looking down from high = use bigger steps
            d += (p.y - MARCH_MAX_Y) * 0.5;
            continue;
        }

        vec2 s = map(p);
        h = s.x;

        // Step with fixed multiplier
        d += h * MARCH_STEP_MULT;

        // Hit threshold
        if (abs(h) < MARCH_HIT_THRESH) return vec2(d, s.y);
        if (d > MARCH_MAX_DIST) break;
    }
    return vec2(-1);
}

// ============================================
// SIERPINSKI SKY
// ============================================

// TECHNIQUE: Sierpinski carpet test
// For each scale level, check if the pixel falls in a "removed" quadrant
// (both x and y in the middle third). If so, the pixel is empty (0).
// Multiple scales layered together create the fractal sky dome pattern.

float sierpinski(vec2 p, float iterations) {
    float filled = 1.0;
    for (float i = 0.0; i < 8.0; i++) {
        if (i >= iterations) break;
        float scale = pow(2.0, i);
        float mx = mod(floor(p.x / scale), 2.0);
        float my = mod(floor(p.y / scale), 2.0);
        if (mx > 0.5 && my > 0.5) {
            filled = 0.0;
            break;
        }
    }
    return filled;
}

float sierpinskiSky(vec3 rd, float time) {
    vec2 skyUV = rd.xz / (abs(rd.y) + 0.3);
    vec2 drift = time * SKY_DRIFT_SPEED;
    float s1 = sierpinski(skyUV * SKY_LAYER1_SCALE + drift, 6.0);
    float s2 = sierpinski(skyUV * SKY_LAYER2_SCALE - drift * 0.7, 5.0);
    float s3 = sierpinski(skyUV * SKY_LAYER3_SCALE + vec2(drift.y, -drift.x) * 0.5, 4.0);
    float pattern = s1 * 0.5 + s2 * 0.3 + s3 * 0.2;
    float heightFade = smoothstep(0.05, 0.5, rd.y);
    float horizonFade = smoothstep(0.0, 0.12, abs(rd.y));
    return pattern * heightFade * horizonFade * SKY_PATTERN_INTENSITY;
}

vec3 gsky(vec3 rd, vec3 ld, bool mask) {
    float haze = exp2(-5.0 * (abs(rd.y) - 0.2 * dot(rd, ld)));
    float sierpPattern = mask ? sierpinskiSky(rd, jTime) * (1.0 - min(haze * 0.5, 0.8)) : 0.0;
    vec3 back = SKY_BG_COLOR * (1.0 - 0.5 * exp2(-0.1 * abs(length(rd.xz) / rd.y)) * max(sign(rd.y), 0.0));
    vec3 patternColor = SKY_PATTERN_COLOR * sierpPattern;
    return clamp(mix(back, SKY_HAZE_COLOR, haze) + patternColor, 0.0, 1.0);
}

// ============================================
// BLACK HOLE
// ============================================

// TECHNIQUE: Gravitational lensing via ray deflection
// Light rays are stepped through space and deflected toward the black hole
// center by an inverse-square gravitational force. Rays that cross the
// event horizon are absorbed (captured). The accretion disk is rendered
// as a flattened torus with FBM-textured emissive color.

vec4 renderBlackHole(vec2 screenPos, float time) {
    vec2 bhOffset = (BH_POSITION - 0.5) * 2.0;
    bhOffset.x *= iResolution.x / iResolution.y;
    screenPos -= bhOffset;
    screenPos *= 1.0 / (BH_SIZE * 15.0);

    float cameraAngleH = PI * 0.5;
    float cameraAngleV = PI * BH_CAM_ANGLE;

    vec3 cameraPos = vec3(
        BH_CAM_DIST * cos(cameraAngleH) * sin(cameraAngleV),
        BH_CAM_DIST * cos(cameraAngleV),
        BH_CAM_DIST * sin(cameraAngleH) * sin(cameraAngleV)
    );

    vec3 target = vec3(0.0);
    vec3 forward = normalize(target - cameraPos);
    vec3 right = normalize(cross(vec3(0.0, 1.0, -0.1), forward));
    vec3 up = normalize(cross(forward, right));
    vec3 rayDir = normalize(forward * 1.5 + right * screenPos.x + up * screenPos.y);

    vec3 bhPos = vec3(0.0);
    vec3 rayPos = cameraPos;
    vec3 rayVel = rayDir;

    vec3 finalColor = vec3(0.0);
    float notCaptured = 1.0;

    // 150 iterations with mild adaptive stepping (was 200 fixed)
    for (int i = 0; i < 150; i++) {
        vec3 toBH = bhPos - rayPos;
        float dist = length(toBH);
        float distanceSquared = dist * dist;

        // Mild adaptive: 0.8x to 1.5x base step based on distance
        float adaptiveStep = BH_STEP_SIZE * mix(0.8, 1.5, smoothstep(0.2, 1.5, dist));
        rayPos += rayVel * adaptiveStep * notCaptured;
        rayVel += normalize(toBH) * (BH_GRAVITY / distanceSquared);

        float distToHorizon = dist - BH_EVENT_HORIZON;
        notCaptured = smoothstep(0.0, 0.666, distToHorizon);

        // Early exit only if fully captured
        if (notCaptured < 0.001) break;

        float diskRadius = length(toBH.xz);
        float diskAngle = atan(toBH.x, toBH.z);
        vec2 diskUV = vec2(diskRadius, diskAngle * (0.01 + (diskRadius - BH_EVENT_HORIZON) * 0.002) + time * 0.1);
        diskUV *= vec2(10.0, 20.0);

        float diskTexture = fbmNoise(diskUV * vec2(0.1, 0.5)) * 0.8 + 0.2;
        diskTexture += sin(diskUV.x * 3.0 + diskUV.y * 0.5 + time * 0.5) * 0.15;

        float distFromBH = dist - BH_EVENT_HORIZON;
        vec3 diskColor = mix(BH_DISK_INNER, BH_DISK_OUTER, pow(max(distFromBH, 0.0), 2.0));
        diskColor *= max(0.0, diskTexture);
        diskColor *= 4.0 / (0.001 + distFromBH * 50.0);

        vec3 flattenedPos = rayPos * vec3(1.0, 40.0, 1.0);
        float diskMask = smoothstep(0.0, 1.0, -sdfTorus(flattenedPos - bhPos, vec2(0.8, 0.99)));

        finalColor += max(vec3(0.0), diskColor * diskMask * notCaptured);
        finalColor += BH_GLOW_COLOR * (1.0 / distanceSquared) * 0.002 * notCaptured;
    }

    float alpha = min(1.0, length(finalColor) * 2.0 + (1.0 - notCaptured));
    return vec4(finalColor, alpha);
}

// ============================================
// BIRD FLOCKS
// ============================================
float birdShape(vec2 p, float angle, float wingFlap) {
    float c = cos(-angle), s = sin(-angle);
    p = mat2(c, -s, s, c) * p;
    float wingY = BIRD_SIZE * (0.5 + wingFlap * 0.4);
    float d1 = abs(p.y - (p.x / BIRD_SIZE) * wingY) - BIRD_LINE_THICK;
    float d2 = abs(p.y + (p.x / BIRD_SIZE) * wingY) - BIRD_LINE_THICK;
    float wing = min(d1, d2);
    wing = max(wing, p.x);
    wing = max(wing, -p.x - BIRD_SIZE);
    return wing;
}

vec3 renderBirds(vec2 fragCoord, vec2 resolution, float time) {
    vec3 col = vec3(0.0);

    for (float flock = 0.0; flock < BIRD_FLOCK_COUNT; flock++) {
        float flockTime = mod(time + flock * BIRD_FLOCK_OFFSET, BIRD_CYCLE_TIME);
        if (flockTime > BIRD_ACTIVE_TIME) continue;

        float flockSeed = flock * 7.31 + 0.5;
        float startSide = mod(flock, 2.0) < 1.0 ? 1.0 : -1.0;

        float startYNorm = BIRD_Y_MIN + bhHash(vec2(flockSeed, 1.0)) * BIRD_Y_RANGE;
        float targetYNorm = BIRD_Y_MIN + bhHash(vec2(flockSeed, 2.0)) * BIRD_Y_RANGE;

        float progress = flockTime / BIRD_ACTIVE_TIME;
        float flockX = startSide > 0.0
            ? mix(-50.0, resolution.x + 50.0, progress)
            : mix(resolution.x + 50.0, -50.0, progress);
        float flockY = mix(startYNorm, targetYNorm, progress) * resolution.y;

        float birdCount = BIRD_COUNT_MIN + floor(bhHash(vec2(flockSeed, 3.0)) * BIRD_COUNT_RANGE);

        for (float b = 0.0; b < 12.0; b++) {
            if (b >= birdCount) break;

            float birdSeed = flockSeed + b * 3.17;
            float offsetX = (bhHash(vec2(birdSeed, 0.0)) - 0.5) * BIRD_SPREAD_X;
            float offsetY = (bhHash(vec2(birdSeed, 1.0)) - 0.5) * BIRD_SPREAD_Y;
            offsetX += sin(time * 2.0 + b) * 15.0;
            offsetY += cos(time * 1.5 + b * 0.7) * 8.0;

            vec2 birdPos = vec2(flockX + offsetX, flockY + offsetY);
            vec2 toBird = fragCoord - birdPos;

            float angle = startSide > 0.0 ? 0.0 : PI;
            angle += (bhHash(vec2(birdSeed, 2.0)) - 0.5) * 0.4;

            float wingPhase = time * BIRD_WING_SPEED + bhHash(vec2(birdSeed, 3.0)) * PI * 2.0;
            float wingFlap = sin(wingPhase);

            float d = birdShape(toBird, angle, wingFlap);
            if (d < 0.0) {
                float intensity = smoothstep(0.0, -2.5, d);
                col += BIRD_COLOR * intensity;
            }
        }
    }

    return col;
}

// ============================================
// MATRIX RAIN (Quine Style)
// ============================================

// TECHNIQUE: Procedural glyph rain
// Each screen column is independently seeded. A "drop head" advances
// downward in discrete tick steps, leaving a fading green tail behind.
// Glyphs are procedurally constructed from simple geometric primitives
// (vertical/horizontal strokes, diagonals, boxes) to approximate
// katakana-like characters without any font texture.

/** Procedural glyph pattern — creates katakana-like shapes from geometric primitives. */
float matrixGlyph(vec2 uv, float seed) {
    // Create a procedural glyph based on seed
    float glyphType = floor(seed * 8.0);
    float pattern = 0.0;

    // Vertical stroke (common in katakana)
    if (glyphType < 2.0) {
        pattern = step(0.4, uv.x) * step(uv.x, 0.6);
        pattern *= step(0.1, uv.y) * step(uv.y, 0.9);
    }
    // Horizontal with vertical
    else if (glyphType < 4.0) {
        float vert = step(0.4, uv.x) * step(uv.x, 0.6) * step(0.3, uv.y);
        float horiz = step(0.2, uv.x) * step(uv.x, 0.8) * step(0.45, uv.y) * step(uv.y, 0.55);
        pattern = max(vert, horiz);
    }
    // Diagonal
    else if (glyphType < 5.5) {
        float diag = 1.0 - step(0.15, abs(uv.x - uv.y * 0.8 - 0.1));
        pattern = diag * step(0.15, uv.x) * step(uv.x, 0.85);
    }
    // Box-like
    else if (glyphType < 7.0) {
        float outline = step(0.2, uv.x) * step(uv.x, 0.8) * step(0.2, uv.y) * step(uv.y, 0.8);
        float inner = step(0.3, uv.x) * step(uv.x, 0.7) * step(0.35, uv.y) * step(uv.y, 0.65);
        pattern = outline - inner * 0.7;
    }
    // Complex
    else {
        float v1 = step(0.25, uv.x) * step(uv.x, 0.35) * step(0.2, uv.y);
        float v2 = step(0.65, uv.x) * step(uv.x, 0.75) * step(0.2, uv.y);
        float h = step(0.25, uv.x) * step(uv.x, 0.75) * step(0.4, uv.y) * step(uv.y, 0.5);
        pattern = max(max(v1, v2), h);
    }

    return clamp(pattern, 0.0, 1.0);
}

vec3 renderMatrix(vec2 fragCoord, vec2 resolution, float time) {
    float cycleNum = floor(time / MATRIX_CYCLE);
    float cycle = mod(time, MATRIX_CYCLE);

    // Calculate how long drops need to fall (based on screen height + tail)
    float numRows = resolution.y / MATRIX_CELL_H;
    float ticksToBottom = numRows + MATRIX_TAIL_MIN + MATRIX_TAIL_RANGE;
    float dropDuration = ticksToBottom * MATRIX_TICK + MATRIX_DELAY_MAX;

    // Early-out: not in active window
    if (cycle > MATRIX_BURST + dropDuration) return vec3(0.0);

    // Spatial hash: only compute for this fragment's cell
    float colIdx = floor(fragCoord.x / MATRIX_CELL_W);
    float rowIdx = floor((resolution.y - fragCoord.y) / MATRIX_CELL_H);

    // Early-out: skip edge columns (often partially visible)
    if (colIdx < 0.0 || colIdx * MATRIX_CELL_W > resolution.x) return vec3(0.0);

    vec3 col = vec3(0.0);

    // Per-cycle column seed for consistent behavior within cycle
    float cycleSeed = cycleNum * 17.31;
    float colSeed = bhHash(vec2(colIdx + cycleSeed, 0.0));

    // Sparse columns - only some are active
    if (colSeed > MATRIX_DENSITY) {
        // Background flicker for inactive columns
        float flickerSeed = bhHash(vec2(colIdx, rowIdx + floor(time * MATRIX_CHAR_CHANGE)));
        if (flickerSeed < MATRIX_BG_FLICKER && cycle < MATRIX_BURST + dropDuration * 0.8) {
            vec2 cellUV = fract(fragCoord / vec2(MATRIX_CELL_W, MATRIX_CELL_H));
            float glyph = matrixGlyph(cellUV, flickerSeed * 7.0);
            col = MATRIX_TAIL_COLOR * glyph * 0.15;
        }
        return col;
    }

    // Staggered start times - drops begin at different moments
    float startDelay = bhHash(vec2(colIdx + cycleSeed, 1.0)) * MATRIX_DELAY_MAX;
    float dropTime = cycle - startDelay;

    if (dropTime < 0.0) return vec3(0.0);

    // Tick-based discrete movement (like day11)
    float currentTick = floor(dropTime / MATRIX_TICK);
    float headRow = currentTick;

    // Tail length varies per column
    float tailLen = MATRIX_TAIL_MIN + bhHash(vec2(colIdx + cycleSeed, 2.0)) * MATRIX_TAIL_RANGE;

    // Distance from head (0 = head at bottom, positive = tail trailing above)
    // Head is at headRow, tail extends to lower rowIdx values (higher on screen)
    float distFromHead = headRow - rowIdx;

    // Cell UV for glyph rendering
    vec2 cellUV = fract(fragCoord / vec2(MATRIX_CELL_W, MATRIX_CELL_H));

    // In the visible drop?
    if (distFromHead >= 0.0 && distFromHead < tailLen) {
        // Character changes occasionally for that "live code" feel
        float charChangeTick = floor(time * MATRIX_CHAR_CHANGE);
        float charSeed = bhHash(vec2(colIdx, rowIdx + charChangeTick * 0.1));

        // Render glyph
        float glyph = matrixGlyph(cellUV, charSeed);

        // Head vs tail coloring
        if (distFromHead < 1.0) {
            // HEAD: bright white with glow
            float glowDist = length(cellUV - 0.5);
            float glow = exp(-glowDist * 4.0) * MATRIX_HEAD_GLOW;
            col = MATRIX_HEAD_COLOR * (glyph + glow);
        } else {
            // TAIL: fade from bright to dim green
            float tailPos = distFromHead / tailLen;
            // Exponential falloff for more natural fade
            float brightness = exp(-tailPos * 3.0);
            // Add slight flicker
            brightness *= 0.85 + 0.15 * sin(distFromHead * 2.0 + time * 5.0);
            col = MATRIX_TAIL_COLOR * glyph * brightness;
        }
    }
    // Faint trailing ghost
    else if (distFromHead >= tailLen && distFromHead < tailLen + 3.0) {
        float ghostSeed = bhHash(vec2(colIdx, rowIdx));
        float glyph = matrixGlyph(cellUV, ghostSeed);
        float ghost = (1.0 - (distFromHead - tailLen) / 3.0) * 0.1;
        col = MATRIX_TAIL_COLOR * glyph * ghost;
    }

    return col;
}
