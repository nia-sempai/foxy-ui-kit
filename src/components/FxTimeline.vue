<script setup>
/**
 * FxTimeline — хронология событий: история статусов, журнал действий, лента
 * активности.
 *
 *   items: [{ time, title, text?, tone?, icon? }]
 */
import FxIcon from './FxIcon.vue'

defineProps({
  items: { type: Array, default: () => [] },
})
</script>

<template>
  <ol class="fx-timeline">
    <li v-for="(item, i) in items" :key="i" class="fx-timeline__item">
      <span class="fx-timeline__marker" :class="`fx-timeline__marker--${item.tone || 'neutral'}`">
        <FxIcon v-if="item.icon" :name="item.icon" :size="12" />
      </span>
      <div class="fx-timeline__body">
        <div class="fx-timeline__head">
          <span class="fx-timeline__title">
            <slot name="title" :item="item">{{ item.title }}</slot>
          </span>
          <span class="fx-timeline__time">{{ item.time }}</span>
        </div>
        <p v-if="item.text" class="fx-timeline__text">{{ item.text }}</p>
        <slot name="extra" :item="item" />
      </div>
    </li>
  </ol>
</template>

<style scoped>
.fx-timeline { margin: 0; padding: 0; list-style: none; }
.fx-timeline__item { position: relative; display: flex; gap: 0.75rem; padding-bottom: 1rem; }
/* Вертикальная линия между маркерами; у последнего элемента не рисуем. */
.fx-timeline__item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 0.53rem;
  top: 1.35rem;
  bottom: 0.1rem;
  width: 1px;
  background: var(--fx-border);
}
.fx-timeline__item:last-child { padding-bottom: 0; }
.fx-timeline__marker {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  margin-top: 0.2rem;
  border-radius: 50%;
  flex: none;
  border: 2px solid var(--fx-surface);
}
.fx-timeline__marker--neutral { background: var(--fx-border-strong); color: var(--fx-surface); }
.fx-timeline__marker--primary { background: var(--fx-primary); color: var(--fx-on-primary); }
.fx-timeline__marker--success { background: var(--fx-success); color: var(--fx-on-success); }
.fx-timeline__marker--warning { background: var(--fx-warning); color: var(--fx-on-warning); }
.fx-timeline__marker--danger { background: var(--fx-danger); color: var(--fx-on-danger); }
.fx-timeline__body { flex: 1; min-width: 0; }
.fx-timeline__head { display: flex; align-items: baseline; justify-content: space-between; gap: 0.75rem; }
.fx-timeline__title { font-size: 0.9375rem; }
.fx-timeline__time { font-size: 0.75rem; color: var(--fx-text-faint); white-space: nowrap; font-variant-numeric: tabular-nums; }
.fx-timeline__text { font-size: 0.8125rem; color: var(--fx-text-muted); margin-top: 0.1rem; }
</style>
