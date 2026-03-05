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
