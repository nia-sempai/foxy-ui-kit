<script setup>
/**
 * FxSteps — индикатор шагов мастера на @zag-js/steps.
 *
 *   items:   [{ label, hint? }] или строки
 *   current: индекс текущего шага (с нуля), контролируемый
 *   clickable: разрешить переход по клику на пройденные шаги (событие `select`)
 */
import * as steps from '@zag-js/steps'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, useId } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  current: { type: Number, default: 0 },
  clickable: { type: Boolean, default: false },
})

const emit = defineEmits(['select'])

const service = useMachine(steps.machine, {
  id: useId(),
  linear: false,
  get step() {
    return props.current
  },
  get count() {
    return props.items.length
  },
  onStepChange({ step }) {
    if (step !== props.current) emit('select', step)
  },
})

const api = computed(() => steps.connect(service, normalizeProps))

const labelOf = (item) => (typeof item === 'string' ? item : item.label)
const hintOf = (item) => (typeof item === 'string' ? '' : item.hint)
</script>

<template>
  <div class="fx-steps" v-bind="api.getRootProps()">
    <ol class="fx-steps__list" v-bind="api.getListProps()">
      <li v-for="(item, i) in items" :key="i" class="fx-steps__item" v-bind="api.getItemProps({ index: i })">
        <component
          :is="clickable ? 'button' : 'div'"
          class="fx-steps__trigger"
          :class="{ 'fx-steps__trigger--clickable': clickable && i <= current }"
          v-bind="clickable ? api.getTriggerProps({ index: i }) : {}"
          :disabled="clickable && i > current ? true : null"
        >
          <span class="fx-steps__marker" v-bind="api.getIndicatorProps({ index: i })">
            <FxIcon v-if="i < current" name="check" :size="14" />
            <template v-else>{{ i + 1 }}</template>
          </span>
          <span class="fx-steps__body">
            <span class="fx-steps__label">{{ labelOf(item) }}</span>
            <span v-if="hintOf(item)" class="fx-steps__hint">{{ hintOf(item) }}</span>
          </span>
        </component>
        <span v-if="i < items.length - 1" class="fx-steps__sep" v-bind="api.getSeparatorProps({ index: i })" />
      </li>
    </ol>
  </div>
</template>

<style scoped>
.fx-steps { overflow-x: auto; }
.fx-steps__list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.fx-steps__item { display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
.fx-steps__trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: var(--fx-radius-sm);
  background: none;
  font: inherit;
  color: inherit;
  text-align: left;
}
.fx-steps__trigger--clickable { cursor: pointer; }
.fx-steps__trigger--clickable:hover { background: var(--fx-surface-muted); }
.fx-steps__trigger:focus-visible { outline: 2px solid var(--fx-primary); outline-offset: 2px; }
.fx-steps__trigger:disabled { cursor: default; }
.fx-steps__sep { width: 1.5rem; height: 1px; background: var(--fx-border-strong); flex: none; }
.fx-steps__marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 50%;
  background: var(--fx-surface);
  border: 1px solid var(--fx-border-strong);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fx-text-muted);
  flex: none;
}
.fx-steps__body { display: flex; flex-direction: column; }
.fx-steps__label { font-size: 0.875rem; color: var(--fx-text-muted); }
.fx-steps__hint { font-size: 0.6875rem; color: var(--fx-text-faint); }
.fx-steps__marker[data-complete] { background: var(--fx-success-soft); border-color: currentColor; color: var(--fx-success); }
.fx-steps__trigger[data-complete] .fx-steps__label { color: var(--fx-text); }
.fx-steps__marker[data-current] { background: var(--fx-primary); border-color: var(--fx-primary); color: var(--fx-on-primary); }
.fx-steps__trigger[data-current] .fx-steps__label { color: var(--fx-text); font-weight: 600; }
.fx-steps__item[data-complete] .fx-steps__label { color: var(--fx-text); }
.fx-steps__item[data-current] .fx-steps__label { color: var(--fx-text); font-weight: 600; }
</style>
