<script setup>
/**
 * FxTabs — горизонтальные вкладки-переключатели.
 *
 * Только заголовки: содержимое рисует приложение по v-model. Так вкладки можно
 * привязать к маршруту, не дублируя контент внутри компонента.
 *
 *   items: [{ value, label, icon?, count?, disabled? }]
 */
import FxIcon from './FxIcon.vue'

defineProps({
  modelValue: { type: [String, Number], default: '' },
  items: { type: Array, default: () => [] },
  variant: { type: String, default: 'line' }, // line | pill
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="fx-tabs" :class="`fx-tabs--${variant}`" role="tablist">
    <button
      v-for="item in items"
      :key="item.value"
      class="fx-tabs__tab"
      :class="{ 'fx-tabs__tab--active': item.value === modelValue }"
      role="tab"
      :aria-selected="item.value === modelValue"
      :disabled="item.disabled"
      @click="$emit('update:modelValue', item.value)"
    >
      <FxIcon v-if="item.icon" :name="item.icon" :size="15" />
      {{ item.label }}
      <span v-if="item.count != null" class="fx-tabs__count">{{ item.count }}</span>
    </button>
  </div>
</template>

<style scoped>
.fx-tabs { display: flex; align-items: center; gap: 0.25rem; overflow-x: auto; }
.fx-tabs--line { border-bottom: 1px solid var(--fx-border); }
.fx-tabs__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.75rem;
  background: none;
  border: none;
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--fx-text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}
.fx-tabs__tab:disabled { opacity: 0.5; cursor: not-allowed; }
.fx-tabs--line .fx-tabs__tab { border-bottom: 2px solid transparent; margin-bottom: -1px; }
.fx-tabs--line .fx-tabs__tab:hover:not(:disabled) { color: var(--fx-text); }
.fx-tabs--line .fx-tabs__tab--active { color: var(--fx-primary); border-bottom-color: var(--fx-primary); }
.fx-tabs--pill .fx-tabs__tab { border-radius: 999px; padding: 0.4rem 0.85rem; }
.fx-tabs--pill .fx-tabs__tab:hover:not(:disabled) { background: var(--fx-surface-muted); }
.fx-tabs--pill .fx-tabs__tab--active { background: var(--fx-primary-soft); color: var(--fx-primary); }
.fx-tabs__count {
  padding: 0.05rem 0.35rem;
  border-radius: 999px;
  background: #f1f5f9;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--fx-text-muted);
}
.fx-tabs__tab--active .fx-tabs__count { background: #dbeafe; color: var(--fx-primary); }
</style>
