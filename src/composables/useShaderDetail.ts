/**
 * Shader Detail Composable — Loads a single shader by slug.
 *
 * Resolves the shader entry from the registry and provides
 * reactive state for the detail view.
 *
 * @module composables/useShaderDetail
 */
import { ref, computed } from 'vue';
import { findShaderBySlug } from '../services/shaderRegistry';
import type { ShaderEntry } from '../types';

/**
 * Provides reactive state for a shader detail page.
 *
 * @param slug - The URL-friendly shader identifier from the route
 * @returns Reactive shader data, not-found state, and active tab
 */
export function useShaderDetail(slug: string) {
  /** The resolved shader entry, or undefined if not found */
  const shader = computed<ShaderEntry | undefined>(() => findShaderBySlug(slug));

  /** Whether the shader was not found */
  const notFound = computed<boolean>(() => shader.value === undefined);

  /** Active tab: 'render' or 'code' */
  const activeTab = ref<'render' | 'code'>('render');

  /** Whether the mobile info drawer is currently open */
  const isInfoDrawerOpen = ref<boolean>(false);

  /**
   * Opens the mobile info drawer.
   */
  function openInfoDrawer(): void {
    isInfoDrawerOpen.value = true;
  }

  /**
   * Closes the mobile info drawer.
   */
  function closeInfoDrawer(): void {
    isInfoDrawerOpen.value = false;
  }

  /**
   * Toggles the mobile info drawer open/closed state.
   */
  function toggleInfoDrawer(): void {
    isInfoDrawerOpen.value = !isInfoDrawerOpen.value;
  }

  return {
    shader,
    notFound,
    activeTab,
    isInfoDrawerOpen,
    openInfoDrawer,
    closeInfoDrawer,
    toggleInfoDrawer,
  };
}
