/**
 * Galaxy Generator — Grid Layout
 * @author guinetik
 * @date 2026-03-05
 *
 * Renders a 3×3 grid of galaxies, cycling through 5 types.
 * Uses galaxy.glsl library for polymorphic rendering.
 * Each galaxy has randomized rotation angles.
 */

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** Simple hash for pseudo-random numbers */
float hash(uint x) {
  x = ((x >> 16) ^ x) * 0x7feb352du;
  x = ((x >> 15) ^ x) * 0x846ca68bu;
  return float((x >> 16) ^ x) / 4294967296.0;
}

/** Hash with seed */
float hashSeed(uint seed, uint offset) {
  return hash(seed + offset);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 col = vec3(0.0);

  // 3×3 grid layout
  int typeIndex = 0;
  for (int y = 0; y < 3; y++) {
    for (int x = 0; x < 3; x++) {
      // Grid cell center
      vec2 cellCenter = vec2(
        (float(x) + 0.5) * iResolution.x / 3.0,
        (float(y) + 0.5) * iResolution.y / 3.0
      );

      // Create galaxy for this cell
      Galaxy g;
      g.type = typeIndex % 5;  // Cycle through 5 types
      uint cycleSeed = uint(int(iTime / 7.0)) * 12345u + uint(typeIndex);
      g.seed = cycleSeed;
      g.center = cellCenter;
      g.scale = 1.0;

      // Randomized rotation angles (change every 7 seconds)
      g.angleX = hashSeed(cycleSeed, 1u) * 6.28318;
      g.angleY = hashSeed(cycleSeed, 2u) * 6.28318;
      g.angleZ = hashSeed(cycleSeed, 3u) * 6.28318;

      // Randomized color (change every 7 seconds)
      g.color = vec3(
        hashSeed(cycleSeed, 4u),
        hashSeed(cycleSeed, 5u),
        hashSeed(cycleSeed, 6u)
      );

      // Render and composite
      col += renderGalaxy(g, fragCoord);

      typeIndex++;
    }
  }

  fragColor = vec4(col, 1.0);
}
