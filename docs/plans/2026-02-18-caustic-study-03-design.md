# Caustic Study #03: Crystal — Design

**Date:** 2026-02-18
**Status:** Approved

## Concept

A faceted crystal (diamond/gemstone shape) hovers above a dark ground plane. Light enters from above, refracts through the crystal's facets, and projects **prismatic rainbow caustics** on the floor beneath it. The crystal slowly auto-rotates, causing the caustic patterns to shift and dance. Mouse drag orbits the camera with inertia (same system as the pool study).

## Series Progression

| Study | Dimension | Scene | Caustic Source |
|-------|-----------|-------|----------------|
| #01: Simple | 2D | Fullscreen texture | Pool-floor domain warp |
| #02: Pool | 3D ray-marched | Swimming pool + ball physics | Pool-floor domain warp |
| #03: Crystal | 3D ray-marched | Gemstone + ground plane | Facet refraction + chromatic dispersion |

## Scene Composition

- **Crystal** — SDF-defined gemstone: "brilliant cut" approximation using intersections of half-planes (octahedron base, tapered crown, flat table facet on top). Glass material with high specular, internal refraction, slight absorption tint.
- **Ground plane** — dark surface below the crystal (matte stone or polished dark marble) so caustic colors pop.
- **Light source** — directional from above-right, simulating sunlight. Fixed direction.
- **Background** — dark gradient or soft environment, focus on crystal and caustics.

## Caustic Technique

Different from Studies #01/#02 which use `causticWarp()` domain-warp. Crystal caustics use:

### Facet Refraction
When a ray hits the ground plane, trace *backwards* toward the light through the crystal. Each facet boundary refracts the ray (Snell's law via GLSL `refract()`), concentrating light into bright convergence lines.

### Chromatic Dispersion
Sample R/G/B at slightly different indices of refraction (IOR ~1.52 for red, ~1.54 for blue, mimicking real glass dispersion). This produces the rainbow prismatic spread.

### Ambient Shimmer (optional)
Blend a subtle layer of the existing `causticWarp()` pattern on the ground plane as ambient "shimmer," tying it visually to the series.

## Crystal SDF Geometry

Brilliant-cut gemstone approximated as SDF intersections:
- **Table** — top flat facet (horizontal clip plane)
- **Crown** — tapered cone from table down to girdle (widest point)
- **Pavilion** — inverted cone from girdle down to culet (bottom point)
- Facets approximated by rotating clip planes around Y axis at regular intervals

The SDF is the intersection of all these half-spaces, producing a faceted polyhedron.

## Rendering Pipeline

- **Buffer A** (`buffer-a.glsl`) — camera state: yaw/pitch angles + angular velocities, previous mouse position. Same inertia/friction pattern as caustics-pool.
- **Image pass** (`image.glsl`) — main render:
  1. Ray march the crystal SDF
  2. Crystal surface: Fresnel-blended reflection + refraction
  3. Ground plane: compute caustic brightness by tracing refracted light paths through the crystal
  4. Chromatic dispersion: three refraction traces (R/G/B) with slightly different IOR

## Commons

```json
{
  "commons": ["sphere", "color", "sdf", "caustic"]
}
```

- `sphere` — `intersectSphere()` for bounding-sphere optimization (skip SDF march if ray misses)
- `color` — `hsl2rgb()` for mapping dispersion to rainbow colors
- `sdf` — `dfLine()` for optional edge glow effects
- `caustic` — `causticWarp()` for optional ambient shimmer layer

## Animation

- Crystal auto-rotates around Y axis (~0.3 rad/s)
- Camera orbit with inertia (reuse buffer-a pattern from pool study)
- Caustic patterns animate naturally as crystal rotates — no separate time driver needed

## Interaction

- Mouse drag orbits camera (same as pool study)
- Idle auto-orbit when no interaction

## meta.json

```json
{
  "title": "Caustic Study #03: Crystal",
  "description": "Ray-marched faceted crystal with prismatic caustics from chromatic dispersion. Light refracts through the gemstone's facets, projecting rainbow patterns on the ground plane below.",
  "date": "2026-02-18",
  "tags": ["caustics", "raymarching", "3d", "physics", "refraction"],
  "commons": ["sphere", "color", "sdf", "caustic"],
  "channels": {
    "image": { "iChannel0": "buffer-a" },
    "bufferA": { "iChannel0": "buffer-a" }
  }
}
```
