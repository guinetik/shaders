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
  // 0: Tight Spiral (SAa)
  GalaxyPreset(0, 10000, 320.0, 2, 25.0, 0.14, 50.0, 70.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  // 1: Medium Spiral (SAb)
  GalaxyPreset(0, 10000, 350.0, 2, 40.0, 0.25, 30.0, 35.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  // 2: Grand-Design Spiral (SAc)
  GalaxyPreset(0, 12000, 380.0, 2, 55.0, 0.22, 25.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  // 3: Barred Tight (SBa)
  GalaxyPreset(1, 10000, 320.0, 2, 30.0, 0.16, 60.0, 50.0, 140.0, 30.0, 0.0, 0.0, 0.0, 0),
  // 4: Barred Open (SBc)
  GalaxyPreset(1, 11000, 380.0, 2, 60.0, 0.35, 40.0, 0.0, 90.0, 20.0, 0.0, 0.0, 0.0, 0),
  // 5: Spherical Elliptical (E0)
  GalaxyPreset(2, 9000, 300.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.9, 0.0, 0),
  // 6: Elongated Elliptical (E7)
  GalaxyPreset(2, 8500, 280.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 0.5, 0.0, 0),
  // 7: Lenticular (S0)
  GalaxyPreset(3, 10500, 300.0, 0, 0.0, 0.0, 0.0, 80.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  // 8: Flocculent Spiral (SAd)
  GalaxyPreset(0, 10500, 360.0, 4, 65.0, 0.3, 40.0, 0.0, 0.0, 0.0, 0.0, 0.15, 0.0, 0),
  // 9: Clumpy Irregular (Irr-I)
  GalaxyPreset(4, 8000, 280.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 5),
  // 10: Scattered Irregular (Irr-II)
  GalaxyPreset(4, 7500, 260.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 3),
  // 11: Flocculent Open (SAd variant)
  GalaxyPreset(0, 11000, 370.0, 6, 70.0, 0.32, 35.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0, 0)
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

// Stub: output white canvas
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  fragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
