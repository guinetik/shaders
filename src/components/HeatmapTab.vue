<script setup lang="ts">
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
