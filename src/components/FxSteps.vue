<script setup>
/**
 * FxSteps — индикатор шагов мастера (публикация закупки, подача заявки).
 *
 *   items: [{ label, hint? }]
 *   current: индекс текущего шага (с нуля)
 */
import FxIcon from './FxIcon.vue'

defineProps({
  items: { type: Array, default: () => [] },
  current: { type: Number, default: 0 },
  clickable: { type: Boolean, default: false },
})

defineEmits(['select'])
</script>

<template>
  <ol class="fx-steps">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="fx-steps__item"
      :class="{
        'fx-steps__item--done': i < current,
        'fx-steps__item--current': i === current,
        'fx-steps__item--clickable': clickable && i <= current,
      }"
      @click="clickable && i <= current && $emit('select', i)"
    >
      <span class="fx-steps__marker">
        <FxIcon v-if="i < current" name="check" :size="14" />
        <template v-else>{{ i + 1 }}</template>
      </span>
      <span class="fx-steps__body">
        <span class="fx-steps__label">{{ typeof item === 'string' ? item : item.label }}</span>
        <span v-if="item.hint" class="fx-steps__hint">{{ item.hint }}</span>
      </span>
    </li>
  </ol>
</template>

<style scoped>
.fx-steps {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: auto;
}
.fx-steps__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  border-radius: var(--fx-radius-sm);
  white-space: nowrap;
}
/* Соединительная линия между шагами: рисуем на псевдоэлементе, чтобы не
   плодить лишние узлы и не ломать перенос на узких экранах. */
.fx-steps__item:not(:last-child)::after {
  content: '';
  width: 1.5rem;
  height: 1px;
  background: var(--fx-border-strong);
  margin-left: 0.25rem;
}
.fx-steps__item--clickable { cursor: pointer; }
.fx-steps__item--clickable:hover { background: var(--fx-surface-muted); }
.fx-steps__marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 50%;
  background: var(--fx-surface);
  border: 1px solid var(--fx-border-strong);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--fx-text-muted);
  flex: none;
}
.fx-steps__body { display: flex; flex-direction: column; }
.fx-steps__label { font-size: 0.875rem; color: var(--fx-text-muted); }
.fx-steps__hint { font-size: 0.6875rem; color: var(--fx-text-faint); }
.fx-steps__item--done .fx-steps__marker { background: var(--fx-success-soft); border-color: #a7f3d0; color: var(--fx-success); }
.fx-steps__item--done .fx-steps__label { color: var(--fx-text); }
.fx-steps__item--current .fx-steps__marker { background: var(--fx-primary); border-color: var(--fx-primary); color: #fff; }
.fx-steps__item--current .fx-steps__label { color: var(--fx-text); font-weight: 600; }
</style>
