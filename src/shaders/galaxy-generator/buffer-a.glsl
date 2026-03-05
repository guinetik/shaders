/**
 * Galaxy Generator — Particle Generation
 * @author guinetik
 * @date 2026-03-05
 *
 * Generates particle positions for galaxy types (spiral, barred, elliptical, irregular).
 * Runs once per preset cycle (iFrame == 0). Stores particles in texture rows.
 */

#define PRESET_DURATION 7.0
#define MAX_PARTICLES 15000

// ─────────────────────────────────────────────────────────────────────────────
// PSEUDO-RANDOM NUMBER GENERATION
// ─────────────────────────────────────────────────────────────────────────────

/** PCG hash function: uint → uint (deterministic, good distribution) */
uint pcgHash(uint x) {
  uint state = x * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

/** Float from [0, 1) using PCG hash */
float hash(uint seed) {
  return float(pcgHash(seed)) * (1.0 / 4294967296.0);
}

/** Seeded random in range [a, b) */
float hashRange(uint seed, float a, float b) {
  return a + hash(seed) * (b - a);
}

/** 2D hash from two seeds */
vec2 hash2(uint seed) {
  uint h0 = pcgHash(seed);
  uint h1 = pcgHash(h0 + 1u);
  return vec2(float(h0) / 4294967296.0, float(h1) / 4294967296.0);
}

// ─────────────────────────────────────────────────────────────────────────────
// GALAXY PRESET DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

struct GalaxyPreset {
  int type;                // 0=spiral, 1=barred, 2=elliptical, 3=lenticular, 4=irregular
  int numParticles;
  float galaxyRadius;
  int numArms;
  float armWidth;
  float spiralTightness;
  float spiralStart;
  float bulgeRadius;
  float barLength;
  float barWidth;
  float ellipticity;
  float axisRatio;
  float irregularity;
  int clumpCount;
};

// Preset gallery (12 presets)
const GalaxyPreset PRESETS[12] = GalaxyPreset[](
  // 0: Tight Spiral (SAa) — 12000 particles for clarity
  GalaxyPreset(0, 12000, 320.0, 2, 25.0, 0.14, 50.0, 70.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  // 1: Medium Spiral (SAb) — 12000 particles
  GalaxyPreset(0, 12000, 350.0, 2, 40.0, 0.25, 30.0, 35.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  // 2: Grand-Design Spiral (SAc) — 14000 particles for largest
  GalaxyPreset(0, 14000, 380.0, 2, 55.0, 0.22, 25.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  // 3: Barred Tight (SBa) — 12000 particles
  GalaxyPreset(1, 12000, 320.0, 2, 30.0, 0.16, 60.0, 50.0, 140.0, 30.0, 0.0, 0.0, 0.0, 0),
  // 4: Barred Open (SBc) — 13000 particles
  GalaxyPreset(1, 13000, 380.0, 2, 60.0, 0.35, 40.0, 0.0, 90.0, 20.0, 0.0, 0.0, 0.0, 0),
  // 5: Spherical Elliptical (E0) — 10000 particles
  GalaxyPreset(2, 10000, 300.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.9, 0.0, 0),
  // 6: Elongated Elliptical (E7) — 9500 particles
  GalaxyPreset(2, 9500, 280.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 0.5, 0.0, 0),
  // 7: Lenticular (S0) — 11000 particles
  GalaxyPreset(3, 11000, 300.0, 0, 0.0, 0.0, 0.0, 80.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  // 8: Flocculent Spiral (SAd) — 13000 particles
  GalaxyPreset(0, 13000, 360.0, 4, 65.0, 0.3, 40.0, 0.0, 0.0, 0.0, 0.0, 0.15, 0.0, 0),
  // 9: Clumpy Irregular (Irr-I) — 9000 particles
  GalaxyPreset(4, 9000, 280.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 5),
  // 10: Scattered Irregular (Irr-II) — 8500 particles
  GalaxyPreset(4, 8500, 260.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 3),
  // 11: Flocculent Open (SAd variant) — 13500 particles
  GalaxyPreset(0, 13500, 370.0, 6, 70.0, 0.32, 35.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0, 0)
);

#define PRESET_COUNT 12

/** Get current preset based on iTime */
GalaxyPreset getCurrentPreset() {
  int idx = int(iTime / PRESET_DURATION) % PRESET_COUNT;
  return PRESETS[idx];
}

/** Get current preset index */
int getCurrentPresetIndex() {
  return int(iTime / PRESET_DURATION) % PRESET_COUNT;
}

// ─────────────────────────────────────────────────────────────────────────────
// PARTICLE GENERATION ALGORITHMS
// ─────────────────────────────────────────────────────────────────────────────

/** Generate particles along logarithmic spiral arms. */
void generateSpiral(GalaxyPreset preset, uint baseSeed, inout vec4 particle, in int particleIndex) {
  int numArms = preset.numArms;
  float armWidth = preset.armWidth;
  float spiralTightness = preset.spiralTightness;
  float spiralStart = preset.spiralStart;
  float bulgeRadius = preset.bulgeRadius;

  // Seed this particle
  uint seed = baseSeed + uint(particleIndex);

  // Decide: bulge or arm?
  float bulgeChance = 0.15;
  if (bulgeRadius > 0.001 && hash(seed) < bulgeChance) {
    // Place in bulge (simple radial distribution)
    float r = sqrt(hash(seed + 1u)) * bulgeRadius;
    float theta = hash(seed + 2u) * 6.28318;
    particle.x = r * cos(theta);
    particle.y = r * sin(theta);
  } else {
    // Place along spiral arm
    int armIdx = particleIndex % numArms;
    float armTheta = (float(particleIndex) / float(preset.numParticles)) * 6.28318 * float(numArms);
    float r = spiralStart + armTheta / (6.28318 * spiralTightness);
    r *= 0.85 + 0.3 * hash(seed + 3u); // logarithmic scatter

    // Add perpendicular scatter (arm width)
    float scatter = (hash(seed + 4u) - 0.5) * armWidth;
    float perpTheta = armTheta + scatter / max(r, 1.0);

    particle.x = r * cos(perpTheta);
    particle.y = r * sin(perpTheta);
  }

  // Assign color hue based on distance (core warm → arms cool)
  float dist = length(particle.xy);
  float distFactor = clamp(dist / preset.galaxyRadius, 0.0, 1.0);
  float hue = mix(45.0, 215.0, distFactor); // 45=warm gold, 215=cool blue
  particle.z = hue;

  // Assign brightness (layer assignment)
  float roll = hash(seed + 5u);
  float brightness;
  if (roll < 0.65) {
    brightness = 0.08 + hash(seed + 6u) * 0.16; // dust layer
  } else if (roll < 0.97) {
    brightness = 0.32 + hash(seed + 6u) * 0.4; // star layer
  } else {
    brightness = 0.64 + hash(seed + 6u) * 0.16; // bright layer
  }
  particle.w = brightness;
}

/** Generate particles in elliptical distribution (Sérsic-like falloff). */
void generateElliptical(GalaxyPreset preset, uint baseSeed, inout vec4 particle, in int particleIndex) {
  uint seed = baseSeed + uint(particleIndex);

  // Radial distribution with inverse-square falloff
  float u = hash(seed);
  float r = preset.galaxyRadius * pow(u, 0.4); // concentrated toward center
  float theta = hash(seed + 1u) * 6.28318;

  // Apply ellipticity (axis ratio)
  float x = r * cos(theta);
  float y = r * sin(theta) * preset.axisRatio;

  particle.x = x;
  particle.y = y;

  // Color: slightly warmer (more old stars)
  float dist = length(vec2(x, y / preset.axisRatio));
  float distFactor = clamp(dist / preset.galaxyRadius, 0.0, 1.0);
  float hue = mix(35.0, 180.0, distFactor * 0.7); // shifted warmer
  particle.z = hue;

  // Brightness: mostly dim in ellipticals
  float brightness = 0.15 + hash(seed + 2u) * 0.35;
  particle.w = brightness;
}

/** Generate particles along barred spiral (bar + spiral arms). */
void generateBarredSpiral(GalaxyPreset preset, uint baseSeed, inout vec4 particle, in int particleIndex) {
  uint seed = baseSeed + uint(particleIndex);

  float barChance = 0.25; // 25% of particles in bar
  if (hash(seed) < barChance) {
    // Place in bar
    float x = (hash(seed + 1u) - 0.5) * preset.barLength;
    float y = (hash(seed + 2u) - 0.5) * preset.barWidth;
    particle.x = x;
    particle.y = y;
  } else {
    // Place along spiral arms (reuse spiral logic)
    float armWidth = preset.armWidth;
    float spiralTightness = preset.spiralTightness;
    float spiralStart = preset.spiralStart;

    int numArms = preset.numArms;
    float armTheta = (float(particleIndex) / float(preset.numParticles)) * 6.28318 * float(numArms);
    float r = spiralStart + armTheta / (6.28318 * spiralTightness);
    r *= 0.85 + 0.3 * hash(seed + 3u);

    float scatter = (hash(seed + 4u) - 0.5) * armWidth;
    float perpTheta = armTheta + scatter / max(r, 1.0);

    particle.x = r * cos(perpTheta);
    particle.y = r * sin(perpTheta);
  }

  // Color: arm-biased hues
  float dist = length(particle.xy);
  float distFactor = clamp(dist / preset.galaxyRadius, 0.0, 1.0);
  float hue = mix(50.0, 220.0, distFactor);
  particle.z = hue;

  // Brightness
  float roll = hash(seed + 5u);
  float brightness;
  if (roll < 0.6) {
    brightness = 0.1 + hash(seed + 6u) * 0.2;
  } else if (roll < 0.95) {
    brightness = 0.35 + hash(seed + 6u) * 0.35;
  } else {
    brightness = 0.65 + hash(seed + 6u) * 0.15;
  }
  particle.w = brightness;
}

/** Generate particles for lenticular (disk + bulge). */
void generateLenticular(GalaxyPreset preset, uint baseSeed, inout vec4 particle, in int particleIndex) {
  uint seed = baseSeed + uint(particleIndex);

  float bulgeFraction = 0.3; // ~30% in bulge
  if (hash(seed) < bulgeFraction) {
    // Bulge: spherical
    float r = sqrt(hash(seed + 1u)) * preset.bulgeRadius;
    float theta = hash(seed + 2u) * 6.28318;
    particle.x = r * cos(theta);
    particle.y = r * sin(theta);
  } else {
    // Disk: thin radial distribution
    float r = preset.galaxyRadius * pow(hash(seed + 1u), 0.5);
    float theta = hash(seed + 2u) * 6.28318;
    float diskThick = 0.05 * preset.galaxyRadius;
    float y = (hash(seed + 3u) - 0.5) * diskThick;

    particle.x = r * cos(theta);
    particle.y = y;
  }

  // Color: intermediate (transition population)
  float dist = length(particle.xy);
  float distFactor = clamp(dist / preset.galaxyRadius, 0.0, 1.0);
  float hue = mix(40.0, 200.0, distFactor * 0.6);
  particle.z = hue;

  // Brightness: moderate
  float brightness = 0.2 + hash(seed + 4u) * 0.35;
  particle.w = brightness;
}

/** Generate particles in irregular clumpy distribution. */
void generateIrregular(GalaxyPreset preset, uint baseSeed, inout vec4 particle, in int particleIndex) {
  uint seed = baseSeed + uint(particleIndex);

  int clumpCount = max(preset.clumpCount, 1);
  int clumpIdx = particleIndex % clumpCount;

  // Random clump center
  uint clumpSeed = baseSeed + uint(clumpIdx) * 1000u;
  float clumpTheta = hash(clumpSeed) * 6.28318;
  float clumpR = preset.galaxyRadius * 0.5 * (0.3 + 0.7 * hash(clumpSeed + 1u));
  float clumpCx = clumpR * cos(clumpTheta);
  float clumpCy = clumpR * sin(clumpTheta);

  // Scatter particles around clump
  float scatterRad = preset.galaxyRadius * 0.15;
  float scatter = scatterRad * pow(hash(seed), 0.5);
  float scatterTheta = hash(seed + 1u) * 6.28318;

  particle.x = clumpCx + scatter * cos(scatterTheta);
  particle.y = clumpCy + scatter * sin(scatterTheta);

  // Color: varied (young stars, dust)
  float roll = hash(seed + 2u);
  float hue;
  if (roll < 0.5) {
    hue = 10.0 + hash(seed + 3u) * 40.0; // red-orange old
  } else {
    hue = 200.0 + hash(seed + 3u) * 50.0; // blue-white young
  }
  particle.z = hue;

  // Brightness
  float brightness = 0.12 + hash(seed + 4u) * 0.38;
  particle.w = brightness;
}

// ─────────────────────────────────────────────────────────────────────────────
// BUFFER MAINTENANCE & PARTICLE GENERATION
// ─────────────────────────────────────────────────────────────────────────────

/** Dispatch particle generation based on preset type. */
void generateParticle(GalaxyPreset preset, uint baseSeed, inout vec4 particle, in int particleIndex) {
  particle = vec4(0.0); // default

  switch(preset.type) {
    case 0: // spiral
      generateSpiral(preset, baseSeed, particle, particleIndex);
      break;
    case 1: // barred
      generateBarredSpiral(preset, baseSeed, particle, particleIndex);
      break;
    case 2: // elliptical
      generateElliptical(preset, baseSeed, particle, particleIndex);
      break;
    case 3: // lenticular
      generateLenticular(preset, baseSeed, particle, particleIndex);
      break;
    case 4: // irregular
      generateIrregular(preset, baseSeed, particle, particleIndex);
      break;
  }
}

/** Main image pass: generate or persist particles. */
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  GalaxyPreset preset = getCurrentPreset();
  int presetIdx = getCurrentPresetIndex();

  // Seed from preset index (changes every cycle)
  uint baseSeed = uint(presetIdx) * 12345u;

  // Map fragCoord to particle index (row-major layout)
  int particleIndex = int(fragCoord.y) * int(iResolution.x) + int(fragCoord.x);

  vec4 particle = vec4(0.0);

  // Generate if within particle count, otherwise empty
  if (particleIndex < preset.numParticles && iFrame == 0) {
    generateParticle(preset, baseSeed, particle, particleIndex);
  } else if (particleIndex >= preset.numParticles) {
    particle = vec4(0.0);
  } else {
    // Persist previous frame's particle
    particle = texture(iChannel0, fragCoord / iResolution.xy);
  }

  fragColor = particle;
}
