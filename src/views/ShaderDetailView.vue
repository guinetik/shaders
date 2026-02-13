<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useShaderDetail } from '../composables/useShaderDetail';
import ShaderRenderer from '../components/ShaderRenderer.vue';
import CodeViewer from '../components/CodeViewer.vue';

const route = useRoute();
const slug = route.params.slug as string;
const { shader, notFound, activeTab } = useShaderDetail(slug);
</script>

<template>
  <div class="detail-view">
    <!-- Not found state -->
    <div v-if="notFound" class="not-found">
      <h1>Shader Not Found</h1>
      <p>No shader with slug "{{ slug }}" exists.</p>
      <router-link to="/" class="back-link">&larr; Back to Gallery</router-link>
    </div>

    <!-- Shader detail -->
    <template v-else-if="shader">
      <!-- Header: back button + title -->
      <header class="detail-header">
        <router-link to="/" class="back-link">&larr; Back</router-link>
      </header>

      <!-- Toggle tabs -->
      <div class="tab-bar">
        <button
          class="tab-button"
          :class="{ active: activeTab === 'render' }"
          @click="activeTab = 'render'"
        >Render</button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'code' }"
          @click="activeTab = 'code'"
        >Code</button>
      </div>

      <!-- Content area -->
      <div class="tab-content">
        <ShaderRenderer
          v-if="activeTab === 'render'"
          :passes="shader.passes"
          :channels="shader.channels"
        />
        <CodeViewer
          v-else
          :passes="shader.passes"
        />
      </div>

      <!-- Metadata -->
      <section class="metadata">
        <h1 class="shader-title">{{ shader.title }}</h1>
        <p class="shader-description">{{ shader.description }}</p>
        <div class="shader-meta-row">
          <span class="shader-date">{{ shader.date }}</span>
          <div class="shader-tags">
            <span v-for="tag in shader.tags" :key="tag" class="tag-pill">{{ tag }}</span>
          </div>
        </div>
        <div v-if="shader.links.shadertoy || shader.links.shaderkit" class="shader-links">
          <a v-if="shader.links.shadertoy" :href="shader.links.shadertoy" target="_blank" rel="noopener" class="link-button">Shadertoy</a>
          <a v-if="shader.links.shaderkit" :href="shader.links.shaderkit" target="_blank" rel="noopener" class="link-button">ShaderKit</a>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.not-found {
  text-align: center;
  padding: 64px 16px;
  color: var(--n-text-dim);
}

.not-found h1 {
  color: var(--n-text-white);
  font-size: 24px;
  margin-bottom: 8px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--n-text);
  font-size: 14px;
  text-decoration: none;
  transition: text-shadow 0.2s;
}

@media (hover: hover) {
  .back-link:hover {
    text-shadow: 0 0 12px var(--n-glow);
  }
}

.detail-header {
  margin-bottom: 16px;
}

.tab-bar {
  display: flex;
  gap: 0;
  margin-bottom: 16px;
}

.tab-button {
  flex: 1;
  padding: 12px;
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  color: var(--n-text);
  font-family: "Fira Code", monospace;
  font-size: 14px;
  cursor: pointer;
  min-height: 44px;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}

.tab-button:first-child {
  border-radius: 4px 0 0 4px;
}

.tab-button:last-child {
  border-radius: 0 4px 4px 0;
}

.tab-button.active {
  border-color: var(--n-border-active);
  background: var(--n-bg-hover);
  box-shadow: 0 0 12px var(--n-glow);
}

.metadata {
  padding: 16px 0;
}

.shader-title {
  color: var(--n-text-white);
  font-size: 20px;
  margin-top: 0;
}

.shader-description {
  color: var(--n-text-dim);
  font-size: 14px;
  margin-top: 8px;
  line-height: 1.5;
}

.shader-meta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.shader-date {
  color: var(--n-text-dim);
  font-size: 12px;
}

.shader-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-pill {
  font-size: 10px;
  padding: 2px 8px;
  border: 1px solid var(--n-border);
  border-radius: 2px;
  color: var(--n-text-dim);
}

.shader-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.link-button {
  display: block;
  padding: 12px 16px;
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  border-radius: 4px;
  color: var(--n-text);
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  min-height: 44px;
  transition: all 0.2s;
}

@media (hover: hover) {
  .link-button:hover {
    border-color: var(--n-border-active);
    box-shadow: 0 0 12px var(--n-glow);
  }
}

@media (min-width: 768px) {
  .detail-view {
    padding: 24px;
  }

  .tab-bar {
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  }

  .metadata {
    padding: 24px 0;
  }

  .shader-title {
    font-size: 24px;
  }

  .shader-links {
    flex-direction: row;
  }

  .link-button {
    display: inline-block;
    padding: 8px 16px;
    text-align: left;
  }
}
</style>
