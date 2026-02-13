/**
 * Application-wide named constants.
 * No magic numbers — every literal value lives here.
 *
 * @module constants
 */

// -- Layout --

/** Number of gallery columns on mobile viewports */
export const GALLERY_COLUMNS_MOBILE = 1;

/** Number of gallery columns on tablet viewports (>=768px) */
export const GALLERY_COLUMNS_TABLET = 2;

/** Number of gallery columns on desktop viewports (>=1024px) */
export const GALLERY_COLUMNS_DESKTOP = 3;

/** Breakpoint for tablet layout in pixels */
export const BREAKPOINT_TABLET = 768;

/** Breakpoint for desktop layout in pixels */
export const BREAKPOINT_DESKTOP = 1024;

/** Minimum touch target size in pixels (WCAG) */
export const MIN_TOUCH_TARGET_PX = 44;

// -- Spacing Scale (px) --

export const SPACING_XS = 4;
export const SPACING_SM = 8;
export const SPACING_MD = 12;
export const SPACING_LG = 16;
export const SPACING_XL = 24;

// -- Font Sizes (px) --

export const FONT_SIZE_XS = 10;
export const FONT_SIZE_SM = 12;
export const FONT_SIZE_BASE = 14;
export const FONT_SIZE_LG = 18;
export const FONT_SIZE_XL = 24;

// -- WebGL --

/** Default frames per second target for shader rendering */
export const SHADER_TARGET_FPS = 60;

/** Maximum number of buffer passes (A through D) */
export const MAX_BUFFER_PASSES = 4;

/** Number of FBOs per buffer for ping-pong feedback */
export const FBOS_PER_BUFFER = 2;

// -- Shader Discovery --

/** Required file name for the main output pass */
export const IMAGE_PASS_FILENAME = 'image.glsl';

/** Ordered buffer file names for discovery */
export const BUFFER_FILENAMES = [
  'buffer-a.glsl',
  'buffer-b.glsl',
  'buffer-c.glsl',
  'buffer-d.glsl',
] as const;

/** Metadata file name in each shader folder */
export const META_FILENAME = 'meta.json';

/** Screenshot file name */
export const SCREENSHOT_FILENAME = 'screenshot.webp';
