/**
 * Galaxy Generator Library
 * @author guinetik
 * @date 2026-03-05
 *
 * Provides Galaxy struct and polymorphic renderGalaxy() dispatcher.
 * Strategy pattern: render implementation varies by galaxy type.
 *
 * TECHNIQUE: Overlapping Rotated Elliptical Orbits (Megaparsecs)
 * A galaxy is rendered as many concentric elliptical rings, each slightly
 * rotated. Spiral structure emerges from cumulative rotation (twist param).
 * Inner rings are more elongated and orbit faster (Keplerian).
 * Procedural valueNoise2D provides dust detail.
 *
 * Based on "Megaparsecs" by Martijn Steinrucken (BigWings), CC BY-NC-SA 3.0.
 * Each type renderer is independently replaceable — today all delegate to
 * renderRingLoop(), but any can be swapped for a different technique later.
 *
 * Requires: noise-value common (valueNoise2D, hashN2)
 */

#ifndef _GAL_TAU
#define _GAL_TAU 6.2831853
#endif

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

#define GAL_MAX_RADIUS 1.5              // Early-out distance (in tilted UV space)
#define GAL_MIN_COS_TILT 0.15           // Minimum cos(tilt) — clamps max edge-on stretch
#define GAL_RING_PHASE_OFFSET 100.0     // Per-ring orbital phase spread
#define GAL_ORBIT_SPEED 0.1             // Time multiplier for orbital motion
#define GAL_DUST_UV_SCALE 0.2           // UV scale for dust sampling
#define GAL_DUST_NOISE_FREQ 4.0         // Noise frequency multiplier
#define GAL_STAR_GLOW_RADIUS 0.5        // Smoothstep falloff for star points
#define GAL_STAR_BRIGHTNESS 0.2         // Star point intensity
#define GAL_SUPERNOVA_THRESH 0.9999     // sin() threshold for supernova flash
#define GAL_SUPERNOVA_MULT 10.0         // Supernova brightness boost
#define GAL_INNER_RADIUS 0.1            // Innermost ring radius (normalized)
#define GAL_OUTER_RADIUS 1.0            // Outermost ring radius (normalized)
#define GAL_MAX_RINGS 25                // Fixed upper bound for ring loop (integer)
#define GAL_RING_DECORR_A 563.2         // Ring-to-ring decorrelation seed A
#define GAL_RING_DECORR_B 673.2         // Ring-to-ring decorrelation seed B
#define GAL_STAR_OFFSET_A 17.3          // Star ID offset multiplier (decorrelation)
#define GAL_STAR_OFFSET_B 31.7          // Star ID offset multiplier (decorrelation)
#define GAL_TWINKLE_FREQ 784.0          // Star twinkle oscillation frequency
#define GAL_SUPERNOVA_TIME_SCALE 0.05   // Supernova pulse time multiplier (slow)
#define GAL_STAR_COLOR_FREQ 100.0       // Star color variation frequency

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** 2D rotation matrix (galaxy-local to avoid name clashes) */
mat2 _galRot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA STRUCTURES
// ─────────────────────────────────────────────────────────────────────────────

/** Galaxy entity with morphology and physical parameters */
struct Galaxy {
  int type;            // 0=spiral, 1=barred, 2=elliptical, 3=lenticular, 4=irregular
  uint seed;           // deterministic randomness
  vec2 center;         // center position in screen pixels
  float scale;         // radius in pixels (galaxy extends to this distance)
  float angleX;        // tilt angle — fake 3D via UV compression
  float angleY;        // secondary tilt (reserved for future use)
  float angleZ;        // in-plane rotation angle
  vec3 color;          // base tint color
  float axialRatio;    // b/a elongation (0.3–1.0, from DB axial_ratio)
  float mass_log10;    // log10 stellar mass (9–12, from DB)
  float velocity_kmps; // CMB velocity km/s (reserved for future use)
  float distance_mpc;  // distance in Mpc (reserved for future use)
};

/**
 * Ring-loop rendering style parameters.
 * Each galaxy type constructs its own GalaxyStyle to drive the ring loop.
 */
