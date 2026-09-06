<script setup>
/**
 * FxSegmented — компактный переключатель режимов (карточки/таблица, день/месяц)
 * на @zag-js/radio-group: семантически это радио-группа, поэтому стрелки и
 * фокус работают как у неё. В отличие от FxTabs не претендует на навигацию.
 *
 *   options: [{ value, label?, icon?, title? }]
 */
import * as radio from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, useId } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] },
  size: { type: String, default: 'md' }, // sm | md
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const service = useMachine(radio.machine, {
  id: useId(),
  orientation: 'horizontal',
  get value() {
    return props.modelValue === '' || props.modelValue == null ? null : String(props.modelValue)
  },
  get disabled() {
    return props.disabled
  },
  onValueChange({ value }) {
    const item = props.options.find((o) => String(o.value) === value)
    emit('update:modelValue', item ? item.value : value)
  },
})

const api = computed(() => radio.connect(service, normalizeProps))
</script>

<template>
  <div class="fx-segmented" :class="`fx-segmented--${size}`" v-bind="api.getRootProps()">
    <label
      v-for="opt in options"
      :key="opt.value"
      class="fx-segmented__item"
      :title="opt.title"
      v-bind="api.getItemProps({ value: String(opt.value) })"
    >
      <input v-bind="api.getItemHiddenInputProps({ value: String(opt.value) })" />
      <FxIcon v-if="opt.icon" :name="opt.icon" :size="size === 'sm' ? 14 : 16" />
      <span v-if="opt.label" v-bind="api.getItemTextProps({ value: String(opt.value) })">{{ opt.label }}</span>
    </label>
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
  border-radius: calc(var(--fx-radius-sm) - 2px);
  font-size: 0.875rem;
  color: var(--fx-text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.12s, color 0.12s, box-shadow 0.12s;
}
.fx-segmented--sm .fx-segmented__item { padding: 0.2rem 0.5rem; font-size: 0.8125rem; }
.fx-segmented__item[data-hover]:not([data-disabled]) { color: var(--fx-text); }
.fx-segmented__item[data-focus-visible] { box-shadow: 0 0 0 2px var(--fx-primary); }
.fx-segmented__item[data-disabled] { cursor: not-allowed; opacity: 0.5; }
.fx-segmented__item[data-state="checked"] {
  background: var(--fx-surface);
  color: var(--fx-text);
  font-weight: 550;
  box-shadow: var(--fx-shadow-sm);
}
</style>
