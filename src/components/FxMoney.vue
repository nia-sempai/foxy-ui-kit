<script setup>
/**
 * FxMoney — денежная сумма в русском формате.
 *
 * Вынесено в компонент, потому что суммы на площадке встречаются в каждом
 * втором экране (НМЦК, ставка, комиссия, баланс) и должны выглядеть одинаково:
 * неразрывные разряды, символ валюты, опциональные копейки.
 */
import { computed } from 'vue'

const props = defineProps({
  value: { type: [Number, String], default: 0 },
  currency: { type: String, default: 'RUB' },
  fraction: { type: Boolean, default: false },
  compact: { type: Boolean, default: false },
  tone: { type: String, default: '' }, // '' | muted | success | danger
  size: { type: String, default: 'md' }, // sm | md | lg
})

const formatted = computed(() => {
  const n = Number(props.value)
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: props.fraction ? 2 : 0,
    maximumFractionDigits: props.fraction ? 2 : 0,
    notation: props.compact ? 'compact' : 'standard',
  }).format(n)
})
</script>

<template>
  <span class="fx-money" :class="[tone && `fx-money--${tone}`, `fx-money--${size}`]">{{ formatted }}</span>
</template>

<style scoped>
.fx-money { font-variant-numeric: tabular-nums; white-space: nowrap; }
.fx-money--sm { font-size: 0.8125rem; }
.fx-money--lg { font-size: 1.25rem; font-weight: 650; letter-spacing: -0.01em; }
.fx-money--muted { color: var(--fx-text-muted); }
.fx-money--success { color: var(--fx-success); }
.fx-money--danger { color: var(--fx-danger); }
</style>
