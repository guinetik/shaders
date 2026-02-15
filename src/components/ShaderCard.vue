<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { ShaderEntry, CardAnimationState } from '../types';
import { useNeutronMotion } from '../composables/useNeutronMotion';
import {
  WIRE_FRAME_TRACE_MS,
  WIRE_FRAME_FADE_MS,
  SIBLING_FADEOUT_MS,
} from '../constants';

const props = defineProps<{
  shader: ShaderEntry;
  index: number;
  total: number;
}>();

const router = useRouter();
const { prefersReducedMotion, getStaggerDelay, setTransitionSnapshot } = useNeutronMotion();

const cardRef = ref<InstanceType<typeof import('vue-router')['RouterLink']> | null>(null);
const svgRef = ref<SVGRectElement | null>(null);
const animState = ref<CardAnimationState>('hidden');
const perimeter = ref(0);

/** Resolve cardRef (component instance) to its root DOM element. */
function getCardEl(): HTMLElement | null {
  const raw = cardRef.value;
  if (!raw) return null;
  // router-link exposes $el on the component instance
  const el = (raw as unknown as { $el: HTMLElement }).$el;
  return el instanceof HTMLElement ? el : null;
}

onMounted(() => {
  if (prefersReducedMotion.value === 'reduced') {
    animState.value = 'visible';
    return;
  }

  const card = getCardEl();
  const rect = svgRef.value;
  if (!card || !rect) {
    animState.value = 'visible';
    return;
  }

  const box = card.getBoundingClientRect();
  perimeter.value = (box.width + box.height) * 2;

  const delay = getStaggerDelay(props.index, props.total);

  // Phase 1: trace the border
  setTimeout(() => {
    animState.value = 'tracing';

    rect.animate(
      [
        { strokeDashoffset: perimeter.value },
        { strokeDashoffset: 0 },
      ],
      {
        duration: WIRE_FRAME_TRACE_MS,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'forwards',
      },
    ).finished.then(() => {
      // Phase 2: fill in content
      animState.value = 'filling';
      setTimeout(() => {
        animState.value = 'visible';
      }, WIRE_FRAME_FADE_MS);
    });
  }, delay);
});

/**
 * Expose animState so parent (GalleryView) can trigger entrance
 * on TransitionGroup @enter hook for re-entering cards.
 */
function triggerEntrance(): void {
  if (prefersReducedMotion.value === 'reduced') {
    animState.value = 'visible';
    return;
  }

  const rect = svgRef.value;
  if (!rect || !perimeter.value) {
    animState.value = 'visible';
    return;
  }

  animState.value = 'tracing';

  rect.animate(
    [
      { strokeDashoffset: perimeter.value },
      { strokeDashoffset: 0 },
    ],
    {
      duration: WIRE_FRAME_TRACE_MS,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'forwards',
    },
  ).finished.then(() => {
    animState.value = 'filling';
    setTimeout(() => {
      animState.value = 'visible';
    }, WIRE_FRAME_FADE_MS);
  });
}

/**
 * Intercepts card click to trigger FLIP page transition.
 * Falls through to normal navigation when reduced motion is preferred.
 */
function handleClick(event: MouseEvent): void {
  if (prefersReducedMotion.value === 'reduced') return;

  event.preventDefault();

  const el = getCardEl();
  if (!el) return;

  // Capture card position for FLIP
  const rect = el.getBoundingClientRect();
  setTransitionSnapshot({
    slug: props.shader.slug,
    rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
    screenshotUrl: props.shader.screenshotUrl,
  });

  // Fade out sibling cards
  const parent = el.parentElement;
  if (parent) {
    const siblings = Array.from(parent.children).filter((child) => child !== el);
    siblings.forEach((sibling) => {
      (sibling as HTMLElement).animate(
        [
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0.95)' },
        ],
        {
          duration: SIBLING_FADEOUT_MS,
          easing: 'ease-out',
          fill: 'forwards',
        },
      );
    });
  }

  // Navigate after brief delay
  setTimeout(() => {
    router.push('/shader/' + props.shader.slug);
  }, 100);
}

defineExpose({ triggerEntrance, getCardEl });
</script>

