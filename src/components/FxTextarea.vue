<script setup>
/**
 * FxTextarea — многострочное поле. Подпись, подсказка и ошибка ведут себя так
 * же, как у FxInput, чтобы формы выглядели однородно.
 */
defineOptions({ inheritAttrs: false })

defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: [Number, String], default: 4 },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="fx-textarea">
    <span v-if="label" class="fx-textarea__label">
      {{ label }}<span v-if="required" class="fx-textarea__req">*</span>
    </span>
    <textarea
      class="fx-textarea__field"
      :class="{ 'fx-textarea__field--error': error }"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="error" class="fx-textarea__error">{{ error }}</span>
    <span v-else-if="hint" class="fx-textarea__hint">{{ hint }}</span>
  </label>
</template>

<style scoped>
.fx-textarea { display: flex; flex-direction: column; gap: 0.25rem; margin: 0; min-width: 0; }
.fx-textarea__label { font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-textarea__req { color: var(--fx-danger); margin-left: 2px; }
.fx-textarea__field {
  width: 100%;
  padding: 0.5rem 0.625rem;
  background: var(--fx-surface);
  border: 1px solid var(--fx-border-strong);
  border-radius: var(--fx-radius-sm);
  font: inherit;
  font-size: 0.9375rem;
  color: inherit;
  outline: none;
  resize: vertical;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.fx-textarea__field:focus { border-color: var(--fx-primary); box-shadow: 0 0 0 3px var(--fx-primary-soft); }
.fx-textarea__field--error { border-color: var(--fx-danger); }
.fx-textarea__field:disabled { background: var(--fx-surface-muted); cursor: not-allowed; }
.fx-textarea__hint { font-size: 0.75rem; color: var(--fx-text-muted); }
.fx-textarea__error { font-size: 0.75rem; color: var(--fx-danger); }
</style>
