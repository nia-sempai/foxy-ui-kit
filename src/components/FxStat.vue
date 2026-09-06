<script setup>
/**
 * FxStat — плитка ключевой метрики (GMV, комиссия, активные торги).
 *
 * `trend` — число в процентах: положительное красится в зелёный со стрелкой
 * вверх, отрицательное в красный. Для метрик, где падение это хорошо (напр.
 * снижение цены на торгах), передайте `invert`.
 */
import { computed } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  label: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  hint: { type: String, default: '' },
  icon: { type: String, default: '' },
  tone: { type: String, default: 'neutral' }, // neutral | primary | success | warning | danger
  trend: { type: Number, default: null },
  invert: { type: Boolean, default: false },
})

const good = computed(() => (props.invert ? props.trend < 0 : props.trend > 0))
</script>

<template>
  <div class="fx-stat">
    <div class="fx-stat__head">
      <span class="fx-stat__label">{{ label }}</span>
      <span v-if="icon" class="fx-stat__icon" :class="`fx-stat__icon--${tone}`">
        <FxIcon :name="icon" :size="16" />
      </span>
    </div>
    <div class="fx-stat__value"><slot>{{ value }}</slot></div>
    <div v-if="hint || trend != null" class="fx-stat__foot">
      <span v-if="trend != null" class="fx-stat__trend" :class="good ? 'fx-stat__trend--good' : 'fx-stat__trend--bad'">
        <FxIcon :name="trend > 0 ? 'up' : 'down'" :size="13" />
        {{ Math.abs(trend).toLocaleString('ru-RU') }}%
      </span>
      <span v-if="hint" class="fx-stat__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped>
.fx-stat {
  background: var(--fx-surface);
  border: 1px solid var(--fx-border);
  border-radius: var(--fx-radius);
  box-shadow: var(--fx-shadow-sm);
  padding: 1rem 1.125rem;
}
.fx-stat__head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.fx-stat__label { font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-stat__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--fx-radius-sm);
  background: #f1f5f9;
  color: var(--fx-text-muted);
}
.fx-stat__icon--primary { background: var(--fx-primary-soft); color: var(--fx-primary); }
.fx-stat__icon--success { background: var(--fx-success-soft); color: var(--fx-success); }
.fx-stat__icon--warning { background: var(--fx-warning-soft); color: var(--fx-warning); }
.fx-stat__icon--danger { background: var(--fx-danger-soft); color: var(--fx-danger); }
.fx-stat__value { margin-top: 0.35rem; font-size: 1.5rem; font-weight: 650; letter-spacing: -0.02em; }
.fx-stat__foot { margin-top: 0.35rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; }
.fx-stat__trend { display: inline-flex; align-items: center; gap: 0.15rem; font-weight: 600; }
.fx-stat__trend--good { color: var(--fx-success); }
.fx-stat__trend--bad { color: var(--fx-danger); }
.fx-stat__hint { color: var(--fx-text-muted); }
</style>
