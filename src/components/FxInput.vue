<script setup>
/**
 * FxInput — однострочное поле ввода с подписью, подсказкой и ошибкой.
 *
 * Метрики совпадают с FxSelect и FxButton, поэтому строка фильтров
 * выравнивается без правок в приложении. Нативные атрибуты (autocomplete,
 * inputmode, min, @blur, …) прокидываются на <input>.
 *
 *   <FxInput v-model="query" label="Поиск" prefix-icon="search" :error="err" />
 */
import FxIcon from './FxIcon.vue'

defineOptions({ inheritAttrs: false })

defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  prefixIcon: { type: String, default: '' },
  suffix: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="fx-input">
    <span v-if="label" class="fx-input__label">
      {{ label }}<span v-if="required" class="fx-input__req">*</span>
    </span>
    <span
      class="fx-input__box"
      :class="{ 'fx-input__box--error': error, 'fx-input__box--disabled': disabled }"
    >
      <FxIcon v-if="prefixIcon" :name="prefixIcon" :size="16" class="fx-input__icon" />
      <input
        class="fx-input__field"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="error ? 'true' : null"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span v-if="suffix" class="fx-input__suffix">{{ suffix }}</span>
    </span>
    <span v-if="error" class="fx-input__error">{{ error }}</span>
    <span v-else-if="hint" class="fx-input__hint">{{ hint }}</span>
  </label>
</template>

<style scoped>
.fx-input { display: flex; flex-direction: column; gap: 0.25rem; margin: 0; min-width: 0; }
.fx-input__label { font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-input__req { color: var(--fx-danger); margin-left: 2px; }
.fx-input__box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: var(--fx-control-h);
  padding: 0 0.625rem;
  background: var(--fx-surface);
  border: 1px solid var(--fx-border-strong);
  border-radius: var(--fx-radius-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.fx-input__box:focus-within { border-color: var(--fx-primary); box-shadow: 0 0 0 3px var(--fx-primary-soft); }
.fx-input__box--error { border-color: var(--fx-danger); }
.fx-input__box--error:focus-within { box-shadow: 0 0 0 3px var(--fx-danger-soft); }
.fx-input__box--disabled { background: var(--fx-surface-muted); }
.fx-input__icon { color: var(--fx-text-faint); }
.fx-input__field {
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  outline: none;
  font: inherit;
  font-size: 0.9375rem;
  color: inherit;
}
.fx-input__field:disabled { cursor: not-allowed; color: var(--fx-text-muted); }
.fx-input__suffix { font-size: 0.875rem; color: var(--fx-text-muted); white-space: nowrap; }
.fx-input__hint { font-size: 0.75rem; color: var(--fx-text-muted); }
.fx-input__error { font-size: 0.75rem; color: var(--fx-danger); }
</style>
