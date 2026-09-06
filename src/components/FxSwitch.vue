<script setup>
/**
 * FxSwitch — переключатель булевой настройки на @zag-js/switch. Семантически
 * это checkbox с role="switch"; скрытый input остаётся в форме и в фокусе.
 */
import * as zagSwitch from '@zag-js/switch'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  name: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const service = useMachine(zagSwitch.machine, {
  id: useId(),
  get checked() {
    return props.modelValue
  },
  get disabled() {
    return props.disabled
  },
  get name() {
    return props.name || undefined
  },
  onCheckedChange({ checked }) {
    emit('update:modelValue', checked)
  },
})

const api = computed(() => zagSwitch.connect(service, normalizeProps))
</script>

<template>
  <label class="fx-switch" v-bind="api.getRootProps()">
    <input v-bind="api.getHiddenInputProps()" />
    <span class="fx-switch__track" v-bind="api.getControlProps()">
      <span class="fx-switch__thumb" v-bind="api.getThumbProps()" />
    </span>
    <span v-if="label || hint || $slots.default" class="fx-switch__body">
      <span class="fx-switch__label" v-bind="api.getLabelProps()"><slot>{{ label }}</slot></span>
      <span v-if="hint" class="fx-switch__hint">{{ hint }}</span>
    </span>
  </label>
</template>

<style scoped>
.fx-switch { display: inline-flex; align-items: flex-start; gap: 0.625rem; margin: 0; cursor: pointer; font-weight: 400; }
.fx-switch[data-disabled] { cursor: not-allowed; opacity: 0.6; }
.fx-switch__track {
  position: relative;
  width: 2.25rem;
  height: 1.3rem;
  margin-top: 0.1rem;
  background: var(--fx-border-strong);
  border-radius: 999px;
  flex: none;
  transition: background 0.15s, box-shadow 0.15s;
}
.fx-switch__track[data-state="checked"] { background: var(--fx-primary); }
.fx-switch__track[data-focus-visible] { box-shadow: 0 0 0 3px var(--fx-primary-soft); }
.fx-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.05rem;
  height: 1.05rem;
  background: var(--fx-surface);
  border-radius: 50%;
  box-shadow: var(--fx-shadow-sm);
  transition: transform 0.15s;
}
.fx-switch__thumb[data-state="checked"] { transform: translateX(0.95rem); }
.fx-switch__body { display: flex; flex-direction: column; gap: 0.1rem; }
.fx-switch__label { font-size: 0.9375rem; }
.fx-switch__hint { font-size: 0.75rem; color: var(--fx-text-muted); }
</style>
