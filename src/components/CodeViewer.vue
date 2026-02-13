<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { ShaderPasses, PassId } from '../types';
import { useCodeHighlighter } from '../composables/useCodeHighlighter';

const props = defineProps<{
  passes: ShaderPasses;
}>();

/** Human-readable labels for each pass tab */
const PASS_LABELS: Record<PassId, string> = {
  image: 'Image',
  bufferA: 'Buffer A',
  bufferB: 'Buffer B',
  bufferC: 'Buffer C',
  bufferD: 'Buffer D',
};

/** Currently active pass tab */
const activePass = ref<PassId>('image');

/** Ordered list of passes that have source code */
const availablePasses = computed<PassId[]>(() => {
  const ids: PassId[] = ['image'];
  if (props.passes.bufferA) ids.push('bufferA');
  if (props.passes.bufferB) ids.push('bufferB');
  if (props.passes.bufferC) ids.push('bufferC');
  if (props.passes.bufferD) ids.push('bufferD');
  return ids;
});

/** Whether the shader has multiple passes (show tab bar) */
const hasMultiplePasses = computed(() => availablePasses.value.length > 1);

const { highlightedHtml, highlight } = useCodeHighlighter();

/** Highlight the code for the currently active pass */
watch(
  () => props.passes[activePass.value],
  (code) => {
    if (code) {
      highlight(code);
    }
  },
  { immediate: true },
);

/** Re-highlight when the active pass changes */
watch(activePass, (passId) => {
  const code = props.passes[passId];
  if (code) {
    highlight(code);
  }
});
</script>

<template>
  <div class="code-viewer">
    <div v-if="hasMultiplePasses" class="pass-tabs">
      <button
        v-for="passId in availablePasses"
        :key="passId"
        class="tab-btn"
        :class="{ active: activePass === passId }"
        @click="activePass = passId"
      >
        {{ PASS_LABELS[passId] }}
      </button>
    </div>
    <div class="code-panel" v-html="highlightedHtml" />
  </div>
</template>

<style scoped>
.code-viewer {
  display: flex;
  flex-direction: column;
}

.pass-tabs {
  display: flex;
  gap: 8px;
  padding: 8px 0;
  overflow-x: auto;
  white-space: nowrap;
}

.tab-btn {
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  color: var(--n-text);
  font-family: "Fira Code", monospace;
  font-size: 12px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  min-height: 44px;
}

.tab-btn:hover {
  border-color: var(--n-border-active);
}

.tab-btn.active {
  border-color: var(--n-border-active);
  background: var(--n-bg-hover);
  box-shadow: 0 0 12px var(--n-glow);
}

.code-panel {
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  border-left: 3px solid var(--n-primary);
  border-radius: 4px;
  padding: 0;
  position: relative;
  overflow-y: auto;
  max-height: 70vh;
}

.code-panel :deep(pre) {
  background: transparent !important;
  margin: 0;
  padding: 16px;
}

.code-panel :deep(code) {
  font-family: "Fira Code", monospace;
  font-size: 13px;
  line-height: 1.6;
}
</style>
