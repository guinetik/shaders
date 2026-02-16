# 10-Days Shader Quality Pass — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Full quality pass on the 7 "10-days" study shaders — commons migration, gamma correction, `#define` constants, documentation.

**Architecture:** Extend existing commons library (noise-value, color) and create one new common (noise-perlin). Then improve each shader individually.

**Tech Stack:** GLSL ES 3.00, Vite plugin (already supports commons)

---

## Phase 1: Commons Updates

### Task 1: Create noise-perlin.glsl

**Files:**
- Create: `src/lib/noise-perlin.glsl`

Create a new Perlin gradient noise common with quintic interpolation (C2 continuity). Functions:

- `perlinGrad3(vec3 p)` → `vec3` — gradient vector hash using dot-product + sin family. Same implementation as plasma/ripples `hash3`.
- `perlinNoise3D(vec3 p)` → `float` — 3D Perlin noise with quintic smoothing `f*f*f*(f*(f*6-15)+10)`. Trilinear interpolation of gradient dot products at 8 cube corners.
- `perlinFbm(vec3 pos, int octaves, float lacunarity, float gain)` → `float` — Parameterized FBM summing multiple octaves. Same loop pattern as `fbmValue` in noise-value.glsl (max 8 octaves, normalize by total weight, offset between octaves).

Follow the documentation style of existing commons (file-level docblock, TSDoc-style param docs, noise algorithm choice comment).

### Task 2: Extend color.glsl with HSV

**Files:**
- Modify: `src/lib/color.glsl`

Add two functions after the existing `hsl2rgb`:

