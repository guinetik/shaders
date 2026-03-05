<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
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

const props = defineProps<Props>();

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
  () => props.frameMetrics,
  (metrics: FrameMetric[]) => {
    if (!frameGraph) return;
    const frameTimes = metrics.map((m: FrameMetric) => m.totalTimeMs);
    frameGraph.render(frameTimes);
  },
  { deep: true }
);

/**
 * Calculate elapsed time from first metric to last metric in array.
 */
function getElapsedTime(metrics: FrameMetric[]): string {
  if (metrics.length === 0) return '0:00';
  const firstTimestamp = metrics[0].timestamp;
  const lastTimestamp = metrics[metrics.length - 1].timestamp;
  const elapsed = lastTimestamp - firstTimestamp;
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
