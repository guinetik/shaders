# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> IMPORTANT! NEVER run `npm run dev`. That's the user's job. Thank you.

## Project Overview

Shadertoy shader portfolio with a "Neutron UI" aesthetic. Displays GLSL fragment shaders in an interactive gallery with live WebGL2 rendering, code viewing, and multi-pass support.

**Stack:** Vue 3 + TypeScript (strict) + Vite 6
**Deploy:** GitHub Pages (`npm run deploy`) → shaders.guinetik.com

## Build Commands

```bash
npm run dev           # Start Vite dev server (user's job, don't run this)
npm run build         # Optimize images → lint shaders → type-check → vite build
npm run preview       # Preview production build
npm run deploy        # Build + publish to GitHub Pages
npm run new           # Scaffold a new shader folder
npm run lint:shaders  # Validate all .glsl files with glslangValidator
npm run images        # Optimize screenshot images
```

### Build Pipeline

`npm run build` runs these steps in order:

1. `optimize-images.js` — converts PNG screenshots to WebP
2. `lint-shaders.js --skip-missing` — validates all `.glsl` files (skips gracefully if `glslangValidator` is not installed)
3. `vue-tsc -b` — TypeScript type-checking
4. `vite build` — production bundle

### Shader Linter

`lint:shaders` wraps each `.glsl` file in the same Shadertoy preamble the renderer uses (`useShaderRenderer.ts`) and runs `glslangValidator`. Requires glslangValidator on PATH:

- **Windows (Scoop):** `scoop install main/glslang`
- **macOS:** `brew install glslang`
- **Linux:** `sudo apt install glslang-tools`

When run as part of `npm run build`, it uses `--skip-missing` to skip gracefully if the validator isn't installed. When run directly via `npm run lint:shaders`, it hard-fails if missing.

## Architecture

### Application Flow

```
vite.config.ts → shaderLoaderPlugin() scans src/shaders/*/
  → generates virtual:shader-registry module
  → Vue app imports registry → gallery + detail views
```

### File Structure

```
shaders/
├── scripts/
│   ├── lint-shaders.js       # GLSL validation via glslangValidator
│   ├── new-shader.js         # Scaffold a new shader folder
│   └── optimize-images.js    # PNG → WebP screenshot conversion
├── src/
│   ├── shaders/              # Shader source (one folder per shader)
│   │   └── <slug>/
│   │       ├── image.glsl    # Main output pass (required)
│   │       ├── meta.json     # Metadata (required)
│   │       ├── buffer-a.glsl # Buffer passes (optional, up to buffer-d)
│   │       └── screenshot.webp # Gallery thumbnail (optional)
│   ├── lib/                  # Shared GLSL library (commons)
│   │   ├── sphere.glsl       # Rotate(), sphereUV()
│   │   ├── lighting.glsl     # blinnPhong()
│   │   ├── atmosphere.glsl   # rimGlow(), atmosEdge(), halo()
│   │   ├── noise-value.glsl  # sin-hash noise, valueNoise3D(), fbmValue()
│   │   ├── noise-pcg.glsl    # PCG hash noise, pcgFbm1(), pcgFbm3()
│   │   ├── normal-map.glsl   # computeTangentBasis(), perturbNormal()
│   │   ├── color.glsl        # hsl2rgb()
│   │   ├── sdf.glsl          # dfLine()
│   │   └── projection.glsl   # rotX(), rotY(), projectMat()
│   ├── composables/          # Domain logic (controllers)
│   │   ├── useShaderGallery.ts   # Gallery filtering/sorting
│   │   ├── useShaderRenderer.ts  # WebGL2 multi-pass renderer
│   │   ├── useShaderDetail.ts    # Detail view state
│   │   └── useCodeHighlighter.ts # GLSL syntax highlighting
│   ├── components/           # Thin .vue files (template + style only)
│   │   ├── ShaderRenderer.vue
│   │   ├── ShaderCard.vue
│   │   ├── CodeViewer.vue
│   │   └── TagFilter.vue
│   ├── views/
│   │   ├── GalleryView.vue
│   │   └── ShaderDetailView.vue
│   ├── plugins/
│   │   └── shaderLoader.ts   # Vite plugin for virtual:shader-registry
│   ├── theme/
│   │   └── neutron-theme.ts  # Typed color palette constants
│   ├── types.ts              # All public interfaces
│   └── constants.ts          # Named constants (no magic numbers)
└── public/
    └── textures/             # Shared image textures for shaders
```

