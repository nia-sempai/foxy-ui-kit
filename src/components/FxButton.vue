<script setup>
/**
 * FxButton — единственный кнопочный примитив кита.
 *
 *   variant  — 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'link'
 *   size     — 'md' (по умолчанию) | 'sm' | 'lg'
 *   icon     — семантическое имя FxIcon перед подписью
 *   iconEnd  — иконка после подписи
 *   loading  — блокирует кнопку и показывает спиннер вместо иконки
 *
 * Подпись — слот по умолчанию и необязательна: с одним `icon` кнопка
 * рендерится квадратной иконочной.
 */
import { computed, useSlots } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  variant: { type: String, default: 'secondary' },
  size: { type: String, default: 'md' },
  icon: { type: String, default: '' },
  iconEnd: { type: String, default: '' },
  htmlType: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
})

const slots = useSlots()
const hasLabel = computed(() => !!slots.default)
const iconPx = computed(() => ({ sm: 15, md: 17, lg: 19 })[props.size] ?? 17)
</script>

<template>
  <button
    class="fx-btn"
    :class="[
      `fx-btn--${variant}`,
      `fx-btn--${size}`,
      { 'fx-btn--icon-only': (icon || loading) && !hasLabel, 'fx-btn--block': block },
    ]"
    :type="htmlType"
    :disabled="disabled || loading"
  >
    <FxIcon v-if="loading" name="spinner" :size="iconPx" spin />
    <FxIcon v-else-if="icon" :name="icon" :size="iconPx" />
    <span v-if="hasLabel" class="fx-btn__label"><slot /></span>
    <FxIcon v-if="iconEnd && !loading" :name="iconEnd" :size="iconPx" />
  </button>
</template>

<style scoped>
.fx-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: var(--fx-control-h);
  padding: 0 0.875rem;
  border: 1px solid transparent;
  border-radius: var(--fx-radius-sm);
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.fx-btn:focus { outline: none; }
.fx-btn:focus-visible { outline: 2px solid var(--fx-primary); outline-offset: 2px; }
.fx-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.fx-btn--block { width: 100%; }

.fx-btn--sm { min-height: var(--fx-control-h-sm); padding: 0 0.625rem; font-size: 0.8125rem; }
.fx-btn--lg { min-height: 2.875rem; padding: 0 1.25rem; font-size: 1rem; }
.fx-btn--icon-only { width: var(--fx-control-h); padding: 0; }
.fx-btn--icon-only.fx-btn--sm { width: var(--fx-control-h-sm); }
.fx-btn--icon-only.fx-btn--lg { width: 2.875rem; }

.fx-btn--primary { background: var(--fx-primary); color: #fff; box-shadow: var(--fx-shadow-sm); }
.fx-btn--primary:hover:not(:disabled) { background: var(--fx-primary-hover); }

.fx-btn--secondary { background: var(--fx-surface); border-color: var(--fx-border-strong); color: var(--fx-text); }
.fx-btn--secondary:hover:not(:disabled) { background: var(--fx-surface-muted); }

.fx-btn--ghost { background: transparent; color: var(--fx-text-muted); }
.fx-btn--ghost:hover:not(:disabled) { background: var(--fx-surface-muted); color: var(--fx-text); }

.fx-btn--danger { background: var(--fx-danger); color: #fff; }
.fx-btn--danger:hover:not(:disabled) { background: #b91c1c; }

.fx-btn--success { background: var(--fx-success); color: #fff; }
.fx-btn--success:hover:not(:disabled) { background: #047857; }

.fx-btn--link { background: none; color: var(--fx-primary); padding: 0; min-height: 0; }
.fx-btn--link:hover:not(:disabled) { text-decoration: underline; }
</style>
