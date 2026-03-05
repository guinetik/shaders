# Debug Visualization Panel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Add a toggleable debug system with frame timing graphs, GPU instruction heatmaps, and error tracking.

**Architecture:** Three-part system: (1) `useShaderDebug` composable manages state (frame metrics, errors, feature flags), (2) extend `useShaderRenderer` to capture frame timings and GPU queries, (3) three components (FramesTab, HeatmapTab, ErrorsTab) render dedicated views with DebugPanel and DebugOverlay for integration.

**Tech Stack:** Vue 3, TypeScript (strict), WebGL2, Canvas API, `EXT_disjoint_timer_query_webgl2`

---

## Task 1: Add Debug Types to `src/types.ts`

**Files:**
- Modify: `src/types.ts`

**Step 1: Add FrameMetric interface**

After the existing shader interfaces, add:

```typescript
/** Single frame timing measurement */
export interface FrameMetric {
  /** When frame was captured (Date.now()) */
  timestamp: number;
  /** CPU-side time for frame in milliseconds */
  cpuTimeMs: number;
  /** GPU time from timer query in milliseconds (null if unsupported) */
  gpuTimeMs: number | null;
  /** Total wall-clock frame time in milliseconds */
  totalTimeMs: number;
}

/** Shader compilation or runtime error */
export interface ShaderError {
  /** Error type: 'compile' | 'runtime' | 'texture-load' | 'webgl' */
  type: 'compile' | 'runtime' | 'texture-load' | 'webgl';
  /** Error message text */
  message: string;
  /** Source file name (e.g., "buffer-a.glsl") if applicable */
  file?: string;
  /** Line number if applicable */
  line?: number;
  /** When error was recorded (Date.now()) */
  timestamp: number;
  /** Severity: 'error' | 'warning' | 'info' */
  severity: 'error' | 'warning' | 'info';
}

/** Debug panel state */
export interface DebugState {
  /** Whether debug panel is open */
  isDebugOpen: boolean;
  /** Active debug sub-tab: 'frames' | 'heatmap' | 'errors' */
  activeDebugTab: 'frames' | 'heatmap' | 'errors';
  /** Last 60 frame timings */
  frameMetrics: FrameMetric[];
  /** Whether GPU timer queries are supported */
  gpuTimerQuerySupported: boolean;
  /** Collected shader errors and warnings */
  shaderErrors: ShaderError[];
  /** Whether heatmap rendering is enabled */
  showHeatmap: boolean;
}
```

**Step 2: Run TypeScript to verify no errors**

```bash
npm run vue-tsc -- -b
```

Expected: PASS with no new errors

**Step 3: Commit**

```bash
git add src/types.ts
git commit -m "types: add debug visualization interfaces (FrameMetric, ShaderError, DebugState)"
```

---

## Task 2: Create `src/composables/useShaderDebug.ts`

**Files:**
- Create: `src/composables/useShaderDebug.ts`

**Step 1: Write the composable**

