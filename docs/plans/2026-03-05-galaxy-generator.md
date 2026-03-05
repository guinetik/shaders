# Galaxy Generator Shader — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a multi-pass WebGL2 shader that procedurally generates and displays realistic galaxy morphologies from a curated preset gallery, cycling every 7 seconds.

**Architecture:** Two-pass system—buffer-a generates particles deterministically from galaxy type + seed, image.glsl renders them as a hybrid point/glow system with realistic stellar colors. Presets cycle via `iTime`, triggering buffer regeneration on `iFrame == 0`.

**Tech Stack:** GLSL ES 3.00, Vue 3 TypeScript (for meta.json), Vite shader loader.

---

## Task 1: Scaffold Galaxy Shader Folder & Files

**Files:**
- Create: `src/shaders/galaxy-generator/meta.json`
- Create: `src/shaders/galaxy-generator/image.glsl`
- Create: `src/shaders/galaxy-generator/buffer-a.glsl`

**Step 1: Create meta.json**

Create file `src/shaders/galaxy-generator/meta.json`:

```json
{
  "title": "Galaxy Generator",
  "description": "Procedurally-generated galaxy morphologies (spiral, elliptical, irregular). Cycles through a curated preset gallery every 7 seconds.",
  "date": "2026-03-05",
  "tags": ["procedural", "particles", "astronomy", "generative"],
  "links": {},
  "channels": {
    "image": { "iChannel0": "buffer-a" },
    "bufferA": { "iChannel0": "buffer-a" }
  }
}
```

**Step 2: Create image.glsl stub**

Create file `src/shaders/galaxy-generator/image.glsl`:

```glsl
/**
 * Galaxy Generator — Image Renderer
 * @author guinetik
 * @date 2026-03-05
 *
 * Renders particles from buffer-a as a hybrid point/glow system.
 * Particles are classified as dust (points), stars (points), or bright (glows).
 * Colors follow realistic stellar hue gradients (core warm, arms blue, dust faint).
 */

#define PRESET_DURATION 7.0
#define MAX_PARTICLES 15000
#define PARTICLE_TEXTURE_WIDTH 2500

// Stub: output black canvas
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  fragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
```

**Step 3: Create buffer-a.glsl stub**

Create file `src/shaders/galaxy-generator/buffer-a.glsl`:

```glsl
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

// Stub: output white canvas
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  fragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
```

**Step 4: Run build to verify shader loads**

```bash
cd /d/Developer/shaders
npm run build 2>&1 | head -50
```

Expected: Build completes without errors. Shader appears in virtual:shader-registry.

**Step 5: Commit**

```bash
git add src/shaders/galaxy-generator/
git commit -m "feat(galaxy-generator): scaffold shader folder with stub files"
```

---

## Task 2: Implement PRNG & Hashing Utilities (buffer-a)

**Files:**
- Modify: `src/shaders/galaxy-generator/buffer-a.glsl`

**Step 1: Add PCG hash function**

Add to top of `buffer-a.glsl` (after docblock):

```glsl
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
```

**Step 2: Verify hash functions compile**

```bash
npm run lint:shaders 2>&1 | grep -i "galaxy-generator" | head -5
```

Expected: No errors from galaxy-generator shader.

**Step 3: Commit**

```bash
git add src/shaders/galaxy-generator/buffer-a.glsl
git commit -m "feat(galaxy-generator): add PCG hash utilities"
```

---

## Task 3: Implement Preset Structure & Cycling Logic

**Files:**
- Modify: `src/shaders/galaxy-generator/buffer-a.glsl`

**Step 1: Add preset struct and array**

Add after hash functions in `buffer-a.glsl`:

```glsl
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
```

**Step 2: Verify syntax**

```bash
npm run lint:shaders 2>&1 | grep "galaxy-generator"
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/shaders/galaxy-generator/buffer-a.glsl
git commit -m "feat(galaxy-generator): add preset struct and gallery"
```

---

## Task 4: Implement Spiral Particle Generator

**Files:**
- Modify: `src/shaders/galaxy-generator/buffer-a.glsl`

**Step 1: Add spiral generation function**

Add before `mainImage` in `buffer-a.glsl`:

```glsl
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
```

**Step 2: Verify syntax**

```bash
npm run lint:shaders 2>&1 | grep "galaxy-generator"
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/shaders/galaxy-generator/buffer-a.glsl
git commit -m "feat(galaxy-generator): implement spiral particle generator"
```

---

## Task 5: Implement Elliptical & Barred Spiral Generators

**Files:**
- Modify: `src/shaders/galaxy-generator/buffer-a.glsl`

