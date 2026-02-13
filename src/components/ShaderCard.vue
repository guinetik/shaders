<script setup lang="ts">
import type { ShaderEntry } from '../types';

defineProps<{
  shader: ShaderEntry;
}>();
</script>

<template>
  <router-link :to="'/shader/' + shader.slug" class="shader-card">
    <img
      :src="shader.screenshotUrl"
      :alt="shader.title"
      loading="lazy"
      class="card-image"
    />
    <div class="card-overlay">
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
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

@media (hover: hover) {
  .shader-card:hover {
    border-color: var(--n-border-active);
    box-shadow: 0 0 20px var(--n-glow);
  }
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.card-overlay {
  padding: 12px;
  background: var(--n-bg);
}

.card-title {
  color: var(--n-text-white);
  font-size: 14px;
  font-weight: 700;
}

.card-tags {
  display: flex;
  gap: 8px;
  padding: 0 12px 12px;
  flex-wrap: wrap;
}

.card-tag {
  font-size: 10px;
  padding: 2px 8px;
  border: 1px solid var(--n-border);
  border-radius: 2px;
  color: var(--n-text-dim);
}
</style>
