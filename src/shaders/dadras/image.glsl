/**
 * Attractor Study #01: Dadras — Image Pass
 * @author guinetik
 * @date 2026-02-10
 *
 * Composite pass for the Dadras attractor. Reads the accumulated trail from
 * Buffer A, applies filmic tone-mapping and a soft vignette for final display.
 */

// TECHNIQUE: Filmic tone-mapping via exponential exposure
// The formula col = 1 - exp(-col * EXPOSURE) compresses HDR accumulation
// from the buffer into displayable [0,1] range while preserving bright detail.
#define EXPOSURE 2.5        // Tone-map strength — higher values brighten midtones
                            // and compress highlights. Below 1.0: dim/flat. Above 4.0: washed out.
#define VIGNETTE_STRENGTH 0.3  // Darkening at screen edges — 0.0 = none, 0.5 = heavy.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec3 col = texture(iChannel0, uv).rgb;
    col = 1.0 - exp(-col * EXPOSURE);
    float vig = 1.0 - VIGNETTE_STRENGTH * length(uv - 0.5);
    col *= vig;
    fragColor = vec4(col, 1.0);
}
