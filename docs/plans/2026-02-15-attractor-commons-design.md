# Attractor Series Commons Migration — Design

**Date:** 2026-02-15
**Status:** Approved

## Goal

Migrate the 5 attractor shaders (dadras, halvorsen, lorenz, rossler, thomas) to use the commons library, extracting shared stateless utility functions into 3 new common files while reusing existing `noise-value.glsl`.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Scope | Pure functions only | Buffer logic is tightly coupled with per-shader variants; keep inline |
| File split | One file per concern | color, sdf, projection — consistent with planet approach |
| Hash reuse | Use existing noise-value.glsl | hashN() ≈ hash(), avoid duplicating one-liners |
| Image pass | Keep per-shader | Only 15 lines of logic, not worth extracting |

## New Commons Files

### `src/lib/color.glsl`
- `hsl2rgb(float h, float s, float l)` — HSL to RGB conversion (h in degrees)

### `src/lib/sdf.glsl`
- `dfLine(vec2 a, vec2 b, vec2 p)` — Distance from point to line segment (robust variant with degenerate guard)

### `src/lib/projection.glsl`
- `rotX(float a)` — 3x3 rotation matrix around X axis
- `rotY(float a)` — 3x3 rotation matrix around Y axis
- `project(vec3 p, mat3 viewRot, float scale)` — 3D to 2D projection via rotation matrix

## Existing Commons Reused

- `noise-value.glsl` — `hashN()` replaces inline `hash()` in all 5 attractors

## Per-Shader Migration

Each attractor's `buffer-a.glsl`:
- Remove: `hash()`, `hsl2rgb()`, `dfLine()`, `rotX()`, `rotY()`, `project()`
- Rename: `hash(x)` → `hashN(x)`
- Keep: `integrate()`, camera state, integration loop, trail rendering, state persistence, all #defines

Each attractor's `meta.json`:
- Add: `"commons": ["noise-value", "color", "sdf", "projection"]`

Note: Halvorsen and Thomas don't use rotX/rotY/project(mat3) — they use inline yaw-pitch projection. They still benefit from noise-value, color, and sdf commons. They'll use `"commons": ["noise-value", "color", "sdf"]` (no projection).
