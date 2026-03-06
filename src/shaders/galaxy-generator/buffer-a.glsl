/**
 * Galaxy Generator — Grid Layout
 * @author guinetik
 * @date 2026-03-05
 *
 * Renders a 3x3 grid of galaxies, cycling through 5 types every 7 seconds.
 * Uses galaxy.glsl library for polymorphic ring-loop rendering.
 * Each galaxy gets randomized orientation, color, and physical params.
 */

#define GRID_COLS 3
#define GRID_ROWS 3
#define CYCLE_DURATION 7.0          // Seconds per galaxy set
#define GALAXY_FILL 0.35            // Galaxy radius as fraction of cell size

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Integer hash for deterministic pseudo-random numbers.
 * PCG-style — better distribution than sin-hash for seed-based generation.
 */
float _gridHash(uint x) {
  x = ((x >> 16u) ^ x) * 0x7feb352du;
  x = ((x >> 15u) ^ x) * 0x846ca68bu;
  return float((x >> 16u) ^ x) / 4294967296.0;
}

/** Hash with seed + offset for multiple independent random values */
float _gridHashSeed(uint seed, uint offset) {
  return _gridHash(seed + offset);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 col = vec3(0.0);

  // Grid cell dimensions
  vec2 cellSize = iResolution.xy / vec2(float(GRID_COLS), float(GRID_ROWS));
  float galaxyRadius = min(cellSize.x, cellSize.y) * GALAXY_FILL;

  int typeIndex = 0;
  for (int y = 0; y < GRID_ROWS; y++) {
    for (int x = 0; x < GRID_COLS; x++) {
      // Cell center in screen pixels
      vec2 cellCenter = vec2(
        (float(x) + 0.5) * cellSize.x,
        (float(y) + 0.5) * cellSize.y
      );

      // Early-out: skip if fragment is far from this galaxy
      if (length(fragCoord - cellCenter) > galaxyRadius * GAL_MAX_RADIUS) {
        typeIndex++;
        continue;
      }

      // Deterministic seed per galaxy per cycle
      uint cycleSeed = uint(int(iTime / CYCLE_DURATION)) * 12345u + uint(typeIndex);

      // Build Galaxy
      Galaxy g;
      g.type       = int(_gridHashSeed(cycleSeed, 50u) * 4.99);
      // Hash seed to small float — large floats degrade sin-hash precision
      g.seed       = _gridHash(cycleSeed) * 999.0 + 1.0;
      g.center     = cellCenter;
      g.scale      = galaxyRadius;
      g.time       = iTime;

      // Orientation
      g.angleX     = _gridHashSeed(cycleSeed, 1u) * _GAL_TAU;
      g.angleY     = _gridHashSeed(cycleSeed, 2u) * _GAL_TAU;
      g.angleZ     = _gridHashSeed(cycleSeed, 3u) * _GAL_TAU;

      // Color tint — vibrant HSL palette, every galaxy gets a unique hue.
      // Full spectrum EXCEPT green (blackbody peak at green = perceived white).
      // Hue mapped: red→gold→[skip green]→cyan→blue→violet→pink→red
      float rawH = _gridHashSeed(cycleSeed, 4u);
      float hue = rawH < 0.3
        ? rawH * 200.0              // [0°, 60°] — red to yellow-gold
        : 170.0 + (rawH - 0.3) * 271.4; // [170°, 360°] — cyan to blue to pink to red
      float sat = 0.35 + _gridHashSeed(cycleSeed, 5u) * 0.55; // 0.35–0.9
      float lit = 0.6 + _gridHashSeed(cycleSeed, 6u) * 0.3;   // 0.6–0.9
      g.color = hsl2rgb(hue, sat, lit);

      // Physical parameters (from DB schema)
      g.axialRatio    = 0.3 + _gridHashSeed(cycleSeed, 7u) * 0.7;
      g.mass_log10    = 9.0 + _gridHashSeed(cycleSeed, 8u) * 3.0;
      g.velocity_kmps = 3000.0 + _gridHashSeed(cycleSeed, 9u) * 6000.0;
      g.distance_mpc  = 10.0 + _gridHashSeed(cycleSeed, 10u) * 90.0;

      // Render
      col += renderGalaxy(g, fragCoord);

      typeIndex++;
    }
  }

  fragColor = vec4(col, 1.0);
}
