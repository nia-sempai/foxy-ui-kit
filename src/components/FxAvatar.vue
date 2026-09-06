<script setup>
/**
 * FxAvatar — инициалы пользователя или сущности в кружке.
 * Оттенок детерминированно выводится из имени, чтобы не хранить его в данных;
 * сами цвета берутся из семантических токенов темы, поэтому аватары
 * перекрашиваются вместе с ней.
 */
import { computed } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  name: { type: String, default: '' },
  icon: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg
  square: { type: Boolean, default: false },
})

const initials = computed(() =>
  props.name
    .replace(/["«»]/g, '')
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join(''),
)

const tones = ['primary', 'success', 'warning', 'info', 'danger']

const tone = computed(() => {
  let hash = 0
  for (const ch of props.name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return tones[hash % tones.length]
})
</script>

<template>
  <span
    class="fx-avatar"
    :class="[`fx-avatar--${size}`, `fx-avatar--${tone}`, { 'fx-avatar--square': square }]"
    :title="name"
  >
    <FxIcon v-if="icon" :name="icon" :size="size === 'sm' ? 14 : size === 'lg' ? 22 : 17" />
    <template v-else>{{ initials }}</template>
  </span>
</template>

<style scoped>
.fx-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  flex: none;
  user-select: none;
}
.fx-avatar--square { border-radius: var(--fx-radius-sm); }
.fx-avatar--sm { width: 1.75rem; height: 1.75rem; font-size: 0.6875rem; }
.fx-avatar--md { width: 2.25rem; height: 2.25rem; font-size: 0.8125rem; }
.fx-avatar--lg { width: 3rem; height: 3rem; font-size: 1rem; }
.fx-avatar--primary { background: var(--fx-primary-soft); color: var(--fx-primary); }
.fx-avatar--success { background: var(--fx-success-soft); color: var(--fx-success-strong); }
.fx-avatar--warning { background: var(--fx-warning-soft); color: var(--fx-warning-strong); }
.fx-avatar--info { background: var(--fx-info-soft); color: var(--fx-info-strong); }
.fx-avatar--danger { background: var(--fx-danger-soft); color: var(--fx-danger-strong); }
</style>
