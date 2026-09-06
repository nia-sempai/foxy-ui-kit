<script setup>
/**
 * FxBadge — статусная метка: состояние записи, тег, признак.
 *
 *   tone — 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
 *   dot  — точка-индикатор перед текстом (для состояний «идёт сейчас»)
 *   icon — семантическое имя FxIcon перед текстом
 */
import FxIcon from './FxIcon.vue'

defineProps({
  tone: { type: String, default: 'neutral' },
  size: { type: String, default: 'md' }, // md | sm
  dot: { type: Boolean, default: false },
  icon: { type: String, default: '' },
})
</script>

<template>
  <span class="fx-badge" :class="[`fx-badge--${tone}`, `fx-badge--${size}`]">
    <span v-if="dot" class="fx-badge__dot" />
    <FxIcon v-if="icon" :name="icon" :size="size === 'sm' ? 11 : 13" />
    <slot />
  </span>
</template>

<style scoped>
.fx-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
}
.fx-badge--sm { font-size: 0.6875rem; padding: 0.1rem 0.4rem; }
.fx-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none; }
.fx-badge--neutral { background: var(--fx-surface-muted); color: var(--fx-text-muted); }
.fx-badge--primary { background: var(--fx-primary-soft); color: var(--fx-primary); }
.fx-badge--success { background: var(--fx-success-soft); color: var(--fx-success-strong); }
.fx-badge--warning { background: var(--fx-warning-soft); color: var(--fx-warning-strong); }
.fx-badge--danger { background: var(--fx-danger-soft); color: var(--fx-danger-strong); }
.fx-badge--info { background: var(--fx-info-soft); color: var(--fx-info-strong); }
</style>
