<script setup lang="ts">
import { useShaderGallery } from '../composables/useShaderGallery';
import TagFilter from '../components/TagFilter.vue';
import ShaderCard from '../components/ShaderCard.vue';

const { activeTag, allTags, filteredShaders, setTag } = useShaderGallery();
</script>

<template>
  <div class="gallery-view n-layout-shell">
    <header class="gallery-header n-panel">
      <div class="gallery-brand">
        <a href="https://guinetik.com" target="_blank" rel="noopener" class="brand-logo-link" aria-label="Visit Guinetik website">
          <svg
            class="brand-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="32.9 174.743 71.888 63.576"
            aria-hidden="true"
          >
            <path
              d="M 57.971 224.292 L 57.971 203.374 L 57.971 194.861 L 75.109 194.861 L 75.109 188.769 L 63.16 188.769 L 63.16 174.743 L 57.971 174.743 L 57.971 189.041 L 57.971 194.861 L 32.9 194.861 L 32.9 203.773 L 50.377 203.773 L 50.377 224.292 L 57.971 224.292 Z M 79.717 238.319 L 79.717 224.02 L 79.717 218.2 L 104.788 218.2 L 104.788 209.287 L 87.31 209.287 L 87.31 188.769 L 79.717 188.769 L 79.717 209.686 L 79.717 218.2 L 62.579 218.2 L 62.579 224.293 L 74.526 224.293 L 74.526 238.319 L 79.717 238.319 Z"
            />
          </svg>
        </a>
        <h1 class="gallery-title">Guinetik's Shaders Collection</h1>
      </div>
      <nav class="gallery-links" aria-label="Profile links">
        <a href="https://guinetik.com" target="_blank" rel="noopener" class="profile-link">Website</a>
        <a href="https://x.com/guinetik" target="_blank" rel="noopener" class="profile-link">@guinetik</a>
        <a href="https://www.shadertoy.com/user/guinetik" target="_blank" rel="noopener" class="profile-link">Shadertoy</a>
        <a
          href="https://github.com/guinetik"
          target="_blank"
          rel="noopener"
          class="github-link"
          aria-label="Visit Guinetik on GitHub"
          title="GitHub"
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </nav>
      <p class="gallery-subtitle">
        Interactive GPU programming experiments using WebGL.
      </p>
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
  position: relative;
}

.gallery-header {
  margin-bottom: 20px;
  padding: 14px;
  border-radius: 8px;
}

.gallery-title {
  color: var(--n-text-white);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.15;
}

.gallery-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo-link {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid var(--n-border);
  background: rgba(15, 23, 38, 0.9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.brand-logo {
  width: 22px;
  height: 22px;
  display: block;
  fill: currentColor;
  color: var(--n-text-white);
}

.gallery-links {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.profile-link,
.github-link {
  min-height: 38px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--n-border);
  background: rgba(15, 23, 38, 0.75);
  color: var(--n-text);
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.github-link {
  width: 38px;
  padding: 0;
}

.gallery-subtitle {
  margin-top: 10px;
  max-width: 60ch;
  color: var(--n-text-dim);
  font-size: 13px;
  line-height: 1.5;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

@media (min-width: 768px) {
  .gallery-title {
    font-size: 28px;
  }

  .gallery-header {
    padding: 16px;
  }

  .gallery-links {
    margin-top: 14px;
  }

  .gallery-subtitle {
    font-size: 14px;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}

@media (min-width: 1024px) {
  .gallery-header {
    padding: 18px;
  }

  .gallery-brand {
    justify-content: space-between;
  }

  .gallery-title {
    font-size: 34px;
  }

  .gallery-links {
    justify-content: flex-end;
  }

  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1440px) {
  .gallery-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1920px) {
  .gallery-title {
    font-size: 40px;
  }

  .gallery-subtitle {
    font-size: 15px;
  }

  .gallery-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 28px;
  }
}

@media (min-width: 2560px) {
  .gallery-title {
    font-size: 46px;
  }

  .gallery-grid {
    gap: 32px;
  }
}

.gallery-empty {
  color: var(--n-text-dim);
  text-align: center;
  padding: 48px;
}
</style>