### Key Patterns

- **Composables as controllers** — all domain logic lives in `src/composables/`. `.vue` files are thin: template + style + reactive bindings only.
- **Build-time shader discovery** — the Vite plugin (`shaderLoader.ts`) scans `src/shaders/*/` at build time, generating `virtual:shader-registry` with all shader data including Vite-processed screenshot imports.
- **Commons library** — shared GLSL functions live in `src/lib/<name>.glsl`. Shaders opt in via `"commons": ["sphere", "lighting"]` in `meta.json`. The Vite plugin and linter prepend commons source before each pass at build time. Each common is stateless and independent — no common depends on another.
- **Multi-pass rendering** — ping-pong FBOs with RGBA16F textures for buffer passes. Channels are wired in `meta.json`.
- **Shadertoy compatibility** — uniforms: `iTime`, `iResolution`, `iMouse`, `iFrame`, `iChannel0-3`. Fragment wrapper adds `#version 300 es` and calls `mainImage()`.

## Adding a New Shader

1. Create folder `src/shaders/<slug>/`
2. Add `image.glsl` with a `mainImage(out vec4 fragColor, in vec2 fragCoord)` function
3. Add `meta.json`:

```json
{
  "title": "Shader Title",
  "description": "Brief description of the effect.",
  "date": "YYYY-MM-DD",
  "tags": ["tag1", "tag2"],
  "links": {}
}
```

4. For multi-pass shaders, add `buffer-a.glsl` through `buffer-d.glsl` and wire channels:

```json
{
  "channels": {
    "image": { "iChannel0": "buffer-a" },
    "bufferA": { "iChannel0": "buffer-a" }
  }
}
```

5. For texture-mapped shaders, reference textures from `public/textures/`:

```json
{
  "channels": {
    "image": { "iChannel0": "textures/landscape.jpeg" }
  }
}
```

6. For shared utility functions, declare commons in `meta.json`:

```json
{
  "commons": ["sphere", "lighting", "atmosphere"]
}
```

Available commons: `sphere`, `lighting`, `atmosphere`, `noise-value`, `noise-pcg`, `normal-map`, `color`, `sdf`, `projection`. Order matters — files are concatenated in array order before each pass's source. See `src/lib/` for function signatures.

7. Optionally add `screenshot.webp` in the shader folder for the gallery thumbnail

## Coding Guidelines

### TypeScript

- **Strict mode, no `any`** — every type must be explicit
- **TSDoc on all public interfaces/exports** — see `src/types.ts` for examples
- **No magic numbers** — named constants in `src/constants.ts`

### Vue Components

```typescript
// BAD - domain logic in .vue files
const filteredShaders = computed(() =>
  shaders.filter(s => s.tags.includes(tag))
);

// GOOD - logic in composable, .vue only binds
const { filteredShaders, setTag } = useShaderGallery();
```

### GLSL Shaders

#### Shadertoy Compatibility
- Target GLSL ES 3.00 (`#version 300 es` is added by the wrapper)
- Use `mainImage(out vec4 fragColor, in vec2 fragCoord)` signature
- Built-in uniforms: `iTime`, `iResolution`, `iMouse`, `iFrame`, `iTimeDelta`, `iChannel0-3`, `iChannelResolution[4]`, `iDate`
- iMouse convention: `xy` = current position, `z` = click x (always positive once clicked), `w` = click y
- Multi-pass state: store data in pixel (0,0) or row 0 of buffer textures
- **NO `f` suffix** — use `1.0` not `1.0f`
- **NO `saturate()`** — use `clamp(x, 0.0, 1.0)`
- Protect `pow`/`sqrt` arguments: `pow(max(x, 0.0), p)`, `sqrt(abs(x))`

