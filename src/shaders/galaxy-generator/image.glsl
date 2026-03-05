/**
 * Galaxy Generator — Image Compositor
 * @author guinetik
 * @date 2026-03-05
 *
 * Samples the 3×3 galaxy grid from buffer-a.
 * Applies gamma correction as final output step.
 */

#define GAMMA 0.45                  // ~1/2.2, standard sRGB gamma

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 col = texture(iChannel0, fragCoord / iResolution.xy).rgb;

  // Gamma correction (linear → sRGB)
  col = pow(max(col, vec3(0.0)), vec3(GAMMA));

  fragColor = vec4(col, 1.0);
}