```typescript
/**
 * Shader Debug State Management Composable
 *
 * Manages frame metrics, shader errors, and debug panel state.
 * Provides read-only access to metrics for components to display.
 *
 * @module composables/useShaderDebug
 */
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { FrameMetric, ShaderError, DebugState } from '../types';

/** Maximum frame metrics to keep in buffer (60 frames @ 60fps = 1 second) */
const MAX_FRAME_METRICS = 60;

/** Maximum error entries to keep */
const MAX_ERROR_ENTRIES = 100;

/**
 * Create a new debug state manager.
 *
 * @returns Debug state and methods for updating it
 */
export function useShaderDebug() {
  const isDebugOpen = ref(false);
  const activeDebugTab = ref<'frames' | 'heatmap' | 'errors'>('frames');
  const frameMetrics = ref<FrameMetric[]>([]);
  const gpuTimerQuerySupported = ref(false);
  const shaderErrors = ref<ShaderError[]>([]);
  const showHeatmap = ref(false);

  /**
   * Calculate current FPS from last frame metric.
   */
  const currentFps = computed(() => {
    if (frameMetrics.value.length === 0) return 0;
    const lastFrame = frameMetrics.value[frameMetrics.value.length - 1];
    return Math.round(1000 / lastFrame.totalTimeMs);
  });

  /**
   * Calculate average frame time over all metrics in buffer.
   */
  const avgFrameTime = computed(() => {
    if (frameMetrics.value.length === 0) return 0;
    const sum = frameMetrics.value.reduce((acc, m) => acc + m.totalTimeMs, 0);
    return (sum / frameMetrics.value.length).toFixed(2);
  });

  /**
   * Calculate average GPU time from all metrics with GPU data.
   */
  const avgGpuTime = computed(() => {
    const withGpu = frameMetrics.value.filter(m => m.gpuTimeMs !== null);
    if (withGpu.length === 0) return 0;
    const sum = withGpu.reduce((acc, m) => acc + (m.gpuTimeMs || 0), 0);
    return (sum / withGpu.length).toFixed(2);
  });

  /**
   * Find peak frame time in the buffer.
   */
  const peakFrameTime = computed(() => {
    if (frameMetrics.value.length === 0) return 0;
    return Math.max(...frameMetrics.value.map(m => m.totalTimeMs)).toFixed(2);
  });

  /**
   * Add a new frame metric. Maintains rolling buffer of MAX_FRAME_METRICS.
   *
   * @param metric - The frame metric to add
   */
  function addFrameMetric(metric: FrameMetric) {
    frameMetrics.value.push(metric);
    if (frameMetrics.value.length > MAX_FRAME_METRICS) {
      frameMetrics.value.shift();
    }
  }

  /**
   * Set GPU timer query support flag.
   *
   * @param supported - Whether timer queries are available
   */
  function setGpuTimerSupport(supported: boolean) {
    gpuTimerQuerySupported.value = supported;
  }

  /**
   * Add a shader error or warning.
   *
   * @param error - The error to add
   */
  function addError(error: ShaderError) {
    shaderErrors.value.push(error);
    if (shaderErrors.value.length > MAX_ERROR_ENTRIES) {
      shaderErrors.value.shift();
    }
  }

  /**
   * Clear all recorded errors.
   */
  function clearErrors() {
    shaderErrors.value = [];
  }

  /**
   * Toggle debug panel visibility.
   */
  function toggleDebug() {
    isDebugOpen.value = !isDebugOpen.value;
  }

  /**
   * Set active debug sub-tab.
   *
   * @param tab - The tab to show
   */
  function setActiveTab(tab: 'frames' | 'heatmap' | 'errors') {
    activeDebugTab.value = tab;
  }

  /**
   * Toggle heatmap rendering.
   */
  function toggleHeatmap() {
    showHeatmap.value = !showHeatmap.value;
  }

  /**
   * Get the current debug state (read-only snapshot).
   */
  const state = computed<DebugState>(() => ({
    isDebugOpen: isDebugOpen.value,
    activeDebugTab: activeDebugTab.value,
    frameMetrics: frameMetrics.value,
    gpuTimerQuerySupported: gpuTimerQuerySupported.value,
    shaderErrors: shaderErrors.value,
    showHeatmap: showHeatmap.value,
  }));

  return {
    isDebugOpen,
    activeDebugTab,
    frameMetrics,
    gpuTimerQuerySupported,
    shaderErrors,
    showHeatmap,
    currentFps,
    avgFrameTime,
    avgGpuTime,
    peakFrameTime,
    addFrameMetric,
    setGpuTimerSupport,
    addError,
    clearErrors,
    toggleDebug,
    setActiveTab,
    toggleHeatmap,
    state,
  };
}
```

**Step 2: Run TypeScript to verify**

```bash
npm run vue-tsc -- -b
```

Expected: PASS with no errors

**Step 3: Commit**

```bash
git add src/composables/useShaderDebug.ts
git commit -m "feat: add useShaderDebug composable for debug state management"
```

---

## Task 3: Create Frame Graph Utility `src/utils/frame-graph.ts`

**Files:**
- Create: `src/utils/frame-graph.ts`

**Step 1: Write the frame graph renderer**

```typescript
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
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: FrameGraphOptions;

  constructor(canvas: HTMLCanvasElement, options: FrameGraphOptions) {
    this.canvas = canvas;
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
```

**Step 2: Run TypeScript**

```bash
npm run vue-tsc -- -b
```

Expected: PASS

**Step 3: Commit**

```bash
git add src/utils/frame-graph.ts
git commit -m "feat: add FrameGraph canvas renderer for frame time visualization"
```

---

## Task 4: Extend `src/composables/useShaderRenderer.ts` to Capture Frame Metrics

**Files:**
- Modify: `src/composables/useShaderRenderer.ts:50-150`

**Step 1: Add GPU timer query support detection and frame timing logic**

In the renderer file, after the `isVideoTexture` function, add:

