/**
 * Galaxy Generator — Grid Layout with Morphology Presets
 * @author guinetik
 * @date 2026-03-05
 *
 * Renders a 3x3 grid of galaxies, cycling every 7 seconds.
 * Each galaxy gets a random Hubble morphology type with appropriate
 * ring-loop parameters. Per-galaxy HSL hue tint for XDF-like diversity.
 */

#define GRID_COLS 3
#define GRID_ROWS 3
#define CYCLE_DURATION 7.0          // Seconds per galaxy set
#define GALAXY_FILL 0.35            // Galaxy radius as fraction of cell size
#define NUM_MORPHOLOGIES 5          // Spiral, Barred, Elliptical, Lenticular, Irregular

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** PCG-style integer hash. */
float _gridHash(uint x) {
  x = ((x >> 16u) ^ x) * 0x7feb352du;
  x = ((x >> 15u) ^ x) * 0x846ca68bu;
  return float((x >> 16u) ^ x) / 4294967296.0;
}

float _gridHashSeed(uint seed, uint offset) {
  return _gridHash(seed + offset);
}

// ─────────────────────────────────────────────────────────────────────────────
// MORPHOLOGY PRESETS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Configure ring-loop parameters by Hubble morphology type.
 *
 * === MORPHOLOGY TABLE ===
 * Type 0 — Spiral (Sa/Sb/Sc):
 *   Classic 2-armed spiral. Moderate twist, visible disc, inner elongation.
 *   Dust: warm core fading to cool blue-white arms. Warm dust 0.6–0.9.
 *
 * Type 1 — Barred Spiral (SBa/SBb):
 *   Strong inner bar (high innerStretch), arms emerge from bar ends.
 *   Higher twist than regular spiral. Warm dust 0.5–0.8.
 *
 * Type 2 — Elliptical (E0–E7):
 *   No spiral, no arms. Smooth round glow, dominant bulge.
 *   Low twist, low innerStretch, diffuse rings. Warm dust 0.7–1.0.
 *
 * Type 3 — Lenticular (S0):
 *   Thin disc, bright bulge, nearly no arms. Tight rings.
 *   Very low twist, moderate innerStretch. Warm dust 0.6–0.9.
 *
 * Type 4 — Irregular (Irr):
 *   Chaotic, thick disc, lots of dust clumps. Moderate twist.
 *   High disk thickness, low dust contrast. Warm dust 0.3–0.6.
 */
