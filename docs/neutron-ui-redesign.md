# Neutron UI Redesign (2026)

## Overview

This document describes the responsive redesign implemented for the shader portfolio, focused on:

- mobile-first fullscreen rendering with minimal overlays,
- wider desktop and 4K layout scaling,
- richer Neutron UI visual system beyond a cyan-only treatment.

## Responsive Strategy

### Breakpoints

The app now supports wider display tiers in addition to tablet and desktop:

- `768px` tablet
- `1024px` desktop
- `1440px` XL desktop
- `1920px` 2K
- `2560px` 4K

Defined in `src/constants.ts`:

- `BREAKPOINT_TABLET`
- `BREAKPOINT_DESKTOP`
- `BREAKPOINT_XL`
- `BREAKPOINT_2K`
- `BREAKPOINT_4K`

### Container Scaling

Global layout width is tokenized in `src/assets/neutron.css` using `--n-page-max`:

- standard desktop: `1280`
- XL: `1600`
- 2K: `2048`
- 4K: `2880`

Views consume this through `.n-layout-shell`.

## Mobile Shader Detail Interaction

On mobile (`max-width: 767px`) in `src/views/ShaderDetailView.vue`:

- render surface takes full viewport height (`100dvh`),
- only two floating controls appear over the shader:
  - back arrow (top-left),
  - info button (top-right),
- no tab bar or standard metadata panel overlays the shader.

### Info Drawer

`src/components/ShaderInfoDrawer.vue` implements a bottom sheet pattern inspired by the Genuary site:

- backdrop tap to close,
- safe-area-aware spacing (`env(safe-area-inset-*)`),
- metadata (title, description, date, tags),
- actions (view code, fullscreen, screenshot, Shadertoy link).

Drawer state is managed in `src/composables/useShaderDetail.ts`:

- `isInfoDrawerOpen`
- `openInfoDrawer()`
- `closeInfoDrawer()`
- `toggleInfoDrawer()`

## Desktop and 4K Experience

### Gallery

`src/views/GalleryView.vue` now scales card density progressively:

- mobile: 1 column
- tablet: 2 columns
- desktop: 3 columns
- XL: 4 columns
- 2K+: 5 columns

Spacing and typography also expand at larger tiers for better visual balance on high-resolution displays.

### Detail + Code

Desktop keeps render/code workflows in `src/views/ShaderDetailView.vue` with:

- top control header and tab switching,
- metadata panel rendered in-flow,
- action buttons under render mode.

`src/components/CodeViewer.vue` increases code panel height for large viewports to reduce cramped vertical space on 2K/4K monitors.

## Neutron Token and Utility System

`src/assets/neutron.css` now provides semantic roles:

- surfaces: `--n-surface-0`..`--n-surface-3`
- text levels: `--n-text-strong`, `--n-text-base`, `--n-text-muted`
- accent levels: `--n-accent`, `--n-accent-soft`, `--n-accent-strong`
- border and shadow roles: `--n-border-subtle`, `--n-border-strong`, `--n-shadow-*`

Reusable utility primitives:

- `.n-layout-shell` (responsive page wrapper)
- `.n-panel` and `.n-panel-glow` (panel surfaces)
- `.n-corner-frame` (tech corner accents)
- `.n-overlay-chrome` (floating control styling)
- `.n-scanline-overlay` and `.n-vignette-overlay` (atmospheric layers)
- `.n-tech-label` (small technical text role)

Accent variants now include:

- `.neutron-cyan`
- `.neutron-magenta`
- `.neutron-green`
- `.neutron-amber`

Legacy compatibility classes remain available (`.neutron-danger`, `.neutron-yellow`).

## Card-to-Detail Animation Orchestration

When navigating from a gallery card to shader detail, the transition is orchestrated so the shader page never appears during the thumbnail expansion.

### Timeline

1. **0–500ms** – Thumbnail expands from card position to full viewport (`TransitionOverlay`).
2. **500–600ms** – Brief pause (`OVERLAY_FADE_DELAY_MS`).
3. **600–800ms** – Overlay fades out (`OVERLAY_FADE_MS`).
4. **800ms** – Overlay clears, `transitionSnapshot` set to `null`.
5. **Shader page animations start** – Only after overlay is gone.

### Implementation

- **`detail--overlay-active`** – Applied to the detail view when `transitionSnapshot?.direction === 'to-detail'`. Hides the entire detail view (`opacity: 0`, `pointer-events: none`) so the overlay’s transparent start phase never shows the page behind it.
- **Watcher on `transitionSnapshot`** – When it goes from `to-detail` to `null`, `isEntering` is set to `false`, triggering shader page entrance animations.
- **Nav bar, action bar, metadata** – Simple staggered fade-in (`detail-stagger-2`, `-3`, `-4`), same as header and tab content.

Constants in `src/constants.ts`:

- `CARD_EXPAND_MS` (500)
- `OVERLAY_FADE_DELAY_MS` (100)
- `OVERLAY_FADE_MS` (200)
- `OVERLAY_COMPLETE_MS` (800)

## Notes for Future Work

- Add optional drawer drag gestures (snap points) if interaction complexity is needed.
- Consider a desktop split-pane mode for render and metadata on ultra-wide displays.
- Add user-selectable accent theme persistence (local storage + root class switcher).
