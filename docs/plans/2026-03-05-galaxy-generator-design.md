# Galaxy Generator Shader — Design

**Date:** 2026-03-05
**Status:** Approved

## Overview

A procedurally-generated galaxy shader for the Shadertoy portfolio. Displays a rotating particle-based galaxy, cycling through a curated preset gallery every 5–10 seconds. Each galaxy is statically rendered (no animation), but the shader regenerates new presets on a timer. Later, the user will capture screenshots of generated galaxies to use in the sibling "galaxies" project.

**Target:** Static single-galaxy-per-frame rendering with realistic Hubble morphologies (spirals, barred spirals, ellipticals, irregulars).

---

## Architecture

### Multi-Pass Design

**buffer-a.glsl** — Particle Generation Engine
- Runs once per preset (when `iFrame == 0` or timer triggers new preset)
- Generates particle cloud deterministically based on galaxy type + seed
- Stores particles as (x, y, color, brightness) tuples in texture rows
- Updates every 5–10 seconds (configurable `PRESET_DURATION`)

**image.glsl** — Particle Renderer
- Samples particle buffer from buffer-a
- Renders each particle as:
  - **Dim/dust:** Single-pixel point sprite, low alpha
  - **Bright:** Multi-pixel glow circle with distance falloff
- Applies color based on layer + stellar hue distribution
- Optional z-tilt for 3D perspective (galaxy viewed at shallow angle)

**meta.json**
```json
{
  "title": "Galaxy Generator",
  "description": "Procedurally-generated galaxy morphologies (spiral, elliptical, irregular). Cycles through a curated preset gallery.",
  "date": "2026-03-05",
  "tags": ["procedural", "particles", "astronomy", "generative"],
  "channels": {
    "image": { "iChannel0": "buffer-a" },
    "bufferA": { "iChannel0": "buffer-a" }
  }
}
```

---

## Galaxy Types & Presets

Support all Hubble sequence types:

### 1. Spiral Galaxies (3 variants)
- **Tight spiral (SAa):** `spiralTightness=0.14`, `armWidth=25`, `bulgeRadius=70`
- **Medium spiral (SAb):** `spiralTightness=0.25`, `armWidth=40`, `bulgeRadius=35`
- **Grand-design (SAc):** `spiralTightness=0.22`, `armWidth=55`, `bulgeRadius=0`

### 2. Barred Spirals (2 variants)
- **Barred tight (SBa):** Bar length 140, arm width 30, pitch 0.16
- **Barred open (SBc):** Bar length 90, arm width 60, pitch 0.35

### 3. Elliptical (2 variants)
- **Spherical:** `ellipticity=0.3`, `axisRatio=0.9`
- **Elongated:** `ellipticity=0.7`, `axisRatio=0.5`

### 4. Lenticular (1 variant)
- Disk + bulge, no arms: `bulgeRadius=80`, `diskThickness=4`

### 5. Irregular (2 variants)
- **Clumpy:** `irregularity=0.8`, `clumpCount=5`
- **Scattered:** `irregularity=0.5`, `clumpCount=3`

**Total: 12–15 presets,** cycled via `iTime / PRESET_DURATION`.

---

## Particle Generation Algorithm (buffer-a)

Each galaxy type generates particles deterministically from a seed:

### Spiral & Barred Spiral

1. **Logarithmic spiral placement:**
   - For each spiral arm: `r(θ) = spiralStart + θ / (2π * spiralTightness)`
   - Distribute N particles along each arm logarithmically (more at outer radius)
   - Scatter perpendicular to spiral by `±armWidth` pixels (using seeded PRNG)

2. **Keplerian rotation:**
   - Assign rotation speed: `ω(r) = baseSpeed / sqrt(r)` (realistic differential rotation)
   - Store in particle brightness channel or separate texture row

3. **Bulge/bar component:**
   - If `bulgeRadius > 0`, add bulge stars: random distribution within circle of radius `bulgeRadius`
   - If barred, populate bar structure with higher density along bar axis

### Elliptical

1. **Radial distribution:**
   - Use Sérsic profile (or simple inverse-square falloff): density ∝ `exp(-r/scale)`
   - Generate particles uniformly in radius, then apply ellipticity: `x *= axisRatio`

### Lenticular

1. **Disk + bulge:**
   - Bulge: same as elliptical center
   - Disk: radial + thin vertical scattering (`diskThickness`)

### Irregular

1. **Clumpy placement:**
   - Define `clumpCount` Gaussian clumps at random positions
   - Assign particles to clumps, scatter around clump centers
   - Add noise to prevent obvious patterns

### Layer Assignment

Classify each particle:
- **Dust** (65%): `brightness ∈ [0.08, 0.24]`, `size ∈ [0.8, 2.3]`
- **Star** (32%): `brightness ∈ [0.32, 0.72]`, `size ∈ [1.5, 4.5]`
- **Bright** (3%): `brightness ∈ [0.64, 0.80]`, `size ∈ [4.0, 10.0]`

### Texture Storage

**Layout:** Particles stored in `buffer-a` as rows of texels.
- Each row: 4 particles per row (2 per texel in RGBA)
- Format per particle: `(posX, posY, colorHue, brightness)`
- Example: 10,000 particles → ~2,500 texels → 1 row of width 2500 (or 25 rows × 100 width)
- Max addressable: `2^16` particles with 16-bit texture addressing

---

## Rendering (image.glsl)

### Particle Drawing

1. **Sample particle buffer:**
   ```glsl
   vec4 particle = texelFetch(iChannel0, particleCoord, 0);
   vec2 pos = particle.xy;
   float hue = particle.z;
   float brightness = particle.w;
   ```

