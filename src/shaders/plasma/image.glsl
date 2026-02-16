/**
 * Perlin Plasma Study
 * @author guinetik
 * @date 2026-01-30
 *
 * Classic demoscene plasma enhanced with 3D Perlin gradient noise
 * for organic turbulence. Multiple sine wave interference patterns
 * warped through FBM noise create flowing psychedelic color fields.
 *
 * Noise: Uses noise-perlin.glsl commons (Perlin gradient noise with
 * quintic C2 interpolation). FBM with 5 octaves, lacunarity 2.0,
 * gain 0.5 for natural 1/f turbulence.
 *
 * Commons: noise-perlin.glsl
 *
 * Plasma Techniques:
 * - True 3D Perlin gradient noise (via commons)
 * - Classic demoscene sine plasma
 * - Noise-warped interference patterns
 *
 * Visual Features:
 * - Organic flowing color fields
 * - Smoother gradients than value noise
 * - Blends with input texture
 */

#define PI 3.14159265359
#define TAU 6.28318530718

// --- Plasma sine wave frequencies ---
// Control the spatial frequency of each sine layer.
// Higher values = tighter wave patterns; lower = broader undulations.
#define PLASMA_FREQ_X 3.0        // Horizontal sine frequency
#define PLASMA_FREQ_Y 2.7        // Vertical sine frequency
#define PLASMA_FREQ_DIAG 2.5     // Diagonal (x+y) sine frequency
#define PLASMA_FREQ_RADIAL 4.0   // Radial distance sine frequency
#define PLASMA_FREQ_RIPPLE 5.0   // Moving center ripple frequency

// --- Plasma time multipliers ---
// Control how fast each sine layer animates.
// Higher = faster movement; mismatched values prevent repetition.
#define PLASMA_TIME_X 1.0        // Horizontal layer time speed
#define PLASMA_TIME_Y 1.3        // Vertical layer time speed
#define PLASMA_TIME_DIAG 0.7     // Diagonal layer time speed
#define PLASMA_TIME_RADIAL 1.5   // Radial layer time speed (subtracted)
#define PLASMA_TIME_CENTER 0.5   // Center orbit X speed
#define PLASMA_TIME_CENTER_Y 0.7 // Center orbit Y speed

// --- Perlin noise scales and time speeds ---
// Control the spatial scale and animation speed of noise layers.
// Larger scale = zoomed out (broader features); faster time = more motion.
#define NOISE_SCALE_PRIMARY 1.5    // Spatial scale for primary Perlin layer
#define NOISE_TIME_PRIMARY 0.4     // Time speed for primary Perlin layer
#define NOISE_SCALE_FBM 0.8        // Spatial scale for FBM turbulence layer
#define NOISE_TIME_FBM 0.3         // Time speed for FBM turbulence layer
#define NOISE_SCALE_WARP 2.0       // Spatial scale for coordinate warp noise
#define NOISE_TIME_WARP 0.25       // Time speed for coordinate warp noise
#define NOISE_SCALE_DETAIL 4.0     // Spatial scale for high-frequency detail layer
#define NOISE_TIME_DETAIL 0.6      // Time speed for detail layer

// --- Warp intensity ---
// How strongly Perlin noise distorts the plasma coordinates.
// 0.0 = no warp; 0.3 = moderate organic distortion; above 0.5 = chaotic.
#define WARP_INTENSITY 0.3

// --- Scanlines ---
// CRT-style horizontal scanline overlay.
// Higher frequency = thinner lines; higher strength = more visible.
#define SCANLINE_FREQUENCY 400.0  // Lines per screen height — 400 gives subtle CRT feel
#define SCANLINE_STRENGTH 0.03    // Brightness reduction per line — keep under 0.05 to stay subtle

// --- Palette cycle speed ---
// How fast the shader cycles between the three color palettes.
// Lower = longer time per palette; 0.1 gives ~10s per palette.
#define PALETTE_CYCLE_SPEED 0.1

// --- Texture overlay blend ---
// Blend factor for the overlay blending with iChannel0 texture.
// 0.0 = pure texture; 1.0 = pure overlay; 0.6 = balanced plasma tint.
#define TEXTURE_BLEND 0.6

// --- Vignette ---
// Darkening at screen edges. Controls the radius-to-darkening multiplier.
// 0.0 = no vignette; 0.5 = moderate; 1.0 = strong tunnel effect.
#define VIGNETTE_STRENGTH 0.5

/**
 * Classic plasma + Perlin turbulence
 */
