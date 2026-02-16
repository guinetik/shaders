/**
 * Sine Wave Hover — Floating canvas sine wave on button hover.
 *
 * Creates a single shared canvas that positions itself over whichever
 * button is hovered. Uses event delegation on a container element
 * with a CSS selector to match interactive children.
 *
 * One canvas, one RAF loop, zero extra DOM per button.
 *
 * @module composables/useSineWaveHover
 */
import { onMounted, onUnmounted, type Ref } from 'vue';
import {
  BTN_WAVE_AMP,
  BTN_WAVE_FREQ,
  BTN_WAVE_SPEED,
  BTN_WAVE_LINE_W,
  BTN_WAVE_GLOW_BLUR,
} from '../constants';

/** Phase offset between primary and secondary wave */
const PHASE_OFFSET = Math.PI * 0.5;

/** Fade-in/out duration for the canvas overlay in ms */
const FADE_MS = 150;

/**
 * Attaches a sine wave hover effect to child elements within a container.
 *
 * @param containerRef - Ref to the container element (event delegation root)
 * @param selector - CSS selector for hoverable children (e.g. '.tag-btn')
 * @param positionSelector - Optional CSS selector for a child element within the
 *   matched hover target to position the canvas over instead (e.g. '.card-overlay')
 * @param offsetY - Optional vertical pixel offset for the canvas position
 */
export function useSineWaveHover(
  containerRef: Ref<HTMLElement | null>,
  selector: string,
  positionSelector?: string,
  offsetY = 0,
): void {
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let rafId = 0;
  let activeEl: HTMLElement | null = null;
  let opacity = 0;
  let fadeDir: 'in' | 'out' | 'none' = 'none';
  let lastTime = 0;

  /** Checks prefers-reduced-motion at call time */
  function isReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Checks hover capability */
  function hasHover(): boolean {
    return window.matchMedia('(hover: hover)').matches;
  }

  function createCanvas(): void {
    canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:fixed;pointer-events:none;z-index:50;opacity:0;transition:none;';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
  }

  function positionCanvas(el: HTMLElement): void {
    if (!canvas) return;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const borderRadius = style.borderRadius || '0';

    canvas.style.top = `${rect.top + offsetY}px`;
    canvas.style.left = `${rect.left}px`;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    canvas.style.borderRadius = borderRadius;
    canvas.style.overflow = 'hidden';

    // Size buffer for DPR
    const dpr = window.devicePixelRatio || 1;
    const bw = Math.round(rect.width * dpr);
    const bh = Math.round(rect.height * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
  }

  function render(time: number): void {
    if (!canvas || !ctx || !activeEl) {
      if (fadeDir === 'none' && opacity <= 0) return;
    }

    const dt = lastTime ? (time - lastTime) : 16;
    lastTime = time;

    // Handle fade
    if (fadeDir === 'in') {
      opacity = Math.min(1, opacity + dt / FADE_MS);
      if (opacity >= 1) fadeDir = 'none';
    } else if (fadeDir === 'out') {
      opacity = Math.max(0, opacity - dt / FADE_MS);
      if (opacity <= 0) {
        fadeDir = 'none';
        if (canvas) canvas.style.opacity = '0';
        return;
      }
    }

    if (canvas) {
      canvas.style.opacity = String(opacity);
    }

    if (!canvas || !ctx) return;

    // Reposition on each frame (handles scroll)
    if (activeEl) {
      positionCanvas(activeEl);
    }

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.width / dpr;
    const cssHeight = canvas.height / dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const t = time * 0.001 * BTN_WAVE_SPEED;
    const centerY = cssHeight * 0.5;

    // Draw two waves
    for (let pass = 0; pass < 2; pass++) {
      const phaseOffset = pass === 0 ? 0 : PHASE_OFFSET;
      const alpha = pass === 0 ? 0.5 : 0.25;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(17, 220, 255, ${alpha})`;
      ctx.lineWidth = BTN_WAVE_LINE_W;
      ctx.shadowColor = `rgba(17, 220, 255, ${alpha * 0.5})`;
      ctx.shadowBlur = BTN_WAVE_GLOW_BLUR;

      for (let x = 0; x <= cssWidth; x += 2) {
        const y =
          centerY +
          Math.sin((x / cssWidth) * Math.PI * 2 * BTN_WAVE_FREQ + t + phaseOffset) *
            BTN_WAVE_AMP;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    rafId = requestAnimationFrame(render);
  }

  function onPointerEnter(e: Event): void {
    if (isReducedMotion() || !hasHover()) return;

    const target = (e.target as HTMLElement).closest(selector) as HTMLElement | null;
    if (!target) return;

    if (!canvas) createCanvas();

    const positionEl = positionSelector
      ? (target.querySelector(positionSelector) as HTMLElement | null) ?? target
      : target;
    activeEl = positionEl;
    positionCanvas(positionEl);
    fadeDir = 'in';

    cancelAnimationFrame(rafId);
    lastTime = 0;
    rafId = requestAnimationFrame(render);
  }

  function onPointerLeave(e: Event): void {
    const target = (e.target as HTMLElement).closest(selector);
    if (!target) return;

    // Check if we're moving to another matching element
    const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
    if (related && related.closest(selector)) return;

    activeEl = null;
    fadeDir = 'out';

    cancelAnimationFrame(rafId);
    lastTime = 0;
    rafId = requestAnimationFrame(render);
  }

  onMounted(() => {
    const container = containerRef.value;
    if (!container) return;

    container.addEventListener('mouseenter', onPointerEnter, true);
    container.addEventListener('mouseleave', onPointerLeave, true);
  });

  onUnmounted(() => {
    cancelAnimationFrame(rafId);

    const container = containerRef.value;
    if (container) {
      container.removeEventListener('mouseenter', onPointerEnter, true);
      container.removeEventListener('mouseleave', onPointerLeave, true);
    }

    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    canvas = null;
    ctx = null;
    activeEl = null;
  });
}
