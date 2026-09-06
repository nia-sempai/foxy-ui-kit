<script setup>
/**
 * FxSwitch — переключатель для булевых настроек (подписки, флаги в админке).
 * Семантически это checkbox с role="switch".
 */
defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="fx-switch" :class="{ 'fx-switch--disabled': disabled }">
    <input
      class="fx-switch__input"
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="fx-switch__track"><span class="fx-switch__thumb" /></span>
    <span v-if="label || hint || $slots.default" class="fx-switch__body">
      <span class="fx-switch__label"><slot>{{ label }}</slot></span>
      <span v-if="hint" class="fx-switch__hint">{{ hint }}</span>
    </span>
  </label>
</template>

<style scoped>
.fx-switch { display: inline-flex; align-items: flex-start; gap: 0.625rem; margin: 0; cursor: pointer; font-weight: 400; }
.fx-switch--disabled { cursor: not-allowed; opacity: 0.6; }
/* Инпут не убираем из потока: он остаётся фокусируемым, а видимый трек
   отрисован рядом и подхватывает состояние через :checked/:focus-visible. */
.fx-switch__input { position: absolute; opacity: 0; width: 0; height: 0; }
.fx-switch__track {
  position: relative;
  width: 2.25rem;
  height: 1.3rem;
  margin-top: 0.1rem;
  background: var(--fx-border-strong);
  border-radius: 999px;
  flex: none;
  transition: background 0.15s;
}
.fx-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.05rem;
  height: 1.05rem;
  background: #fff;
  border-radius: 50%;
  box-shadow: var(--fx-shadow-sm);
  transition: transform 0.15s;
}
.fx-switch__input:checked + .fx-switch__track { background: var(--fx-primary); }
.fx-switch__input:checked + .fx-switch__track .fx-switch__thumb { transform: translateX(0.95rem); }
.fx-switch__input:focus-visible + .fx-switch__track { outline: 2px solid var(--fx-primary); outline-offset: 2px; }
.fx-switch__body { display: flex; flex-direction: column; gap: 0.1rem; }
.fx-switch__label { font-size: 0.9375rem; }
.fx-switch__hint { font-size: 0.75rem; color: var(--fx-text-muted); }
</style>