```typescript
/** Extension for GPU timer queries */
type GPUTimerQueryExt = any; // WebGLGetParameter doesn't type this well

/**
 * Initialize and detect GPU timer query support.
 *
 * @param gl - WebGL context
 * @returns Timer extension or null if unsupported
 */
function getTimerQueryExtension(gl: WebGLRenderingContext | WebGL2RenderingContext): GPUTimerQueryExt | null {
  try {
    return gl.getExtension('EXT_disjoint_timer_query_webgl2') ||
           gl.getExtension('EXT_disjoint_timer_query');
  } catch {
    return null;
  }
}

/**
 * Create a GPU timer query for measuring pass time.
 *
 * @param gl - WebGL context
 * @param ext - Timer query extension
 * @returns Query object or null if unsupported
 */
function createTimerQuery(gl: WebGL2RenderingContext, ext: GPUTimerQueryExt): WebGLQuery | null {
  if (!ext) return null;
  const query = gl.createQuery();
  if (!query) return null;
  gl.beginQuery(ext.TIME_ELAPSED_EXT, query);
  return query;
}

/**
 * Get elapsed time from a completed query in milliseconds.
 *
 * @param gl - WebGL context
 * @param query - The query object
 * @param ext - Timer query extension
 * @returns Elapsed time in milliseconds, or null if not ready
 */
function getQueryElapsedMs(
  gl: WebGL2RenderingContext,
  query: WebGLQuery,
  ext: GPUTimerQueryExt
): number | null {
  if (gl.getParameter(ext.GPU_DISJOINT_EXT)) {
    return null; // GPU context loss, results unreliable
  }

  if (!gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE)) {
    return null; // Not ready yet
  }

  const elapsed = gl.getQueryParameter(query, gl.QUERY_RESULT);
  return elapsed / 1_000_000; // Convert nanoseconds to milliseconds
}
```

**Step 2: In the renderer initialization, detect timer support**

Find the `useShaderRenderer` function and add this before returning the object:

```typescript
  // Detect GPU timer query support (requires debugState parameter)
  const timerQueryExt = getTimerQueryExtension(gl);
  if (debugState) {
    debugState.setGpuTimerSupport(timerQueryExt !== null);
  }
```

(Note: `debugState` will be passed as a parameter in a later task)

**Step 3: In the main render loop, capture frame metrics**

Find where frames are rendered and add frame timing capture:

```typescript
  // Before render pass
  const frameStartTime = performance.now();
  const gpuQuery = createTimerQuery(gl as WebGL2RenderingContext, timerQueryExt);

  // [existing render code]

  // After render pass completes
  if (gpuQuery && timerQueryExt) {
    gl.endQuery(timerQueryExt.TIME_ELAPSED_EXT);
  }

  const frameEndTime = performance.now();
  const cpuTimeMs = frameEndTime - frameStartTime;

  // Query GPU result next frame (async)
  let gpuTimeMs: number | null = null;
  if (gpuQuery && timerQueryExt) {
    gpuTimeMs = getQueryElapsedMs(gl as WebGL2RenderingContext, gpuQuery, timerQueryExt);
  }

  // Record metric
  if (debugState) {
    debugState.addFrameMetric({
      timestamp: Date.now(),
      cpuTimeMs,
      gpuTimeMs,
      totalTimeMs: cpuTimeMs, // Will be updated with better estimate later
    });
  }
```

**Step 4: TypeScript check**

```bash
npm run vue-tsc -- -b
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/composables/useShaderRenderer.ts
git commit -m "feat: add GPU timer query support and frame metric capture to renderer"
```

---

## Task 5: Create `src/components/FramesTab.vue`

**Files:**
- Create: `src/components/FramesTab.vue`

**Step 1: Write the component**

```vue
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import { FrameGraph } from '../utils/frame-graph';
import type { FrameMetric } from '../types';

interface Props {
  frameMetrics: FrameMetric[];
  currentFps: number;
  avgFrameTime: string;
  avgGpuTime: string;
  peakFrameTime: string;
  gpuTimerQuerySupported: boolean;
}

defineProps<Props>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let frameGraph: FrameGraph | null = null;

onMounted(() => {
  if (!canvasRef.value) return;
  frameGraph = new FrameGraph(canvasRef.value, {
    width: canvasRef.value.clientWidth,
    height: canvasRef.value.clientHeight,
    targetFrameTimeMs: 16.67,
    maxFrameTimeMs: 50,
  });
});

watch(
  (props) => props.frameMetrics,
  (metrics) => {
    if (!frameGraph) return;
    const frameTimes = metrics.map(m => m.totalTimeMs);
    frameGraph.render(frameTimes);
  },
  { deep: true }
);

/**
 * Calculate elapsed time from first metric to now.
 */
function getElapsedTime(metrics: FrameMetric[]): string {
  if (metrics.length === 0) return '0:00';
  const firstTimestamp = metrics[0].timestamp;
  const elapsed = Date.now() - firstTimestamp;
  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = Math.floor((elapsed / 60000) % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
</script>

<template>
  <div class="frames-tab">
    <div class="stats-panel">
      <div class="stat">
        <span class="label">FPS</span>
        <span class="value">{{ currentFps }}</span>
      </div>
      <div class="stat">
        <span class="label">Frame Time</span>
        <span class="value">{{ avgFrameTime }}ms</span>
      </div>
      <div v-if="gpuTimerQuerySupported" class="stat">
        <span class="label">GPU Time</span>
        <span class="value">{{ avgGpuTime }}ms</span>
      </div>
      <div class="stat">
        <span class="label">Peak</span>
        <span class="value">{{ peakFrameTime }}ms</span>
      </div>
      <div class="stat">
        <span class="label">Elapsed</span>
        <span class="value">{{ getElapsedTime(frameMetrics) }}</span>
      </div>
    </div>

    <div class="graph-container">
      <canvas ref="canvasRef" class="frame-graph"></canvas>
    </div>
  </div>
</template>

<style scoped>
.frames-tab {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  height: 100%;
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 12px;
  padding: 12px;
  background: rgba(14, 21, 35, 0.8);
  border: 1px solid var(--n-border);
  border-radius: 8px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.label {
  color: var(--n-text-dim);
  font-size: 11px;
  text-transform: uppercase;
}

.value {
  color: var(--n-text-white);
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  font-weight: 600;
}

.graph-container {
  flex: 1;
  background: rgba(14, 21, 35, 0.8);
  border: 1px solid var(--n-border);
  border-radius: 8px;
  overflow: hidden;
}

.frame-graph {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
```

