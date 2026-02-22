# Hydrogen Orbital Shader — Design Document

**Date:** 2026-02-22
**Slug:** `hydrogen-orbital`
**Inspired by:** `D:\Developer\gcanvas\demos\js\hydrogen-orbital.js`

## Overview

A volumetric ray-marched visualization of hydrogen atom electron orbitals that auto-cycles through preset quantum states as a slideshow. The shader computes real quantum mechanical probability densities |ψ(n,l,m)|² directly in GLSL using associated Laguerre and Legendre polynomials, rendering them as glowing 3D density clouds with an inferno colormap.

## Visual Target

Particle-cloud aesthetic matching the gcanvas WebGL demo: bright white/yellow cores fading through orange to purple at the edges, with noise stippling to break up smooth density into a scattered-particle texture. Pure visual — no text overlays.

## Architecture

### Files

- `buffer-a.glsl` — Orbit camera state machine (drag, inertia, friction, idle auto-rotation)
- `image.glsl` — Volumetric ray march through |ψ|² density field
- `meta.json` — Metadata with commons, channels, tags

### Commons

`["camera", "color"]`

- `camera` — orbit camera update (buffer-a) + ray construction (image)
- `color` — color space utilities

### Channels

```json
{
  "channels": {
    "image": { "iChannel0": "buffer-a" },
    "bufferA": { "iChannel0": "buffer-a" }
  }
}
```

## Rendering Pipeline (per pixel)

1. **Camera setup** — Read orbit camera state from buffer-a, construct ray origin + direction
2. **Bounding sphere intersection** — Compute entry/exit points for a sphere sized to the current orbital (~n² * scale)
3. **Ray march** — ~80 steps through the volume
4. **At each step:**
   - Convert Cartesian position to spherical (r, θ, φ)
   - Compute |ψ(n,l,m,r,θ)|² via radial + angular wave functions
   - Add noise stippling (hash-based) to density for particle texture
   - Accumulate density with additive blending (emissive volume, no shadows)
5. **Color mapping** — Map accumulated density to inferno colormap
6. **Post-processing** — Gamma correction (pow 0.45)

## GLSL Math Functions

All ported directly from `gcanvas/src/math/hydrogen.js`:

- `factorial(int n)` — iterative integer factorial
- `associatedLaguerre(int n, int alpha, float x)` — recurrence: L_n^α(x)
- `associatedLegendre(int l, int m, float x)` — recurrence: P_l^m(cos θ)
- `radialWaveFunction(int n, int l, float r)` — R_{n,l}(r) with normalization
- `angularWaveFunction(int l, int m, float theta)` — Y_l^m(θ) (real spherical harmonic θ-part)
- `probabilityDensity(int n, int l, float r, float theta)` — |R|² × |Y|²

**Note:** Since quantum numbers change per-preset (slideshow), they're passed as uniforms-equivalent (`int` computed from time). GLSL ES 3.00 supports integer loop bounds from uniforms, and the recurrence relations use small iteration counts (n ≤ 7, l ≤ 3).

## Slideshow System

### Presets (8 orbitals)

| Index | Orbital | n | l | m | Shape |
|-------|---------|---|---|---|-------|
| 0 | 1s | 1 | 0 | 0 | Spherical cloud |
| 1 | 2s | 2 | 0 | 0 | Spherical + 1 radial node |
| 2 | 2p | 2 | 1 | 0 | Dumbbell |
| 3 | 3s | 3 | 0 | 0 | Spherical + 2 radial nodes |
| 4 | 3p | 3 | 1 | 0 | Dumbbell + radial node |
| 5 | 3d | 3 | 2 | 0 | Cloverleaf |
| 6 | 4d | 4 | 2 | 0 | Cloverleaf + radial node |
| 7 | 4f | 4 | 3 | 0 | Multi-lobed flower |

### Timing

- **Cycle duration:** ~6 seconds per orbital
- **Cross-fade:** ~1.5 seconds overlap
- **Total loop:** ~48 seconds for full cycle
- **Transition:** Blend density from outgoing + incoming orbital using smoothstep

### Cross-fade Implementation

During transition, ray march evaluates BOTH orbital densities and blends:
```
density = mix(densityOld, densityNew, fadeT)
```
where `fadeT` = smoothstep over the 1.5s transition window.

## Camera

Uses the `camera` common's orbit camera system:
- **buffer-a:** `orbitCameraUpdate()` — full state machine with mouse drag, inertia, friction, idle auto-rotation
- **image:** `orbitCameraRay()` — reads state, computes spherical orbit ray
- Auto-rotates when idle, user can drag to explore

## Colormap

Inferno colormap (same stops as gcanvas demo):
```
[0,0,4] → [40,11,84] → [101,21,110] → [159,42,99] →
[212,72,66] → [245,125,21] → [250,193,39] → [252,255,164]
```

Implemented as a piecewise-linear interpolation function in GLSL.

## Noise Stippling

To achieve the particle-cloud look rather than smooth volumetric fog:
- At each march step, compute a 3D hash of the position
- Threshold the hash against a value derived from density
- This creates discrete "hits" that look like scattered particles
- The threshold is tuned so high-density regions are more solid, low-density regions are sparse dots

## Performance Considerations

- **March steps:** 80 (tunable via #define)
- **Bounding sphere:** Sized per orbital (n² * scale) to avoid marching empty space
- **Early exit:** Break when accumulated opacity > 0.99
- **Factorial/polynomial:** Small iteration counts (n ≤ 7), all integer loops
- **Two evaluations during crossfade:** Doubles cost briefly, acceptable for 1.5s windows