struct GalaxyStyle {
  float twist;         // Spiral winding per ring. 0.0=no arms, 1.0=classic spiral, 1.5+=tight.
  float innerStretch;  // Inner ring X elongation. 1.0=circular, 3.5=strong bar.
  float ringWidth;     // Gaussian sharpness of rings. 8=diffuse, 25=tight bands.
  float numRings;      // Ring count. 15–25 range. More=smoother, slower.
  float diskThickness; // Ring-to-ring Y perturbation amplitude. 0.01–0.1.
  float bulgeSize;     // Center glow Gaussian tightness. Higher=smaller bulge.
  float bulgeBright;   // Center glow intensity. 0.5–2.0.
  float dustContrast;  // Dust pow() exponent. Lower=softer, higher=sharper.
  float starDensity;   // Star grid resolution. 4–12. More=denser star field.
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 3D tilt via UV Y-stretch (ray-plane intersection approximation).
 *
 * TECHNIQUE: When viewing a tilted disk, screen-space Y maps to disk-space
 * positions that are FARTHER apart (not closer). A point 0.3 above center
 * on screen corresponds to a point 0.6 on the disk if tilted 60 degrees.
 * This stretches Y so points off the disk plane map to large UV distances
 * where the ring Gaussian is near zero — creating natural thin edge-on shapes.
 *
 * cos(0)=1.0 → face-on (no stretch). cos(PI/2)→0 → edge-on (max stretch).
 * Clamped to GAL_MIN_COS_TILT to prevent infinite stretch at exactly 90 degrees.
 */
vec2 _galApplyTilt(vec2 uv, float angleX) {
  uv.y /= max(abs(cos(angleX)), GAL_MIN_COS_TILT);
  return uv;
}

/**
 * Gaussian center glow (galaxy bulge/core).
 * Returns warm-tinted radial glow at UV origin.
 */
vec3 _galRenderBulge(vec2 uv, float size, float brightness, vec3 tint) {
  return vec3(exp(-0.5 * dot(uv, uv) * size)) * brightness * tint;
}

/**
 * Core ring-loop renderer — Megaparsecs technique.
 *
 * TECHNIQUE: Overlapping Rotated Elliptical Orbits
 * For NUM_RINGS concentric rings at increasing radius:
 * 1. Rotate UV by (i * TAU * twist) — creates spiral from overlap
 * 2. Stretch inner rings (creates bar/elongation)
 * 3. Gaussian brightness at ring radius
 * 4. Procedural noise for dust detail
 * 5. Grid-based point stars with twinkle + supernova
 * 6. Inner rings orbit faster (Keplerian: phase / radius)
 *
 * @param g     Galaxy (seed, color used for dust tint and rotation direction)
 * @param uv    Normalized UV centered at galaxy, roughly [-1, 1]
 * @param style Type-specific ring parameters
 * @return HDR color (may exceed 1.0, caller handles tonemapping)
 */
vec3 _galRenderRingLoop(Galaxy g, vec2 uv, GalaxyStyle style) {
  vec3 col = vec3(0.0);

  // Dust base color: bright blue-white (Megaparsecs original).
  // Galaxy color is applied as a post-multiply tint by each type renderer.
  vec3 dustCol = vec3(0.3, 0.6, 1.0);

  float flip = 1.0;
  float t = iTime * GAL_ORBIT_SPEED;
  // Seed-based rotation direction (clockwise vs counter-clockwise)
  t *= (float(g.seed % 2u) * 2.0 - 1.0);

  for (int j = 0; j < GAL_MAX_RINGS; j++) {
    float i = float(j) / style.numRings;
    if (i >= 1.0) break;
    flip *= -1.0;

    // Ring-to-ring Y perturbation (disk thickness, decorrelates rings)
    float z = mix(style.diskThickness, 0.0, i) * flip * fract(sin(i * GAL_RING_DECORR_A) * GAL_RING_DECORR_B);

    // Ring radius: inner to outer
    float r = mix(GAL_INNER_RADIUS, GAL_OUTER_RADIUS, i);

    // Slight UV perturbation from disk thickness
    vec2 ringUv = uv + vec2(0.0, z * 0.5);

    // Spiral twist: progressive rotation per ring
    vec2 st = ringUv * _galRot(i * _GAL_TAU * style.twist);

    // Inner ring elongation (bar effect on inner, circular on outer)
    st.x *= mix(style.innerStretch, 1.0, i);

    // Ring brightness: Gaussian peak at radius r
    float ell = exp(-0.5 * abs(dot(st, st) - r) * style.ringWidth);

    // Orbital motion UV — inner rings orbit faster (Kepler: t/r)
    vec2 texUv = GAL_DUST_UV_SCALE * st * _galRot(i * GAL_RING_PHASE_OFFSET + t / r);

    // Dust detail: procedural noise (replaces Megaparsecs texture lookup)
    vec3 dust = vec3(valueNoise2D((texUv + vec2(i)) * GAL_DUST_NOISE_FREQ));

    // Combined brightness with contrast shaping
    vec3 dL = pow(max(ell * dust / r, vec3(0.0)), vec3(0.5 + style.dustContrast));

    // Accumulate dust contribution
    col += dL * dustCol;

    // === Point Stars ===
    vec2 starId = floor(texUv * style.starDensity);
    vec2 starUv = fract(texUv * style.starDensity) - 0.5;
    float n = hashN2(starId + vec2(i * GAL_STAR_OFFSET_A, i * GAL_STAR_OFFSET_B));
    float starDist = length(starUv);

    // Star glow: bright point with 1/distance falloff
    float sL = smoothstep(GAL_STAR_GLOW_RADIUS, 0.0, starDist)
             * pow(max(dL.r, 0.0), 2.0) * GAL_STAR_BRIGHTNESS
             / max(starDist, 0.001);

    // Twinkle + rare supernova
    float sN = sL;
    sL *= sin(n * GAL_TWINKLE_FREQ + iTime) * 0.5 + 0.5;
    sL += sN * smoothstep(GAL_SUPERNOVA_THRESH, 1.0, sin(n * GAL_TWINKLE_FREQ + iTime * GAL_SUPERNOVA_TIME_SCALE))
        * GAL_SUPERNOVA_MULT;

    // Add stars (skip innermost rings to avoid center clutter)
    if (i > 3.0 / style.starDensity) {
      // Star color: mix galaxy tint with hot white (bright stars are whiter)
      vec3 starCol = mix(dustCol, vec3(1.0), 0.3 + n * 0.5);
      col += sL * starCol;
    }
  }

  // Normalize accumulated brightness by ring count
  col /= style.numRings;

  return col;
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPE-SPECIFIC RENDERERS
// Each type owns its rendering. Today all call _galRenderRingLoop() with
// type-specific GalaxyStyle. Any renderer can be rewritten independently
// with a completely different technique without touching the others.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render spiral galaxy (type 0).
 * Classic 2-armed spiral: moderate twist, inner elongation, visible arms.
 */
vec3 renderSpiral(Galaxy g, vec2 fragCoord) {
  vec2 uv = (fragCoord - g.center) / g.scale;
  uv = _galApplyTilt(uv * _galRot(g.angleZ), g.angleX);
  if (length(uv) > GAL_MAX_RADIUS) return vec3(0.0);

  GalaxyStyle s;
  s.twist        = 1.0;
  s.innerStretch = mix(1.8, 2.2, g.axialRatio);
  s.ringWidth    = 15.0;
  s.numRings     = 20.0;
  s.diskThickness = 0.04;
  s.bulgeSize    = 25.0;
  s.bulgeBright  = 1.2;
  s.dustContrast = 0.5;
  s.starDensity  = 8.0;

  vec3 col = _galRenderRingLoop(g, uv, s);
  col += _galRenderBulge(uv, s.bulgeSize, s.bulgeBright,
           mix(vec3(1.0, 0.9, 0.8), g.color, 0.6));
  col *= g.color;
  return col;
}

/**
 * Render barred spiral galaxy (type 1).
 * Strong inner bar (high stretch), arms emerge from bar ends.
 */
vec3 renderBarredSpiral(Galaxy g, vec2 fragCoord) {
  vec2 uv = (fragCoord - g.center) / g.scale;
  uv = _galApplyTilt(uv * _galRot(g.angleZ), g.angleX);
  if (length(uv) > GAL_MAX_RADIUS) return vec3(0.0);

  GalaxyStyle s;
  s.twist        = 1.3;
  s.innerStretch = mix(3.0, 4.0, g.axialRatio);
  s.ringWidth    = 12.0;
  s.numRings     = 20.0;
  s.diskThickness = 0.04;
  s.bulgeSize    = 20.0;
  s.bulgeBright  = 1.0;
  s.dustContrast = 0.5;
  s.starDensity  = 8.0;

  vec3 col = _galRenderRingLoop(g, uv, s);
  col += _galRenderBulge(uv, s.bulgeSize, s.bulgeBright,
           mix(vec3(1.0, 0.9, 0.7), g.color, 0.6));
  col *= g.color;
  return col;
}

/**
 * Render elliptical galaxy (type 2).
 * No twist, smooth round glow, bright bulge, minimal dust.
 * Replaceable later with Sersic profile or volumetric technique.
 */
vec3 renderElliptical(Galaxy g, vec2 fragCoord) {
  vec2 uv = (fragCoord - g.center) / g.scale;
  uv = _galApplyTilt(uv * _galRot(g.angleZ), g.angleX);
  if (length(uv) > GAL_MAX_RADIUS) return vec3(0.0);

  GalaxyStyle s;
  s.twist        = 0.0;
  s.innerStretch = mix(1.0, 1.4, 1.0 - g.axialRatio);
  s.ringWidth    = 8.0;
  s.numRings     = 15.0;
  s.diskThickness = 0.08;
  s.bulgeSize    = 15.0;
  s.bulgeBright  = 2.0;
  s.dustContrast = 0.8;
  s.starDensity  = 4.0;

  vec3 col = _galRenderRingLoop(g, uv, s);
  col += _galRenderBulge(uv, s.bulgeSize, s.bulgeBright,
           mix(vec3(1.0, 0.8, 0.6), g.color, 0.7));
  col *= g.color;
  return col;
}

/**
 * Render lenticular galaxy (type 3).
 * Very thin disk (tight rings), bright dominant bulge, nearly no arms.
 * Replaceable later with disk+bulge decomposition.
 */
vec3 renderLenticular(Galaxy g, vec2 fragCoord) {
  vec2 uv = (fragCoord - g.center) / g.scale;
  uv = _galApplyTilt(uv * _galRot(g.angleZ), g.angleX);
  if (length(uv) > GAL_MAX_RADIUS) return vec3(0.0);

  GalaxyStyle s;
  s.twist        = 0.05;
  s.innerStretch = mix(1.5, 2.0, 1.0 - g.axialRatio);
  s.ringWidth    = 20.0;
  s.numRings     = 18.0;
  s.diskThickness = 0.02;
  s.bulgeSize    = 30.0;
  s.bulgeBright  = 1.5;
  s.dustContrast = 0.6;
  s.starDensity  = 6.0;

  vec3 col = _galRenderRingLoop(g, uv, s);
  col += _galRenderBulge(uv, s.bulgeSize, s.bulgeBright,
           mix(vec3(1.0, 0.85, 0.65), g.color, 0.6));
  col *= g.color;
  return col;
}

/**
 * Render irregular galaxy (type 4).
 * Moderate twist, high disk thickness, lots of dust — clumpy and chaotic.
 * Replaceable later with clump-based or particle technique.
 */
vec3 renderIrregular(Galaxy g, vec2 fragCoord) {
  vec2 uv = (fragCoord - g.center) / g.scale;
  uv = _galApplyTilt(uv * _galRot(g.angleZ), g.angleX);
  if (length(uv) > GAL_MAX_RADIUS) return vec3(0.0);

  GalaxyStyle s;
  s.twist        = 0.3;
  s.innerStretch = 1.5;
  s.ringWidth    = 10.0;
  s.numRings     = 16.0;
  s.diskThickness = 0.1;
  s.bulgeSize    = 40.0;
  s.bulgeBright  = 0.6;
  s.dustContrast = 0.4;
  s.starDensity  = 10.0;

  vec3 col = _galRenderRingLoop(g, uv, s);
  col += _galRenderBulge(uv, s.bulgeSize, s.bulgeBright,
           mix(vec3(0.9, 0.85, 1.0), g.color, 0.6));
  col *= g.color;
  return col;
}

// ─────────────────────────────────────────────────────────────────────────────
// POLYMORPHIC DISPATCHER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render galaxy by dispatching to type-specific renderer.
 *
 * @param g         Galaxy to render
 * @param fragCoord Fragment coordinate (screen pixels)
 * @return Color contribution (HDR)
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
