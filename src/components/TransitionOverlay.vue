<script setup lang="ts">
import { watch, ref } from 'vue';
import { useNeutronMotion } from '../composables/useNeutronMotion';
import {
    CARD_EXPAND_MS,
    OVERLAY_FADE_DELAY_MS,
    OVERLAY_FADE_MS,
} from '../constants';
import type { FlipRect, TransitionSnapshot } from '../types';

const { transitionSnapshot, setTransitionSnapshot, prefersReducedMotion } = useNeutronMotion();

const overlayRef = ref<HTMLElement | null>(null);
const imgRef = ref<HTMLImageElement | null>(null);
const isActive = ref(false);

/**
 * Waits for a shader card to exist in the gallery DOM and returns its rect.
 *
 * @param slug - Shader slug used as a data attribute selector
 * @returns Promise resolving to the card rect or null on timeout
 */
function waitForCardRect(slug: string): Promise<FlipRect | null> {
  const SEARCH_TIMEOUT_MS = 1500;
  const start = performance.now();

  return new Promise((resolve) => {
    const probe = (): void => {
      const selectorSlug = typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
        ? CSS.escape(slug)
        : slug;
      const card = document.querySelector<HTMLElement>(`[data-shader-slug="${selectorSlug}"]`);

      if (card) {
        const rect = card.getBoundingClientRect();
        resolve({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
        return;
      }

      if (performance.now() - start >= SEARCH_TIMEOUT_MS) {
        resolve(null);
        return;
      }

      requestAnimationFrame(probe);
    };

    probe();
  });
}

/**
 * Plays the forward transition from gallery card to full detail viewport.
 *
 * @param snapshot - Transition state captured from the clicked card
 */
function playForwardTransition(snapshot: TransitionSnapshot): void {
  const img = imgRef.value;
  const overlay = overlayRef.value;
  if (!img || !overlay) {
    isActive.value = false;
    setTransitionSnapshot(null);
    return;
  }

  const { top, left, width, height } = snapshot.rect;

  overlay.animate(
    [
      { backgroundColor: 'rgba(9, 10, 16, 0)' },
      { backgroundColor: 'rgba(9, 10, 16, 0.95)' },
    ],
    {
      duration: CARD_EXPAND_MS,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'forwards',
    },
  );

  img.animate(
    [
      {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '8px',
      },
      {
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
      },
    ],
    {
      duration: CARD_EXPAND_MS,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'forwards',
    },
  ).finished.then(() => {
    setTimeout(() => {
      overlay.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: OVERLAY_FADE_MS, fill: 'forwards' },
      ).finished.then(() => {
        isActive.value = false;
        setTransitionSnapshot(null);
      });
    }, OVERLAY_FADE_DELAY_MS);
  });
}

/**
 * Plays the reverse transition from full detail viewport back to gallery card.
 *
 * @param snapshot - Transition state captured while leaving detail
 */
async function playReverseTransition(snapshot: TransitionSnapshot): Promise<void> {
  const img = imgRef.value;
  const overlay = overlayRef.value;
  if (!img || !overlay) {
    isActive.value = false;
    setTransitionSnapshot(null);
    return;
  }

  const targetRect = await waitForCardRect(snapshot.slug);
  if (!targetRect) {
    isActive.value = false;
    setTransitionSnapshot(null);
    return;
  }

  overlay.animate(
    [
      { backgroundColor: 'rgba(9, 10, 16, 0.95)', opacity: 1 },
      { backgroundColor: 'rgba(9, 10, 16, 0)', opacity: 0 },
    ],
    {
      duration: CARD_EXPAND_MS,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'forwards',
    },
  );

  img.animate(
    [
      {
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
      },
      {
        top: `${targetRect.top}px`,
        left: `${targetRect.left}px`,
        width: `${targetRect.width}px`,
        height: `${targetRect.height}px`,
        borderRadius: '8px',
      },
    ],
    {
      duration: CARD_EXPAND_MS,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'forwards',
    },
  ).finished.then(() => {
    isActive.value = false;
    setTransitionSnapshot(null);
  });
}

watch(transitionSnapshot, async (snapshot) => {
  if (!snapshot || prefersReducedMotion.value === 'reduced') return;

  isActive.value = true;
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  if (snapshot.direction === 'to-gallery') {
    await playReverseTransition(snapshot);
    return;
  }

  playForwardTransition(snapshot);
});
</script>

<template>
  <div
    v-if="isActive && transitionSnapshot"
    ref="overlayRef"
    class="transition-overlay"
  >
    <img
      ref="imgRef"
      :src="transitionSnapshot.screenshotUrl"
      :alt="''"
      class="transition-image"
    />
  </div>
</template>

<style scoped>
.transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  background-color: rgba(9, 10, 16, 0);
}

.transition-image {
  position: fixed;
  object-fit: cover;
  z-index: 101;
}
</style>