#### No Magic Numbers
- **All numeric constants must be `#define`d** at the top of each shader file with descriptive names
- Group defines by purpose: geometry, physics, rendering, color

```glsl
// BAD
float d = length(p) - 0.8;
for (int i = 0; i < 128; i++) { t += d * 0.7; if (t > 50.0) break; }

// GOOD
#define SPHERE_RADIUS 0.8
#define MAX_MARCH_STEPS 128
#define STEP_RELAXATION 0.7
#define MAX_MARCH_DIST 50.0
float d = length(p) - SPHERE_RADIUS;
for (int i = 0; i < MAX_MARCH_STEPS; i++) { t += d * STEP_RELAXATION; if (t > MAX_MARCH_DIST) break; }
```

- Exception: mathematical identities (`0.0`, `1.0`, `2.0`, `0.5`) and standard conversions (`0.45` for gamma) are acceptable inline

#### Physics-Based Approach
- Prefer physically motivated models over ad-hoc visuals — use real equations where practical
- Lighting: use energy-conserving BRDFs (Lambertian diffuse, GGX/Beckmann specular) over `pow(dot(n,h), shininess)` hacks
- Atmosphere/fog: use exponential falloff (`exp(-density * dist)`) or Rayleigh/Mie scattering, not linear fade
- Motion: derive from real forces (gravity, drag, spring constants) rather than arbitrary sine tweaks
- Color: work in linear space, apply gamma correction (`pow(col, vec3(0.45))`) as a final step
- Document the physical model in a comment block at the top of the shader when applicable

```glsl
// GOOD — physically motivated
#define GRAVITY 9.81
#define DRAG_COEFF 0.47
#define AIR_DENSITY 1.225
vec3 acceleration = vec3(0.0, -GRAVITY, 0.0) - DRAG_COEFF * AIR_DENSITY * velocity;

// BAD — arbitrary tweaks
pos.y -= sin(iTime * 3.7) * 0.4 + 0.1;
```

#### Performance
- **Fixed iteration counts** — avoid dynamic loop bounds; use `#define` for limits
- **Early exit** — `break` when distance < threshold or total distance > max
- **Step multiplier tuning** — balance quality vs. speed (0.5–1.0 range)
- **Minimize texture reads** — cache `texture()` results, don't re-sample the same UV
- **Prefer math over branches** — use `mix()`, `step()`, `smoothstep()` instead of `if/else`
- **Reduce precision where safe** — use `mediump` for color, UVs; `highp` for positions and time
- **Avoid redundant normalize** — don't re-normalize vectors you just constructed as unit length
- **Precompute outside loops** — hoist invariant calculations (sin/cos of time, camera matrices) before march loops

#### Shader Documentation

Every shader should be self-documenting: explain *why*, not just *what*.

**File-level docblock** — every `.glsl` file starts with:
```glsl
/**
 * <Title>
 * @author guinetik
 * @date YYYY-MM-DD
 *
 * <1-3 sentence description of what this shader does and the key technique>
 */
```

**Constant tuning guide** — every `#define` gets a comment explaining what it controls and how values affect the output:
```glsl
#define GRAVITY_STRENGTH 0.005  // Lensing intensity — higher bends light more aggressively.
                                // Below 0.003: subtle. Above 0.01: rays orbit multiple times (artifacts).
```

**Technique callouts** — non-obvious patterns get a `// TECHNIQUE:` comment:
```glsl
// TECHNIQUE: Frame-persistent state via texelFetch
// Multi-pass shaders store state in buffer pixels. texelFetch reads exact pixel
// values (no filtering) from the previous frame's buffer texture.
// Convention: pixel (0,0) = primary state, pixel (1,0) = camera, rest = visual accumulation.
vec4 state = texelFetch(iChannel0, ivec2(0, 0), 0);
```