float plasma(vec2 p, float time) {
    float v = 0.0;

    // Classic sine waves
    v += sin(p.x * PLASMA_FREQ_X + time * PLASMA_TIME_X);
    v += sin(p.y * PLASMA_FREQ_Y + time * PLASMA_TIME_Y);
    v += sin((p.x + p.y) * PLASMA_FREQ_DIAG + time * PLASMA_TIME_DIAG);
    v += sin(length(p) * PLASMA_FREQ_RADIAL - time * PLASMA_TIME_RADIAL);

    // Moving center ripple
    vec2 center = vec2(sin(time * PLASMA_TIME_CENTER), cos(time * PLASMA_TIME_CENTER_Y)) * 0.5;
    v += sin(length(p - center) * PLASMA_FREQ_RIPPLE + time);

    // ADD PERLIN: 3D noise traveling through time
    vec3 noiseCoord = vec3(p * NOISE_SCALE_PRIMARY, time * NOISE_TIME_PRIMARY);
    v += perlinNoise3D(noiseCoord) * 2.0;

    // ADD PERLIN: Turbulent FBM layer
    v += perlinFbm(vec3(p * NOISE_SCALE_FBM, time * NOISE_TIME_FBM), 5, 2.0, 0.5) * 1.5;

    return v / 7.0;
}

/**
 * Perlin-warped coordinates
 * Distorts the plasma field organically
 */
vec2 perlinWarp(vec2 p, float time) {
    vec3 np = vec3(p * NOISE_SCALE_WARP, time * NOISE_TIME_WARP);

    return p + vec2(
        perlinNoise3D(np),
        perlinNoise3D(np + vec3(5.2, 1.3, 2.7))
    ) * WARP_INTENSITY;
}

/**
 * Psychedelic rainbow palette
 */
vec3 plasmaColor(float v, float time) {
    return vec3(
        sin(v * PI + time * 0.5),
        sin(v * PI + time * 0.5 + TAU / 3.0),
        sin(v * PI + time * 0.5 + TAU * 2.0 / 3.0)
    ) * 0.5 + 0.5;
}

/**
 * Hot plasma palette
 */
vec3 hotPlasma(float v) {
    v = v * 0.5 + 0.5;
    vec3 color = mix(vec3(0.0, 0.0, 0.2), vec3(0.5, 0.0, 0.5), smoothstep(0.0, 0.25, v));
    color = mix(color, vec3(1.0, 0.2, 0.0), smoothstep(0.25, 0.5, v));
    color = mix(color, vec3(1.0, 0.8, 0.0), smoothstep(0.5, 0.75, v));
    color = mix(color, vec3(1.0, 1.0, 0.9), smoothstep(0.75, 1.0, v));
    return color;
}

/**
 * Electric palette
 */
vec3 electricPlasma(float v, float time) {
    v = v * 0.5 + 0.5;
    vec3 c1 = vec3(0.0, 0.1, 0.2);
    vec3 c2 = vec3(0.0, 0.5, 0.8);
    vec3 c3 = vec3(0.8, 0.2, 0.8);
    vec3 c4 = vec3(1.0, 1.0, 1.0);

    vec3 color = mix(c1, c2, smoothstep(0.0, 0.33, v));
    color = mix(color, c3, smoothstep(0.33, 0.66, v));
    color = mix(color, c4, smoothstep(0.66, 1.0, v));
    color *= 0.8 + 0.2 * sin(v * 10.0 + time * 2.0);
    return color;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;
    float time = iTime;

    // Centered aspect-corrected
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;

    // === PERLIN WARP THE COORDINATES ===
    vec2 warped = perlinWarp(p, time);

    // === GENERATE PLASMA ===
    float v1 = plasma(warped, time);
    float v2 = plasma(warped * 0.7 + 10.0, time * 0.8);
    float combined = v1 * 0.6 + v2 * 0.4;

    // === EXTRA PERLIN DETAIL ===
    // High-frequency Perlin adds fine organic texture
    float detail = perlinNoise3D(vec3(warped * NOISE_SCALE_DETAIL, time * NOISE_TIME_DETAIL)) * 0.15;
    combined += detail;

    // === COLOR ===
    float paletteTime = mod(time * PALETTE_CYCLE_SPEED, 3.0);
    vec3 plasmaCol;

    if (paletteTime < 1.0) {
        plasmaCol = plasmaColor(combined, time);
    } else if (paletteTime < 2.0) {
        plasmaCol = hotPlasma(combined);
    } else {
        plasmaCol = electricPlasma(combined, time);
    }

    // === BLEND WITH TEXTURE ===
    vec3 texColor = texture(iChannel0, uv).rgb;
    vec3 color;

    if (length(texColor) > 0.01) {
        vec3 overlay = mix(
            2.0 * texColor * plasmaCol,
            1.0 - 2.0 * (1.0 - texColor) * (1.0 - plasmaCol),
            step(0.5, texColor)
        );
        color = mix(texColor, overlay, TEXTURE_BLEND);
    } else {
        color = plasmaCol;
    }

    // === SCANLINES ===
    float scanline = sin(uv.y * SCANLINE_FREQUENCY) * SCANLINE_STRENGTH;
    color -= scanline;

    // === POST ===
    color += plasmaCol * 0.1;
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;
    color *= vig;

    // === GAMMA CORRECTION ===
    // Convert from linear working space to sRGB for display
    color = pow(max(color, vec3(0.0)), vec3(0.45));

    fragColor = vec4(color, 1.0);
}
