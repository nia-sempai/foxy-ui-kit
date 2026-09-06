<script setup>
/**
 * FxCombobox — поле с поиском по списку на @zag-js/combobox.
 *
 * Для длинных справочников (контрагенты, пользователи), где нативный select
 * неудобен. Фильтрует по подписи локально; для серверного поиска слушайте
 * событие `search` и подменяйте `options`.
 *
 *   <FxCombobox v-model="form.counterpartyId" :options="counterparties"
 *               :get-value="c => c.id" :get-label="c => c.name" label="Контрагент" />
 */
import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref, useAttrs, useId, watch } from 'vue'
import FxIcon from './FxIcon.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: { type: Array, default: () => [] },
  getValue: { type: Function, default: (o) => o.value ?? o.id },
  getLabel: { type: Function, default: (o) => o.label ?? o.name ?? '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'Начните вводить…' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  emptyText: { type: String, default: 'Ничего не найдено' },
  name: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'search'])

const items = computed(() =>
  props.options.map((o) => (typeof o === 'object' && o !== null ? o : { value: o, label: String(o) })),
)
const keyOf = (item) => String(props.getValue(item))
const labelOf = (item) => String(props.getLabel(item))

const filtered = ref([])
watch(items, (next) => { filtered.value = next }, { immediate: true })

function applyFilter(text) {
  const q = (text || '').toLowerCase().trim()
  filtered.value = q ? items.value.filter((i) => labelOf(i).toLowerCase().includes(q)) : items.value
}

const collection = computed(() =>
  combobox.collection({ items: filtered.value, itemToValue: keyOf, itemToString: labelOf }),
)

function itemFor(raw) {
  if (raw == null || raw === '') return undefined
  return items.value.find((i) => keyOf(i) === String(raw))
}

const service = useMachine(combobox.machine, {
  id: useId(),
  positioning: { sameWidth: true },
  get collection() {
    return collection.value
  },
  get disabled() {
    return props.disabled
  },
  get invalid() {
    return !!props.error
  },
  get required() {
    return props.required
  },
  get name() {
    return props.name || undefined
  },
  get placeholder() {
    return props.placeholder
  },
  get value() {
    const match = itemFor(props.modelValue)
    return match ? [keyOf(match)] : []
  },
  onOpenChange() {
    filtered.value = items.value
  },
  onInputValueChange({ inputValue }) {
    applyFilter(inputValue)
    emit('search', inputValue)
  },
  onValueChange({ value }) {
    const item = itemFor(value[0])
    emit('update:modelValue', item !== undefined ? props.getValue(item) : null)
  },
})

const api = computed(() => combobox.connect(service, normalizeProps))
</script>

<template>
  <div class="fx-combobox" v-bind="{ ...rootAttrs, ...api.getRootProps() }">
    <label v-if="label" class="fx-combobox__label" v-bind="api.getLabelProps()">
      {{ label }}<span v-if="required" class="fx-combobox__req">*</span>
    </label>
    <div
      class="fx-combobox__box"
      :class="{ 'fx-combobox__box--error': error, 'fx-combobox__box--disabled': disabled }"
      v-bind="api.getControlProps()"
    >
      <input class="fx-combobox__input" v-bind="api.getInputProps()" />
      <button
        v-if="clearable && api.hasSelectedItems"
        class="fx-combobox__clear"
        aria-label="Очистить"
        v-bind="api.getClearTriggerProps()"
      >
        <FxIcon name="close" :size="14" />
      </button>
      <button class="fx-combobox__trigger" aria-label="Показать список" v-bind="api.getTriggerProps()">
        <FxIcon name="chevron-down" :size="16" />
      </button>
    </div>
    <span v-if="error" class="fx-combobox__error">{{ error }}</span>
    <span v-else-if="hint" class="fx-combobox__hint">{{ hint }}</span>

    <Teleport to="body">
      <div v-bind="api.getPositionerProps()">
        <ul class="fx-combobox__content" v-bind="api.getContentProps()">
          <li
            v-for="item in filtered"
            :key="keyOf(item)"
            class="fx-combobox__item"
            v-bind="api.getItemProps({ item })"
          >
            <span class="fx-combobox__item-text" v-bind="api.getItemTextProps({ item })">{{ labelOf(item) }}</span>
            <span class="fx-combobox__item-check" v-bind="api.getItemIndicatorProps({ item })">
              <FxIcon name="check" :size="15" />
            </span>
          </li>
          <li v-if="!filtered.length" class="fx-combobox__empty">{{ emptyText }}</li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.fx-combobox { display: flex; flex-direction: column; gap: 0.25rem; margin: 0; min-width: 0; }
.fx-combobox__label { font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-combobox__req { color: var(--fx-danger); margin-left: 2px; }
.fx-combobox__box {
  display: flex;
  align-items: center;
  height: var(--fx-control-h);
  padding-right: 0.25rem;
  background: var(--fx-surface);
  border: 1px solid var(--fx-border-strong);
  border-radius: var(--fx-radius-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.fx-combobox__box:focus-within { border-color: var(--fx-primary); box-shadow: 0 0 0 3px var(--fx-primary-soft); }
.fx-combobox__box--error { border-color: var(--fx-danger); }
.fx-combobox__box--error:focus-within { box-shadow: 0 0 0 3px var(--fx-danger-soft); }
.fx-combobox__box--disabled { background: var(--fx-surface-muted); }
.fx-combobox__input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 0.625rem;
  border: none;
  background: none;
  outline: none;
  font: inherit;
  font-size: 0.9375rem;
  color: inherit;
}
.fx-combobox__input::placeholder { color: var(--fx-text-faint); }
.fx-combobox__input:disabled { cursor: not-allowed; color: var(--fx-text-muted); }
.fx-combobox__clear,
.fx-combobox__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  border-radius: var(--fx-radius-sm);
  background: none;
  color: var(--fx-text-faint);
  cursor: pointer;
}
.fx-combobox__clear:hover,
.fx-combobox__trigger:hover:not(:disabled) { color: var(--fx-text); background: var(--fx-surface-muted); }
.fx-combobox__trigger:disabled { cursor: not-allowed; }
.fx-combobox__hint { font-size: 0.75rem; color: var(--fx-text-muted); }
.fx-combobox__error { font-size: 0.75rem; color: var(--fx-danger); }

.fx-combobox__content {
  z-index: 1100;
  list-style: none;
  margin: 0;
  padding: 0.25rem;
  max-height: 260px;
  overflow-y: auto;
  min-width: var(--reference-width);
  background: var(--fx-surface);
  border: 1px solid var(--fx-border);
  border-radius: var(--fx-radius);
  box-shadow: var(--fx-shadow-md);
  outline: none;
}
.fx-combobox__content[hidden] { display: none; }
.fx-combobox__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.45rem 0.6rem;
  border-radius: var(--fx-radius-sm);
  font-size: 0.9rem;
  cursor: pointer;
}
.fx-combobox__item[data-highlighted] { background: var(--fx-primary-soft); color: var(--fx-primary); }
.fx-combobox__item[data-state="checked"] { font-weight: 600; }
.fx-combobox__item-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fx-combobox__item-check { display: inline-flex; flex: none; }
.fx-combobox__item-check[hidden] { display: none; }
.fx-combobox__empty { padding: 0.5rem 0.6rem; font-size: 0.875rem; color: var(--fx-text-muted); }
</style>
