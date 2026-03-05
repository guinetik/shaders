/**
 * Galaxy Generator — Particle Generation
 * @author guinetik
 * @date 2026-03-05
 *
 * Generates particle positions for galaxy types (spiral, barred, elliptical, irregular).
 * Runs once per preset cycle (iFrame == 0). Stores particles in texture rows.
 */

#define PRESET_DURATION 7.0
#define MAX_PARTICLES 15000

// Stub: output white canvas
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  fragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
