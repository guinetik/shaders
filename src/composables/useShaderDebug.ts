/**
 * Shader Debug State Management Composable
 *
 * Manages frame metrics, shader errors, and debug panel state.
 * Provides read-only access to metrics for components to display.
 *
 * @module composables/useShaderDebug
 */
import { ref, computed } from 'vue';
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
