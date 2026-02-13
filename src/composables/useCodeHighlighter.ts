/**
 * Code Highlighter Composable — Shiki-based GLSL syntax highlighting.
 *
 * Lazily loads the Shiki highlighter on first use.
 * Returns highlighted HTML for a given GLSL source string.
 * The highlighter instance is a module-level singleton.
 *
 * @module composables/useCodeHighlighter
 */
import { ref } from 'vue';
import type { Ref } from 'vue';
import { createHighlighter } from 'shiki';
import type { Highlighter } from 'shiki';

/** Shiki theme used for GLSL syntax highlighting */
const SHIKI_THEME = 'vitesse-dark' as const;

/** Shiki language used for GLSL syntax highlighting */
const SHIKI_LANG = 'glsl' as const;

/** Module-level singleton promise for the Shiki highlighter instance */
let highlighterPromise: Promise<Highlighter> | null = null;

/**
 * Returns the singleton Shiki highlighter, creating it on first call.
 * Subsequent calls return the same cached promise.
 *
 * @returns Promise resolving to the initialized Highlighter instance
 */
function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [SHIKI_THEME],
      langs: [SHIKI_LANG],
    });
  }
  return highlighterPromise;
}

/**
 * Escapes HTML special characters to prevent XSS when falling back
 * to plain-text code display.
 *
 * @param text - Raw text to escape
 * @returns HTML-safe string
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Composable that provides Shiki-based GLSL syntax highlighting.
 *
 * Lazily loads the highlighter on first `highlight()` call and caches the
 * instance at module level. If Shiki fails to load, falls back to plain
 * `<pre><code>` with escaped HTML.
 *
 * @returns Reactive highlighted HTML, readiness state, and highlight trigger
 */
export function useCodeHighlighter(): {
  /** The highlighted HTML output (or fallback plain text) */
  highlightedHtml: Ref<string>;
  /** Whether the most recent highlight operation has completed */
  isReady: Ref<boolean>;
  /** Triggers highlighting for the given GLSL source code */
  highlight: (code: string) => void;
} {
  const highlightedHtml = ref('');
  const isReady = ref(false);

  /**
   * Triggers syntax highlighting for the provided GLSL source code.
   * On failure, falls back to escaped plain text in a `<pre><code>` block.
   *
   * @param code - GLSL source code to highlight
   */
  function highlight(code: string): void {
    isReady.value = false;

    getHighlighter()
      .then((highlighter) => {
        highlightedHtml.value = highlighter.codeToHtml(code, {
          lang: SHIKI_LANG,
          theme: SHIKI_THEME,
        });
        isReady.value = true;
      })
      .catch(() => {
        highlightedHtml.value = `<pre><code>${escapeHtml(code)}</code></pre>`;
        isReady.value = true;
      });
  }

  return {
    highlightedHtml,
    isReady,
    highlight,
  };
}
