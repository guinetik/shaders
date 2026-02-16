/**
 * Smooth Waves Study
 * @author guinetik
 * @date 2026-01-29
 *
 * Dali-inspired liquid surface with layered sine waves, center ripple
 * source, corner-based interference patterns, and heat shimmer.
 * The three wave layers approximate a real ocean wave spectrum: long swell,
 * medium chop, and fine surface ripples. Concentric ripples radiate from a
 * drifting center point while four corner sources create an interference grid.
 * A horizontal heat-shimmer pass adds convection-like jitter.
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

// --- Wave Layer 1: large swell (longest wavelength, biggest amplitude) ---
#define SWELL_FREQ_X 4.0       // Primary Y-axis frequency — lower = wider swells
#define SWELL_FREQ_Y 2.0       // Cross-term X frequency for diagonal tilt
#define SWELL_CROSS_FREQ_X 3.0 // Primary X-axis frequency for vertical offset
#define SWELL_CROSS_FREQ_Y 2.0 // Cross-term Y frequency for diagonal tilt
#define SWELL_AMPLITUDE 0.03   // Peak displacement — above 0.05 tears the image apart
#define SWELL_SPEED_X 1.2      // Horizontal phase speed — keep close to 1.0 for gentle rolling
#define SWELL_SPEED_Y 1.0      // Vertical phase speed

// --- Wave Layer 2: medium chop ---
#define CHOP_FREQ_X 8.0        // Y-axis frequency — ~2x swell for visible mid-band detail
#define CHOP_FREQ_Y 6.0        // X-axis frequency
#define CHOP_AMPLITUDE_X 0.015 // Horizontal displacement — half of swell amplitude
#define CHOP_AMPLITUDE_Y 0.02  // Vertical displacement — slightly stronger for asymmetry
#define CHOP_SPEED_X 1.8       // Faster than swell to differentiate motion bands
#define CHOP_SPEED_Y 1.5       // Slightly slower vertical phase

// --- Wave Layer 3: surface ripples (highest frequency, lowest amplitude) ---
#define RIPPLE_FREQ_X 15.0     // Y-axis frequency — ~4x swell; fine texture detail
#define RIPPLE_CROSS_X 10.0    // Cross-term X frequency
#define RIPPLE_FREQ_Y 12.0     // X-axis frequency
#define RIPPLE_CROSS_Y 8.0     // Cross-term Y frequency
#define RIPPLE_AMPLITUDE 0.008 // Very small — just enough to add sparkle. Above 0.015 looks noisy
#define RIPPLE_SPEED_X 3.0     // Fast phase speed — gives quick shimmering motion
#define RIPPLE_SPEED_Y 2.5     // Slightly slower to avoid uniform crawl

// --- Ripple source (concentric rings from drifting center) ---
#define RIPPLE_SRC_FREQ 30.0   // Radial ring frequency — higher = tighter rings. Above 50 aliases
#define RIPPLE_SRC_SPEED 4.0   // Outward propagation speed — higher = faster expansion
#define RIPPLE_SRC_AMP 0.02    // Ring displacement strength — above 0.04 causes visible tearing
#define RIPPLE_SRC_DECAY 0.8   // Fade-out radius — rings vanish beyond this distance from center
#define RIPPLE_SRC_DRIFT_X 0.3 // Center horizontal drift frequency — keeps the source moving
#define RIPPLE_SRC_DRIFT_AMP_X 0.1 // Horizontal drift amplitude (fraction of screen)
#define RIPPLE_SRC_DRIFT_Y 0.4 // Center vertical drift frequency
#define RIPPLE_SRC_DRIFT_AMP_Y 0.1 // Vertical drift amplitude

// --- Interference pattern (four corner wave sources) ---
#define INTERF_FREQ 20.0       // Radial frequency per source — higher = denser grid. Above 30 aliases
#define INTERF_SPEED 3.0       // Phase speed — higher = faster pattern crawl
#define INTERF_AMPLITUDE 0.01  // Per-source displacement — keep small; 4 sources accumulate

// --- Shimmer (horizontal heat-haze jitter) ---
#define SHIMMER_FREQ_A 40.0    // Primary vertical frequency — sets shimmer band width
#define SHIMMER_FREQ_B 80.0    // Secondary frequency (2x) — adds fine-grain jitter
#define SHIMMER_AMP_A 0.003    // Primary amplitude — visible wobble. Above 0.005 looks glitchy
#define SHIMMER_AMP_B 0.001    // Secondary amplitude — subtle detail layer
#define SHIMMER_SPEED_A 5.0    // Primary phase speed — fast for heat-convection look
#define SHIMMER_SPEED_B 8.0    // Secondary speed — faster to decorrelate from primary
#define SHIMMER_MASK_LO 0.3    // Lower fade-in (screen Y fraction) — shimmer fades near bottom
#define SHIMMER_MASK_HI 0.7    // Upper fade-out (screen Y fraction) — shimmer fades near top

// --- Post-processing ---
#define DISP_HIGHLIGHT_SCALE 20.0 // Displacement-to-brightness multiplier — higher = brighter edges
#define DISP_HIGHLIGHT_MIX 0.3    // Brightness boost strength — above 0.5 washes out darks
#define VIGNETTE_STRENGTH 0.4     // Edge darkening — higher = darker corners. 0.0 disables

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
    offset.x += sin(uv.y * SWELL_FREQ_X + uv.x * SWELL_FREQ_Y + time * SWELL_SPEED_X) * SWELL_AMPLITUDE;
    offset.y += cos(uv.x * SWELL_CROSS_FREQ_X + uv.y * SWELL_CROSS_FREQ_Y + time * SWELL_SPEED_Y) * SWELL_AMPLITUDE;

    // Layer 2: Medium flowing waves (2x frequency, ~half amplitude)
    offset.x += sin(uv.y * CHOP_FREQ_X + time * CHOP_SPEED_X) * CHOP_AMPLITUDE_X;
    offset.y += cos(uv.x * CHOP_FREQ_Y + time * CHOP_SPEED_Y) * CHOP_AMPLITUDE_Y;

    // Layer 3: Small fast ripples (~4x frequency, ~quarter amplitude)
    offset.x += sin(uv.y * RIPPLE_FREQ_X + uv.x * RIPPLE_CROSS_X + time * RIPPLE_SPEED_X) * RIPPLE_AMPLITUDE;
    offset.y += sin(uv.x * RIPPLE_FREQ_Y + uv.y * RIPPLE_CROSS_Y + time * RIPPLE_SPEED_Y) * RIPPLE_AMPLITUDE;

    return uv + offset * intensity;
}

/**
 * Concentric ripple from center
 * Radial sine waves propagate outward from a given center point,
 * fading with distance via smoothstep decay.
 */