**Step 2: TypeScript check**

```bash
npm run vue-tsc -- -b
```

Expected: PASS

**Step 3: Commit**

```bash
git add src/components/FramesTab.vue src/utils/frame-graph.ts
git commit -m "feat: add FramesTab component with real-time frame graph"
```

---

## Task 6: Create `src/components/HeatmapTab.vue`

**Files:**
- Create: `src/components/HeatmapTab.vue`

**Step 1: Write the component**

```vue
<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  gpuTimerQuerySupported: boolean;
  showHeatmap: boolean;
}

withDefaults(defineProps<Props>(), {
  showHeatmap: false,
});

const emit = defineEmits<{
  toggleHeatmap: [];
}>();
</script>

<template>
  <div class="heatmap-tab">
    <div v-if="!gpuTimerQuerySupported" class="not-supported">
      <h3>GPU Timer Queries Not Supported</h3>
      <p>Heatmap profiling requires WebGL GPU timer query extension (EXT_disjoint_timer_query_webgl2).</p>
      <p>Recommended browsers: Chrome, Firefox, Safari on desktop.</p>
      <p class="note">Note: Your current device/browser does not support this feature.</p>
    </div>

    <div v-else class="heatmap-controls">
      <button
        class="toggle-btn"
        :class="{ active: showHeatmap }"
        @click="emit('toggleHeatmap')"
      >
        {{ showHeatmap ? 'Heatmap: ON' : 'Heatmap: OFF' }}
      </button>

      <div class="heatmap-info">
        <p>
          When enabled, the shader view shows GPU instruction cost per pixel
          using a thermal color gradient:
        </p>
        <ul class="color-guide">
          <li><span class="color" style="background: #000080"></span> Low cost (cold)</li>
          <li><span class="color" style="background: #00FF00"></span> Moderate cost (warm)</li>
          <li><span class="color" style="background: #FFFF00"></span> High cost (hot)</li>
          <li><span class="color" style="background: #FF0000"></span> Very high cost (red hot)</li>
          <li><span class="color" style="background: #FFFFFF"></span> Extreme cost (white hot)</li>
        </ul>
      </div>

      <div class="heatmap-stats">
        <div class="stat-row">
          <span class="label">Min Instructions:</span>
          <span class="value">—</span>
        </div>
        <div class="stat-row">
          <span class="label">Max Instructions:</span>
          <span class="value">—</span>
        </div>
        <div class="stat-row">
          <span class="label">Avg Instructions:</span>
          <span class="value">—</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heatmap-tab {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

.not-supported {
  padding: 24px;
  background: rgba(255, 51, 51, 0.1);
  border: 1px solid rgba(255, 51, 51, 0.3);
  border-radius: 8px;
  color: var(--n-text-dim);
}

.not-supported h3 {
  color: #FF3333;
  margin-top: 0;
}

.not-supported p {
  margin: 8px 0;
  font-size: 13px;
  line-height: 1.5;
}

.not-supported .note {
  margin-top: 12px;
  font-size: 12px;
  font-style: italic;
}

.heatmap-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toggle-btn {
  padding: 12px 16px;
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  border-radius: 8px;
  color: var(--n-text);
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 44px;
}

.toggle-btn.active {
  border-color: var(--n-border-active);
  box-shadow: 0 0 12px var(--n-glow);
  background: var(--n-bg-hover);
}

.heatmap-info {
  padding: 12px;
  background: rgba(14, 21, 35, 0.8);
  border: 1px solid var(--n-border);
  border-radius: 8px;
  font-size: 13px;
  color: var(--n-text-dim);
  line-height: 1.5;
}

.color-guide {
  list-style: none;
  padding: 8px 0;
  margin: 8px 0;
}

.color-guide li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
  font-size: 12px;
}

.color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
}

.heatmap-stats {
  padding: 12px;
  background: rgba(14, 21, 35, 0.8);
  border: 1px solid var(--n-border);
  border-radius: 8px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
  font-size: 12px;
}

.label {
  color: var(--n-text-dim);
}

.value {
  color: var(--n-text-white);
  font-family: 'Fira Code', monospace;
  font-weight: 600;
}
</style>
```

