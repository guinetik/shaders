<script setup lang="ts">
import type { ShaderEntry } from '../types';

defineProps<{
  shader: ShaderEntry;
}>();
</script>

<template>
  <router-link :to="'/shader/' + shader.slug" class="shader-card n-panel n-corner-frame">
    <img
      :src="shader.screenshotUrl"
      :alt="shader.title"
      loading="lazy"
      class="card-image"
    />
    <div class="card-overlay">
      <span class="card-kicker">Shader</span>
      <span class="card-title">{{ shader.title }}</span>
    </div>
    <div class="card-tags">
      <span v-for="tag in shader.tags" :key="tag" class="card-tag">
        {{ tag }}
      </span>
    </div>
  </router-link>
</template>

<style scoped>
.shader-card {
  display: block;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}

@media (hover: hover) {
  .shader-card:hover {
    border-color: var(--n-border-active);
    box-shadow: var(--n-shadow-soft), 0 0 24px var(--n-glow);
    transform: translateY(-2px);
  }
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.card-overlay {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px 8px;
}

.card-kicker {
  color: var(--n-text-dim);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card-title {
  color: var(--n-text-white);
  font-size: 14px;
  font-weight: 700;
}

.card-tags {
  display: flex;
  gap: 8px;
  padding: 0 14px 14px;
  flex-wrap: wrap;
}

.card-tag {
  font-size: 11px;
  padding: 2px 8px;
  border: 1px solid var(--n-border);
  border-radius: 8px;
  color: var(--n-text-dim);
  background: rgba(16, 22, 35, 0.72);
}
</style>