vec2 rippleDistort(vec2 uv, vec2 center, float time, float intensity) {
    vec2 delta = uv - center;
    float dist = length(delta);

    // Outward propagating ripples
    float ripple = sin(dist * RIPPLE_SRC_FREQ - time * RIPPLE_SRC_SPEED) * RIPPLE_SRC_AMP;

    // Fade with distance
    ripple *= smoothstep(RIPPLE_SRC_DECAY, 0.0, dist);

    return uv + normalize(delta + 0.001) * ripple * intensity;
}

/**
 * Interference pattern from multiple wave sources
 * Four corner sources each emit concentric waves; their superposition
 * creates a grid-like interference pattern across the surface.
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
        float wave = sin(dist * INTERF_FREQ - time * INTERF_SPEED + float(i) * 1.5);
        offset += normalize(delta + 0.001) * wave * INTERF_AMPLITUDE;
    }

    return uv + offset * intensity;
}

/**
 * Horizontal heat shimmer effect
 * Two high-frequency sine layers (40 Hz, 80 Hz) create the jittery
 * horizontal displacement characteristic of heat convection.
 * A vertical mask confines the effect to the middle band of the screen.
 */
vec2 shimmerDistort(vec2 uv, float time, float intensity) {
    float shimmer = sin(uv.y * SHIMMER_FREQ_A + time * SHIMMER_SPEED_A) * SHIMMER_AMP_A;  // primary shimmer
    shimmer += sin(uv.y * SHIMMER_FREQ_B + time * SHIMMER_SPEED_B) * SHIMMER_AMP_B;        // fine detail at 2x freq

    // Stronger in middle, fade at edges
    float mask = smoothstep(0.0, SHIMMER_MASK_LO, uv.y) * smoothstep(1.0, SHIMMER_MASK_HI, uv.y);

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

    // Center ripple with drifting source point
    vec2 center = vec2(
        0.5 + sin(time * RIPPLE_SRC_DRIFT_X) * RIPPLE_SRC_DRIFT_AMP_X,
        0.5 + cos(time * RIPPLE_SRC_DRIFT_Y) * RIPPLE_SRC_DRIFT_AMP_Y
    );
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
    float displacement = length(warped - uv) * DISP_HIGHLIGHT_SCALE;
    color *= 1.0 + displacement * DISP_HIGHLIGHT_MIX;

    // === POST ===
    // Soft vignette
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;
    color *= vig;

    // Gamma correction (linear → sRGB)
    color = pow(max(color, vec3(0.0)), vec3(0.45));

    fragColor = vec4(color, 1.0);
}
