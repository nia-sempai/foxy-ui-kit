<script setup>
/**
 * FxCountdown — обратный отсчёт до момента времени: дедлайн, окончание сессии,
 * старт события.
 *
 * Тикает раз в секунду от переданного времени окончания. За `warnAt` секунд до
 * нуля подсвечивается жёлтым, за `dangerAt` — красным, чтобы приближение
 * дедлайна было заметно без чтения цифр.
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  to: { type: [String, Number, Date], required: true },
  warnAt: { type: Number, default: 300 },
  dangerAt: { type: Number, default: 60 },
  showIcon: { type: Boolean, default: true },
  size: { type: String, default: 'md' }, // sm | md | lg
  endedText: { type: String, default: 'Завершено' },
})

const now = ref(Date.now())
let timer = null

onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onBeforeUnmount(() => clearInterval(timer))

const left = computed(() => Math.max(0, Math.floor((new Date(props.to).getTime() - now.value) / 1000)))
const ended = computed(() => left.value <= 0)

const tone = computed(() => {
  if (ended.value) return 'ended'
  if (left.value <= props.dangerAt) return 'danger'
  if (left.value <= props.warnAt) return 'warning'
  return 'normal'
})

const text = computed(() => {
  if (ended.value) return props.endedText
  const s = left.value
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n) => String(n).padStart(2, '0')
  if (d > 0) return `${d} д ${pad(h)}:${pad(m)}:${pad(sec)}`
  return `${pad(h)}:${pad(m)}:${pad(sec)}`
})
</script>

<template>
  <span class="fx-countdown" :class="[`fx-countdown--${tone}`, `fx-countdown--${size}`]">
    <FxIcon v-if="showIcon" name="clock" :size="size === 'lg' ? 18 : 14" />
    {{ text }}
  </span>
</template>

<style scoped>
.fx-countdown {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  white-space: nowrap;
}
.fx-countdown--sm { font-size: 0.8125rem; }
.fx-countdown--md { font-size: 0.9375rem; }
.fx-countdown--lg { font-size: 1.5rem; letter-spacing: -0.01em; }
.fx-countdown--normal { color: var(--fx-text); }
.fx-countdown--warning { color: var(--fx-warning-strong); }
.fx-countdown--danger { color: var(--fx-danger); }
.fx-countdown--ended { color: var(--fx-text-faint); font-weight: 500; }
</style>
