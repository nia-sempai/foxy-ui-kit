<script setup>
/**
 * FxRadioGroup — группа радио-кнопок. Опции задаются как строки или
 * { value, label, hint }. Направление — колонка (по умолчанию) или строка.
 */
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  name: { type: String, default: () => `fx-radio-${Math.random().toString(36).slice(2, 9)}` },
  inline: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])

const items = computed(() =>
  props.options.map((o) => (typeof o === 'object' && o !== null ? o : { value: o, label: String(o) })),
)
</script>

<template>
  <fieldset class="fx-radio">
    <legend v-if="label" class="fx-radio__legend">{{ label }}</legend>
    <div class="fx-radio__items" :class="{ 'fx-radio__items--inline': inline }">
      <label
        v-for="item in items"
        :key="item.value"
        class="fx-radio__item"
        :class="{ 'fx-radio__item--disabled': disabled || item.disabled }"
      >
        <input
          type="radio"
          class="fx-radio__input"
          :name="name"
          :value="item.value"
          :checked="modelValue === item.value"
          :disabled="disabled || item.disabled"
          @change="$emit('update:modelValue', item.value)"
        />
        <span class="fx-radio__body">
          <span class="fx-radio__label">{{ item.label }}</span>
          <span v-if="item.hint" class="fx-radio__hint">{{ item.hint }}</span>
        </span>
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
.fx-radio { margin: 0; padding: 0; border: none; min-width: 0; }
.fx-radio__legend { padding: 0 0 0.375rem; font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-radio__items { display: flex; flex-direction: column; gap: 0.5rem; }
.fx-radio__items--inline { flex-direction: row; flex-wrap: wrap; gap: 1rem; }
.fx-radio__item { display: inline-flex; align-items: flex-start; gap: 0.5rem; cursor: pointer; }
.fx-radio__item--disabled { cursor: not-allowed; opacity: 0.6; }
.fx-radio__input { width: 1.05rem; height: 1.05rem; margin: 0.15rem 0 0; accent-color: var(--fx-primary); flex: none; cursor: inherit; }
.fx-radio__body { display: flex; flex-direction: column; gap: 0.1rem; }
.fx-radio__label { font-size: 0.9375rem; }
.fx-radio__hint { font-size: 0.75rem; color: var(--fx-text-muted); }
</style>
