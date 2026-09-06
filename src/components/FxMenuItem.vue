<script setup>
/**
 * FxMenuItem — пункт меню внутри FxDropdown. Рендерится как <router-link>,
 * если передан `to`, иначе как кнопка.
 */
import FxIcon from './FxIcon.vue'

defineProps({
  icon: { type: String, default: '' },
  to: { type: [String, Object], default: null },
  danger: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    class="fx-menu-item"
    :class="{ 'fx-menu-item--danger': danger }"
    :disabled="to ? null : disabled"
    role="menuitem"
  >
    <FxIcon v-if="icon" :name="icon" :size="15" />
    <span class="fx-menu-item__label"><slot /></span>
  </component>
</template>

<style scoped>
.fx-menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.45rem 0.55rem;
  background: none;
  border: none;
  border-radius: var(--fx-radius-sm);
  font: inherit;
  font-size: 0.875rem;
  color: var(--fx-text);
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
.fx-menu-item:hover { background: var(--fx-surface-muted); text-decoration: none; }
.fx-menu-item:disabled { opacity: 0.5; cursor: not-allowed; }
.fx-menu-item--danger { color: var(--fx-danger); }
.fx-menu-item--danger:hover { background: var(--fx-danger-soft); }
.fx-menu-item__label { flex: 1; min-width: 0; }
</style>
