<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { ShaderPasses, PassId, CommonsSource } from '../types';
import { useCodeHighlighter } from '../composables/useCodeHighlighter';

const props = defineProps<{
  passes: ShaderPasses;
  commonsSources: CommonsSource[];
}>();

/** Human-readable labels for each pass tab */
const PASS_LABELS: Record<PassId, string> = {
  image: 'Image',
  bufferA: 'Buffer A',
  bufferB: 'Buffer B',
  bufferC: 'Buffer C',
  bufferD: 'Buffer D',
};

/** Tab identifier — either a pass ID or a commons name prefixed with 'commons:' */
type TabId = PassId | `commons:${string}`;

/** Currently active tab */
const activeTab = ref<TabId>('image');

/** Ordered list of passes that have source code */
const availablePasses = computed<PassId[]>(() => {
  const ids: PassId[] = ['image'];
  if (props.passes.bufferA) ids.push('bufferA');
  if (props.passes.bufferB) ids.push('bufferB');
  if (props.passes.bufferC) ids.push('bufferC');
  if (props.passes.bufferD) ids.push('bufferD');
  return ids;
});

/** Whether tabs should be shown (multiple passes OR any commons) */
const showTabs = computed(() =>
  availablePasses.value.length > 1 || props.commonsSources.length > 0
);

/** Get the source code for the active tab */
function getTabSource(tabId: TabId): string | undefined {
  if (tabId.startsWith('commons:')) {
    const name = tabId.slice('commons:'.length);
    return props.commonsSources.find(c => c.name === name)?.source;
  }
  return props.passes[tabId as PassId];
}

const { highlightedHtml, highlight } = useCodeHighlighter();

/** Highlight the code for the currently active tab */
watch(
  () => getTabSource(activeTab.value),
  (code) => {
    if (code) {
      highlight(code);
    }
  },
  { immediate: true },
);

/** Re-highlight when the active tab changes */
watch(activeTab, (tabId) => {
  const code = getTabSource(tabId);
  if (code) {
    highlight(code);
  }
});
</script>

<template>
  <div class="code-viewer">
    <div v-if="showTabs" class="pass-tabs">
      <button
        v-for="passId in availablePasses"
        :key="passId"
        class="tab-btn"
        :class="{ active: activeTab === passId }"
        @click="activeTab = passId"
      >
        {{ PASS_LABELS[passId] }}
      </button>
      <button
        v-for="common in commonsSources"
        :key="'commons:' + common.name"
        class="tab-btn tab-btn--commons"
        :class="{ active: activeTab === 'commons:' + common.name }"
        @click="activeTab = `commons:${common.name}`"
      >
        {{ common.name }}.glsl
      </button>
    </div>
    <div class="code-panel n-corner-frame">
      <div class="code-scroll" v-html="highlightedHtml" />
    </div>
  </div>
</template>

<style scoped>
.code-viewer {
  display: flex;
  flex-direction: column;
  position: relative;
}

.code-viewer .code-panel {
  flex: 1;
  min-height: 0;
}

.pass-tabs {
  display: flex;
  gap: 8px;
  padding: 8px 0;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.tab-btn {
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  color: var(--n-text);
  font-family: "Fira Code", monospace;
  font-size: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  min-height: 44px;
  flex-shrink: 0;
}

.tab-btn--commons {
  color: var(--n-text-dim);
  font-size: 11px;
}

@media (hover: hover) {
  .tab-btn:hover {
    border-color: var(--n-border-active);
  }
}

.tab-btn.active {
  border-color: var(--n-border-active);
  background: var(--n-bg-hover);
  box-shadow: 0 0 12px var(--n-glow);
}

.tab-btn--commons.active {
  color: var(--n-text);
}

.code-panel {
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  border-left: 3px solid var(--n-primary);
  border-radius: 8px;
  padding: 0;
  position: relative;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
}

.code-scroll {
  overflow: auto;
  flex: 1;
  min-height: 0;
}

.code-scroll :deep(pre) {
  background: transparent !important;
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-scroll :deep(code) {
  font-family: "Fira Code", monospace;
  font-size: 12px;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .code-panel {
    max-height: 70vh;
  }

  .code-scroll :deep(code) {
    font-size: 13px;
  }
}

@media (min-width: 1440px) {
  .code-panel {
    max-height: 76vh;
  }
}

@media (min-width: 1920px) {
  .code-panel {
    max-height: 80vh;
  }

  .code-scroll :deep(code) {
    font-size: 14px;
  }
}
</style>
