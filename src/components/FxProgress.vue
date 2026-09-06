<script setup>
/**
 * FxProgress — линейный индикатор: заполненность, ход операции, доля от нормы.
 */
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: { type: String, default: '' },
  tone: { type: String, default: 'primary' }, // primary | success | warning | danger
  showValue: { type: Boolean, default: false },
})

const percent = computed(() => Math.min(100, Math.max(0, (props.value / props.max) * 100)))
</script>

<template>
  <div class="fx-progress">
    <div v-if="label || showValue" class="fx-progress__head">
      <span class="fx-progress__label">{{ label }}</span>
      <span v-if="showValue" class="fx-progress__value">{{ Math.round(percent) }}%</span>
    </div>
    <div
      class="fx-progress__track"
      role="progressbar"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="max"
    >
      <div class="fx-progress__bar" :class="`fx-progress__bar--${tone}`" :style="{ width: `${percent}%` }" />
    </div>
  </div>
</template>

<style scoped>
.fx-progress__head { display: flex; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.3rem; font-size: 0.8125rem; }
.fx-progress__label { color: var(--fx-text-muted); }
.fx-progress__value { font-weight: 600; }
.fx-progress__track { height: 0.5rem; background: #eef2f7; border-radius: 999px; overflow: hidden; }
.fx-progress__bar { height: 100%; border-radius: 999px; transition: width 0.3s ease; }
.fx-progress__bar--primary { background: var(--fx-primary); }
.fx-progress__bar--success { background: var(--fx-success); }
.fx-progress__bar--warning { background: #f59e0b; }
.fx-progress__bar--danger { background: var(--fx-danger); }
</style>
