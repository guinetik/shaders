<script setup lang="ts">
import { ref } from 'vue';
import { useSineWave } from '../composables/useSineWave';

const canvasRef = ref<HTMLCanvasElement | null>(null);

useSineWave(canvasRef);
</script>

<template>
  <canvas ref="canvasRef" class="sine-wave-bg" aria-hidden="true" />
</template>

<style scoped>
.sine-wave-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  border-radius: inherit;
}

@media (prefers-reduced-motion: reduce) {
  .sine-wave-bg {
    display: none;
  }
}
</style>
