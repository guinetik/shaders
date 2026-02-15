/**
 * Neutron Motion System — Central animation composable.
 *
 * Provides shared FLIP transition state, reduced-motion detection,
 * stagger delay calculation, and card exit animations.
 *
 * Module-level singletons ensure shared state across components.
 *
 * @module composables/useNeutronMotion
 */
import { ref, onMounted } from 'vue';
import type { TransitionSnapshot, MotionPreference } from '../types';
import {
  CARD_STAGGER_MS,
  GRID_ENTRANCE_MAX_MS,
  FILTER_EXIT_MS,
} from '../constants';

/** Shared FLIP snapshot for page transitions (module-level singleton) */
const transitionSnapshot = ref<TransitionSnapshot | null>(null);

/** Reactive reduced-motion preference (module-level singleton) */
const motionPreference = ref<MotionPreference>('full');

/** Whether the media query listener has been initialized */
let mediaListenerInitialized = false;

/** The media query list instance */
let mediaQuery: MediaQueryList | null = null;

/**
 * Initialize the prefers-reduced-motion media query listener.
 * Called once on first composable mount.
 */
function initMediaListener(): void {
  if (mediaListenerInitialized) return;
  mediaListenerInitialized = true;

  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionPreference.value = mediaQuery.matches ? 'reduced' : 'full';

  mediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
    motionPreference.value = e.matches ? 'reduced' : 'full';
  });
}

/**
 * Provides Neutron motion system utilities.
 *
 * @returns Reactive motion state and animation helpers
 */
export function useNeutronMotion() {
  onMounted(() => {
    initMediaListener();
  });

  /**
   * Whether the user prefers reduced motion.
   */
  const prefersReducedMotion = motionPreference;

  /**
   * Compute stagger delay for a card at the given index.
   * Caps total grid reveal time at GRID_ENTRANCE_MAX_MS.
   *
   * @param index - Card index in the grid (0-based)
   * @param total - Total number of cards in the grid
   * @returns Delay in milliseconds
   */
  function getStaggerDelay(index: number, total: number): number {
    if (total <= 1) return 0;
    const maxDelay = GRID_ENTRANCE_MAX_MS - CARD_STAGGER_MS;
    const step = Math.min(CARD_STAGGER_MS, maxDelay / (total - 1));
    return Math.round(index * step);
  }

  /**
   * Store a FLIP transition snapshot for page transitions.
   *
   * @param snapshot - The snapshot to store, or null to clear
   */
  function setTransitionSnapshot(snapshot: TransitionSnapshot | null): void {
    transitionSnapshot.value = snapshot;
  }

  /**
   * Animate a card element out (scale down + fade) for filter changes.
   * Returns a promise that resolves when the animation completes.
   *
   * @param el - The card DOM element to animate out
   * @returns Promise resolving when animation finishes
   */
  function triggerCardExit(el: Element): Promise<void> {
    if (motionPreference.value === 'reduced') {
      return Promise.resolve();
    }

    const animation = el.animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(0.95)', opacity: 0 },
      ],
      {
        duration: FILTER_EXIT_MS,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'forwards',
      },
    );

    return animation.finished.then(() => undefined);
  }

  return {
    prefersReducedMotion,
    transitionSnapshot,
    getStaggerDelay,
    setTransitionSnapshot,
    triggerCardExit,
  };
}
