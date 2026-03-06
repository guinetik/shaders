/**
 * Galaxy Generator Library — Density Wave Ring-Loop
 * @author guinetik
 * @date 2026-03-05
 *
 * Renders galaxies via the Megaparsecs ring-loop technique, parameterized
 * by Hubble morphology type for shape diversity.
 *
 * TECHNIQUE: Overlapping Rotated Elliptical Orbits
 * Concentric rings at increasing radius, each progressively rotated by
 * `twist * TAU`. Spiral arms emerge from cumulative rotation. Inner ring
 * elongation creates bars. Procedural noise adds dust texture.
 * Point stars via grid hash with twinkle.
 *
 * Color model: two-tone dust (cool blue-white outer → warm gold inner)
 * with per-galaxy hue tint for Hubble XDF-style diversity.
 *
 * Based on "Megaparsecs" by BigWings, CC BY-NC-SA 3.0.
 * Morphology parameterization inspired by beltoforion.de Galaxy-Renderer.
 *
 * Requires: noise-value (valueNoise2D, hashN2), color (hsl2rgb)
 */

#ifndef _GAL_TAU
#define _GAL_TAU 6.2831853
#endif

// ─────────────────────────────────────────────────────────────────────────────
// RENDERING CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

#define GAL_MAX_RADIUS 1.5              // Early-out distance (normalized UV)
#define GAL_MIN_COS_TILT 0.15           // Minimum cos(tilt) for edge-on clamp
#define GAL_MAX_RINGS 25                // Fixed upper bound for ring loop
#define GAL_ORBIT_SPEED 0.1             // Time multiplier for orbital motion
#define GAL_DUST_UV_SCALE 0.2           // UV scale for dust sampling
#define GAL_DUST_NOISE_FREQ 4.0         // Noise frequency for dust detail
#define GAL_RING_DECORR_A 563.2         // Ring decorrelation seed A
#define GAL_RING_DECORR_B 673.2         // Ring decorrelation seed B

// Stars
#define GAL_STAR_GLOW 0.5               // Star glow radius
#define GAL_STAR_BRIGHT 0.5             // Star brightness
#define GAL_TWINKLE_FREQ 784.0          // Star twinkle frequency
#define GAL_SUPERNOVA_THRESH 0.9999     // Supernova flash threshold
#define GAL_SUPERNOVA_MULT 10.0         // Supernova brightness boost

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** 2D rotation matrix */
mat2 _galRot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

