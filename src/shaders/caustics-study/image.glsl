/**
 * Caustic Study #01: Simple
 * @author guinetik
 * @date 2026-02-15
 *
 * Animated caustic light patterns refracting an input texture.
 * The water surface displaces UV sampling (chromatic aberration
 * per-channel), and caustic intensity brightens the displaced
 * image -- so light and texture interact naturally.
 *
 * TECHNIQUE: Iterative domain warping for caustics
 * Each iteration displaces UV coordinates with sin/cos feedback,
 * accumulating inverse distance to create bright convergence lines
 * mimicking refracted light on a pool floor. Two layers at different
 * scales are blended for depth and complexity.
 *
 * Caustic pattern: joltz0r / David Hoskins iterative domain warp.
 * Based on the water turbulence effect by joltz0r,
 * made tileable by David Hoskins.
 */

// -- Math --
#define TAU             6.28318530718

// -- Animation --
#define TIME_SCALE      0.5   // Global time multiplier — lower = slower ripple animation.
                              // 0.2 = very calm pool. 1.0+ = turbulent water.
#define TIME_OFFSET     23.0  // Time offset to avoid boring initial state at t=0.

// -- Caustic pattern --
#define WARP_ITERATIONS 5     // Domain warp iterations — more = sharper, more defined caustic lines.
                              // 3 = soft blobs. 5 = crisp caustics. 8+ = very sharp but expensive.
#define INTENSITY       0.005 // Inverse-distance sensitivity — smaller = tighter, brighter convergence lines.
#define CAUSTIC_POWER   1.4   // Power curve applied to raw caustic value — higher = more contrast.
#define CAUSTIC_BASE    1.17  // Base subtracted before power — shifts the brightness threshold.
                              // Values near 1.0 produce more visible caustic patterns.
#define BRIGHT_POWER    8.0   // Final brightness exponent — higher = caustic lines become thinner and brighter.
                              // 4 = broad glow. 8 = defined lines. 12+ = very thin, intense lines.

// -- Dual caustic layers --
#define CAUSTIC_SCALE_A 2.5   // UV scale for the primary caustic layer — larger = finer pattern.
#define CAUSTIC_SCALE_B 1.5   // UV scale for the secondary layer — offset in time for parallax depth.
#define CAUSTIC_MIX_B   0.4   // Blend weight of the second layer — 0 = single layer only, 1 = equal.

// -- Water distortion (uses same time base as caustics) --
#define DISTORT_STR     0.008 // UV displacement amplitude — how much the water surface warps the image.
                              // 0.005 = subtle shimmer. 0.02 = strong wavy distortion.
#define DISTORT_FREQ    3.0   // Frequency of the sinusoidal displacement field.
#define CHROMA_SPREAD   0.001 // Chromatic aberration offset between R/G/B channels.
                              // 0 = no aberration. 0.005+ = very visible color fringing.

// -- Water / depth --
#define POOL_BLUE       vec3(0.3, 0.7, 1.0)   // Tint color multiplied onto the texture — simulates water absorption.
#define CAUSTIC_COL     vec3(0.95, 0.98, 1.0)  // Color of the additive caustic highlights — near-white with slight blue.
#define CAUSTIC_ADD     0.8   // Additive intensity of caustic highlights — 0 = invisible, 1 = full brightness.
#define VIGNETTE_STR    0.35  // Radial darkening strength — simulates depth falloff at pool edges.
                              // 0 = no vignette. 0.5+ = strong edge darkening.

// -------------------------------------------------------
// Caustic pattern (joltz0r / David Hoskins)
// -------------------------------------------------------

// TECHNIQUE: Iterative domain warp caustics
// Starting from a TAU-scaled, tiled UV, each iteration displaces the
// coordinate using sin/cos of the running position plus time. The
// accumulator `c` sums inverse distances: where displaced coordinates
// nearly converge, c spikes, creating bright caustic lines.

float caustic(vec2 uv, float scale, float t)
{
    float time = t * TIME_SCALE + TIME_OFFSET;
    vec2 p = mod(uv * scale * TAU, TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;

    for (int n = 0; n < WARP_ITERATIONS; n++)
    {
        float tt = time * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(
            cos(tt - i.x) + sin(tt + i.y),
            sin(tt - i.y) + cos(tt + i.x)
        );
        c += 1.0 / length(vec2(
            p.x / (sin(i.x + tt) / INTENSITY),
            p.y / (cos(i.y + tt) / INTENSITY)
        ));
    }

    c /= float(WARP_ITERATIONS);
    c = CAUSTIC_BASE - pow(max(c, 0.0), CAUSTIC_POWER);
    return pow(abs(c), BRIGHT_POWER);
}

// -------------------------------------------------------
// Water surface displacement field
// Returns a 2D offset for UV distortion.
// Uses overlapping sin/cos waves at slightly different frequencies
// to approximate a rippling water surface.
// -------------------------------------------------------
vec2 waterDisplace(vec2 uv, float t)
{
    float tx = t * TIME_SCALE + TIME_OFFSET;
    return vec2(
        sin(uv.y * DISTORT_FREQ * TAU + tx * 1.1) +
        sin(uv.x * DISTORT_FREQ * 0.7 * TAU + tx * 0.9),
        cos(uv.x * DISTORT_FREQ * TAU + tx * 0.8) +
        cos(uv.y * DISTORT_FREQ * 0.6 * TAU + tx * 1.3)
    ) * DISTORT_STR;
}

// -------------------------------------------------------
// Vignette — radial darkening from center
// -------------------------------------------------------
float vignette(vec2 uv)
{
    vec2 q = uv * 2.0 - 1.0;
    return 1.0 - dot(q, q) * VIGNETTE_STR;
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    float t = iTime;

    // Water surface UV displacement
    vec2 disp = waterDisplace(uv, t);

    // Chromatic aberration: sample R/G/B at slightly offset UVs
    float r = texture(iChannel0, uv + disp + vec2( CHROMA_SPREAD, 0.0)).r;
    float g = texture(iChannel0, uv + disp).g;
    float b = texture(iChannel0, uv + disp + vec2(-CHROMA_SPREAD, CHROMA_SPREAD)).b;
    vec3 tex = vec3(r, g, b);

    // Tint texture with pool blue (multiply preserves detail, shifts hue)
    tex *= POOL_BLUE;

    // Two caustic layers at different scales
    float c1 = caustic(uv, CAUSTIC_SCALE_A, t);
    float c2 = caustic(uv, CAUSTIC_SCALE_B, t + 7.0);
    float c  = c1 + c2 * CAUSTIC_MIX_B;

    // Caustics: bright additive light on the dark floor
    vec3 col = tex + CAUSTIC_COL * c * CAUSTIC_ADD;

    // Depth vignette
    col *= clamp(vignette(uv), 0.0, 1.0);

    // Gamma correction
    col = pow(max(col, 0.0), vec3(0.45));

    fragColor = vec4(col, 1.0);
}
