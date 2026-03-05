/**
 * Galaxy Generator Library
 * @author guinetik
 * @date 2026-03-05
 *
 * Provides Galaxy struct and polymorphic renderGalaxy() dispatcher.
 * Strategy pattern: render implementation varies by galaxy type.
 * Currently: simple colored circles per type with rotation (will extend to particle rendering).
 */

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** 2D rotation matrix */
mat2 rot2d(float angle) {
  float s = sin(angle), c = cos(angle);
  return mat2(c, -s, s, c);
}

// ─────────────────────────────────────────────────────────────────────────────
// GALAXY DEFINITION
// ─────────────────────────────────────────────────────────────────────────────

/** Galaxy entity with type, seed, position, scale, rotation, and color */
struct Galaxy {
  int type;      // 0=spiral, 1=barred, 2=elliptical, 3=lenticular, 4=irregular
  uint seed;     // deterministic randomness
  vec2 center;   // center position (screen space)
  float scale;   // relative size multiplier
  float angleX;  // rotation around X axis
  float angleY;  // rotation around Y axis
  float angleZ;  // rotation around Z axis
  vec3 color;    // random color for this galaxy
};

// ─────────────────────────────────────────────────────────────────────────────
// RENDER STUBS (Type-Specific Implementations)
// ─────────────────────────────────────────────────────────────────────────────

/** Render spiral galaxy (2-armed logarithmic spiral) */
vec3 renderSpiral(Galaxy g, vec2 fragCoord) {
  vec2 toGalaxy = fragCoord - g.center;
  float dist = length(toGalaxy);
  float radius = 60.0 * g.scale;
  if (dist > radius) return vec3(0.0);

  // Apply rotation
  vec2 rotated = toGalaxy * rot2d(g.angleZ);
  float angle = atan(rotated.y, rotated.x);

  // Use random color from galaxy
  float falloff = smoothstep(radius, 0.0, dist);
  return g.color * falloff;
}

/** Render barred spiral galaxy (bar + spiral arms) */
vec3 renderBarredSpiral(Galaxy g, vec2 fragCoord) {
  vec2 toGalaxy = fragCoord - g.center;
  float dist = length(toGalaxy);
  float radius = 60.0 * g.scale;
  if (dist > radius) return vec3(0.0);

  // Apply rotation
  vec2 rotated = toGalaxy * rot2d(g.angleZ);

  // Use random color from galaxy
  float falloff = smoothstep(radius, 0.0, dist);
  return g.color * falloff;
}

/** Render elliptical galaxy (smooth, featureless) */
vec3 renderElliptical(Galaxy g, vec2 fragCoord) {
  vec2 toGalaxy = fragCoord - g.center;
  float dist = length(toGalaxy);
  float radius = 60.0 * g.scale;
  if (dist > radius) return vec3(0.0);

  // Apply rotation
  vec2 rotated = toGalaxy * rot2d(g.angleZ);

  // Use random color from galaxy
  float falloff = smoothstep(radius, 0.0, dist);
  return g.color * falloff;
}

/** Render lenticular galaxy (disk + bulge) */
vec3 renderLenticular(Galaxy g, vec2 fragCoord) {
  vec2 toGalaxy = fragCoord - g.center;
  float dist = length(toGalaxy);
  float radius = 60.0 * g.scale;
  if (dist > radius) return vec3(0.0);

  // Apply rotation
  vec2 rotated = toGalaxy * rot2d(g.angleZ);

  // Use random color from galaxy
  float falloff = smoothstep(radius, 0.0, dist);
  return g.color * falloff;
}

/** Render irregular galaxy (clumpy, chaotic) */
vec3 renderIrregular(Galaxy g, vec2 fragCoord) {
  vec2 toGalaxy = fragCoord - g.center;
  float dist = length(toGalaxy);
  float radius = 60.0 * g.scale;
  if (dist > radius) return vec3(0.0);

  // Apply rotation
  vec2 rotated = toGalaxy * rot2d(g.angleZ);

  // Use random color from galaxy
  float falloff = smoothstep(radius, 0.0, dist);
  return g.color * falloff;
}

// ─────────────────────────────────────────────────────────────────────────────
// POLYMORPHIC DISPATCHER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render galaxy using polymorphic dispatch.
 *
 * Each galaxy type renders differently via type-specific functions.
 *
 * @param g Galaxy to render
 * @param fragCoord Fragment coordinate
 * @return Color contribution (0–1)
 */
vec3 renderGalaxy(Galaxy g, vec2 fragCoord) {
  switch(g.type) {
    case 0: return renderSpiral(g, fragCoord);
    case 1: return renderBarredSpiral(g, fragCoord);
    case 2: return renderElliptical(g, fragCoord);
    case 3: return renderLenticular(g, fragCoord);
    case 4: return renderIrregular(g, fragCoord);
  }
  return vec3(0.0);
}
