<script setup lang="ts">
import type { ShaderEntry } from '../types';

const props = defineProps<{
  shader: ShaderEntry;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
  showCode: [];
  fullscreen: [];
  screenshot: [];
}>();

/**
 * Closes the drawer when the backdrop is pressed.
 */
function onBackdropClick(): void {
  emit('close');
}
</script>

<template>
  <div class="info-drawer" :class="{ open: props.isOpen }" :aria-hidden="!props.isOpen">
    <button class="drawer-backdrop" aria-label="Close shader information" @click="onBackdropClick" />
    <section class="drawer-sheet n-panel" role="dialog" aria-label="Shader information panel">
      <div class="drawer-handle" />
      <header class="drawer-header">
        <p class="drawer-kicker">Shader Information</p>
        <button class="drawer-close" type="button" aria-label="Close drawer" @click="emit('close')">
          ✕
        </button>
      </header>

      <h1 class="drawer-title">{{ props.shader.title }}</h1>
      <p class="drawer-description">{{ props.shader.description }}</p>

      <div class="drawer-meta">
        <span class="meta-date">{{ props.shader.date }}</span>
        <div class="meta-tags">
          <span v-for="tag in props.shader.tags" :key="tag" class="meta-tag">{{ tag }}</span>
        </div>
      </div>

      <div class="drawer-actions">
        <button class="drawer-btn" type="button" @click="emit('showCode')">View Code</button>
        <button class="drawer-btn" type="button" @click="emit('fullscreen')">Fullscreen</button>
        <button class="drawer-btn" type="button" @click="emit('screenshot')">Screenshot</button>
        <a
          v-if="props.shader.links.shadertoy"
          :href="props.shader.links.shadertoy"
          target="_blank"
          rel="noopener"
          class="drawer-btn"
        >
          Shadertoy
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.info-drawer {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
}

.drawer-backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(4, 6, 12, 0.46);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.22s ease;
}

.drawer-sheet {
  position: absolute;
  left: max(12px, var(--n-safe-left));
  right: max(12px, var(--n-safe-right));
  bottom: max(10px, var(--n-safe-bottom));
  border-radius: 8px;
  border: 1px solid var(--n-border);
  padding: 12px 12px calc(12px + var(--n-safe-bottom));
  transform: translateY(104%);
  transition: transform 0.24s ease;
  pointer-events: auto;
}

.drawer-handle {
  width: 44px;
  height: 4px;
  border-radius: 8px;
  margin: 0 auto 10px;
  background: rgba(140, 170, 220, 0.55);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-kicker {
  color: var(--n-text-dim);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.drawer-close {
  min-width: 44px;
  min-height: 44px;
  border: 1px solid var(--n-border);
  border-radius: 8px;
  color: var(--n-text);
  background: rgba(15, 22, 35, 0.88);
}

.drawer-title {
  margin-top: 6px;
  color: var(--n-text-white);
  font-size: 18px;
}

.drawer-description {
  margin-top: 8px;
  color: var(--n-text-dim);
  font-size: 13px;
  line-height: 1.5;
}

.drawer-meta {
  margin-top: 10px;
}

.meta-date {
  color: var(--n-text-dim);
  font-size: 12px;
}

.meta-tags {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.meta-tag {
  padding: 2px 8px;
  border-radius: 8px;
  border: 1px solid var(--n-border);
  font-size: 11px;
  color: var(--n-text-dim);
}

.drawer-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.drawer-btn {
  min-height: 44px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--n-border);
  background: rgba(15, 22, 35, 0.88);
  color: var(--n-text);
  font-family: "Fira Code", monospace;
  font-size: 12px;
  text-decoration: none;
}

.info-drawer.open {
  pointer-events: auto;
}

.info-drawer.open .drawer-backdrop {
  opacity: 1;
  pointer-events: auto;
}

.info-drawer.open .drawer-sheet {
  transform: translateY(0);
}

@media (min-width: 768px) {
  .info-drawer {
    display: none;
  }
}
</style>