2. **Render to screen:**
   - For each fragment, find nearest particles (brute force or spatial grid)
   - If distance < particle size:
     - **Dust/dim:** alpha blend single pixel
     - **Bright:** apply circular falloff: `falloff = smoothstep(radius, 0.0, distance)`
   - Accumulate color with proper blending

3. **Stellar color:**
   - Convert hue to RGB (HSL to RGB conversion)
   - Core (inner radius): warm (gold/orange, hue 20–60)
   - Arms (outer radius): cool (blue-white, hue 200–240)
   - Dust: faint nebular (blue-violet, hue 240–280)
   - Transition smoothly based on particle radial distance

4. **Optional 3D tilt:**
   - Apply shallow z-rotation for perspective: scale y by `cos(tiltAngle) ≈ 0.9`
   - Helps galaxy appear less flat

---

## State & Configuration

### Preset Structure (GLSL)

```glsl
struct GalaxyPreset {
  int type;                  // 0=spiral, 1=barred, 2=elliptical, 3=lenticular, 4=irregular
  int numParticles;          // 8000–15000
  float galaxyRadius;        // outer extent (pixels)

  // Spiral-specific
  int numArms;
  float armWidth;
  float spiralTightness;
  float spiralStart;         // inner spiral radius

  // Core/bulge
  float bulgeRadius;
  float bulgeFraction;       // for lenticular disk thickness

  // Bar (barred spirals)
  float barLength;
  float barWidth;

  // Elliptical
  float ellipticity;         // 0–0.95
  float axisRatio;           // b/a, 0.2–1.0

  // Irregular
  float irregularity;
  int clumpCount;

  // Color palette seed
  uint seed;
};
```

### Preset Cycling

- Array of `PRESET_COUNT` presets (12–15)
- Timer: `presetIndex = int(iTime / PRESET_DURATION) % PRESET_COUNT`
- On `iFrame == 0` after timer flip, buffer-a regenerates
- Optional `iMouse.x` override: user can manually cycle with mouse (for interactive testing)

### Constants

```glsl
#define PRESET_DURATION 7.0        // seconds per galaxy
#define MAX_PARTICLES 15000
#define PARTICLE_TEXTURE_WIDTH 2500
#define TEXTURE_FORMAT RGBA16F

// Visual tuning
#define DUST_BRIGHTNESS_MIN 0.08
#define DUST_BRIGHTNESS_MAX 0.24
#define BRIGHT_BRIGHTNESS_MIN 0.64
#define BRIGHT_BRIGHTNESS_MAX 0.80

// Color ranges (hue in degrees)
#define CORE_HUE_MIN 40.0
#define CORE_HUE_MAX 60.0
#define ARM_HUE_MIN 200.0
#define ARM_HUE_MAX 240.0
#define DUST_HUE_MIN 240.0
#define DUST_HUE_MAX 280.0

// Physics
#define ROTATION_BASE_SPEED 0.033
#define ROTATION_REFERENCE_RADIUS 20.0
```

---

## Implementation Tasks

### Phase 1: Foundation
1. Scaffold new shader folder: `src/shaders/galaxy-generator/`
2. Create `image.glsl` stub (simple black canvas)
3. Create `buffer-a.glsl` stub (output white placeholder)
4. Create `meta.json` with multi-pass config
5. Verify renderer recognizes and loads the shader

### Phase 2: Particle Generation (buffer-a)
1. Implement seeded PRNG (PCG hash)
2. Implement spiral arm placement algorithm
3. Implement layer assignment (dust/star/bright)
4. Implement Keplerian rotation speed calculation
5. Implement texture storage (pack 4 particles per texel)
6. Add preset array + cycling logic

### Phase 3: Type-Specific Generators
1. Implement barred spiral generator
2. Implement elliptical generator
3. Implement lenticular generator
4. Implement irregular generator
5. Test all 12–15 presets visually

### Phase 4: Rendering (image.glsl)
1. Implement particle sampling from buffer
2. Implement point sprite rendering (dim particles)
3. Implement glow circle rendering (bright particles)
4. Implement stellar color assignment (HSL → RGB, hue gradient)
5. Implement optional 3D tilt effect
6. Fine-tune sizes, alphas, glows for visual appeal

### Phase 5: Polish & Optimization
1. Tune preset gallery (adjust parameters for best visuals)
2. Profile frame time (target 60 fps)
3. Optimize particle search (spatial grid if needed)
4. Add comments & documentation
5. Capture preview screenshots

---

## Success Criteria

- ✅ Shader loads in gallery without errors
- ✅ All 12–15 presets generate and display correctly
- ✅ Particles respect morphology (spirals show arms, ellipticals show smooth distribution, etc.)
- ✅ Colors match stellar hue distribution (core warm, arms cool, dust faint)
- ✅ Runs at 60 fps on typical hardware (WebGL2, no extensions)
- ✅ Presets cycle smoothly every 5–10 seconds
- ✅ Screenshot capture workflow is smooth (user can screenshot galleries)

---

## Notes

- **Reference:** gcanvas `galaxy.generator.js` and `galaxy.config.js` for algorithm details
- **Gallery usage:** Once shader is complete, user captures screenshots of different presets for use in the "galaxies" project
- **No animation:** Particles are static per frame (no twinkling or movement); only preset cycling creates visual change
- **Realistic morphology:** Prioritize accurate Hubble sequence representation over hand-crafted aesthetics
- **Stellar colors:** Use realistic blackbody sequence (M dwarfs red → O stars blue) instead of arbitrary palettes
