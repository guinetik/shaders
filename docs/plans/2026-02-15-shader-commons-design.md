# Shader Commons Library Design

**Date:** 2026-02-15
**Status:** Approved

## Goal

Create a reusable GLSL function library (`src/lib/`) that shaders can opt into via `meta.json`, reducing code duplication across shaders that share common techniques. Step 1 migrates the 4 planet shaders; future sessions expand the library.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Granularity | One file per concern | Maximum reuse — a shader picks only what it needs |
| Meta key | `"commons": string[]` | Matches project terminology, array for ordering |
| Injection scope | Global per shader | All passes get the same commons — simpler, covers 99% of cases |
| Injection point | Build-time in Vite plugin | Zero runtime cost, renderer untouched |
| Function style | Fully parameterized | No hidden `#define` coupling, truly stateless |

## File Structure

```
src/lib/
├── noise-value.glsl      # sin-based hash + 3D value noise + parameterized FBM
├── noise-pcg.glsl         # PCG hash + decorrelation-matrix FBM
├── lighting.glsl          # Blinn-Phong diffuse + specular
├── sphere.glsl            # Rotate(), UV→sphere projection
├── atmosphere.glsl        # Rim glow, halo falloff, fresnel atmosphere
└── normal-map.glsl        # Tangent/binormal basis, finite-difference normals
```

Each file is standalone — no common depends on another. Only the shader's `meta.json` declares dependencies.

## Meta.json Schema Change

New optional field on `RawShaderMeta`:

```json
{
  "title": "Earth-like Planet",
  "description": "...",
  "date": "2025-11-27",
  "tags": ["exoplanets", "space", "3d"],
  "links": {},
  "commons": ["sphere", "lighting", "noise-value", "normal-map", "atmosphere"]
}
```

Resolution: `"sphere"` → `src/lib/sphere.glsl`. Order matters — files are concatenated in array order before each pass's GLSL source.

## Pipeline Changes

### Vite Plugin (`src/plugins/shaderLoader.ts`)

1. Read `commons` from `meta.json` (optional `string[]`)
2. For each entry, read `src/lib/<name>.glsl`
3. Concatenate all commons source (in array order)
4. Prepend concatenated commons to every pass's GLSL string (`image`, `bufferA`–`bufferD`)
5. Add `src/lib/*.glsl` to Vite's watched files for HMR
6. Error if a commons entry references a non-existent file

### Types (`src/types.ts`)

Add `commons?: string[]` to `RawShaderMeta`.

### Shader Linter (`scripts/lint-shaders.js`)

When validating a shader's GLSL, also prepend its commons (read from that shader's `meta.json`) so the linter sees the full source.

### Renderer (`src/composables/useShaderRenderer.ts`)

**No changes.** It already receives complete GLSL strings from the virtual module.

## Planet Shader Migration

### Commons extraction

| File | Source shaders | Key functions |
|------|---------------|---------------|
| `sphere.glsl` | All 4 planets | `Rotate(vec2, float)`, `sphereUV(fragCoord, resolution)` |
| `lighting.glsl` | All 4 planets | `blinnPhong(normal, lightDir, viewDir, shininess)` |
| `atmosphere.glsl` | All 4 planets | `rimGlow(pos, atmosColor, exponent, intensity)`, `halo(uv, atmosColor, lightDir)` |
| `noise-value.glsl` | Earth, Lava | `hashN(float)`, `valueNoise3D(vec3)`, `fbmValue(vec3, int octaves, float lacunarity, float gain)` |
| `noise-pcg.glsl` | Gas Giant, Neptune | `hash1(float)`, `hash3(vec3)`, `fbmPCG(vec3, int octaves)` |
| `normal-map.glsl` | Earth, Lava | `perturbNormal(normal, pos, heightFunc, scale, dx)` — note: takes a conceptual height function reference, actual implementation uses inline sampling |

### Post-migration shader structure

Each planet's `image.glsl` retains:
- Its own `#define` constants (colors, radii, speeds)
- `mainImage()` calling shared utilities with explicit parameters
- Planet-specific logic (ocean/land coloring, heat emission, band patterns)

### Shaders left unchanged

All non-planet shaders (lorenz, thomas, dadras, rossler, halvorsen, liquid-glass, star-*, etc.) remain as-is. They can adopt commons in future sessions.

## Scope Boundary

**This session (Step 1):**
- Create `src/lib/` with 6 common files
- Update Vite plugin to support `commons`
- Update types
- Update shader linter
- Migrate 4 planet shaders
- Verify build passes

**Future sessions:**
- Extract more commons (ray-marching, SDF operations, camera utilities)
- Migrate other shader groups
- Build toward a small shader framework
