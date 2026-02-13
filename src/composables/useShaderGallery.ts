/**
 * Gallery Composable — Filtering and sorting logic for the shader grid.
 *
 * Owns: active tag filter, filtered shader list.
 * Vue components bind to the returned reactive state.
 *
 * @module composables/useShaderGallery
 */
import { ref, computed } from 'vue';
import { allShaders, allTags } from '../services/shaderRegistry';
import type { ShaderEntry } from '../types';

/**
 * Provides reactive gallery state: tag filtering and sorted shader list.
 *
 * @returns Reactive refs and computed properties for gallery rendering
 */
export function useShaderGallery() {
  /** Currently selected tag filter, or null for "all" */
  const activeTag = ref<string | null>(null);

  /** Shaders filtered by the active tag */
  const filteredShaders = computed<readonly ShaderEntry[]>(() => {
    if (activeTag.value === null) {
      return allShaders;
    }
    return allShaders.filter((s) => s.tags.includes(activeTag.value!));
  });

  /**
   * Set the active tag filter.
   * Pass null to clear the filter and show all shaders.
   * Clicking the same tag again clears the filter.
   *
   * @param tag - Tag to filter by, or null for all
   */
  function setTag(tag: string | null): void {
    activeTag.value = activeTag.value === tag ? null : tag;
  }

  return {
    activeTag,
    allTags,
    filteredShaders,
    setTag,
  };
}