**Step 1: Add elliptical generator**

Add after `generateSpiral` function:

```glsl
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
```

**Step 2: Verify syntax**

```bash
npm run lint:shaders 2>&1 | grep "galaxy-generator"
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/shaders/galaxy-generator/buffer-a.glsl
git commit -m "feat(galaxy-generator): add elliptical and barred spiral generators"
```

---

## Task 6: Implement Lenticular & Irregular Generators

**Files:**
- Modify: `src/shaders/galaxy-generator/buffer-a.glsl`

**Step 1: Add lenticular generator**

Add after `generateBarredSpiral`:

```glsl
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
```

**Step 2: Verify syntax**

```bash
npm run lint:shaders 2>&1 | grep "galaxy-generator"
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/shaders/galaxy-generator/buffer-a.glsl
git commit -m "feat(galaxy-generator): add lenticular and irregular generators"
```

---

## Task 7: Implement Buffer-A Main Loop

**Files:**
- Modify: `src/shaders/galaxy-generator/buffer-a.glsl`

**Step 1: Add particle storage & dispatch**

Update `mainImage` in `buffer-a.glsl`:

```glsl
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
```

**Step 2: Verify syntax**

```bash
npm run lint:shaders 2>&1 | grep "galaxy-generator"
```

Expected: No errors.

**Step 3: Build and preview**

```bash
cd /d/Developer/shaders && npm run preview &
```

