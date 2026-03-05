/**
 * Galaxy Generator — Image Renderer
 * @author guinetik
 * @date 2026-03-05
 *
 * Renders particles from buffer-a as a hybrid point/glow system.
 * Particles are classified as dust (points), stars (points), or bright (glows).
 * Colors follow realistic stellar hue gradients (core warm, arms blue, dust faint).
 */

#define PRESET_DURATION 7.0
#define MAX_PARTICLES 15000
#define PARTICLE_TEXTURE_WIDTH 2500

// Stub: output black canvas
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  fragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
