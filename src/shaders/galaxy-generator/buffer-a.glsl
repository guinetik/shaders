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
      g.type = typeIndex % 5;
      uint cycleSeed = uint(int(iTime / 7.0)) * 12345u + uint(typeIndex);
      g.seed = cycleSeed;
      g.center = cellCenter;
      g.scale = 1.0;

      // Rotation angles
      g.angleX = hashSeed(cycleSeed, 1u) * 6.28318;
      g.angleY = hashSeed(cycleSeed, 2u) * 6.28318;
      g.angleZ = hashSeed(cycleSeed, 3u) * 6.28318;

      // Color
      g.color = vec3(
        hashSeed(cycleSeed, 4u),
        hashSeed(cycleSeed, 5u),
        hashSeed(cycleSeed, 6u)
      );

      // Physical parameters (from DB schema)
      // axialRatio: b/a (0.3-1.0), default 0.7
      g.axialRatio = 0.3 + hashSeed(cycleSeed, 7u) * 0.7;

      // mass_log10: log stellar mass (9-12), default Milky Way ~10.5
      g.mass_log10 = 9.0 + hashSeed(cycleSeed, 8u) * 3.0;

      // velocity_kmps: CMB velocity (0-14000), default 3000-9000
      g.velocity_kmps = 3000.0 + hashSeed(cycleSeed, 9u) * 6000.0;

      // distance_mpc: distance (1-1000+), default 10-100
      g.distance_mpc = 10.0 + hashSeed(cycleSeed, 10u) * 90.0;

      // Render and composite
      col += renderGalaxy(g, fragCoord);

      typeIndex++;
    }
  }

  fragColor = vec4(col, 1.0);
}