void _galSetMorphology(inout Galaxy g, int morphType, uint seed) {
  float h0 = _gridHashSeed(seed, 20u);
  float h1 = _gridHashSeed(seed, 21u);
  float h2 = _gridHashSeed(seed, 22u);
  float h3 = _gridHashSeed(seed, 23u);
  float h4 = _gridHashSeed(seed, 24u);
  float h5 = _gridHashSeed(seed, 25u);
  float h6 = _gridHashSeed(seed, 26u);
  float h7 = _gridHashSeed(seed, 27u);
  float h8 = _gridHashSeed(seed, 28u);

  if (morphType == 0) {
    // Spiral
    g.twist         = mix(0.7, 1.4, h0);
    g.innerStretch  = mix(1.5, 2.8, h1);
    g.ringWidth     = mix(12.0, 20.0, h2);
    g.numRings      = mix(16.0, 24.0, h3);
    g.diskThickness = mix(0.02, 0.06, h4);
    g.bulgeSize     = mix(20.0, 35.0, h5);
    g.bulgeBright   = mix(0.8, 1.6, h6);
    g.dustContrast  = mix(0.3, 0.7, h7);
    g.starDensity   = mix(6.0, 10.0, h8);
    g.dustWarmth    = mix(0.6, 0.9, h0);
  } else if (morphType == 1) {
    // Barred Spiral
    g.twist         = mix(1.0, 1.6, h0);
    g.innerStretch  = mix(2.5, 4.5, h1);
    g.ringWidth     = mix(9.0, 16.0, h2);
    g.numRings      = mix(16.0, 24.0, h3);
    g.diskThickness = mix(0.02, 0.06, h4);
    g.bulgeSize     = mix(16.0, 28.0, h5);
    g.bulgeBright   = mix(0.7, 1.4, h6);
    g.dustContrast  = mix(0.3, 0.7, h7);
    g.starDensity   = mix(6.0, 10.0, h8);
    g.dustWarmth    = mix(0.5, 0.8, h0);
  } else if (morphType == 2) {
    // Elliptical
    g.twist         = mix(0.0, 0.05, h0);
    g.innerStretch  = mix(1.0, 1.6, h1);
    g.ringWidth     = mix(6.0, 12.0, h2);
    g.numRings      = mix(12.0, 18.0, h3);
    g.diskThickness = mix(0.05, 0.12, h4);
    g.bulgeSize     = mix(10.0, 22.0, h5);
    g.bulgeBright   = mix(1.5, 2.5, h6);
    g.dustContrast  = mix(0.6, 1.0, h7);
    g.starDensity   = mix(3.0, 6.0, h8);
    g.dustWarmth    = mix(0.7, 1.0, h0);
  } else if (morphType == 3) {
    // Lenticular
    g.twist         = mix(0.02, 0.10, h0);
    g.innerStretch  = mix(1.3, 2.2, h1);
    g.ringWidth     = mix(16.0, 25.0, h2);
    g.numRings      = mix(14.0, 22.0, h3);
    g.diskThickness = mix(0.01, 0.04, h4);
    g.bulgeSize     = mix(24.0, 38.0, h5);
    g.bulgeBright   = mix(1.1, 2.0, h6);
    g.dustContrast  = mix(0.4, 0.8, h7);
    g.starDensity   = mix(4.0, 8.0, h8);
    g.dustWarmth    = mix(0.6, 0.9, h0);
  } else {
    // Irregular
    g.twist         = mix(0.1, 0.5, h0);
    g.innerStretch  = mix(1.0, 2.0, h1);
    g.ringWidth     = mix(7.0, 14.0, h2);
    g.numRings      = mix(12.0, 20.0, h3);
    g.diskThickness = mix(0.06, 0.14, h4);
    g.bulgeSize     = mix(30.0, 50.0, h5);
    g.bulgeBright   = mix(0.3, 0.8, h6);
    g.dustContrast  = mix(0.2, 0.6, h7);
    g.starDensity   = mix(8.0, 12.0, h8);
    g.dustWarmth    = mix(0.3, 0.6, h0);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 col = vec3(0.0);

  vec2 cellSize = iResolution.xy / vec2(float(GRID_COLS), float(GRID_ROWS));
  float galaxyRadius = min(cellSize.x, cellSize.y) * GALAXY_FILL;

  int idx = 0;
  for (int y = 0; y < GRID_ROWS; y++) {
    for (int x = 0; x < GRID_COLS; x++) {
      vec2 cellCenter = vec2(
        (float(x) + 0.5) * cellSize.x,
        (float(y) + 0.5) * cellSize.y
      );

      if (length(fragCoord - cellCenter) > galaxyRadius * GAL_MAX_RADIUS) {
        idx++;
        continue;
      }

      uint cycleSeed = uint(int(iTime / CYCLE_DURATION)) * 12345u + uint(idx);

      Galaxy g;
      g.seed   = _gridHash(cycleSeed) * 999.0 + 1.0;
      g.center = cellCenter;
      g.scale  = galaxyRadius;
      g.time   = iTime;

      // Orientation
      g.angleX = _gridHashSeed(cycleSeed, 1u) * _GAL_TAU;
      g.angleZ = _gridHashSeed(cycleSeed, 3u) * _GAL_TAU;

      // Per-galaxy color tint — vibrant HSL, skip green band
      // Full spectrum: red→gold→[skip green]→cyan→blue→violet→pink→red
      float rawH = _gridHashSeed(cycleSeed, 4u);
      float hue = rawH < 0.3
        ? rawH * 200.0
        : 170.0 + (rawH - 0.3) * 271.4;
      float sat = 0.35 + _gridHashSeed(cycleSeed, 5u) * 0.55;
      float lit = 0.6 + _gridHashSeed(cycleSeed, 6u) * 0.3;
      g.color = hsl2rgb(hue, sat, lit);

      // Morphology
      int morphType = int(_gridHashSeed(cycleSeed, 50u) * float(NUM_MORPHOLOGIES));
      _galSetMorphology(g, morphType, cycleSeed);

      col += renderGalaxy(g, fragCoord);
      idx++;
    }
  }

  fragColor = vec4(col, 1.0);
}
