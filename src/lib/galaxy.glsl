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
  int type;            // Hubble type: 0=spiral, 1=barred, 2=elliptical, 3=lenticular, 4=irregular
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
  float numArms;       // spiral arm count (2–4 for spiral, 2 for barred, 0 for non-spiral)
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
// SPIRAL RENDERER (multi-arm density wave)
// ─────────────────────────────────────────────────────────────────────────────

#define GAL_MAX_ARM_FAMILIES 4         // Fixed upper bound for arm loop
#define GAL_ARM_DUST_DECORR 3.7        // Dust noise offset per arm (decorrelation)
#define GAL_ARM_STAR_DECORR_A 53.1     // Star hash decorrelation per arm (x)
#define GAL_ARM_DISK_DECORR 7.0        // Disk thickness decorrelation per arm

/**
 * Multi-arm spiral renderer.
 *
 * TECHNIQUE: Overlapping Rotated Elliptical Orbits with Arm Families
 * For each arm family (spaced TAU/numArms apart):
 *   For ringsPerArm concentric rings at increasing radius:
 *   1. Rotate UV by (i * TAU * twist + armOffset) — arm-spaced spirals
 *   2. Stretch inner rings x-axis (creates bar/elongation)
 *   3. Gaussian brightness at ring radius
 *   4. Procedural noise for dust lanes (decorrelated per arm)
 *   5. Two-tone dust color (cool outer, warm inner)
 *   6. Grid-based point stars with twinkle (decorrelated per arm)
 *   7. Inner rings orbit faster (Keplerian: phase / radius)
 *
 * Total ring iterations stay constant: arms * ringsPerArm ≈ numRings.
 */
