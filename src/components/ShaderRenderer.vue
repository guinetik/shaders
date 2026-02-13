<script setup lang="ts">
import { ref } from 'vue';
import { useShaderRenderer } from '../composables/useShaderRenderer';
import type { ShaderPasses, ShaderChannels } from '../types';

const props = defineProps<{
  passes: ShaderPasses;
  channels: ShaderChannels;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

const { error, isRunning } = useShaderRenderer(canvasRef, props.passes, props.channels);

defineExpose({ error, isRunning, canvasRef });
</script>

<template>
  <div class="renderer-container">
    <canvas ref="canvasRef" class="shader-canvas"></canvas>
    <div v-if="error" class="renderer-error">
      <span class="error-label">Shader Error</span>
      <pre class="error-message">{{ error }}</pre>
    </div>
  </div>
</template>

<style scoped>
.renderer-container {
  position: relative;
  width: 100%;
}

.shader-canvas {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border: 1px solid var(--n-border);
  border-radius: 4px;
}

.renderer-container:fullscreen {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.renderer-container:fullscreen .shader-canvas {
  width: 100%;
  height: 100%;
  aspect-ratio: auto;
  object-fit: contain;
  border: none;
  border-radius: 0;
}

.renderer-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--n-bg);
  border: 1px solid rgba(255, 50, 50, 0.5);
  border-radius: 4px;
  padding: 24px;
}

.error-label {
  color: #f50;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
}

.error-message {
  color: var(--n-text-dim);
  font-size: 12px;
  font-family: "Fira Code", monospace;
  white-space: pre-wrap;
  word-break: break-all;
  max-width: 100%;
  overflow-y: auto;
  max-height: 200px;
}
</style>
