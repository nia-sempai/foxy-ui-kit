<script setup>
/**
 * FxProgress — линейный индикатор на @zag-js/progress: заполненность, ход
 * операции, доля от нормы. `value: null` — неопределённое состояние.
 */
import * as progress from '@zag-js/progress'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, useId } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: { type: String, default: '' },
  tone: { type: String, default: 'primary' }, // primary | success | warning | danger
  showValue: { type: Boolean, default: false },
})

const service = useMachine(progress.machine, {
  id: useId(),
  min: 0,
  locale: 'ru-RU',
  get value() {
    return props.value
  },
  get max() {
    return props.max
  },
})

const api = computed(() => progress.connect(service, normalizeProps))
</script>

<template>
  <div class="fx-progress" v-bind="api.getRootProps()">
    <div v-if="label || showValue" class="fx-progress__head">
      <span class="fx-progress__label" v-bind="api.getLabelProps()">{{ label }}</span>
      <span v-if="showValue" class="fx-progress__value" v-bind="api.getValueTextProps()">{{ api.percentAsString }}</span>
    </div>
    <div class="fx-progress__track" v-bind="api.getTrackProps()">
      <div class="fx-progress__bar" :class="`fx-progress__bar--${tone}`" v-bind="api.getRangeProps()" />
    </div>
  </div>
</template>

<style scoped>
.fx-progress__head { display: flex; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.3rem; font-size: 0.8125rem; }
.fx-progress__label { color: var(--fx-text-muted); }
.fx-progress__value { font-weight: 600; font-variant-numeric: tabular-nums; }
.fx-progress__track { height: 0.5rem; background: var(--fx-surface-muted); border-radius: 999px; overflow: hidden; }
.fx-progress__bar { height: 100%; border-radius: 999px; transition: width 0.3s ease; }
.fx-progress__bar[data-state="indeterminate"] {
  width: 40%;
  animation: fx-progress-slide 1.2s ease-in-out infinite;
}
.fx-progress__bar--primary { background: var(--fx-primary); }
.fx-progress__bar--success { background: var(--fx-success); }
.fx-progress__bar--warning { background: var(--fx-warning); }
.fx-progress__bar--danger { background: var(--fx-danger); }
@keyframes fx-progress-slide {
  from { transform: translateX(-100%); }
  to { transform: translateX(250%); }
}
</style>
