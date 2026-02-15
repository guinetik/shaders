/**
 * Caustic Study #01: Simple
 *
 * Animated caustic light patterns refracting an input texture.
 * The water surface displaces UV sampling (chromatic aberration
 * per-channel), and caustic intensity brightens the displaced
 * image — so light and texture interact naturally.
 *
 * Caustic pattern: joltz0r / David Hoskins iterative domain warp.
 *
 * Based on the water turbulence effect by joltz0r,
 * made tileable by David Hoskins.
 */

// -- Math --
#define TAU             6.28318530718

// -- Animation --
#define TIME_SCALE      0.5
#define TIME_OFFSET     23.0

// -- Caustic pattern --
#define WARP_ITERATIONS 5
#define INTENSITY       0.005
#define CAUSTIC_POWER   1.4
#define CAUSTIC_BASE    1.17
#define BRIGHT_POWER    8.0

// -- Dual caustic layers --
#define CAUSTIC_SCALE_A 2.5
#define CAUSTIC_SCALE_B 1.5
#define CAUSTIC_MIX_B   0.4

// -- Water distortion (uses same time base as caustics) --
#define DISTORT_STR     0.008
#define DISTORT_FREQ    3.0
#define CHROMA_SPREAD   0.001

// -- Water / depth --
#define POOL_BLUE       vec3(0.3, 0.7, 1.0)
#define CAUSTIC_COL     vec3(0.95, 0.98, 1.0)
#define CAUSTIC_ADD     0.8
#define VIGNETTE_STR    0.35

// -------------------------------------------------------
// Caustic pattern (joltz0r / David Hoskins)
// -------------------------------------------------------
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
// Returns a 2D offset for UV distortion
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
