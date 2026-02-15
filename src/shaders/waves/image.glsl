/**
 * Smooth Waves Study
 * @author guinetik
 * @date 2026-01-29
 *
 * Dali-inspired liquid surface with layered sine waves, center ripple
 * source, corner-based interference patterns, and heat shimmer.
 *
 * Wave Distortion Techniques:
 * - Layered sine waves (Dali-inspired liquid)
 * - Diagonal wave interference
 * - Ripple propagation patterns
 *
 * Visual Features:
 * - Multiple wave frequencies blend
 * - Smooth flowing animation
 * - Colors sampled from warped texture
 */

#define PI 3.14159265359
#define TAU 6.28318530718

/**
 * Layered wave distortion
 * Three frequency bands mimic real water wave spectra:
 *   Layer 1 (4-3 Hz):  large swell — slow, high amplitude, diagonal
 *   Layer 2 (8-6 Hz):  medium chop — moderate speed & amplitude
 *   Layer 3 (15-12 Hz): surface ripples — fast, low amplitude
 * Diagonal cross-terms (uv.y*freq + uv.x*freq) create wave interference.
 */
vec2 waveDistort(vec2 uv, float time, float intensity) {
    vec2 offset = vec2(0.0);

    // Layer 1: Large slow diagonal waves (longest wavelength, biggest amplitude)
    offset.x += sin(uv.y * 4.0 + uv.x * 2.0 + time * 1.2) * 0.03;
    offset.y += cos(uv.x * 3.0 + uv.y * 2.0 + time * 1.0) * 0.03;

    // Layer 2: Medium flowing waves (2x frequency, ~half amplitude)
    offset.x += sin(uv.y * 8.0 + time * 1.8) * 0.015;
    offset.y += cos(uv.x * 6.0 + time * 1.5) * 0.02;

    // Layer 3: Small fast ripples (~4x frequency, ~quarter amplitude)
    offset.x += sin(uv.y * 15.0 + uv.x * 10.0 + time * 3.0) * 0.008;
    offset.y += sin(uv.x * 12.0 + uv.y * 8.0 + time * 2.5) * 0.008;

    return uv + offset * intensity;
}

/**
 * Concentric ripple from center
 */
vec2 rippleDistort(vec2 uv, vec2 center, float time, float intensity) {
    vec2 delta = uv - center;
    float dist = length(delta);

    // Outward propagating ripples
    float ripple = sin(dist * 30.0 - time * 4.0) * 0.02;

    // Fade with distance
    ripple *= smoothstep(0.8, 0.0, dist);

    return uv + normalize(delta + 0.001) * ripple * intensity;
}

/**
 * Interference pattern from multiple wave sources
 */
vec2 interferenceDistort(vec2 uv, float time, float intensity) {
    vec2 offset = vec2(0.0);

    // Four wave sources at corners
    vec2 sources[4];
    sources[0] = vec2(0.0, 0.0);
    sources[1] = vec2(1.0, 0.0);
    sources[2] = vec2(0.0, 1.0);
    sources[3] = vec2(1.0, 1.0);

    for (int i = 0; i < 4; i++) {
        vec2 delta = uv - sources[i];
        float dist = length(delta);
        float wave = sin(dist * 20.0 - time * 3.0 + float(i) * 1.5);
        offset += normalize(delta + 0.001) * wave * 0.01;
    }

    return uv + offset * intensity;
}

/**
 * Horizontal heat shimmer effect
 * Two high-frequency sine layers (40 Hz, 80 Hz) create the jittery
 * horizontal displacement characteristic of heat convection.
 */
vec2 shimmerDistort(vec2 uv, float time, float intensity) {
    float shimmer = sin(uv.y * 40.0 + time * 5.0) * 0.003;  // primary shimmer
    shimmer += sin(uv.y * 80.0 + time * 8.0) * 0.001;        // fine detail at 2x freq

    // Stronger in middle, fade at edges
    float mask = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);

    return uv + vec2(shimmer * mask * intensity, 0.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    float time = iTime;

    // === COMBINE WAVE EFFECTS ===
    vec2 warped = uv;

    // Main layered waves
    warped = waveDistort(warped, time, 1.0);

    // Center ripple
    vec2 center = vec2(0.5 + sin(time * 0.3) * 0.1, 0.5 + cos(time * 0.4) * 0.1);
    warped = rippleDistort(warped, center, time, 0.6);

    // Interference pattern
    warped = interferenceDistort(warped, time * 0.7, 0.4);

    // Heat shimmer
    warped = shimmerDistort(warped, time, 0.5);

    // === SAMPLE TEXTURE ===
    vec3 color = vec3(0.0);

    // Clamp to valid UV range
    vec2 safeUV = clamp(warped, 0.001, 0.999);
    color = texture(iChannel0, safeUV).rgb;

    // Fallback if no texture
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {
        // Colorful gradient fallback
        float dist = length(warped - 0.5);
        float angle = atan(warped.y - 0.5, warped.x - 0.5);

        color = vec3(
            0.5 + 0.5 * sin(angle * 3.0 + time),
            0.5 + 0.5 * sin(angle * 3.0 + time + TAU / 3.0),
            0.5 + 0.5 * sin(angle * 3.0 + time + TAU * 2.0 / 3.0)
        );
        color *= 0.8 + 0.2 * sin(dist * 20.0 - time * 2.0);
    }

    // === SUBTLE EDGE HIGHLIGHT ===
    // Show wave displacement as subtle brightness variation
    float displacement = length(warped - uv) * 20.0;
    color *= 1.0 + displacement * 0.3;

    // === POST ===
    // Soft vignette
    float vig = 1.0 - length(uv - 0.5) * 0.4;
    color *= vig;

    fragColor = vec4(color, 1.0);
}
