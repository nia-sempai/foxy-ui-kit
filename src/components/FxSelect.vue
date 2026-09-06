<script setup>
/**
 * FxSelect — выпадающий список на нативном <select>.
 *
 * Нативный контрол выбран намеренно: он доступен с клавиатуры, корректно
 * работает на мобильных и не тянет зависимостей. Опции — массив строк или
 * объектов { value, label }.
 */
import { computed } from 'vue'
import FxIcon from './FxIcon.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: { type: [String, Number, null], default: '' },
  options: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])

const items = computed(() =>
  props.options.map((o) => (typeof o === 'object' && o !== null ? o : { value: o, label: String(o) })),
)
</script>

<template>
  <label class="fx-select">
    <span v-if="label" class="fx-select__label">
      {{ label }}<span v-if="required" class="fx-select__req">*</span>
    </span>
    <span
      class="fx-select__box"
      :class="{ 'fx-select__box--error': error, 'fx-select__box--disabled': disabled }"
    >
      <select
        class="fx-select__field"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        v-bind="$attrs"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="">{{ placeholder }}</option>
        <option v-for="item in items" :key="item.value" :value="item.value">{{ item.label }}</option>
      </select>
      <FxIcon name="chevron-down" :size="16" class="fx-select__chevron" />
    </span>
    <span v-if="error" class="fx-select__error">{{ error }}</span>
    <span v-else-if="hint" class="fx-select__hint">{{ hint }}</span>
  </label>
</template>

<style scoped>
.fx-select { display: flex; flex-direction: column; gap: 0.25rem; margin: 0; min-width: 0; }
.fx-select__label { font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-select__req { color: var(--fx-danger); margin-left: 2px; }
.fx-select__box {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--fx-control-h);
  background: var(--fx-surface);
  border: 1px solid var(--fx-border-strong);
  border-radius: var(--fx-radius-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.fx-select__box:focus-within { border-color: var(--fx-primary); box-shadow: 0 0 0 3px var(--fx-primary-soft); }
.fx-select__box--error { border-color: var(--fx-danger); }
.fx-select__box--disabled { background: var(--fx-surface-muted); }
.fx-select__field {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 2rem 0 0.625rem;
  border: none;
  background: none;
  outline: none;
  appearance: none;
  font: inherit;
  font-size: 0.9375rem;
  color: inherit;
  cursor: pointer;
}
.fx-select__field:disabled { cursor: not-allowed; color: var(--fx-text-muted); }
.fx-select__chevron {
  position: absolute;
  right: 0.625rem;
  color: var(--fx-text-faint);
  pointer-events: none;
}
.fx-select__hint { font-size: 0.75rem; color: var(--fx-text-muted); }
.fx-select__error { font-size: 0.75rem; color: var(--fx-danger); }
</style>