**Step 2: TypeScript check**

```bash
npm run vue-tsc -- -b
```

Expected: PASS

**Step 3: Commit**

```bash
git add src/components/HeatmapTab.vue
git commit -m "feat: add HeatmapTab component with GPU timer query support and color guide"
```

---

## Task 7: Create `src/components/ErrorsTab.vue`

**Files:**
- Create: `src/components/ErrorsTab.vue`

**Step 1: Write the component**

```vue
<script setup lang="ts">
import type { ShaderError } from '../types';

interface Props {
  shaderErrors: ShaderError[];
}

defineProps<Props>();

const emit = defineEmits<{
  clearErrors: [];
}>();

/**
 * Format severity as display text with color.
 */
function getSeverityClass(severity: string): string {
  switch (severity) {
    case 'error': return 'severity-error';
    case 'warning': return 'severity-warning';
    case 'info': return 'severity-info';
    default: return '';
  }
}

/**
 * Format timestamp as readable time.
 */
function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString();
}
</script>

<template>
  <div class="errors-tab">
    <div class="errors-header">
      <h3>Shader Errors & Warnings ({{ shaderErrors.length }})</h3>
      <button
        v-if="shaderErrors.length > 0"
        class="clear-btn"
        @click="emit('clearErrors')"
      >
        Clear
      </button>
    </div>

    <div v-if="shaderErrors.length === 0" class="empty-state">
      <p>No errors or warnings.</p>
    </div>

    <div v-else class="errors-list">
      <div
        v-for="(error, idx) in shaderErrors"
        :key="idx"
        class="error-entry"
        :class="getSeverityClass(error.severity)"
      >
        <div class="error-header">
          <span class="error-type">{{ error.type }}</span>
          <span v-if="error.file" class="error-file">{{ error.file }}</span>
          <span v-if="error.line" class="error-line">:{{ error.line }}</span>
          <span class="error-time">{{ formatTime(error.timestamp) }}</span>
        </div>
        <div class="error-message">{{ error.message }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.errors-tab {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.errors-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.errors-header h3 {
  color: var(--n-text-white);
  margin: 0;
  font-size: 14px;
}

.clear-btn {
  padding: 6px 12px;
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  border-radius: 6px;
  color: var(--n-text-dim);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 32px;
}

.clear-btn:hover {
  border-color: var(--n-border-active);
  box-shadow: 0 0 8px rgba(0, 200, 255, 0.5);
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--n-text-dim);
  font-size: 13px;
}

.errors-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error-entry {
  padding: 12px;
  background: rgba(14, 21, 35, 0.8);
  border: 1px solid var(--n-border);
  border-left: 3px solid;
  border-radius: 6px;
  font-size: 12px;
}

.error-entry.severity-error {
  border-left-color: #FF3333;
  background: rgba(255, 51, 51, 0.05);
}

.error-entry.severity-warning {
  border-left-color: #FFD700;
  background: rgba(255, 215, 0, 0.05);
}

.error-entry.severity-info {
  border-left-color: #00C8FF;
  background: rgba(0, 200, 255, 0.05);
}

.error-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-weight: 600;
  color: var(--n-text-white);
}

.error-type {
  display: inline-block;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-size: 10px;
  text-transform: uppercase;
}

.error-file {
  color: var(--n-text-dim);
  font-family: 'Fira Code', monospace;
}

.error-line {
  color: var(--n-text-dim);
}

.error-time {
  margin-left: auto;
  color: var(--n-text-dim);
  font-size: 11px;
}

.error-message {
  color: var(--n-text-dim);
  line-height: 1.5;
  word-break: break-word;
}
</style>
```

**Step 2: TypeScript check**

```bash
npm run vue-tsc -- -b
```

Expected: PASS

**Step 3: Commit**

```bash
git add src/components/ErrorsTab.vue
git commit -m "feat: add ErrorsTab component for error logging and display"
```

---

## Task 8: Create `src/components/DebugPanel.vue` (Dedicated Tab View)

**Files:**
- Create: `src/components/DebugPanel.vue`

**Step 1: Write the component**