<template>
  <router-link
    ref="cardRef"
    :to="'/shader/' + shader.slug"
    class="shader-card n-panel n-corner-frame"
    :class="{
      'card--hidden': animState === 'hidden',
      'card--tracing': animState === 'tracing',
      'card--filling': animState === 'filling',
      'card--visible': animState === 'visible',
    }"
    @click.native="handleClick"
  >
    <!-- SVG border trace overlay -->
    <svg class="card-trace-svg" aria-hidden="true">
      <rect
        ref="svgRef"
        x="0.5"
        y="0.5"
        rx="8"
        ry="8"
        width="calc(100% - 1px)"
        height="calc(100% - 1px)"
        fill="none"
        :stroke-dasharray="perimeter"
        :stroke-dashoffset="perimeter"
        stroke-width="2"
      />
    </svg>

    <div class="card-content">
      <img
        :src="shader.screenshotUrl"
        :alt="shader.title"
        loading="lazy"
        class="card-image"
      />
      <div class="card-scanline" aria-hidden="true"></div>
      <div class="card-overlay">
        <span class="card-kicker">{{ shader.date }}</span>
        <span class="card-title">{{ shader.title }}</span>
      </div>
      <div class="card-tags">
        <span v-for="tag in shader.tags" :key="tag" class="card-tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.shader-card {
  display: block;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: relative;
}

/* Corner brackets above card content */
.shader-card::before,
.shader-card::after {
  z-index: 3;
}

/* -- Entrance states -- */
.card--hidden {
  opacity: 0;
}

.card--hidden .card-content {
  opacity: 0;
}

.card--tracing .card-content {
  opacity: 0;
}

.card--filling .card-content {
  opacity: 1;
  transition: opacity 300ms ease-out;
}

.card--visible .card-content {
  opacity: 1;
}

/* -- SVG trace overlay -- */
.card-trace-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}

.card-trace-svg rect {
  stroke: var(--n-text-strong);
  transition: stroke 300ms ease-out;
}

.card--filling .card-trace-svg rect,
.card--visible .card-trace-svg rect {
  stroke: var(--n-accent);
}

.card--visible .card-trace-svg {
  opacity: 0;
  transition: opacity 400ms ease-out 200ms;
}

/* -- Content wrapper -- */
.card-content {
  position: relative;
  overflow: hidden;
  border-radius: 7px;
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  transition: filter 0.3s ease;
}

.card-overlay {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px 8px;
}

.card-kicker {
  color: var(--n-text-dim);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card-title {
  color: var(--n-text-white);
  font-size: 14px;
  font-weight: 700;
}

.card-tags {
  display: flex;
  gap: 8px;
  padding: 0 14px 14px;
  flex-wrap: wrap;
}

.card-tag {
  font-size: 11px;
  padding: 2px 8px;
  border: 1px solid var(--n-border);
  border-radius: 8px;
  color: var(--n-text-dim);
  background: rgba(16, 22, 35, 0.72);
}

/* -- Scanline sweep element -- */
.card-scanline {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.card-scanline::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(17, 220, 255, 0.08) 40%,
    rgba(17, 220, 255, 0.15) 50%,
    rgba(17, 220, 255, 0.08) 60%,
    transparent 100%
  );
  transform: skewX(-15deg);
  opacity: 0;
  transition: opacity 0.2s;
}

/* -- Hover effects -- */
@media (hover: hover) {
  .shader-card:hover {
    border-color: var(--n-border-active);
    box-shadow: var(--n-shadow-soft), 0 0 24px var(--n-glow);
    transform: translateY(-6px);
  }

  .shader-card:hover .card-image {
    filter: brightness(1.1) contrast(1.05);
  }

  /* Corner bracket expansion */
  .shader-card::before,
  .shader-card::after {
    transition: width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      top 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      left 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      right 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      bottom 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
      border-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .shader-card:hover::before {
    width: 24px;
    height: 24px;
    top: 6px;
    left: 6px;
    border-color: var(--n-accent);
  }

  .shader-card:hover::after {
    width: 24px;
    height: 24px;
    right: 6px;
    bottom: 6px;
    border-color: var(--n-accent);
  }

  /* Scanline sweep on hover */
  .shader-card:hover .card-scanline::before {
    opacity: 1;
    animation: scanline-sweep 600ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }

  /* Glow pulse on hover */
  .shader-card:hover {
    animation: card-glow-pulse 1500ms ease-in-out infinite;
  }
}

@keyframes scanline-sweep {
  from {
    left: -100%;
  }
  to {
    left: 200%;
  }
}

@keyframes card-glow-pulse {
  0%, 100% {
    box-shadow: var(--n-shadow-soft), 0 0 24px var(--n-glow);
  }
  50% {
    box-shadow: var(--n-shadow-soft), 0 0 36px var(--n-glow), 0 0 12px var(--n-accent-soft);
  }
}

/* -- Reduced motion -- */
@media (prefers-reduced-motion: reduce) {
  .shader-card {
    transition: none;
  }

  .card--hidden {
    opacity: 1;
  }

  .card--hidden .card-content,
  .card--tracing .card-content {
    opacity: 1;
  }

  .card-trace-svg {
    display: none;
  }

  .shader-card:hover {
    animation: none;
  }
}
</style>