- `rgb2hsv(vec3 c)` → `vec3` — RGB to HSV. Use the standard min/max/delta algorithm (same as stargate's current implementation).
- `hsv2rgb(vec3 c)` → `vec3` — HSV to RGB. Use the `fract(c.xxx + K.xyz) * 6.0 - K.www` technique (same as stargate's current implementation).

Add section header `// === HSV CONVERSIONS ===` before the new functions.

### Task 3: Extend noise-value.glsl with 2D FBM

**Files:**
- Modify: `src/lib/noise-value.glsl`

Add after the existing `fbmValue` function:

- `fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain)` → `float` — 2D FBM using `valueNoise2D`. Same pattern as `fbmValue` (max 8 octaves, normalize by total, offset between octaves with `vec2(0.23, 0.77)`).

### Task 4: Commit Phase 1

Commit all commons changes together.

---

## Phase 2: Shader Quality Passes

### Task 5: Quality pass — gravity-well

**Files:**
- Modify: `src/shaders/gravity-well/image.glsl`

**Commons:** None needed.

**`#define` constants to extract:**
- Central well oscillation amplitudes (0.15), mass base/amplitude (0.06, 0.02), softness (0.01)
- Orbit count (4), orbit radius base/amplitude (0.35, 0.1), orbit mass base (0.025), orbit softness (0.015)
- Glow radii (0.25 center, 0.15 orbit), brightness boost (1.5, 0.3)
- Core radii (0.06/0.02 center, 0.04/0.015 orbit), core alpha (0.9, 0.85)
- Vignette strength (0.5), contrast power (0.95)

**Gamma:** Add `pow(max(color, vec3(0.0)), vec3(0.45))` before final output.

**Docs:** Ensure TECHNIQUE comments on gravityWarp inverse-square model.

### Task 6: Quality pass — waves

**Files:**
- Modify: `src/shaders/waves/image.glsl`

**Commons:** None needed.

**`#define` constants to extract:**
- Wave layer frequencies (4.0/3.0, 8.0/6.0, 15.0/12.0), amplitudes (0.03, 0.015/0.02, 0.008)
- Wave speeds per layer (1.2/1.0, 1.8/1.5, 3.0/2.5)
- Ripple frequency (30.0), ripple speed (4.0), ripple amplitude (0.02), decay radius (0.8)
- Interference source count (4), interference freq (20.0), speed (3.0), amplitude (0.01)
- Shimmer frequencies (40.0, 80.0), speeds (5.0, 8.0), amplitudes (0.003, 0.001)
- Vignette (0.4), displacement highlight scale (20.0, 0.3)

**Gamma:** Add gamma correction before final output.

**Docs:** Verify TECHNIQUE comments on wave spectra are complete.

### Task 7: Quality pass — domain-warping

**Files:**
- Modify: `src/shaders/domain-warping/image.glsl`
- Modify: `src/shaders/domain-warping/meta.json`

**Commons:** Add `"commons": ["noise-value"]` to meta.json.

**Inline code to remove:**
- `hash(vec2 p)` — replaced by `hashN2(vec2)` from noise-value
- `noise(vec2 p)` — replaced by `valueNoise2D(vec2)` from noise-value
- `fbm(vec2 p)` — replaced by `fbmValue2D(vec2, 6, 2.0, 0.5)` from noise-value

**Call site renames:**
- `hash(...)` → `hashN2(...)`
- `noise(...)` → `valueNoise2D(...)`
- `fbm(p)` → `fbmValue2D(p, 6, 2.0, 0.5)` (6 octaves, lacunarity 2.0, gain 0.5)

**Keep inline:** `rotate(vec2, float)` — too trivial for a common.

**`#define` constants to extract:**
- FBM warp scales (2.0, 2.5, 1.5, 1.8), time multipliers (0.3, 0.35, 0.4, 0.38, 0.25)
- Mouse influence radius (1.2), warp multipliers (0.4, 2.5, 0.3, 0.4)
- Ring frequencies (8.0, 12.0), speeds (4.0, 6.0)
- Vignette (0.4)

**Gamma:** Add gamma correction.

### Task 8: Quality pass — plasma

**Files:**
- Modify: `src/shaders/plasma/image.glsl`
- Modify: `src/shaders/plasma/meta.json`

**Commons:** Add `"commons": ["noise-perlin"]` to meta.json.

**Inline code to remove:**
- `hash3(vec3 p)` — replaced by `perlinGrad3(vec3)` from noise-perlin
- `perlin3D(vec3 p)` — replaced by `perlinNoise3D(vec3)` from noise-perlin
- `perlinFBM(vec3 p)` — replaced by `perlinFbm(vec3, 5, 2.0, 0.5)` from noise-perlin

**Call site renames:**
- `perlin3D(...)` → `perlinNoise3D(...)`
- `perlinFBM(...)` → `perlinFbm(..., 5, 2.0, 0.5)`

**Keep inline:** `plasma()`, `perlinWarp()`, `plasmaColor()`, `hotPlasma()`, `electricPlasma()` — all shader-specific.

**`#define` constants to extract:**
- Plasma sine frequencies (3.0, 2.7, 2.5, 4.0, 5.0), time multipliers
- Perlin noise scales (1.5, 0.8, 2.0, 4.0), time speeds (0.4, 0.3, 0.25, 0.6)
- Warp intensity (0.3)
- Scanline frequency (400.0), strength (0.03)
- Palette cycle speed (0.1), blend amounts
- Vignette (0.5)

**Gamma:** Add gamma correction.

### Task 9: Quality pass — ripples

**Files:**
- Modify: `src/shaders/ripples/image.glsl`
- Modify: `src/shaders/ripples/meta.json`

**Commons:** Add `"commons": ["noise-perlin", "noise-value"]` to meta.json.

**Inline code to remove:**
- `hash3(vec3 p)` — replaced by `perlinGrad3(vec3)` from noise-perlin
- `hash(float n)` — replaced by `hashN(float)` from noise-value
- `noise3D(vec3 p)` — replaced by `perlinNoise3D(vec3)` from noise-perlin (upgrade from cubic to quintic interpolation — improves smoothness)

**Call site renames:**
- `noise3D(...)` → `perlinNoise3D(...)`
- `hash(fi * ...)` → `hashN(fi * ...)`

**`#define` constants to extract:**
- Source count (6), wander speed (0.3, 0.25), wander amplitude (0.8)
- Ripple base freq (15.0), freq range (20.0), speed range (2.0-5.0)
- Displacement scale (0.015), turbulence scale (4.0, 0.4), turbulence strength (0.03)
- Burst frequency (0.5), burst ripple freq (25.0), burst speed (15.0), burst strength (0.025)
- Refraction scale (20.0, 0.5), specular power (6.0, 0.4)
- Vignette (0.4)

**Gamma:** Add gamma correction.

### Task 10: Quality pass — kaleidoscopic

**Files:**
- Modify: `src/shaders/kaleidoscopic/image.glsl`

**Commons:** None needed.

**`#define` constants to extract:**
- Default segment count (6.0), iterative iterations (8)
- Breathing zoom amplitude (0.3), speed (0.8)
- Cycle speed (0.08), rotation speed (0.2)
- Spiral twist range (3.0 ± 2.0), segment range (6.0 ± 2.0)
- Edge glow width (0.02), strength (0.3)
- Center highlight radius (0.2), strength (0.5)
- Ring frequency (20.0), speed (2.0), spoke count (12.0)
- Vignette (0.6)

**Gamma:** Add gamma correction.

### Task 11: Quality pass — stargate

**Files:**
- Modify: `src/shaders/stargate/image.glsl`
- Modify: `src/shaders/stargate/meta.json`

**Commons:** Add `"commons": ["noise-value", "color"]` to meta.json.

**Inline code to remove:**
- `hash(vec2 p)` — replaced by commons. Note: stargate's hash returns [-1,1] while `hashN2` returns [0,1]. Need to adjust: `hashN2(p) * 2.0 - 1.0` or adapt noise function.
- `noise(vec2 p)` — the noise function uses hash internally. Since we're changing hash range, rewrite noise to use `valueNoise2D` (which returns [0,1]) and remap: `valueNoise2D(p) * 2.0 - 1.0` where signed noise is needed, or just use `valueNoise2D` directly if the visual change is acceptable (user approved free improvement).
- `rgb2hsv(vec3 c)` — replaced by `rgb2hsv(vec3)` from color
- `hsv2rgb(vec3 c)` — replaced by `hsv2rgb(vec3)` from color

**Keep inline:** `blendScreen(vec3, vec3)` — only used once, shader-specific.

**`#define` constants to extract:**
- FOV zoom (0.4), max march steps (250), wall hit threshold (0.001)
- Camera oscillation amplitude (0.1), oscillation frequencies (1.137, 0.37)
- Wall UV scroll speed (7.0), noise warp scale (2.2, 0.1)
- Hue shift speed (0.15), depth factor (0.1), saturation boost (1.3)
- Tunnel blend (0.9), center glow falloff (4.0), glow strength (0.8)
- Orientation switch interval (4.0 seconds)
- Vignette (0.3)

**Gamma:** Add gamma correction.

---

## Phase 3: Verification

### Task 12: Build verification and docs

**Steps:**
1. Run `npm run build` — verify full pipeline passes
2. Update `CLAUDE.md` — add `noise-perlin` to available commons list and file structure
3. Commit final docs/CLAUDE.md changes