/** Deterministic per-galaxy random. Returns [0, 1). */
float _galSeedHash(float seed, float channel) {
  return fract(sin(seed * 127.1 + channel * 311.7) * 43758.5453);
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA STRUCTURES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Galaxy with morphology-driven ring-loop parameters.
 *
 * Shape controlled by:
 * - twist: spiral winding (0 = no arms, 0.7–1.5 = spiral)
 * - innerStretch: bar elongation (1.0 = round, 3+ = strong bar)
 * - ringWidth: ring Gaussian sharpness (8 = diffuse, 25 = tight)
 * - numRings: ring count (15–25)
 *
 * Color controlled by:
 * - color: per-galaxy hue tint (applied as post-multiply)
 * - dustWarmth: warm/cool dust balance (0 = blue, 1 = gold)
 */
struct Galaxy {
  float seed;
  vec2 center;         // screen pixels
  float scale;         // radius in pixels
  float angleX;        // 3D tilt (Y-compression)
  float angleZ;        // in-plane rotation
  float time;          // animation time

  // Ring-loop shape params
  float twist;         // spiral winding per ring (0 = none, 1+ = spiral)
  float innerStretch;  // inner ring X elongation (1 = round, 3.5 = bar)
  float ringWidth;     // Gaussian sharpness (8 = diffuse, 25 = tight)
  float numRings;      // ring count (15–25)
  float diskThickness; // ring-to-ring Y perturbation (0.01–0.1)

  // Bulge
  float bulgeSize;     // Gaussian tightness (higher = smaller bulge)
  float bulgeBright;   // center glow intensity

  // Dust/color
  float dustContrast;  // pow() exponent on dust (lower = softer)
  float starDensity;   // star grid resolution (4–12)
  vec3 color;          // per-galaxy hue tint (from HSL palette)
  float dustWarmth;    // 0 = cool blue-white, 1 = warm gold
};

// ─────────────────────────────────────────────────────────────────────────────
// TILT
// ─────────────────────────────────────────────────────────────────────────────

/** Fake 3D via UV Y-stretch. */
vec2 _galApplyTilt(vec2 uv, float angleX) {
  uv.y /= max(abs(cos(angleX)), GAL_MIN_COS_TILT);
  return uv;
}

// ─────────────────────────────────────────────────────────────────────────────
// BULGE
// ─────────────────────────────────────────────────────────────────────────────

/** Radial center glow with warm tint. */
vec3 _galRenderBulge(vec2 uv, float size, float brightness, vec3 tint) {
  return vec3(exp(-0.5 * dot(uv, uv) * size)) * brightness * tint;
}

// ─────────────────────────────────────────────────────────────────────────────
// RING-LOOP RENDERER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Core ring-loop renderer.
 *
 * TECHNIQUE: Overlapping Rotated Elliptical Orbits
 * For NUM_RINGS concentric rings at increasing radius:
 * 1. Rotate UV by (i * TAU * twist) — progressive rotation creates spiral
 * 2. Stretch inner rings x-axis (creates bar/elongation)
 * 3. Gaussian brightness at ring radius
 * 4. Procedural noise for dust lanes
 * 5. Two-tone dust color (cool outer, warm inner)
 * 6. Grid-based point stars with twinkle
 * 7. Inner rings orbit faster (Keplerian: phase / radius)
 */
vec3 _galRenderRingLoop(Galaxy g, vec2 uv) {
  vec3 col = vec3(0.0);

  // Two-tone dust palette (astronomical, no green)
  // Cool = blue-white (young OB associations), warm = gold (old K/M stars)
  vec3 coolDust = vec3(0.4, 0.5, 1.0);
  vec3 warmDust = vec3(1.0, 0.75, 0.35);

  float flip = 1.0;
  float t = g.time * GAL_ORBIT_SPEED;
  // Seed-based rotation direction
  t *= (mod(g.seed, 2.0) < 1.0 ? 1.0 : -1.0);

  for (int j = 0; j < GAL_MAX_RINGS; j++) {
    float i = float(j) / g.numRings;
    if (i >= 1.0) break;
    flip *= -1.0;

    // Disk thickness: decorrelated Y perturbation between rings
    float z = mix(g.diskThickness, 0.0, i) * flip
            * fract(sin(i * GAL_RING_DECORR_A) * GAL_RING_DECORR_B);

    // Ring radius: inner to outer
    float r = mix(0.1, 1.0, i);

    // Slight UV offset from disk thickness
    vec2 ringUv = uv + vec2(0.0, z * 0.5);

    // Spiral twist: progressive rotation creates arm structure
    vec2 st = ringUv * _galRot(i * _GAL_TAU * g.twist);

    // Inner ring elongation (bar effect fading to circular at outer edge)
    st.x *= mix(g.innerStretch, 1.0, i);

    // Ring brightness: Gaussian peak at radius r
    float ell = exp(-0.5 * abs(dot(st, st) - r) * g.ringWidth);

    // Orbital motion UV — inner rings orbit faster (Kepler: t/r)
    vec2 texUv = GAL_DUST_UV_SCALE * st * _galRot(i * 100.0 + t / max(r, 0.01));

    // Dust detail: noise squared for contrast (dark lanes + bright knots)
    float rawDust = valueNoise2D((texUv + vec2(i)) * GAL_DUST_NOISE_FREQ);
    vec3 dust = vec3(rawDust * rawDust);

    // Combined brightness with contrast shaping
    vec3 dL = pow(max(ell * dust / max(r, 0.01), vec3(0.0)), vec3(0.5 + g.dustContrast));

    // Two-tone dust color: warm inner → cool outer
    // Smoothly transition from warm (core) to cool (outer disc)
    float warmFrac = g.dustWarmth * (1.0 - smoothstep(0.15, 0.6, i));
    vec3 dustCol = mix(coolDust, warmDust, warmFrac);

    col += dL * dustCol;

    // === Point Stars ===
    vec2 starId = floor(texUv * g.starDensity);
    vec2 starUv = fract(texUv * g.starDensity) - 0.5;
    float n = hashN2(starId + vec2(i * 17.3, i * 31.7));
    float starDist = length(starUv);

    float sL = smoothstep(GAL_STAR_GLOW, 0.0, starDist)
             * pow(max(dL.r, 0.0), 2.0) * GAL_STAR_BRIGHT
             / max(starDist, 0.001);

    // Twinkle + rare supernova
    float sN = sL;
    sL *= sin(n * GAL_TWINKLE_FREQ + g.time) * 0.5 + 0.5;
    sL += sN * smoothstep(GAL_SUPERNOVA_THRESH, 1.0,
      sin(n * GAL_TWINKLE_FREQ + g.time * 0.05)) * GAL_SUPERNOVA_MULT;

    // Stars: white-hot with slight color variation
    if (i > 3.0 / g.starDensity) {
      vec3 hotStar = mix(vec3(0.85, 0.88, 1.0), vec3(1.0, 0.97, 0.9), n);
      vec3 starCol = mix(dustCol, hotStar, 0.6 + n * 0.4);
      col += sL * starCol;
    }
  }

  // Normalize by ring count
  col /= g.numRings;

  // Radial fadeout — smooth edge
  col *= smoothstep(GAL_MAX_RADIUS, 0.7, length(uv));

  return col;
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render a galaxy.
 * Per-galaxy hue tint applied as post-multiply for XDF-like color diversity.
 */
vec3 renderGalaxy(Galaxy g, vec2 fragCoord) {
  vec2 uv = (fragCoord - g.center) / g.scale;
  uv = _galApplyTilt(uv * _galRot(g.angleZ), g.angleX);

  if (length(uv) > GAL_MAX_RADIUS) return vec3(0.0);

  // Ring-loop dust + stars
  vec3 col = _galRenderRingLoop(g, uv);

  // Bulge glow: warm golden-white center
  vec3 bulgeTint = mix(vec3(1.0, 0.9, 0.8), g.color, 0.5);
  col += _galRenderBulge(uv, g.bulgeSize, g.bulgeBright, bulgeTint);

  // Per-galaxy hue tint (post-multiply for color diversity)
  col *= g.color;

  return col;
}