vec3 _galRenderSpiral(Galaxy g, vec2 uv) {
  vec3 col = vec3(0.0);

  // Two-tone dust palette (astronomical, no green)
  // Cool = blue-white (young OB associations), warm = gold (old K/M stars)
  vec3 coolDust = vec3(0.4, 0.5, 1.0);
  vec3 warmDust = vec3(1.0, 0.75, 0.35);

  float arms = max(g.numArms, 1.0);
  float ringsPerArm = g.numRings / arms;
  float totalRings = arms * ringsPerArm;

  float t = g.time * GAL_ORBIT_SPEED;
  // Seed-based rotation direction
  t *= (mod(g.seed, 2.0) < 1.0 ? 1.0 : -1.0);

  for (int a = 0; a < GAL_MAX_ARM_FAMILIES; a++) {
    if (float(a) >= arms) break;
    float armOffset = float(a) * _GAL_TAU / arms;

    float flip = 1.0;
    for (int j = 0; j < GAL_MAX_RINGS; j++) {
      float i = float(j) / ringsPerArm;
      if (i >= 1.0) break;
      flip *= -1.0;

      // Disk thickness: decorrelated Y perturbation between rings
      float z = mix(g.diskThickness, 0.0, i) * flip
              * fract(sin((i + float(a) * GAL_ARM_DISK_DECORR) * GAL_RING_DECORR_A) * GAL_RING_DECORR_B);

      // Ring radius: inner to outer
      float r = mix(0.1, 1.0, i);

      // Slight UV offset from disk thickness
      vec2 ringUv = uv + vec2(0.0, z * 0.5);

      // Spiral twist: progressive rotation creates arm structure
      // armOffset spaces arms evenly around the disk
      vec2 st = ringUv * _galRot(i * _GAL_TAU * g.twist + armOffset);

      // Inner ring elongation (bar effect fading to circular at outer edge)
      st.x *= mix(g.innerStretch, 1.0, i);

      // Ring brightness: Gaussian peak at radius r
      float ell = exp(-0.5 * abs(dot(st, st) - r) * g.ringWidth);

      // Orbital motion UV — inner rings orbit faster (Kepler: t/r)
      vec2 texUv = GAL_DUST_UV_SCALE * st * _galRot(i * 100.0 + t / max(r, 0.01));

      // Dust detail: noise squared for contrast (dark lanes + bright knots)
      // Per-arm decorrelation via offset to avoid identical dust patterns
      float rawDust = valueNoise2D((texUv + vec2(i + float(a) * GAL_ARM_DUST_DECORR)) * GAL_DUST_NOISE_FREQ);
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
      // Per-arm decorrelation for star hash
      float n = hashN2(starId + vec2(i * 17.3 + float(a) * GAL_ARM_STAR_DECORR_A, i * 31.7));
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
  }

  // Normalize by total ring count (arms * ringsPerArm)
  col /= totalRings;

  // Radial fadeout — smooth edge
  col *= smoothstep(GAL_MAX_RADIUS, 0.7, length(uv));

  return col;
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATHERED DISK RENDERERS (non-spiral types)
// ─────────────────────────────────────────────────────────────────────────────

#define GAL_FEATHER_INNER 0.3          // Inner edge of disk feather (smoothstep)
#define GAL_FEATHER_OUTER 1.2          // Outer edge of disk feather (smoothstep)
#define GAL_FEATHER_GAUSS 2.0          // Gaussian falloff exponent for disk center
#define GAL_FEATHER_CENTER_W 0.6       // Weight of Gaussian center glow
#define GAL_FEATHER_DISK_W 0.4         // Weight of feathered disk edge
#define GAL_FEATHER_NOISE_SCALE 3.0    // UV scale for noise perturbation
#define GAL_FEATHER_NOISE_AMP 0.15     // Noise amplitude (0.15 = ±15% variation)
#define GAL_FEATHER_NOISE_BASE 0.85    // Noise base level (center of variation)

/**
 * Feathered Gaussian disk — base renderer for non-spiral types.
 *
 * TECHNIQUE: Gaussian + smoothstep disk with noise perturbation
 * Combines a central Gaussian glow with a feathered disk edge.
 * Procedural noise breaks up the smooth profile for visual interest.
 * Brightness scaled by bulgeBright for consistent per-galaxy intensity.
 */
vec3 _galRenderFeatheredDisk(Galaxy g, vec2 uv) {
  float d = length(uv);
  float disk = smoothstep(GAL_FEATHER_OUTER, GAL_FEATHER_INNER, d);
  float intensity = exp(-GAL_FEATHER_GAUSS * d * d) * GAL_FEATHER_CENTER_W
                  + disk * GAL_FEATHER_DISK_W;
  float noise = valueNoise2D(uv * GAL_FEATHER_NOISE_SCALE + vec2(g.seed))
              * GAL_FEATHER_NOISE_AMP + GAL_FEATHER_NOISE_BASE;
  return g.color * intensity * noise * g.bulgeBright;
}

/** Elliptical (E0–E7): smooth feathered glow, dominant bulge. */
vec3 _galRenderElliptical(Galaxy g, vec2 uv) {
  return _galRenderFeatheredDisk(g, uv);
}

/** Lenticular (S0): thin disc with bright bulge. */
vec3 _galRenderLenticular(Galaxy g, vec2 uv) {
  return _galRenderFeatheredDisk(g, uv);
}

/** Irregular (Irr): chaotic clumpy disk. */
vec3 _galRenderIrregular(Galaxy g, vec2 uv) {
  return _galRenderFeatheredDisk(g, uv);
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render a galaxy with polymorphic dispatch by Hubble type.
 *
 * Spiral types (0, 1) use the multi-arm ring-loop density wave renderer.
 * Non-spiral types (2, 3, 4) use feathered Gaussian disk stubs.
 * All types get a central bulge glow and per-galaxy hue tint post-multiply.
 */
vec3 renderGalaxy(Galaxy g, vec2 fragCoord) {
  vec2 uv = (fragCoord - g.center) / g.scale;
  uv = _galApplyTilt(uv * _galRot(g.angleZ), g.angleX);

  if (length(uv) > GAL_MAX_RADIUS) return vec3(0.0);

  // Polymorphic dispatch by Hubble morphology type
  vec3 col;
  if (g.type == 0 || g.type == 1) {
    // Spiral / Barred Spiral — multi-arm density wave ring-loop
    col = _galRenderSpiral(g, uv);
  } else if (g.type == 2) {
    // Elliptical — smooth feathered glow
    col = _galRenderElliptical(g, uv);
  } else if (g.type == 3) {
    // Lenticular — thin disc + bright bulge
    col = _galRenderLenticular(g, uv);
  } else {
    // Irregular — chaotic clumpy disk
    col = _galRenderIrregular(g, uv);
  }

  // Bulge glow: warm golden-white center
  vec3 bulgeTint = mix(vec3(1.0, 0.9, 0.8), g.color, 0.5);
  col += _galRenderBulge(uv, g.bulgeSize, g.bulgeBright, bulgeTint);

  // Per-galaxy hue tint (post-multiply for color diversity)
  col *= g.color;

  return col;
}
