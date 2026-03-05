/**
 * Galaxy Generator Library
 * @author guinetik
 * @date 2026-03-05
 *
 * Provides Galaxy struct and polymorphic renderGalaxy() dispatcher.
 * Strategy pattern: render implementation varies by galaxy type.
 * Currently: simple colored circles per type (will extend to particle rendering).
 */

// ─────────────────────────────────────────────────────────────────────────────
// GALAXY DEFINITION
// ─────────────────────────────────────────────────────────────────────────────

/** Galaxy entity with type, seed, position, and scale */
struct Galaxy {
  int type;      // 0=spiral, 1=barred, 2=elliptical, 3=lenticular, 4=irregular
  uint seed;     // deterministic randomness
  vec2 center;   // center position (screen space)
  float scale;   // relative size multiplier
};

// ─────────────────────────────────────────────────────────────────────────────
// RENDERING STRATEGY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render galaxy using polymorphic dispatch.
 *
 * Each galaxy type renders differently (currently: colored circles).
 * Later: replace circle rendering with particle-based morphology.
 *
 * @param g Galaxy to render
 * @param fragCoord Fragment coordinate
 * @return Color contribution (0–1)
 */
vec3 renderGalaxy(Galaxy g, vec2 fragCoord) {
  // Distance from fragment to galaxy center
  vec2 toGalaxy = fragCoord - g.center;
  float dist = length(toGalaxy);
  float radius = 60.0 * g.scale;

  // Outside galaxy: no contribution
  if (dist > radius) return vec3(0.0);

  // Type → color (polymorphic dispatch)
  // Future: replace with type-specific generators
  vec3 color = vec3(0.0);
  switch(g.type) {
    case 0: color = vec3(1.0, 0.2, 0.2); break;  // Spiral: red
    case 1: color = vec3(1.0, 0.5, 0.1); break;  // Barred: orange
    case 2: color = vec3(0.2, 0.5, 1.0); break;  // Elliptical: blue
    case 3: color = vec3(0.8, 0.8, 0.2); break;  // Lenticular: yellow
    case 4: color = vec3(0.8, 0.2, 0.8); break;  // Irregular: magenta
  }

  // Smooth falloff (glow edge)
  float falloff = smoothstep(radius, 0.0, dist);
  return color * falloff;
}
