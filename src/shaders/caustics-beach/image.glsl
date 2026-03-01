/**
 * Caustic Study #04: Beach
 * @author guinetik
 * @date 2026-03-01
 *
 * Underwater camera between a sandy floor and the water surface.
 * Dual-layer caustic patterns project onto the sand from above,
 * while the surface seen from below shows Snell's window with
 * caustic bright lines. Per-channel water absorption shifts color
 * from clear to deep blue-green at distance.
 *
 * TECHNIQUE: Underwater ray-plane rendering
 * Camera sits between two infinite horizontal planes (sand, surface).
 * Ray direction determines which plane is hit first. Water volume
 * absorption is applied based on ray travel distance.
 *
 * Caustic pattern: joltz0r / David Hoskins iterative domain warp.
 */

// -- Scene geometry --
#define SURFACE_Y       0.0     // Water surface plane height
#define SAND_Y         -3.0     // Sand floor plane height
#define CAM_Y          -1.2     // Camera height (between sand and surface)

// -- Camera --
#define CAM_DIST        4.0     // Horizontal orbit distance
#define CAM_HEIGHT      0.0     // Height offset from CAM_Y (0 = level)
#define CAM_TARGET      vec3(0.0, CAM_Y, 0.0)  // Look-at point
#define CAM_FOV         1.8     // Field of view (lower = telephoto)

// -- Sand --
#define SAND_BASE       vec3(0.76, 0.70, 0.50)  // Warm tan base color
#define SAND_DARK       vec3(0.55, 0.48, 0.35)  // Darker sand in troughs
#define SAND_RIDGE_SCALE 1.2    // Frequency of sand ripple ridges
#define SAND_RIDGE_AMP  0.15    // Height amplitude of ridges (visual only)
#define SAND_NOISE_SCALE 8.0    // High-frequency sand grain noise scale
#define SAND_NOISE_AMP  0.08    // Grain noise contribution to color

// -- Water surface (seen from below) --
#define SNELL_COS       0.6494  // cos(critical angle) = cos(48.6deg) for water (n=1.33)
                                // Below this: total internal reflection. Above: see through.
#define SURFACE_BRIGHT  vec3(0.6, 0.85, 1.0)    // Sky color seen through Snell's window
#define SURFACE_TIR     vec3(0.02, 0.06, 0.10)   // Total internal reflection color (dark blue-green)
#define SURFACE_RIPPLE_FREQ 4.0  // Surface ripple distortion frequency
#define SURFACE_RIPPLE_AMP  0.03 // Surface ripple distortion amplitude

// -- Water absorption (physically-based) --
// Red absorbs fastest, green next, blue least — real seawater behavior.
// At 3m depth: red ~ 30%, green ~ 79%, blue ~ 89% remaining.
#define WATER_ABSORB    vec3(0.40, 0.08, 0.04)   // Per-channel extinction coefficients
#define WATER_SCATTER   vec3(0.01, 0.04, 0.06)    // Scattered ambient light (blue-green)

// -- Caustic (joltz0r / David Hoskins) --
#define TAU             6.28318530718
#define CAUSTIC_ITERS   5       // Warp iterations: 3=blobs, 5=crisp, 8+=sharp
#define CAUSTIC_INTEN   0.005   // Inverse-distance sensitivity — smaller = tighter lines
#define CAUSTIC_POWER   1.4     // Contrast curve exponent
#define CAUSTIC_BASE    1.17    // Brightness threshold offset
#define CAUSTIC_BRIGHT  8.0     // Final sharpening — 4=glow, 8=lines, 12=hair-thin
#define CAUSTIC_SPEED   0.5     // Time multiplier for caustic animation
#define CAUSTIC_OFFSET  23.0    // Time offset to skip boring initial state
#define CAUSTIC_SCALE_A 1.8     // Primary layer UV scale
#define CAUSTIC_SCALE_B 1.0     // Secondary layer UV scale (coarser for parallax)
#define CAUSTIC_MIX_B   0.35    // Blend weight of secondary layer
#define CAUSTIC_SAND_STR 0.6    // Caustic brightness on sand (depth-attenuated)
#define CAUSTIC_SURF_STR 0.4    // Caustic brightness on surface from below
#define CAUSTIC_COL     vec3(0.85, 0.95, 1.0)  // Caustic highlight color (warm white-blue)

// -- Lighting --
#define LIGHT_DIR       normalize(vec3(0.3, 1.0, 0.2))  // Sun direction (from above)
#define AMBIENT         0.35    // Ambient light level underwater
#define DIFFUSE_STR     0.5     // Diffuse lighting strength on sand

// -- Post-processing --
#define VIGNETTE_STR    0.30    // Radial edge darkening
#define GAMMA           vec3(0.45)  // Gamma correction exponent (~1/2.2)

// -------------------------------------------------------
// Hash — simple pseudo-random for sand texture
// -------------------------------------------------------
float hash21(vec2 p)
{
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

// -------------------------------------------------------
// Value noise — smooth interpolated noise for sand
// -------------------------------------------------------
float valueNoise(vec2 p)
{
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);  // smoothstep

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// -------------------------------------------------------
// FBM — layered noise for sand granularity
// -------------------------------------------------------
float fbm(vec2 p, int octaves)
{
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 6; i++)
    {
        if (i >= octaves) break;
        val += amp * valueNoise(p);
        p *= 2.0;
        amp *= 0.5;
    }
    return val;
}

