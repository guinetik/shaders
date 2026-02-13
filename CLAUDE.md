# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> IMPORTANT! NEVER run `npm run dev`. That's the user's job. Thank you.

## Project Overview

Shadertoy shader portfolio with a "Neutron UI" aesthetic. Displays GLSL fragment shaders in an interactive gallery with live WebGL2 rendering, code viewing, and multi-pass support.

**Stack:** Vue 3 + TypeScript (strict) + Vite 6
**Deploy:** GitHub Pages (`base: '/shaders/'`)

## Build Commands

```bash
npm run dev      # Start Vite dev server (user's job, don't run this)
npm run build    # Type-check + build to /dist
npm run preview  # Preview production build
```

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
├── src/
│   ├── shaders/              # Shader source (one folder per shader)
│   │   └── <slug>/
│   │       ├── image.glsl    # Main output pass (required)
│   │       ├── meta.json     # Metadata (required)
│   │       ├── buffer-a.glsl # Buffer passes (optional, up to buffer-d)
│   │       └── screenshot.png # Gallery thumbnail (optional)
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

6. Optionally add `screenshot.webp` in the shader folder for the gallery thumbnail

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

- Target GLSL ES 3.00 (`#version 300 es` is added by the wrapper)
- Use `mainImage(out vec4 fragColor, in vec2 fragCoord)` signature (Shadertoy convention)
- Use `#define` for configurable constants at the top of shader files
- Multi-pass state: store data in pixel (0,0) or row 0 of buffer textures
- iMouse convention: `xy` = current position, `z` = click x (always positive once clicked), `w` = click y

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
