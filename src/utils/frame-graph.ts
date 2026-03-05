/**
 * Frame Time Graph Renderer
 *
 * Canvas-based real-time graph showing frame times with color coding.
 * Green = normal frame times, Red = stutter/spike
 *
 * @module utils/frame-graph
 */

export interface FrameGraphOptions {
  width: number;
  height: number;
  targetFrameTimeMs: number; // 16.67 for 60fps
  maxFrameTimeMs: number; // auto-scale upper bound
}

export class FrameGraph {
  private ctx: CanvasRenderingContext2D;
  private options: FrameGraphOptions;

  constructor(canvas: HTMLCanvasElement, options: FrameGraphOptions) {
    this.ctx = canvas.getContext('2d')!;
    this.options = options;
  }

  /**
   * Render frame metrics as a line graph.
   *
   * @param frameMetrics - Array of frame times in milliseconds
   */
  render(frameMetrics: number[]): void {
    const { width, height, targetFrameTimeMs } = this.options;
    const ctx = this.ctx;

    // Clear canvas
    ctx.fillStyle = 'rgba(10, 15, 26, 1)';
    ctx.fillRect(0, 0, width, height);

    if (frameMetrics.length < 2) return;

    // Calculate max time for scaling (at least target + 50%)
    const maxTime = Math.max(targetFrameTimeMs * 1.5, ...frameMetrics);
    const scale = (height * 0.9) / maxTime;
    const xStep = width / (frameMetrics.length - 1);

    // Draw background gradient zones
    const targetY = height - targetFrameTimeMs * scale;
    ctx.fillStyle = 'rgba(0, 200, 255, 0.05)'; // cool zone
    ctx.fillRect(0, targetY, width, height - targetY);

    ctx.fillStyle = 'rgba(255, 51, 51, 0.05)'; // hot zone
    ctx.fillRect(0, 0, width, targetY);

    // Draw target line
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, targetY);
    ctx.lineTo(width, targetY);
    ctx.stroke();

    // Draw frame time line
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < frameMetrics.length; i++) {
      const x = i * xStep;
      const y = height - frameMetrics[i] * scale;

      // Color based on whether frame exceeds target
      const isStutter = frameMetrics[i] > targetFrameTimeMs;
      ctx.strokeStyle = isStutter ? '#FF3333' : '#00C8FF';

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
}

/**
 * Helper to draw elapsed time indicator.
 *
 * @param ctx - Canvas context
 * @param elapsedMs - Elapsed time in milliseconds
 * @param x - X position
 * @param y - Y position
 */
export function drawElapsedTime(
  ctx: CanvasRenderingContext2D,
  elapsedMs: number,
  x: number,
  y: number
): void {
  const seconds = Math.floor((elapsedMs / 1000) % 60);
  const minutes = Math.floor((elapsedMs / 60000) % 60);
  const text = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  ctx.font = '12px "Fira Code", monospace';
  ctx.fillStyle = '#00C8FF';
  ctx.textAlign = 'left';
  ctx.fillText(text, x, y);
}
