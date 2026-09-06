<script setup>
/**
 * FxEmpty — пустое состояние списка: иконка, заголовок, пояснение и действие.
 */
import FxIcon from './FxIcon.vue'

defineProps({
  icon: { type: String, default: 'search' },
  title: { type: String, default: 'Ничего не найдено' },
  description: { type: String, default: '' },
})
</script>

<template>
  <div class="fx-empty">
    <span class="fx-empty__icon"><FxIcon :name="icon" :size="24" /></span>
    <p class="fx-empty__title">{{ title }}</p>
    <p v-if="description" class="fx-empty__desc">{{ description }}</p>
    <div v-if="$slots.default" class="fx-empty__actions"><slot /></div>
  </div>
</template>

<style scoped>
.fx-empty { padding: 2.5rem 1.5rem; text-align: center; }
.fx-empty__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--fx-surface-muted);
  color: var(--fx-text-faint);
  margin-bottom: 0.75rem;
}
.fx-empty__title { font-weight: 600; }
.fx-empty__desc { margin-top: 0.25rem; font-size: 0.875rem; color: var(--fx-text-muted); }
.fx-empty__actions { margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem; }
</style>
