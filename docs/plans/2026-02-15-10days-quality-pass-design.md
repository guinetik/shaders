# 10-Days Shader Quality Pass — Design

**Date:** 2026-02-15
**Status:** Approved

## Goal

Full quality pass on all 7 "10-days" study shaders: extract shared code into commons, add gamma correction, convert magic numbers to `#define` constants, and improve documentation.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Visual preservation | Improve freely | Study shaders — current look isn't sacred |
| Perlin noise | New `noise-perlin.glsl` | plasma + ripples share identical gradient noise; future shaders benefit |
| HSV conversion | Extend `color.glsl` | Stargate uses it; common color conversion belongs with HSL |
| 2D FBM | Extend `noise-value.glsl` | domain-warping needs 2D FBM; cleaner than `vec3(p, 0.0)` hack |
| Rotation helpers | Keep inline | Too trivial for a common; only 2 lines each |
| Shader-specific functions | Keep inline | Wave distortions, kaleidoscope folds, gravity warp — all unique |

## New Commons

### `src/lib/noise-perlin.glsl`
- `perlinGrad3(vec3)` — gradient vector hash (dot-product + sin family)
- `perlinNoise3D(vec3)` — 3D Perlin gradient noise with quintic interpolation (C2 continuity)
- `perlinFbm(vec3, int, float, float)` — parameterized FBM (octaves, lacunarity, gain)

### Extended `src/lib/color.glsl`
- Add `rgb2hsv(vec3)` — RGB to HSV conversion
- Add `hsv2rgb(vec3)` — HSV to RGB conversion

### Extended `src/lib/noise-value.glsl`
- Add `fbmValue2D(vec2, int, float, float)` — 2D value noise FBM

## Per-Shader Migration

| Shader | Commons | Removed inline functions |
|--------|---------|------------------------|
| gravity-well | none | none |
| waves | none | none |
| domain-warping | `noise-value` | `hash(vec2)`, `noise(vec2)`, `fbm(vec2)` |
| plasma | `noise-perlin` | `hash3(vec3)`, `perlin3D(vec3)`, `perlinFBM(vec3)` |
| ripples | `noise-perlin`, `noise-value` | `hash3(vec3)`, `hash(float)`, `noise3D(vec3)` |
| kaleidoscopic | none | none |
| stargate | `noise-value`, `color` | `hash(vec2)`, `noise(vec2)`, `rgb2hsv(vec3)`, `hsv2rgb(vec3)` |

## Quality Improvements (all 7)

1. **Gamma correction** — add `pow(max(col, vec3(0.0)), vec3(0.45))` as final step
2. **Magic numbers** — convert all inline numeric constants to `#define` with tuning comments
3. **Documentation** — ensure consistent file-level docblock, TECHNIQUE callouts
4. **Safe math** — protect `pow`/`sqrt` arguments with `max()`/`abs()`
