<script setup lang="ts">
import type { ShaderError } from '../types';

interface Props {
  shaderErrors: ShaderError[];
}

defineProps<Props>();

const emit = defineEmits<{
  clearErrors: [];
}>();

/**
 * Format severity as display text with color.
 */
function getSeverityClass(severity: string): string {
  switch (severity) {
    case 'error': return 'severity-error';
    case 'warning': return 'severity-warning';
    case 'info': return 'severity-info';
    default: return '';
  }
}

/**
 * Format timestamp as readable time.
 */
function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString();
}
</script>

<template>
  <div class="errors-tab">
    <div class="errors-header">
      <h3>Shader Errors & Warnings ({{ shaderErrors.length }})</h3>
      <button
        v-if="shaderErrors.length > 0"
        class="clear-btn"
        @click="emit('clearErrors')"
      >
        Clear
      </button>
    </div>

    <div v-if="shaderErrors.length === 0" class="empty-state">
      <p>No errors or warnings.</p>
    </div>

    <div v-else class="errors-list">
      <div
        v-for="(error, idx) in shaderErrors"
        :key="idx"
        class="error-entry"
        :class="getSeverityClass(error.severity)"
      >
        <div class="error-header">
          <span class="error-type">{{ error.type }}</span>
          <span v-if="error.file" class="error-file">{{ error.file }}</span>
          <span v-if="error.line" class="error-line">:{{ error.line }}</span>
          <span class="error-time">{{ formatTime(error.timestamp) }}</span>
        </div>
        <div class="error-message">{{ error.message }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.errors-tab {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.errors-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.errors-header h3 {
  color: var(--n-text-white);
  margin: 0;
  font-size: 14px;
}

.clear-btn {
  padding: 6px 12px;
  background: var(--n-bg);
  border: 1px solid var(--n-border);
  border-radius: 6px;
  color: var(--n-text-dim);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 32px;
}

.clear-btn:hover {
  border-color: var(--n-border-active);
  box-shadow: 0 0 8px rgba(0, 200, 255, 0.5);
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--n-text-dim);
  font-size: 13px;
}

.errors-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error-entry {
  padding: 12px;
  background: rgba(14, 21, 35, 0.8);
  border: 1px solid var(--n-border);
  border-left: 3px solid;
  border-radius: 6px;
  font-size: 12px;
}

.error-entry.severity-error {
  border-left-color: #FF3333;
  background: rgba(255, 51, 51, 0.05);
}

.error-entry.severity-warning {
  border-left-color: #FFD700;
  background: rgba(255, 215, 0, 0.05);
}

.error-entry.severity-info {
  border-left-color: #00C8FF;
  background: rgba(0, 200, 255, 0.05);
}

.error-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-weight: 600;
  color: var(--n-text-white);
}

.error-type {
  display: inline-block;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-size: 10px;
  text-transform: uppercase;
}

.error-file {
  color: var(--n-text-dim);
  font-family: 'Fira Code', monospace;
}

.error-line {
  color: var(--n-text-dim);
}

.error-time {
  margin-left: auto;
  color: var(--n-text-dim);
  font-size: 11px;
}

.error-message {
  color: var(--n-text-dim);
  line-height: 1.5;
  word-break: break-word;
}
</style>
