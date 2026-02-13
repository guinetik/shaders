/**
 * Shader Registry — Typed access to the build-time shader manifest.
 *
 * Wraps the virtual:shader-registry module with lookup helpers.
 *
 * @module services/shaderRegistry
 */
import { shaders } from 'virtual:shader-registry';
import type { ShaderEntry } from '../types';

/** All shader entries, sorted by date descending (newest first) */
export const allShaders: readonly ShaderEntry[] = [...shaders].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

/** All unique tags across all shaders, sorted alphabetically */
export const allTags: readonly string[] = [
  ...new Set(shaders.flatMap((s) => s.tags)),
].sort();

/**
 * Find a shader entry by its slug.
 *
 * @param slug - The URL-friendly identifier
 * @returns The matching shader entry, or undefined if not found
 */
export function findShaderBySlug(slug: string): ShaderEntry | undefined {
  return allShaders.find((s) => s.slug === slug);
}
