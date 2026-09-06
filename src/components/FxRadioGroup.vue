<script setup>
/**
 * FxRadioGroup — группа радио-кнопок на @zag-js/radio-group: навигация
 * стрелками и roving tabindex от машины. Опции — строки или
 * { value, label, hint?, disabled? }. Направление — колонка или строка.
 */
import * as radio from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean, null], default: null },
  options: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  name: { type: String, default: '' },
  inline: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const items = computed(() =>
  props.options.map((o) => (typeof o === 'object' && o !== null ? o : { value: o, label: String(o) })),
)

const service = useMachine(radio.machine, {
  id: useId(),
  get value() {
    return props.modelValue == null ? null : String(props.modelValue)
  },
  get disabled() {
    return props.disabled
  },
  get name() {
    return props.name || undefined
  },
  get orientation() {
    return props.inline ? 'horizontal' : 'vertical'
  },
  onValueChange({ value }) {
    const item = items.value.find((i) => String(i.value) === value)
    emit('update:modelValue', item ? item.value : value)
  },
})

const api = computed(() => radio.connect(service, normalizeProps))

const itemProps = (item) => ({ value: String(item.value), disabled: item.disabled })
</script>

<template>
  <div class="fx-radio" v-bind="api.getRootProps()">
    <span v-if="label" class="fx-radio__legend" v-bind="api.getLabelProps()">{{ label }}</span>
    <div class="fx-radio__items" :class="{ 'fx-radio__items--inline': inline }">
      <label
        v-for="item in items"
        :key="item.value"
        class="fx-radio__item"
        v-bind="api.getItemProps(itemProps(item))"
      >
        <input v-bind="api.getItemHiddenInputProps(itemProps(item))" />
        <span class="fx-radio__control" v-bind="api.getItemControlProps(itemProps(item))" />
        <span class="fx-radio__body">
          <span class="fx-radio__label" v-bind="api.getItemTextProps(itemProps(item))">{{ item.label }}</span>
          <span v-if="item.hint" class="fx-radio__hint">{{ item.hint }}</span>
        </span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.fx-radio { min-width: 0; }
.fx-radio__legend { display: block; padding-bottom: 0.375rem; font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-radio__items { display: flex; flex-direction: column; gap: 0.5rem; }
.fx-radio__items--inline { flex-direction: row; flex-wrap: wrap; gap: 1rem; }
.fx-radio__item { display: inline-flex; align-items: flex-start; gap: 0.5rem; cursor: pointer; }
.fx-radio__item[data-disabled] { cursor: not-allowed; opacity: 0.6; }
.fx-radio__control {
  position: relative;
  width: 1.05rem;
  height: 1.05rem;
  margin-top: 0.15rem;
  flex: none;
  background: var(--fx-surface);
  border: 1px solid var(--fx-border-strong);
  border-radius: 50%;
  transition: border-color 0.12s, box-shadow 0.12s;
}
.fx-radio__control[data-hover]:not([data-disabled]) { border-color: var(--fx-primary); }
.fx-radio__control[data-focus-visible] { box-shadow: 0 0 0 3px var(--fx-primary-soft); border-color: var(--fx-primary); }
.fx-radio__control[data-state="checked"] { border-color: var(--fx-primary); }
.fx-radio__control[data-state="checked"]::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--fx-primary);
}
.fx-radio__body { display: flex; flex-direction: column; gap: 0.1rem; }
.fx-radio__label { font-size: 0.9375rem; }
.fx-radio__hint { font-size: 0.75rem; color: var(--fx-text-muted); }
</style>
