<script setup lang="ts">
import { useShaderGallery } from '../composables/useShaderGallery';
import TagFilter from '../components/TagFilter.vue';
import ShaderCard from '../components/ShaderCard.vue';

const { activeTag, allTags, filteredShaders, setTag } = useShaderGallery();
</script>

<template>
  <div class="gallery-view">
    <header class="gallery-header">
      <h1 class="gallery-title">Shader Gallery</h1>
    </header>
    <TagFilter :tags="allTags" :activeTag="activeTag" @select="setTag" />
    <div class="gallery-grid">
      <ShaderCard
        v-for="shader in filteredShaders"
        :key="shader.slug"
        :shader="shader"
      />
    </div>
    <p v-if="filteredShaders.length === 0" class="gallery-empty">
      No shaders found.
    </p>
  </div>
</template>

<style scoped>
.gallery-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.gallery-title {
  color: var(--n-text);
  font-size: 24px;
  font-weight: 700;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.gallery-empty {
  color: var(--n-text-dim);
  text-align: center;
  padding: 48px;
}
</style>
