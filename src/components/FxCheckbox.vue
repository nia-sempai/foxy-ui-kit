<script setup>
/**
 * FxCheckbox — чекбокс с подписью. Нативный input скрыт визуально, но остаётся
 * в потоке фокуса, поэтому доступность и клик по подписи работают штатно.
 */
defineProps({
  modelValue: { type: [Boolean, Array], default: false },
  value: { type: [String, Number, Boolean], default: undefined },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="fx-check" :class="{ 'fx-check--disabled': disabled }">
    <input
      class="fx-check__input"
      type="checkbox"
      :checked="Array.isArray(modelValue) ? modelValue.includes(value) : modelValue"
      :value="value"
      :disabled="disabled"
      @change="$emit(
        'update:modelValue',
        Array.isArray(modelValue)
          ? ($event.target.checked
              ? [...modelValue, value]
              : modelValue.filter((v) => v !== value))
          : $event.target.checked,
      )"
    />
    <span class="fx-check__body">
      <span class="fx-check__label"><slot>{{ label }}</slot></span>
      <span v-if="hint" class="fx-check__hint">{{ hint }}</span>
    </span>
  </label>
</template>

<style scoped>
.fx-check { display: inline-flex; align-items: flex-start; gap: 0.5rem; margin: 0; cursor: pointer; font-weight: 400; }
.fx-check--disabled { cursor: not-allowed; opacity: 0.6; }
.fx-check__input {
  width: 1.05rem;
  height: 1.05rem;
  margin: 0.15rem 0 0;
  accent-color: var(--fx-primary);
  cursor: inherit;
  flex: none;
}
.fx-check__body { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }
.fx-check__label { font-size: 0.9375rem; color: var(--fx-text); }
.fx-check__hint { font-size: 0.75rem; color: var(--fx-text-muted); }
</style>
