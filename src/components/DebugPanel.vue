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
  /* Desktop: side panel */
  width: 100%;
  max-width: 400px;
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

/* Mobile: full-screen drawer */
@media (max-width: 767px) {
  .debug-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: none;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
}
</style>
