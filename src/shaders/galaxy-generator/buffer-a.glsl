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

// ─────────────────────────────────────────────────────────────────────────────
// PSEUDO-RANDOM NUMBER GENERATION
// ─────────────────────────────────────────────────────────────────────────────

/** PCG hash function: uint → uint (deterministic, good distribution) */
uint pcgHash(uint x) {
  uint state = x * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

/** Float from [0, 1) using PCG hash */
float hash(uint seed) {
  return float(pcgHash(seed)) * (1.0 / 4294967296.0);
}

/** Seeded random in range [a, b) */
float hashRange(uint seed, float a, float b) {
  return a + hash(seed) * (b - a);
}

/** 2D hash from two seeds */
vec2 hash2(uint seed) {
  uint h0 = pcgHash(seed);
  uint h1 = pcgHash(h0 + 1u);
  return vec2(float(h0) / 4294967296.0, float(h1) / 4294967296.0);
}

// Stub: output white canvas
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  fragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
