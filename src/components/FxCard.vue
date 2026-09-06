<script setup>
/**
 * FxCard — базовая поверхность: белая карточка со светлой рамкой.
 *
 * Заголовок задаётся пропом `title` (+ `subtitle`) либо слотом #header;
 * действия шапки — #actions, низ — #footer. `padding="none"` нужен, когда
 * внутрь кладут таблицу во всю ширину.
 */
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  padding: { type: String, default: 'md' }, // md | sm | none
  hoverable: { type: Boolean, default: false },
})
</script>

<template>
  <section class="fx-card" :class="[`fx-card--p-${padding}`, { 'fx-card--hoverable': hoverable }]">
    <header v-if="title || subtitle || $slots.header || $slots.actions" class="fx-card__header">
      <div class="fx-card__heading">
        <slot name="header">
          <h2 v-if="title" class="fx-card__title">{{ title }}</h2>
          <p v-if="subtitle" class="fx-card__subtitle">{{ subtitle }}</p>
        </slot>
      </div>
      <div v-if="$slots.actions" class="fx-card__actions"><slot name="actions" /></div>
    </header>
    <div class="fx-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="fx-card__footer"><slot name="footer" /></footer>
  </section>
</template>

<style scoped>
.fx-card {
  background: var(--fx-surface);
  border: 1px solid var(--fx-border);
  border-radius: var(--fx-radius);
  box-shadow: var(--fx-shadow-sm);
  overflow: hidden;
}
.fx-card--hoverable { transition: box-shadow 0.15s, border-color 0.15s; }
.fx-card--hoverable:hover { box-shadow: var(--fx-shadow-md); border-color: var(--fx-border-strong); }
.fx-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--fx-border);
}
.fx-card__heading { min-width: 0; }
.fx-card__title { font-size: 1rem; font-weight: 600; }
.fx-card__subtitle { margin-top: 0.15rem; font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-card__actions { display: flex; align-items: center; gap: 0.5rem; flex: none; }
.fx-card--p-md .fx-card__body { padding: 1.25rem; }
.fx-card--p-sm .fx-card__body { padding: 0.75rem; }
.fx-card--p-none .fx-card__body { padding: 0; }
.fx-card__footer {
  padding: 0.875rem 1.25rem;
  border-top: 1px solid var(--fx-border);
  background: var(--fx-surface-muted);
}
</style>
