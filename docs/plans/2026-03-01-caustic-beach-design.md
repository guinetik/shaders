# Caustic Study #04: Beach — Design

**Date:** 2026-03-01
**Slug:** `caustics-beach`
**Commons:** `camera`, `sphere`, `caustic`

## Overview

Underwater camera with orbit control, rendering three horizontal layers: a sand floor with projected caustic light patterns, a water volume with physically-based color absorption, and the water surface seen from below with caustic patterns and Snell's window.

## Scene Layout

```
─────── SURFACE (y = SURFACE_Y) ───────
   Caustic pattern visible from below
   Snell's window (TIR outside critical angle)

        WATER VOLUME
   Exponential depth fog
   Red absorption → blue-green shift

─────── SAND FLOOR (y = SAND_Y) ───────
   Procedural noise ridges
   Same caustic pattern as projected light
```

## Architecture

- **Multi-pass**: `buffer-a` for orbit camera state (reuses `camera` common)
- **Commons**: `camera`, `sphere`, `caustic`
- **Single `image.glsl`** handles all rendering

## Rendering Pipeline (image.glsl)

1. **Camera ray** — orbit camera from buffer-a, constrained between sand and surface
2. **Hit test** — ray-plane intersection against surface and sand planes
3. **Surface hit** — Snell's window: inside critical angle (~48.6°) see bright sky, outside see total internal reflection. Caustic pattern overlaid as bright network.
4. **Sand hit** — procedural noise texture + ridges, caustic pattern as depth-attenuated projected light
5. **Water fog** — `exp(-absorption * dist)` with per-channel absorption (red first → blue-green shift)
6. **Post-process** — gamma correction, vignette

## Caustic "Shadow" Effect

Both surface and sand use `causticWarp()` with the same parameters. The sand version is attenuated by water depth via exponential fade, making it softer than the surface version. Dual-layer blending (two scales + time offset) for depth parallax.

## Sand Procedural Texture

- Base color: warm tan `vec3(0.76, 0.70, 0.50)`
- FBM noise for granularity
- Low-frequency sine ridges for underwater sand ripple pattern
- Caustic light overlay added as brightness

## Water Absorption

```glsl
// Red absorbs fastest, blue least (real seawater)
vec3 absorption = vec3(0.4, 0.08, 0.04);
vec3 fog = exp(-absorption * dist);
col = col * fog + WATER_COLOR * (1.0 - fog);
```

## Design Decisions

- **No extras** (god rays, particles) — focused on layers + caustics
- **Procedural sand** — no texture dependency, consistent with other studies
- **Orbit camera** — mouse-drag interaction like Studies #02 and #03
- **No `noise-value` common** — inline simple noise to keep commons list minimal
