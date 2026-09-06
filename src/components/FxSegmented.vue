<script setup>
/**
 * FxSegmented — компактный переключатель режимов (карточки/таблица, день/месяц).
 * В отличие от FxTabs не претендует на роль навигации.
 */
import FxIcon from './FxIcon.vue'

defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] }, // [{ value, label?, icon?, title? }]
  size: { type: String, default: 'md' }, // sm | md
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="fx-segmented" :class="`fx-segmented--${size}`" role="group">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="fx-segmented__item"
      :class="{ 'fx-segmented__item--active': opt.value === modelValue }"
      :title="opt.title"
      :aria-pressed="opt.value === modelValue"
      @click="$emit('update:modelValue', opt.value)"
    >
      <FxIcon v-if="opt.icon" :name="opt.icon" :size="size === 'sm' ? 14 : 16" />
      <span v-if="opt.label">{{ opt.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.fx-segmented {
  display: inline-flex;
  padding: 0.15rem;
  background: var(--fx-surface-muted);
  border: 1px solid var(--fx-border);
  border-radius: var(--fx-radius-sm);
  gap: 0.15rem;
}
.fx-segmented__item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  background: none;
  border: none;
  border-radius: calc(var(--fx-radius-sm) - 2px);
  font: inherit;
  font-size: 0.875rem;
  color: var(--fx-text-muted);
  cursor: pointer;
  white-space: nowrap;
}
.fx-segmented--sm .fx-segmented__item { padding: 0.2rem 0.5rem; font-size: 0.8125rem; }
.fx-segmented__item:hover { color: var(--fx-text); }
.fx-segmented__item--active {
  background: var(--fx-surface);
  color: var(--fx-text);
  font-weight: 550;
  box-shadow: var(--fx-shadow-sm);
}
</style>