**State layout block** — multi-pass shaders document their pixel storage:
```glsl
// === STATE LAYOUT (buffer-a → iChannel0) ===
// Pixel (0, 0): particle position (xyz), unused (w)
// Pixel (1, 0): camera angles (rx, ry), last mouse (zw)
// All other pixels: trail accumulation with per-frame FADE
```

**Physics attribution** — when using a real equation, cite it:
```glsl
// Newtonian gravity: a = GM/r² toward center
// Simplified: acceleration = GRAVITY_STRENGTH / (dist * dist)
```

**Noise algorithm choice** — explain *why* this noise:
```glsl
// Using value noise (not Perlin/Simplex) — cheaper, adequate for low-frequency turbulence.
// Perlin would give smoother gradients but costs more ALU ops per octave.
```

### Neutron UI Theming

- Dark blue-black background (`#0a0a0f`)
- Cyan glows (`rgba(0, 200, 255, *)`) as default accent
- Fira Code monospace everywhere
- Color variants: cyan (default), danger, magenta, yellow, green
- CSS custom properties prefixed with `--n-*`
- See `src/theme/neutron-theme.ts` for typed constants

### What NOT To Do

```typescript
// BAD - logic in .vue file
<script setup>
const sorted = computed(() => shaders.sort(...));
</script>

// BAD - magic numbers
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, 512, 512, ...);

// BAD - untyped
const data: any = await fetch(...);

// BAD - screenshot in public/shaders/ (Vite plugin handles this)
// Screenshots go in src/shaders/<slug>/screenshot.png
```

```glsl
// BAD - magic numbers in shader
float d = length(p) - 0.35;
for (int i = 0; i < 80; i++) { if (t > 20.0) break; }

// BAD - ad-hoc lighting
float light = pow(dot(n, l), 32.0);

// BAD - no gamma correction, working in sRGB
fragColor = vec4(col, 1.0);

// BAD - recomputing inside loop
for (int i = 0; i < STEPS; i++) {
    mat2 r = mat2(cos(iTime), -sin(iTime), sin(iTime), cos(iTime));
    p.xy *= r;
}
```

### What TO Do

```typescript
// GOOD - composable handles logic
export function useShaderGallery() {
  const sortedShaders = computed(() => ...);
  return { sortedShaders };
}

// GOOD - named constant
export const MAX_BUFFER_PASSES = 4;

// GOOD - typed interface with TSDoc
/** Metadata for a single shader in the gallery */
export interface ShaderMeta {
  /** URL-friendly identifier, derived from folder name */
  slug: string;
  /** Display title */
  title: string;
}
```

```glsl
// GOOD - named constants, physics-based, performant
#define SPHERE_RADIUS 0.35
#define MAX_STEPS 80
#define MAX_DIST 20.0
#define ROUGHNESS 0.3

// GOOD - energy-conserving GGX specular
float D = GGX_D(NdotH, ROUGHNESS);
float G = Smith_G(NdotL, NdotV, ROUGHNESS);
vec3 spec = D * G * F / (4.0 * NdotL * NdotV + 1e-4);

// GOOD - gamma correction as final step
fragColor = vec4(pow(col, vec3(0.45)), 1.0);

// GOOD - hoist invariant outside loop
mat2 timeRot = rot2d(iTime);
for (int i = 0; i < MAX_STEPS; i++) {
    p.xy *= timeRot;
}
```

## WebGL Renderer Notes

- FBOs use `RGBA16F` / `HALF_FLOAT` format — requires `EXT_color_buffer_float`
- Canvas uses `preserveDrawingBuffer: true` for screenshot capture
- `gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)` before image texture uploads (reset after)
- ResizeObserver tracks canvas size; FBO textures are recreated and `frameCount` is reset on resize so shaders can re-initialize state (e.g., `if (iFrame == 0)` branches)
- Image textures load asynchronously with a 1x1 black placeholder so rendering starts immediately

## Mobile / Responsive

- Mobile-first CSS with breakpoints at 768px (tablet) and 1024px (desktop)
- Touch events supported for shader interaction (touchstart/touchmove/touchend)
- Minimum touch target 44px (WCAG)
