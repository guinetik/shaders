/**
 * Galaxy Generator — Image Compositor
 * @author guinetik
 * @date 2026-03-05
 *
 * Displays the 3×3 galaxy grid from buffer-a.
 */

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  // Sample buffer and display
  vec3 col = texture(iChannel0, fragCoord / iResolution.xy).rgb;
  fragColor = vec4(col, 1.0);
}