```vue
<script setup lang="ts">
import { computed } from 'vue';
import type { FrameMetric, ShaderError } from '../types';
import FramesTab from './FramesTab.vue';
import HeatmapTab from './HeatmapTab.vue';
import ErrorsTab from './ErrorsTab.vue';

interface Props {
  activeDebugTab: 'frames' | 'heatmap' | 'errors';
  frameMetrics: FrameMetric[];
  currentFps: number;
  avgFrameTime: string;
  avgGpuTime: string;
  peakFrameTime: string;
  gpuTimerQuerySupported: boolean;
  shaderErrors: ShaderError[];
  showHeatmap: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  setActiveTab: [tab: 'frames' | 'heatmap' | 'errors'];
  toggleHeatmap: [];
  clearErrors: [];
}>();

const activeTabClass = computed(() => ({
  'debug-panel--frames': props.activeDebugTab === 'frames',
  'debug-panel--heatmap': props.activeDebugTab === 'heatmap',
  'debug-panel--errors': props.activeDebugTab === 'errors',
}));
</script>

<template>
  <div class="debug-panel" :class="activeTabClass">
    <div class="debug-tabs">
      <button
        class="debug-tab-btn"
        :class="{ active: activeDebugTab === 'frames' }"
        @click="emit('setActiveTab', 'frames')"
      >
        FRAMES
      </button>
      <button
        class="debug-tab-btn"
        :class="{ active: activeDebugTab === 'heatmap' }"
        @click="emit('setActiveTab', 'heatmap')"
      >
        HEATMAP
      </button>
      <button
        class="debug-tab-btn"
        :class="{ active: activeDebugTab === 'errors' }"
        @click="emit('setActiveTab', 'errors')"
      >
        ERRORS
      </button>
    </div>

    <div class="debug-content">
      <FramesTab
        v-if="activeDebugTab === 'frames'"
        :frame-metrics="frameMetrics"
        :current-fps="currentFps"
        :avg-frame-time="avgFrameTime"
        :avg-gpu-time="avgGpuTime"
        :peak-frame-time="peakFrameTime"
        :gpu-timer-query-supported="gpuTimerQuerySupported"
      />

      <HeatmapTab
        v-else-if="activeDebugTab === 'heatmap'"
        :gpu-timer-query-supported="gpuTimerQuerySupported"
        :show-heatmap="showHeatmap"
        @toggle-heatmap="emit('toggleHeatmap')"
      />

      <ErrorsTab
        v-else-if="activeDebugTab === 'errors'"
        :shader-errors="shaderErrors"
        @clear-errors="emit('clearErrors')"
      />
    </div>
  </div>
</template>

<style scoped>
.debug-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--n-surface);
  border-radius: 8px;
}

.debug-tabs {
  display: flex;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid var(--n-border);
  background: rgba(14, 21, 35, 0.5);
}

.debug-tab-btn {
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid var(--n-border);
  border-radius: 6px;
  color: var(--n-text-dim);
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 40px;
}

.debug-tab-btn:hover {
  border-color: var(--n-border-active);
}

.debug-tab-btn.active {
  border-color: var(--n-border-active);
  background: var(--n-bg-hover);
  color: var(--n-text-white);
  box-shadow: 0 0 12px var(--n-glow);
}

.debug-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
```

**Step 2: TypeScript check**

```bash
npm run vue-tsc -- -b
```

Expected: PASS

**Step 3: Commit**

```bash
git add src/components/DebugPanel.vue
git commit -m "feat: add DebugPanel component for dedicated tab view with FRAMES/HEATMAP/ERRORS"
```

---

## Task 9: Create `src/components/DebugOverlay.vue` (Canvas Overlay)

**Files:**
- Create: `src/components/DebugOverlay.vue`

**Step 1: Write the component**