(Open http://localhost:5173 in browser, should show black canvas from image.glsl stub)

**Step 4: Commit**

```bash
git add src/shaders/galaxy-generator/buffer-a.glsl
git commit -m "feat(galaxy-generator): implement buffer-a main loop"
```

---

## Task 8: Implement Image Renderer — Particle Sampling

**Files:**
- Modify: `src/shaders/galaxy-generator/image.glsl`

**Step 1: Replace image.glsl stub with particle sampler**

Replace entire `image.glsl`:

```glsl
/**
 * Galaxy Generator — Image Renderer
 * @author guinetik
 * @date 2026-03-05
 *
 * Renders particles from buffer-a as a hybrid point/glow system.
 * Particles are classified as dust (points), stars (points), or bright (glows).
 * Colors follow realistic stellar hue gradients (core warm, arms blue, dust faint).
 */

#define PRESET_DURATION 7.0
#define MAX_PARTICLES 15000

// ─────────────────────────────────────────────────────────────────────────────
// COLOR UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** Convert HSL to RGB (hue in degrees [0-360], s/l in [0,1]) */
vec3 hslToRgb(float hue, float sat, float light) {
  hue = mod(hue, 360.0) / 60.0;
  float c = (1.0 - abs(2.0 * light - 1.0)) * sat;
  float x = c * (1.0 - abs(mod(hue, 2.0) - 1.0));

  vec3 rgb = vec3(0.0);
  if (hue < 1.0) rgb = vec3(c, x, 0.0);
  else if (hue < 2.0) rgb = vec3(x, c, 0.0);
  else if (hue < 3.0) rgb = vec3(0.0, c, x);
  else if (hue < 4.0) rgb = vec3(0.0, x, c);
  else if (hue < 5.0) rgb = vec3(x, 0.0, c);
  else rgb = vec3(c, 0.0, x);

  float m = light - c * 0.5;
  return rgb + m;
}

/** Sample particle from buffer. Returns (x, y, hue, brightness). */
vec4 sampleParticle(int particleIndex) {
  int x = particleIndex % int(iResolution.x);
  int y = particleIndex / int(iResolution.x);
  return texelFetch(iChannel0, ivec2(x, y), 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDERING
// ─────────────────────────────────────────────────────────────────────────────

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 col = vec3(0.0); // black background

  // Sample all particles (brute force)
  for (int i = 0; i < MAX_PARTICLES; i++) {
    vec4 p = sampleParticle(i);

    // Skip empty particles
    if (length(p.xy) < 0.1) continue;

    // Particle position in screen space
    vec2 ppos = p.xy + iResolution.xy * 0.5; // center on screen
    vec2 diff = fragCoord - ppos;
    float dist = length(diff);

    // Determine particle size by brightness (bright = large halo)
    float brightness = p.w;
    float particleRadius = 2.0 + brightness * 8.0; // 2–10 pixel radius

    // Render only if within radius
    if (dist < particleRadius) {
      // Color from hue
      float hue = p.z;
      float sat = 0.8 + brightness * 0.2; // brighter = more saturated
      float light = 0.4 + brightness * 0.2; // brighter = lighter
      vec3 pcolor = hslToRgb(hue, sat, light);

      // Glow falloff
      float falloff = smoothstep(particleRadius, 0.0, dist);
      float alpha = brightness * falloff;

      col += pcolor * alpha;
    }
  }

  // Gamma correction
  col = pow(col, vec3(0.45));
  fragColor = vec4(col, 1.0);
}
```

**Step 2: Verify syntax**

```bash
npm run lint:shaders 2>&1 | grep "galaxy-generator"
```

Expected: No errors.

**Step 3: Test visually**

Open http://localhost:5173, find Galaxy Generator in the gallery. You should see particles rendered on black background.

**Step 4: Commit**

```bash
git add src/shaders/galaxy-generator/image.glsl
git commit -m "feat(galaxy-generator): implement particle renderer with HSL coloring"
```

---

## Task 9: Optimize Rendering Performance

**Files:**
- Modify: `src/shaders/galaxy-generator/image.glsl`

**Step 1: Reduce loop iterations with early termination**

Update main loop in `mainImage`:

```glsl
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 col = vec3(0.0);
  int presetIdx = int(iTime / PRESET_DURATION) % 12;

  // Approximate particle count for this preset
  int particleCount = 10000; // average

  // Early exit if too far from any particle
  vec2 centerDist = abs(fragCoord - iResolution.xy * 0.5);
  if (min(centerDist.x, centerDist.y) > 400.0) {
    // Far from center, render background
    fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  // Limit loop to particle count
  for (int i = 0; i < min(particleCount, MAX_PARTICLES); i++) {
    vec4 p = sampleParticle(i);
    if (length(p.xy) < 0.1) continue;

    vec2 ppos = p.xy + iResolution.xy * 0.5;
    vec2 diff = fragCoord - ppos;
    float dist = length(diff);

    float brightness = p.w;
    float particleRadius = 2.0 + brightness * 8.0;

    if (dist > particleRadius) continue; // skip far particles

    float hue = p.z;
    float sat = 0.8 + brightness * 0.2;
    float light = 0.4 + brightness * 0.2;
    vec3 pcolor = hslToRgb(hue, sat, light);

    float falloff = smoothstep(particleRadius, 0.0, dist);
    float alpha = brightness * falloff;
    col += pcolor * alpha;
  }

  col = pow(col, vec3(0.45));
  fragColor = vec4(col, 1.0);
}
```

**Step 2: Test performance**

Open browser dev tools (F12), check frame time in console. Should be <16ms for 60 fps.

**Step 3: Commit**

```bash
git add src/shaders/galaxy-generator/image.glsl
git commit -m "perf(galaxy-generator): optimize renderer with early termination"
```

---

## Task 10: Fine-Tune Preset Parameters

**Files:**
- Modify: `src/shaders/galaxy-generator/buffer-a.glsl`

**Step 1: Review and adjust preset array for visual appeal**

Update `PRESETS` array in `buffer-a.glsl`. Increase particle counts for clarity:

```glsl
const GalaxyPreset PRESETS[12] = GalaxyPreset[](
  GalaxyPreset(0, 12000, 320.0, 2, 25.0, 0.14, 50.0, 70.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  GalaxyPreset(0, 12000, 350.0, 2, 40.0, 0.25, 30.0, 35.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  GalaxyPreset(0, 14000, 380.0, 2, 55.0, 0.22, 25.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  GalaxyPreset(1, 12000, 320.0, 2, 30.0, 0.16, 60.0, 50.0, 140.0, 30.0, 0.0, 0.0, 0.0, 0),
  GalaxyPreset(1, 13000, 380.0, 2, 60.0, 0.35, 40.0, 0.0, 90.0, 20.0, 0.0, 0.0, 0.0, 0),
  GalaxyPreset(2, 10000, 300.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.9, 0.0, 0),
  GalaxyPreset(2, 9500, 280.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 0.5, 0.0, 0),
  GalaxyPreset(3, 11000, 300.0, 0, 0.0, 0.0, 0.0, 80.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0),
  GalaxyPreset(0, 13000, 360.0, 4, 65.0, 0.3, 40.0, 0.0, 0.0, 0.0, 0.0, 0.15, 0.0, 0),
  GalaxyPreset(4, 9000, 280.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 5),
  GalaxyPreset(4, 8500, 260.0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 3),
  GalaxyPreset(0, 13500, 370.0, 6, 70.0, 0.32, 35.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0, 0)
);
```

**Step 2: Test visually**

Reload page, observe each preset as it cycles. Should see distinct spiral arms, elliptical shapes, etc.

**Step 3: Commit**

```bash
git add src/shaders/galaxy-generator/buffer-a.glsl
git commit -m "tune(galaxy-generator): increase particle counts for visual clarity"
```

---

## Task 11: Add Optional 3D Perspective Tilt

**Files:**
- Modify: `src/shaders/galaxy-generator/image.glsl`

**Step 1: Add perspective transform**

Update particle sampling section in `image.glsl`:

```glsl
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 col = vec3(0.0);

  // Optional 3D tilt (reduce y by ~10% for shallow perspective)
  float tiltAmount = 0.1;
  vec2 fragCoordTilted = fragCoord;
  fragCoordTilted.y *= (1.0 - tiltAmount);

  int particleCount = 10000;

  for (int i = 0; i < min(particleCount, MAX_PARTICLES); i++) {
    vec4 p = sampleParticle(i);
    if (length(p.xy) < 0.1) continue;

    // Apply same tilt to particles
    vec2 ppos = p.xy + iResolution.xy * 0.5;
    ppos.y *= (1.0 - tiltAmount);

    vec2 diff = fragCoordTilted - ppos;
    float dist = length(diff);

    float brightness = p.w;
    float particleRadius = 2.0 + brightness * 8.0;
    if (dist > particleRadius) continue;

    float hue = p.z;
    float sat = 0.8 + brightness * 0.2;
    float light = 0.4 + brightness * 0.2;
    vec3 pcolor = hslToRgb(hue, sat, light);

    float falloff = smoothstep(particleRadius, 0.0, dist);
    float alpha = brightness * falloff;
    col += pcolor * alpha;
  }

  col = pow(col, vec3(0.45));
  fragColor = vec4(col, 1.0);
}
```

**Step 2: Test visually**

Reload, observe galaxy now appears slightly compressed (perspective view).

**Step 3: Commit**

```bash
git add src/shaders/galaxy-generator/image.glsl
git commit -m "feat(galaxy-generator): add optional 3D perspective tilt"
```

---

## Task 12: Final Polish & Documentation

**Files:**
- Modify: `src/shaders/galaxy-generator/buffer-a.glsl`
- Modify: `src/shaders/galaxy-generator/image.glsl`

**Step 1: Add comprehensive docblock comments**

Update docblocks in both `buffer-a.glsl` and `image.glsl` to explain algorithm flow and physics.

**Step 2: Add inline technique comments**

Add `// TECHNIQUE:` markers explaining key algorithms:

```glsl
// TECHNIQUE: Logarithmic spiral arm placement
// Stars are placed at r = spiralStart + theta / (2π * spiralTightness)
// This creates the tight/loose spiral effect observed in galaxy morphologies.
```

**Step 3: Run full build**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build completes without errors, images optimized, shaders linted.

**Step 4: Commit**

```bash
git add src/shaders/galaxy-generator/
git commit -m "docs(galaxy-generator): add comprehensive algorithm documentation"
```

---

## Task 13: Create Screenshot & Finalize

**Files:**
- Create: `src/shaders/galaxy-generator/screenshot.webp` (optional, user-captured)

**Step 1: Start preview & capture screenshots**

```bash
npm run preview &
# Navigate to http://localhost:5173, Galaxy Generator shader
# Take screenshots of different presets as they cycle
# Save best 1-2 as screenshot.webp
```

**Step 2: Optional: Add screenshot to folder**

If user captures a screenshot, place at `src/shaders/galaxy-generator/screenshot.webp`

**Step 3: Final verification**

```bash
npm run build
npm run preview
```

Open gallery, confirm Galaxy Generator displays correctly with thumbnail (if added).

**Step 4: Final commit**

```bash
git add src/shaders/galaxy-generator/
git commit -m "feat(galaxy-generator): complete and ready for deployment"
```

---

## Summary

**Total tasks:** 13 (phased: Foundation → Generators → Rendering → Polish)

**Estimated duration:** 2–4 hours (depending on optimization and fine-tuning)

**Deliverable:** Full Galaxy Generator shader cycling through 12 curated presets every 7 seconds.

**Next steps (post-shader):**
1. Capture screenshots of galaxies over time
2. Use images in sibling "galaxies" project as content
3. Optional: Expand preset gallery or add interactive parameter controls (future enhancement)

---

## Plan complete and saved to `docs/plans/2026-03-05-galaxy-generator.md`.

**Two execution options:**

**Option 1: Subagent-Driven (this session)** — I dispatch a fresh subagent per task, review code between tasks. Fast iteration, immediate feedback.

**Option 2: Parallel Session (separate)** — You open a new session with the executing-plans skill in a worktree, batching multiple tasks with checkpoints.

Which approach works best for you?
