/**
 * Galaxy Generator — Grid Layout
 * @author guinetik
 * @date 2026-03-05
 *
 * Renders a 3×3 grid of galaxies, cycling through 5 types.
 * Uses galaxy.glsl library for polymorphic rendering.
 */

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
      g.seed = uint(int(iTime / 7.0)) * 12345u + uint(typeIndex);
      g.center = cellCenter;
      g.scale = 1.0;

      // Render and composite
      col += renderGalaxy(g, fragCoord);

      typeIndex++;
    }
  }

  fragColor = vec4(col, 1.0);
}
