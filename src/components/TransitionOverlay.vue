<script setup lang="ts">
import { watch, ref } from 'vue';
import { useNeutronMotion } from '../composables/useNeutronMotion';
import { CARD_EXPAND_MS } from '../constants';

const { transitionSnapshot, setTransitionSnapshot, prefersReducedMotion } = useNeutronMotion();

const overlayRef = ref<HTMLElement | null>(null);
const imgRef = ref<HTMLImageElement | null>(null);
const isActive = ref(false);

watch(transitionSnapshot, (snapshot) => {
  if (!snapshot || prefersReducedMotion.value === 'reduced') return;

  isActive.value = true;

  requestAnimationFrame(() => {
    const img = imgRef.value;
    const overlay = overlayRef.value;
    if (!img || !overlay) {
      isActive.value = false;
      setTransitionSnapshot(null);
      return;
    }

    // Position image at the card's captured rect
    const { top, left, width, height } = snapshot.rect;

    // Animate background
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

    // FLIP: animate image from card position to viewport fill
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
      // Fade out overlay after route has changed
      setTimeout(() => {
        if (overlay) {
          overlay.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 200, fill: 'forwards' },
          ).finished.then(() => {
            isActive.value = false;
            setTransitionSnapshot(null);
          });
        }
      }, 100);
    });
  });
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
