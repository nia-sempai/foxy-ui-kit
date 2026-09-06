<script setup>
/**
 * FxAvatar — инициалы пользователя или сущности в кружке.
 * Цвет детерминированно выводится из имени, чтобы не хранить его в данных.
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

const palette = ['#dbeafe/#1d4ed8', '#dcfce7/#047857', '#fef3c7/#b45309', '#ede9fe/#6d28d9', '#ffe4e6/#be123c', '#cffafe/#0e7490']

const colors = computed(() => {
  let hash = 0
  for (const ch of props.name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  const [bg, fg] = palette[hash % palette.length].split('/')
  return { background: bg, color: fg }
})
</script>

<template>
  <span
    class="fx-avatar"
    :class="[`fx-avatar--${size}`, { 'fx-avatar--square': square }]"
    :style="colors"
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
</style>
