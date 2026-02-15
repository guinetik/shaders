/**
 * Sine Wave Background — Attractor-inspired animated wave field.
 *
 * Draws multiple overlapping waves with velocity-mapped HSL coloring
 * inspired by the attractor shader series (Dadras, Lorenz, Rössler, Thomas).
 * Each wave has its own hue from a wide spectrum that shifts over time.
 * Mouse proximity boosts amplitude and brightens nearby waves.
 * Pauses rendering when tab is hidden. DPR-aware for crisp lines.
 *
 * @module composables/useSineWave
 */
import { onMounted, onUnmounted, type Ref } from 'vue';
import {
  WAVE_COUNT,
  WAVE_BASE_AMP,
  WAVE_MOUSE_AMP,
  WAVE_FREQ,
  WAVE_SPEED,
  WAVE_LINE_W,
  WAVE_GLOW_BLUR,
} from '../constants';

/** Mouse proximity radius in pixels for amplitude boost */
const MOUSE_PROXIMITY_RADIUS = 200;

/** Hue range start in degrees (yellow-orange, like Rössler MIN_HUE) */
const HUE_MIN = 40;

/** Hue range end in degrees (purple, like Rössler MAX_HUE) */
const HUE_MAX = 280;

/** Hue shift speed in degrees per second (matches attractor convention) */
const HUE_SHIFT_SPEED = 12;

/** Base saturation percentage (matches attractor 85%) */
const SATURATION = 85;

/** Base lightness percentage (matches attractor 55%) */
const LIGHTNESS = 55;

/** Maximum alpha for the brightest wave */
const MAX_ALPHA = 0.45;

/** Minimum alpha for the dimmest wave */
const MIN_ALPHA = 0.12;

/** Alpha boost when mouse is near a wave */
const MOUSE_ALPHA_BOOST = 0.25;

/** Lightness boost when mouse is near a wave */
const MOUSE_LIGHTNESS_BOOST = 15;

/**
 * Sets up and manages the sine wave animation on a canvas element.
 * The canvas should be sized by CSS (absolutely positioned to fill its parent).
 *
 * @param canvasRef - Template ref to the canvas element
 */
export function useSineWave(canvasRef: Ref<HTMLCanvasElement | null>): void {
  let rafId = 0;
  let mouseX = -1;
  let mouseY = -1;
  let isVisible = true;

  function onMouseMove(e: MouseEvent): void {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }

  function onMouseLeave(): void {
    mouseX = -1;
    mouseY = -1;
  }

  function onVisibilityChange(): void {
    isVisible = !document.hidden;
    if (isVisible && canvasRef.value) {
      rafId = requestAnimationFrame(render);
    }
  }

  function render(time: number): void {
    if (!isVisible) return;

    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;

    if (cssWidth === 0 || cssHeight === 0) {
      rafId = requestAnimationFrame(render);
      return;
    }

    // Size the canvas buffer to match CSS * DPR
    const bufW = Math.round(cssWidth * dpr);
    const bufH = Math.round(cssHeight * dpr);
    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width = bufW;
      canvas.height = bufH;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const timeSec = time * 0.001;
    const t = timeSec * WAVE_SPEED;
    const hueShift = timeSec * HUE_SHIFT_SPEED;
    const step = 2;

    for (let i = 0; i < WAVE_COUNT; i++) {
      const ratio = i / (WAVE_COUNT - 1);
      const baseY = cssHeight * (0.08 + ratio * 0.84);
      const phaseOffset = i * Math.PI * 0.6;
      const freqVariance = WAVE_FREQ + (i % 3) * 0.3;
      const speedVariance = 1.0 + (i % 2 === 0 ? 0.15 : -0.1) * (i / WAVE_COUNT);

      // Each wave gets a hue spread across the full spectrum, shifting over time
      const baseHue = HUE_MIN + ratio * (HUE_MAX - HUE_MIN);
      const hue = (baseHue + hueShift) % 360;

      // Waves near the center are brighter
      const centerDist = Math.abs(ratio - 0.5) * 2;
      let alpha = MAX_ALPHA - (MAX_ALPHA - MIN_ALPHA) * centerDist;
      let light = LIGHTNESS;

      // Per-wave brightness oscillation (like attractor blink pulses)
      const pulseFreq = 0.4 + (i % 4) * 0.15;
      const pulse = Math.sin(timeSec * pulseFreq + i * 1.7) * 0.5 + 0.5;
      alpha *= 0.7 + pulse * 0.3;

      // Mouse proximity: boost alpha and lightness for nearby waves
      let mouseProximity = 0;
      if (mouseX >= 0 && mouseY >= 0) {
        const dy = Math.abs(baseY - mouseY);
        if (dy < MOUSE_PROXIMITY_RADIUS) {
          mouseProximity = 1 - dy / MOUSE_PROXIMITY_RADIUS;
          mouseProximity *= mouseProximity;
          alpha = Math.min(1, alpha + MOUSE_ALPHA_BOOST * mouseProximity);
          light = light + MOUSE_LIGHTNESS_BOOST * mouseProximity;
        }
      }

      const color = `hsla(${hue}, ${SATURATION}%, ${light}%, ${alpha})`;
      const glowColor = `hsla(${hue}, ${SATURATION}%, ${light}%, ${alpha * 0.5})`;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = WAVE_LINE_W + mouseProximity * 0.5;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = WAVE_GLOW_BLUR + mouseProximity * 6;

      for (let x = 0; x <= cssWidth; x += step) {
        // Mouse proximity amplitude boost (per-pixel along x)
        let amp = WAVE_BASE_AMP;
        if (mouseX >= 0 && mouseY >= 0) {
          const dx = x - mouseX;
          const dy = baseY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_PROXIMITY_RADIUS) {
            const factor = 1 - dist / MOUSE_PROXIMITY_RADIUS;
            amp += WAVE_MOUSE_AMP * factor * factor;
          }
        }

        const y =
          baseY +
          Math.sin(
            (x / cssWidth) * Math.PI * 2 * freqVariance +
              t * speedVariance +
              phaseOffset,
          ) * amp;

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

  onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    rafId = requestAnimationFrame(render);
  });

  onUnmounted(() => {
    cancelAnimationFrame(rafId);

    const canvas = canvasRef.value;
    if (canvas) {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    }
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });
}
