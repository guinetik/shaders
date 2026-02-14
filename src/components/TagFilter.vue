<script setup lang="ts">
defineProps<{
  tags: readonly string[];
  activeTag: string | null;
}>();

const emit = defineEmits<{
  select: [tag: string | null];
}>();
</script>

<template>
  <div class="tag-filter">
    <button
      class="tag-btn"
      :class="{ active: activeTag === null }"
      @click="emit('select', null)"
    >
      All
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      class="tag-btn"
      :class="{ active: activeTag === tag }"
      @click="emit('select', tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<style scoped>
.tag-filter {
  display: flex;
  gap: 8px;
  padding: 16px 0;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;          /* Firefox */
  -ms-overflow-style: none;       /* IE/Edge */
}

.tag-filter::-webkit-scrollbar {
  display: none;                  /* Chrome/Safari */
}

@media (min-width: 768px) {
  .tag-filter {
    flex-wrap: wrap;
    overflow-x: visible;
    white-space: normal;
  }
}

.tag-btn {
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

@media (hover: hover) {
  .tag-btn:hover {
    border-color: var(--n-border-active);
  }
}

.tag-btn.active {
  border-color: var(--n-border-active);
  background: var(--n-bg-hover);
  box-shadow: 0 0 12px var(--n-glow);
}
</style>
