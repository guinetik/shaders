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

/** Breakpoint for extra-large desktop layout in pixels */
export const BREAKPOINT_XL = 1440;

/** Breakpoint for 2K desktop layout in pixels */
export const BREAKPOINT_2K = 1920;

/** Breakpoint for 4K desktop layout in pixels */
export const BREAKPOINT_4K = 2560;

/** Minimum touch target size in pixels (WCAG) */
export const MIN_TOUCH_TARGET_PX = 44;

/** Responsive max-width for content containers on standard desktop */
export const CONTAINER_MAX_WIDTH_DESKTOP = 1280;

/** Responsive max-width for content containers on extra-large desktop */
export const CONTAINER_MAX_WIDTH_XL = 1600;

/** Responsive max-width for content containers on 2K displays */
export const CONTAINER_MAX_WIDTH_2K = 2048;

/** Responsive max-width for content containers on 4K displays */
export const CONTAINER_MAX_WIDTH_4K = 2880;

/** Number of gallery columns on extra-large desktop viewports (>=1440px) */
export const GALLERY_COLUMNS_XL = 4;

/** Number of gallery columns on 2K and above viewports (>=1920px) */
export const GALLERY_COLUMNS_2K = 5;

// -- Spacing Scale (px) --

export const SPACING_XS = 4;
export const SPACING_SM = 8;
export const SPACING_MD = 12;
export const SPACING_LG = 16;
export const SPACING_XL = 24;
export const SPACING_2XL = 32;
export const SPACING_3XL = 40;

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

/** Directory name for shared GLSL library files */
export const LIB_DIRNAME = 'lib';

// -- Animation Timing (ms) --

/** Duration of the SVG border trace animation */
export const WIRE_FRAME_TRACE_MS = 400;

/** Duration of content fade-in after trace completes */
export const WIRE_FRAME_FADE_MS = 300;

/** Delay between successive card entrance animations */
export const CARD_STAGGER_MS = 50;

/** Maximum total time for grid entrance reveal */
export const GRID_ENTRANCE_MAX_MS = 800;

/** Hover translate distance in pixels */
export const CARD_HOVER_LIFT_PX = 6;

/** Corner bracket growth on hover in pixels */
export const CORNER_EXPAND_PX = 4;

/** Hover scanline sweep duration */
export const SCANLINE_SWEEP_MS = 600;

/** Hover glow pulse cycle duration */
export const GLOW_PULSE_MS = 1500;

/** Click-to-expand transition duration */
export const CARD_EXPAND_MS = 500;

/** Sibling cards fade duration during expand */
export const SIBLING_FADEOUT_MS = 300;

/** Card exit animation on tag filter change */
export const FILTER_EXIT_MS = 250;

/** Active tag glow pulse cycle duration */
export const TAG_PULSE_MS = 2000;

// -- Sine Wave Background --

/** Number of wave lines to draw across the header */
export const WAVE_COUNT = 8;

/** Base wave amplitude in pixels */
export const WAVE_BASE_AMP = 8;

/** Mouse-proximity wave amplitude boost in pixels */
export const WAVE_MOUSE_AMP = 18;

/** Wave frequency multiplier (cycles across width) */
export const WAVE_FREQ = 2.5;

/** Wave animation speed multiplier */
export const WAVE_SPEED = 1.2;

/** Wave line stroke width in pixels */
export const WAVE_LINE_W = 1.5;

/** Wave glow blur radius in pixels */
export const WAVE_GLOW_BLUR = 10;

// -- Button Sine Wave Hover --

/** Wave amplitude for button hover effect in pixels */
export const BTN_WAVE_AMP = 4;

/** Wave frequency for button hover (cycles across button width) */
export const BTN_WAVE_FREQ = 2;

/** Wave animation speed for button hover */
export const BTN_WAVE_SPEED = 2.0;

/** Line width for button hover wave */
export const BTN_WAVE_LINE_W = 1.5;

/** Glow blur for button hover wave */
export const BTN_WAVE_GLOW_BLUR = 8;

// -- Reduced Motion --

/** Simple fade duration for reduced-motion preference */
export const REDUCED_MOTION_FADE_MS = 200;