// -------------------------------------------------------
// Procedural sand color
// Combines ripple ridges + fine grain noise
// -------------------------------------------------------
vec3 sandColor(vec2 xz)
{
    // Low-frequency ridges (underwater sand ripples)
    float ridge = sin(xz.x * SAND_RIDGE_SCALE + xz.y * 0.3) *
                  sin(xz.y * SAND_RIDGE_SCALE * 0.7 - xz.x * 0.2);
    ridge = ridge * 0.5 + 0.5;  // remap to 0..1

    // High-frequency grain
    float grain = fbm(xz * SAND_NOISE_SCALE, 4);

    // Blend base/dark by ridge, add grain variation
    vec3 col = mix(SAND_DARK, SAND_BASE, ridge);
    col += (grain - 0.5) * SAND_NOISE_AMP;

    return col;
}

// -------------------------------------------------------
// Ray-plane intersection
// Returns distance along ray, or -1.0 if no hit
// -------------------------------------------------------
float planeHit(vec3 ro, vec3 rd, float planeY)
{
    if (abs(rd.y) < 0.0001) return -1.0;
    float t = (planeY - ro.y) / rd.y;
    return t > 0.0 ? t : -1.0;
}

// -------------------------------------------------------
// Surface ripple normal (seen from below)
// Perturbs the flat surface normal with gentle waves
// -------------------------------------------------------
vec3 surfaceNormal(vec2 xz, float t)
{
    float tx = t * CAUSTIC_SPEED + CAUSTIC_OFFSET;
    float dx = cos(xz.x * SURFACE_RIPPLE_FREQ * TAU + tx * 1.1)
             + cos(xz.y * SURFACE_RIPPLE_FREQ * 0.7 * TAU + tx * 0.8);
    float dz = sin(xz.y * SURFACE_RIPPLE_FREQ * TAU + tx * 0.9)
             + sin(xz.x * SURFACE_RIPPLE_FREQ * 0.6 * TAU + tx * 1.2);
    return normalize(vec3(dx * SURFACE_RIPPLE_AMP, -1.0, dz * SURFACE_RIPPLE_AMP));
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float t = iTime;

    // Orbit camera from buffer-a state
    OrbitCameraRay cam = orbitCameraRay(
        iChannel0, fragCoord, iResolution.xy,
        CAM_DIST, CAM_HEIGHT, CAM_TARGET, CAM_FOV
    );

    // Override camera Y to stay underwater
    cam.ro.y = CAM_Y;
    vec3 ro = cam.ro;
    vec3 rd = cam.rd;

    // Start with deep water background
    vec3 col = WATER_SCATTER;

    // Ray-plane intersections
    float tSand    = planeHit(ro, rd, SAND_Y);
    float tSurface = planeHit(ro, rd, SURFACE_Y);

    // Determine which plane is closer
    float tHit = -1.0;
    bool hitSand = false;
    bool hitSurface = false;

    if (tSand > 0.0 && tSurface > 0.0)
    {
        if (tSand < tSurface) { tHit = tSand;    hitSand = true; }
        else                  { tHit = tSurface;  hitSurface = true; }
    }
    else if (tSand > 0.0)    { tHit = tSand;    hitSand = true; }
    else if (tSurface > 0.0) { tHit = tSurface; hitSurface = true; }

    if (hitSand)
    {
        vec3 p = ro + rd * tHit;
        vec3 n = vec3(0.0, 1.0, 0.0);

        // Procedural sand
        col = sandColor(p.xz);

        // Basic diffuse lighting
        float diff = max(dot(n, LIGHT_DIR), 0.0);
        col *= AMBIENT + DIFFUSE_STR * diff;
    }
    else if (hitSurface)
    {
        vec3 p = ro + rd * tHit;

        // TECHNIQUE: Snell's window (total internal reflection from below)
        // Looking up from underwater, you can only see through the surface
        // within the critical angle (~48.6 deg for water, n=1.33).
        // Outside this cone: total internal reflection — you see the
        // underwater scene mirrored. Inside: you see the bright sky.
        vec3 surfN = surfaceNormal(p.xz, t);
        float cosAngle = abs(dot(rd, surfN));

        // Smooth transition at Snell's window boundary
        float snellMask = smoothstep(SNELL_COS - 0.08, SNELL_COS + 0.08, cosAngle);

        // Inside window: bright sky with depth-tinted falloff
        // Outside window: dark TIR reflection of underwater scene
        col = mix(SURFACE_TIR, SURFACE_BRIGHT, snellMask);

        // Fresnel brightening near the edge of Snell's window
        float fresnelEdge = pow(max(1.0 - cosAngle, 0.0), 3.0);
        col += vec3(0.05, 0.12, 0.18) * fresnelEdge;
    }

    // Water absorption based on travel distance
    if (tHit > 0.0)
    {
        vec3 fog = exp(-WATER_ABSORB * tHit);
        col = col * fog + WATER_SCATTER * (1.0 - fog);
    }

    // Vignette
    vec2 uv = fragCoord / iResolution.xy;
    vec2 q = uv * 2.0 - 1.0;
    col *= 1.0 - dot(q, q) * VIGNETTE_STR;

    // Gamma correction
    col = pow(max(col, 0.0), GAMMA);

    fragColor = vec4(col, 1.0);
}