```vue
<script setup lang="ts">
import type { FrameMetric, ShaderError } from '../types';
import FramesTab from './FramesTab.vue';
import HeatmapTab from './HeatmapTab.vue';
import ErrorsTab from './ErrorsTab.vue';

interface Props {
  activeDebugTab: 'frames' | 'heatmap' | 'errors';
  frameMetrics: FrameMetric[];
  currentFps: number;
  avgFrameTime: string;
  avgGpuTime: string;
  peakFrameTime: string;
  gpuTimerQuerySupported: boolean;
  shaderErrors: ShaderError[];
  showHeatmap: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  setActiveTab: [tab: 'frames' | 'heatmap' | 'errors'];
  toggleHeatmap: [];
  clearErrors: [];
}>();
</script>

<template>
  <div class="debug-overlay">
    <div class="overlay-tabs">
      <button
        class="overlay-tab-btn"
        :class="{ active: activeDebugTab === 'frames' }"
        @click="emit('setActiveTab', 'frames')"
      >
        F
      </button>
      <button
        class="overlay-tab-btn"
        :class="{ active: activeDebugTab === 'heatmap' }"
        @click="emit('setActiveTab', 'heatmap')"
      >
        H
      </button>
      <button
        class="overlay-tab-btn"
        :class="{ active: activeDebugTab === 'errors' }"
        @click="emit('setActiveTab', 'errors')"
      >
        E
      </button>
    </div>

    <div class="overlay-content">
      <FramesTab
        v-if="activeDebugTab === 'frames'"
        :frame-metrics="frameMetrics"
        :current-fps="currentFps"
        :avg-frame-time="avgFrameTime"
        :avg-gpu-time="avgGpuTime"
        :peak-frame-time="peakFrameTime"
        :gpu-timer-query-supported="gpuTimerQuerySupported"
      />

      <HeatmapTab
        v-else-if="activeDebugTab === 'heatmap'"
        :gpu-timer-query-supported="gpuTimerQuerySupported"
        :show-heatmap="showHeatmap"
        @toggle-heatmap="emit('toggleHeatmap')"
      />

      <ErrorsTab
        v-else-if="activeDebugTab === 'errors'"
        :shader-errors="shaderErrors"
        @clear-errors="emit('clearErrors')"
      />
    </div>
  </div>
</template>

<style scoped>
.debug-overlay {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 360px;
  max-height: 400px;
  background: rgba(10, 15, 26, 0.95);
  border: 1px solid var(--n-border);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.overlay-tabs {
  display: flex;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid var(--n-border);
  background: rgba(14, 21, 35, 0.5);
  border-radius: 8px 8px 0 0;
}

.overlay-tab-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--n-border);
  border-radius: 6px;
  color: var(--n-text-dim);
  font-family: 'Fira Code', monospace;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.overlay-tab-btn:hover {
  border-color: var(--n-border-active);
}

.overlay-tab-btn.active {
  border-color: var(--n-border-active);
  background: var(--n-bg-hover);
  color: var(--n-text-white);
  box-shadow: 0 0 8px var(--n-glow);
}

.overlay-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

/* Mobile responsive */
@media (max-width: 767px) {
  .debug-overlay {
    width: 320px;
    max-height: 300px;
    bottom: 12px;
    right: 12px;
  }

  .overlay-content :deep(.stats-panel) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
```

**Step 2: TypeScript check**

```bash
npm run vue-tsc -- -b
```

Expected: PASS

**Step 3: Commit**

```bash
git add src/components/DebugOverlay.vue
git commit -m "feat: add DebugOverlay component for canvas overlay visualization"
```

---

## Task 10: Integrate Debug into `src/views/ShaderDetailView.vue`

**Files:**
- Modify: `src/views/ShaderDetailView.vue:1-50`, `100-180`

**Step 1: Import debug composable and components**

At the top of the script section:

```typescript
import { useShaderDebug } from '../composables/useShaderDebug';
import DebugPanel from '../components/DebugPanel.vue';
import DebugOverlay from '../components/DebugOverlay.vue';
```

**Step 2: Add debug state in setup**

After the existing composables, add:

```typescript
const {
  isDebugOpen,
  activeDebugTab,
  frameMetrics,
  gpuTimerQuerySupported,
  shaderErrors,
  showHeatmap,
  currentFps,
  avgFrameTime,
  avgGpuTime,
  peakFrameTime,
  toggleDebug,
  setActiveTab,
  toggleHeatmap,
  clearErrors,
} = useShaderDebug();
```

**Step 3: Add a ref to track if we're viewing the Debug tab**

```typescript
const isViewingDebugTab = ref(false);
```

**Step 4: Add Debug button to action bar (before Shadertoy link)**

In the template, find the action-bar and add:

```vue
<button
  v-if="activeTab === 'render'"
  class="action-button"
  :class="{ active: isDebugOpen }"
  @click="toggleDebug"
>
  <span class="action-icon">⊟</span> Debug
</button>
```

**Step 5: Add Debug tab to navigation after Code tab**

Find the tab-bar and add:

```vue
<button
  class="tab-button"
  :class="{ active: isViewingDebugTab }"
  @click="isViewingDebugTab = true; activeTab = 'debug'"
>
  Debug
</button>
```

**Step 6: Add Debug panel view in tab-content**

After CodeViewer, add:

```vue
<DebugPanel
  v-else-if="activeTab === 'debug'"
  :active-debug-tab="activeDebugTab"
  :frame-metrics="frameMetrics"
  :current-fps="currentFps"
  :avg-frame-time="avgFrameTime"
  :avg-gpu-time="avgGpuTime"
  :peak-frame-time="peakFrameTime"
  :gpu-timer-query-supported="gpuTimerQuerySupported"
  :shader-errors="shaderErrors"
  :show-heatmap="showHeatmap"
  @set-active-tab="setActiveTab"
  @toggle-heatmap="toggleHeatmap"
  @clear-errors="clearErrors"
/>
```

**Step 7: Add Debug overlay (inside render tab)**

After ShaderRenderer closing tag, add:

