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
#define CAM_DIST        4.0     // Horizontal orbit distance from origin
#define CAM_FOV         1.8     // Field of view (lower = telephoto)
#define CAM_PITCH_UP    0.8     // How much pitch tilts the view upward (drag sensitivity)

// -- Sand --
#define SAND_BASE       vec3(0.76, 0.70, 0.50)  // Warm tan base color
#define SAND_DARK       vec3(0.55, 0.48, 0.35)  // Darker sand in troughs
#define SAND_RIDGE_SCALE 3.5    // Frequency of sand ripple ridges
#define SAND_RIDGE_AMP  1.2     // Max displacement above SAND_Y — actual geometry height
#define SAND_NOISE_SCALE 8.0    // High-frequency sand grain noise scale
#define SAND_NOISE_AMP  0.08    // Grain noise contribution to color
#define SAND_MARCH_STEPS 64     // Ray march steps to find sand surface
#define SAND_MARCH_FAR  15.0    // Max ray march distance for sand
#define SAND_FADE_START 12.0    // Distance where ridges start flattening
#define SAND_FADE_END   15.0    // Distance where sand is fully flat (no artifacts)

// -- Water surface (seen from below) --
#define SNELL_COS       0.6494  // cos(critical angle) = cos(48.6deg) for water (n=1.33)
                                // Below this: total internal reflection. Above: see through.
#define SURFACE_BRIGHT  vec3(0.6, 0.85, 1.0)    // Sky color seen through Snell's window
#define SURFACE_TIR     vec3(0.02, 0.06, 0.10)   // Total internal reflection color (dark blue-green)
#define SURFACE_RIPPLE_FREQ 4.0  // Surface ripple distortion frequency
#define SURFACE_RIPPLE_AMP  0.12 // Surface ripple distortion amplitude — higher = choppier waves
#define WAVE_SCALE_1    0.8     // Primary wave frequency (large swells)
#define WAVE_SCALE_2    1.7     // Secondary wave frequency (chop)
#define WAVE_SCALE_3    3.5     // Tertiary wave frequency (fine ripples)
#define WAVE_HEIGHT     0.25    // Combined wave amplitude for height field
#define WAVE_SPEED_1    0.6     // Large swell speed
#define WAVE_SPEED_2    0.9     // Chop speed
#define WAVE_SPEED_3    1.4     // Fine ripple speed
#define WAVE_LIGHT_STR  0.7     // Brightness of wave ridge lighting
#define WAVE_SPEC_POW   24.0    // Specular sharpness on wave crests
#define WAVE_SPEC_STR   0.6     // Specular intensity on wave crests

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
#define CAUSTIC_SURF_STR 1.2    // Caustic brightness on surface from below
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
// Sand height field — displaced geometry
// Returns height ABOVE SAND_Y. Mounds, ridges, and dunes
// that physically rise out of the floor like real sand.
//
// TECHNIQUE: Heightfield displacement
// FBM noise creates organic mounds at various scales.
// Sine waves add directional ripple ridges (from currents).
// The ray marcher intersects this surface as real geometry.
// -------------------------------------------------------
float sandHeight(vec2 xz)
{
    // Broad dunes — large mounds using FBM
    float dunes = fbm(xz * 0.6, 4);

    // Medium undulations — cross-wave pattern
    float med = sin(xz.x * 1.8 + xz.y * 0.7) * 0.5 + 0.5;
    med *= cos(xz.y * 1.4 - xz.x * 0.5) * 0.5 + 0.5;

    // Ripple ridges on top — smaller, tighter current lines
    float ridges = sin(xz.x * SAND_RIDGE_SCALE + xz.y * 1.2) * 0.5 + 0.5;

    // Combine: dunes dominate, medium adds variety, ridges add texture
    float h = dunes * 0.5 + med * 0.35 + ridges * 0.15;

    return h * SAND_RIDGE_AMP;
}

// -------------------------------------------------------
// Sand normal via finite differences on height field
// -------------------------------------------------------
vec3 sandNormal(vec2 xz)
{
    float e = 0.03;
    float hc = sandHeight(xz);
    float hx = sandHeight(xz + vec2(e, 0.0));
    float hz = sandHeight(xz + vec2(0.0, e));
    return normalize(vec3(hc - hx, e, hc - hz));
}

