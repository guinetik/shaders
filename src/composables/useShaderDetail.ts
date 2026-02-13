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

  return {
    shader,
    notFound,
    activeTab,
  };
}