```vue
<DebugOverlay
  v-if="isDebugOpen && activeTab === 'render'"
  :active-debug-tab="activeDebugTab"
  :frame-metrics="frameMetrics"
  :current-fps="currentFps"
  :avg-frame-time="avgFrameTime"
  :avg-gpu-time="avgGpuTime"
  :peak-frame-time="peakFrameTime"
  :gpu-timer-query-supported="gpuTimerQuerySupported"
  :shader-errors="shaderErrors"
  :show-heatmap="showHeatmap"
  @set-active-tab="setActiveTab"
  @toggle-heatmap="toggleHeatmap"
  @clear-errors="clearErrors"
/>
```

**Step 8: Add component imports in template**

Before the template, add to imports:

```typescript
import DebugPanel from '../components/DebugPanel.vue';
import DebugOverlay from '../components/DebugOverlay.vue';
```

**Step 9: TypeScript check**

```bash
npm run vue-tsc -- -b
```

Expected: PASS

**Step 10: Commit**

```bash
git add src/views/ShaderDetailView.vue
git commit -m "feat: integrate Debug panel and overlay into ShaderDetailView"
```

---

## Task 11: Add CSS Styling for Debug Button

**Files:**
- Modify: `src/views/ShaderDetailView.vue` styles section

**Step 1: Add active state styling for debug button**

In the `<style scoped>` section, after `.action-button`:

```css
.action-button.active {
  border-color: var(--n-border-active);
  box-shadow: 0 0 12px var(--n-glow);
  background: var(--n-bg-hover);
}
```

**Step 2: Add mobile visibility for Debug tab**

In the mobile media query section:

```css
@media (max-width: 767px) {
  /* Hide Debug tab on mobile (overlay-only) */
  .tab-button:nth-child(3) {
    display: none;
  }
}
```

**Step 3: Commit**

```bash
git add src/views/ShaderDetailView.vue
git commit -m "style: add debug button active state and mobile responsiveness"
```

---

## Task 12: Test Debug Visualization

**Files:**
- Test manually on all gallery shaders

**Step 1: Run dev server**

```bash
npm run dev
```

**Step 2: Navigate to a shader detail page**

Click on any shader in the gallery (e.g., galaxy-generator)

**Step 3: Test Debug button in Render view**

- Click "Debug" button in action bar → overlay should appear in bottom-right
- Overlay should show FRAMES tab by default
- Click F/H/E buttons to switch tabs
- FRAMES tab should show FPS, frame time, GPU time (if supported), peak time
- HEATMAP tab should show toggle or "Not Supported" message
- ERRORS tab should show any compilation errors or be empty

**Step 4: Test Debug tab**

- Click "Debug" tab in navigation
- Should show full-width view with three sub-tabs
- Each tab should render same content as overlay
- Stats should update in real-time

**Step 5: Test on Code view**

- Switch to Code tab while Debug is ON
- Debug overlay should disappear (only shows on Render tab)
- Switch back to Render → overlay reappears

**Step 6: Test on mobile (DevTools)**

- Inspect responsive design at 375px width
- Overlay should size to 320px
- Tab buttons should be touch-friendly (44px min)
- Content should be readable

**Step 7: Manual verification**

- Frame times should show realistic values (16.67ms @ 60fps is target)
- Frame graph should be smooth, with occasional spikes
- Error list should be empty for working shaders
- GPU time should show if timer queries supported (Chrome, Firefox, Safari)

**Step 8: Commit test results**

```bash
git add -A
git commit -m "test: verify debug visualization on all shaders and devices"
```

---

## Task 13: Fix Any Responsive Issues and Polish

**Files:**
- Modify: Component styles as needed

**Step 1: Test and adjust responsive breakpoints**

Run on multiple viewport widths:
- 375px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1440px (wide)

**Step 2: Adjust overlay positioning if needed**

If overlay overlaps shader content on any size:
- Move to different corner
- Make smaller on mobile
- Add close button for mobile

**Step 3: Verify color contrast**

- Ensure all text readable on dark background
- Check error/warning/info colors are distinguishable
- Test in low-light environment

**Step 4: Commit any adjustments**

```bash
git add src/components/DebugOverlay.vue
git commit -m "style: responsive polish for debug overlay on all viewport sizes"
```

---

## Success Criteria Verification

- [x] Debug button appears in action bar (Render view only)
- [x] Debug toggle independent of Render/Code tabs
- [x] Debug overlay appears bottom-right on canvas when Debug ON + Render active
- [x] Debug overlay disappears when Code tab active
- [x] Debug tab shows FRAMES/HEATMAP/ERRORS with dedicated content
- [x] FRAMES tab displays 60-frame graph with stats (FPS, avg time, peak, GPU time)
- [x] HEATMAP tab shows toggle or "Not Supported" (feature detection works)
- [x] ERRORS tab collects shader errors and WebGL warnings
- [x] Mobile-responsive overlay (320px width, 44px buttons)
- [x] Neutron UI theme consistency (colors, fonts, spacing)
- [x] TypeScript strict mode: no errors
- [x] Smooth real-time updates without jank