// -------------------------------------------------------
// Procedural sand color
// -------------------------------------------------------
vec3 sandColor(vec2 xz, float h)
{
    // Height drives color: raised areas lighter, flat areas darker
    float blend = clamp(h / SAND_RIDGE_AMP, 0.0, 1.0);

    // High-frequency grain
    float grain = fbm(xz * SAND_NOISE_SCALE, 4);

    vec3 col = mix(SAND_DARK, SAND_BASE, blend);
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
// Heightfield ray march for sand floor
// Marches the ray and checks when it dips below the
// displaced sand surface. Binary refines the hit point.
//
// TECHNIQUE: Heightfield ray marching
// Instead of intersecting a flat plane, we step along the
// ray checking if the y coordinate is below SAND_Y + sandHeight().
// When we cross the surface, we binary-search for the exact hit.
// This gives real curved geometry — dunes, mounds, ridges.
// -------------------------------------------------------
float sandMarch(vec3 ro, vec3 rd, out vec3 hitPos)
{
    // Start from flat plane hit as an optimization
    float tFlat = planeHit(ro, rd, SAND_Y + SAND_RIDGE_AMP);
    if (tFlat < 0.0) { hitPos = vec3(0.0); return -1.0; }

    float tStart = max(tFlat - 1.0, 0.01);  // back up a bit to not miss peaks
    float dt = SAND_MARCH_FAR / float(SAND_MARCH_STEPS);

    float tPrev = tStart;
    vec3 pPrev = ro + rd * tStart;
    // Fade height at distance to prevent horizon aliasing
    float fadePrev = 1.0 - smoothstep(SAND_FADE_START, SAND_FADE_END, tStart);
    float hPrev = pPrev.y - (SAND_Y + sandHeight(pPrev.xz) * fadePrev);

    for (int i = 0; i < 64; i++)
    {
        if (i >= SAND_MARCH_STEPS) break;
        float tc = tStart + dt * float(i + 1);
        vec3 pc = ro + rd * tc;

        // Ridges flatten toward the horizon — eliminates grazing-angle artifacts
        float fade = 1.0 - smoothstep(SAND_FADE_START, SAND_FADE_END, tc);
        float hc = pc.y - (SAND_Y + sandHeight(pc.xz) * fade);

        if (hc < 0.0)
        {
            // Crossed the surface — binary refine
            float ta = tPrev;
            float tb = tc;
            for (int j = 0; j < 6; j++)
            {
                float tm = (ta + tb) * 0.5;
                vec3 pm = ro + rd * tm;
                float fm = 1.0 - smoothstep(SAND_FADE_START, SAND_FADE_END, tm);
                float hm = pm.y - (SAND_Y + sandHeight(pm.xz) * fm);
                if (hm < 0.0) tb = tm;
                else ta = tm;
            }
            float tHit = (ta + tb) * 0.5;
            hitPos = ro + rd * tHit;
            return tHit;
        }

        tPrev = tc;
        pPrev = pc;
        hPrev = hc;
    }

    // No hit — fall back to flat plane
    float tFlatFallback = planeHit(ro, rd, SAND_Y);
    if (tFlatFallback > 0.0)
    {
        hitPos = ro + rd * tFlatFallback;
        return tFlatFallback;
    }

    hitPos = vec3(0.0);
    return -1.0;
}

// -------------------------------------------------------
// Wave height field — multi-octave Gerstner-style waves
// Three overlapping wave layers at different scales/directions
// create an organic, ocean-like surface seen from below.
// -------------------------------------------------------
float waveHeight(vec2 xz, float t)
{
    float h = 0.0;

    // Large swells — dominant wave pattern
    float t1 = t * WAVE_SPEED_1;
    h += sin(xz.x * WAVE_SCALE_1 + t1) * cos(xz.y * WAVE_SCALE_1 * 0.7 + t1 * 0.8) * 0.5;

    // Chop — cross-directional secondary waves
    float t2 = t * WAVE_SPEED_2;
    h += sin(xz.x * WAVE_SCALE_2 * 0.6 + xz.y * WAVE_SCALE_2 + t2) * 0.3;

    // Fine ripples — high frequency detail
    float t3 = t * WAVE_SPEED_3;
    h += sin(xz.x * WAVE_SCALE_3 + t3 * 1.1) * cos(xz.y * WAVE_SCALE_3 * 1.3 - t3) * 0.2;

    // Add noise for organic breakup
    h += (valueNoise(xz * 2.0 + t * 0.3) - 0.5) * 0.15;

    return h * WAVE_HEIGHT;
}

// -------------------------------------------------------
// Surface normal via finite differences on wave height
// Returns downward-facing normal (seen from below)
// -------------------------------------------------------
vec3 surfaceNormal(vec2 xz, float t)
{
    float e = 0.04;
    float hc = waveHeight(xz, t);
    float hx = waveHeight(xz + vec2(e, 0.0), t);
    float hz = waveHeight(xz + vec2(0.0, e), t);
    // Normal points down (-y) because we see the surface from below
    return normalize(vec3(hc - hx, -e, hc - hz));
}

// -------------------------------------------------------
// Caustic pattern — dual-layer wrapper around causticWarp
// (joltz0r / David Hoskins iterative domain warp)
//
// Returns combined brightness from two caustic layers at
// different UV scales, offset in time for parallax depth.
// -------------------------------------------------------
float causticPattern(vec2 uv, float t)
{
    float time = t * CAUSTIC_SPEED + CAUSTIC_OFFSET;
    float c1 = causticWarp(uv, CAUSTIC_SCALE_A, time, CAUSTIC_ITERS, CAUSTIC_INTEN);
    c1 = CAUSTIC_BASE - pow(max(c1, 0.0), CAUSTIC_POWER);
    c1 = pow(abs(c1), CAUSTIC_BRIGHT);

    float c2 = causticWarp(uv, CAUSTIC_SCALE_B, time + 7.0, CAUSTIC_ITERS, CAUSTIC_INTEN);
    c2 = CAUSTIC_BASE - pow(max(c2, 0.0), CAUSTIC_POWER);
    c2 = pow(abs(c2), CAUSTIC_BRIGHT);

    return c1 + c2 * CAUSTIC_MIX_B;
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float t = iTime;

    // TECHNIQUE: First-person underwater camera
    // We use the orbit camera common only for yaw/pitch state (mouse drag
    // with inertia + idle rotation). But we build the ray ourselves because
    // the orbit camera's spherical positioning breaks when y is overridden.
    // Here: yaw rotates horizontally, pitch tilts the view up/down directly.
    vec4 camState = texelFetch(iChannel0, ivec2(0, 0), 0);
    float yaw   = camState.x;
    float pitch = camState.y;

    // Camera position: fixed height, orbits horizontally at CAM_DIST
    vec3 ro = vec3(cos(yaw) * CAM_DIST, CAM_Y, sin(yaw) * CAM_DIST);

    // View direction: yaw rotates forward, pitch tilts up/down
    vec3 fwd = normalize(vec3(-cos(yaw), pitch * CAM_PITCH_UP, -sin(yaw)));
    vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, fwd);

    vec2 screenUV = (fragCoord * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
    vec3 rd = normalize(screenUV.x * right + screenUV.y * up + fwd * CAM_FOV);

    // Start with deep water background
    vec3 col = WATER_SCATTER;

    // Surface plane intersection (flat — waves are shading only)
    float tSurface = planeHit(ro, rd, SURFACE_Y);

    // Sand heightfield ray march — real displaced geometry
    vec3 sandHitPos;
    float tSand = sandMarch(ro, rd, sandHitPos);

    // Determine which surface is closer
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
        vec3 p = sandHitPos;

        // Normal from displaced heightfield
        vec3 n = sandNormal(p.xz);

        // Color based on local height
        float localH = sandHeight(p.xz);
        col = sandColor(p.xz, localH);

        // Diffuse lighting
        float diff = max(dot(n, LIGHT_DIR), 0.0);
        col *= AMBIENT + DIFFUSE_STR * diff;

        // Caustic light projected from the surface onto the sand
        // TECHNIQUE: Same causticWarp produces the "shadow" pattern —
        // bright convergence lines where sunlight focuses through waves.
        // Attenuated by water depth between surface and sand.
        float depthAboveSand = SURFACE_Y - p.y;
        float depthFade = exp(-depthAboveSand * 0.15);
        float caustic = causticPattern(p.xz, t);
        col += CAUSTIC_COL * caustic * CAUSTIC_SAND_STR * depthFade;
    }
    else if (hitSurface)
    {
        vec3 p = ro + rd * tHit;

        // TECHNIQUE: 3D wave surface seen from below
        // The surface normal comes from a multi-octave wave height field
        // (finite differences), giving visible ridges and valleys.
        vec3 surfN = surfaceNormal(p.xz, t);
        float cosAngle = abs(dot(rd, surfN));

        // TECHNIQUE: Snell's window (total internal reflection from below)
        // Looking up from underwater, you can only see through the surface
        // within the critical angle (~48.6 deg for water, n=1.33).
        // Outside this cone: total internal reflection — you see the
        // underwater scene mirrored. Inside: you see the bright sky.
        float snellMask = smoothstep(SNELL_COS - 0.08, SNELL_COS + 0.08, cosAngle);

        // Inside window: bright sky. Outside: dark TIR reflection.
        col = mix(SURFACE_TIR, SURFACE_BRIGHT, snellMask);

        // Wave ridge lighting — diffuse from sun refracted through the surface
        // Makes wave crests and troughs visible as light/dark undulations
        float waveDiff = max(dot(surfN, -LIGHT_DIR), 0.0);
        col += vec3(0.08, 0.18, 0.25) * waveDiff * WAVE_LIGHT_STR;

        // Specular highlights on wave crests — bright sun glints
        vec3 halfVec = normalize(-LIGHT_DIR - rd);
        float waveSpec = pow(max(dot(surfN, halfVec), 0.0), WAVE_SPEC_POW);
        col += vec3(0.9, 0.95, 1.0) * waveSpec * WAVE_SPEC_STR * snellMask;

        // Fresnel brightening near the edge of Snell's window
        float fresnelEdge = pow(max(1.0 - cosAngle, 0.0), 3.0);
        col += vec3(0.05, 0.12, 0.18) * fresnelEdge;

        // Caustic pattern visible on the surface from below
        // Same pattern as on sand — seen at the source of the refraction
        // Strongest inside Snell's window, but partially visible in TIR zone too
        float surfCaustic = causticPattern(p.xz, t);
        float causticMask = mix(0.3, 1.0, snellMask);  // 30% bleed into TIR
        col += CAUSTIC_COL * surfCaustic * CAUSTIC_SURF_STR * causticMask;
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
