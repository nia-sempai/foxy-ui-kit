<script setup>
/**
 * FxPagination — постраничная навигация.
 *
 * Контролируемая: компонент не хранит состояние, а сообщает нужную страницу
 * через update:page. Список страниц сворачивается многоточиями, чтобы ширина
 * не зависела от объёма выборки.
 */
import { computed } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 20 },
  total: { type: Number, default: 0 },
  siblings: { type: Number, default: 1 },
})

const emit = defineEmits(['update:page'])

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

// Окно вокруг текущей страницы + первая/последняя, разрывы помечаем '…'.
const items = computed(() => {
  const last = pageCount.value
  const from = Math.max(2, props.page - props.siblings)
  const to = Math.min(last - 1, props.page + props.siblings)
  const out = [1]
  if (from > 2) out.push('…')
  for (let p = from; p <= to; p++) out.push(p)
  if (to < last - 1) out.push('…')
  if (last > 1) out.push(last)
  return out
})

const rangeFrom = computed(() => (props.page - 1) * props.pageSize + 1)
const rangeTo = computed(() => Math.min(props.page * props.pageSize, props.total))

function go(p) {
  const next = Math.min(pageCount.value, Math.max(1, p))
  if (next !== props.page) emit('update:page', next)
}
</script>

<template>
  <nav class="fx-pagination" aria-label="Постраничная навигация">
    <span class="fx-pagination__info">{{ rangeFrom }}–{{ rangeTo }} из {{ total }}</span>
    <div class="fx-pagination__pages">
      <button class="fx-pagination__nav" :disabled="page <= 1" aria-label="Назад" @click="go(page - 1)">
        <FxIcon name="chevron-left" :size="16" />
      </button>
      <template v-for="(item, i) in items" :key="`${item}-${i}`">
        <span v-if="item === '…'" class="fx-pagination__gap">…</span>
        <button
          v-else
          class="fx-pagination__page"
          :class="{ 'fx-pagination__page--active': item === page }"
          :aria-current="item === page ? 'page' : null"
          @click="go(item)"
        >{{ item }}</button>
      </template>
      <button class="fx-pagination__nav" :disabled="page >= pageCount" aria-label="Вперёд" @click="go(page + 1)">
        <FxIcon name="chevron-right" :size="16" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.fx-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.75rem 0.875rem;
  border-top: 1px solid var(--fx-border);
}
.fx-pagination__info { font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-pagination__pages { display: flex; align-items: center; gap: 0.25rem; }
.fx-pagination__page,
.fx-pagination__nav {
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid transparent;
  border-radius: var(--fx-radius-sm);
  font: inherit;
  font-size: 0.875rem;
  color: var(--fx-text-muted);
  cursor: pointer;
}
.fx-pagination__page:hover,
.fx-pagination__nav:hover:not(:disabled) { background: var(--fx-surface-muted); color: var(--fx-text); }
.fx-pagination__page--active {
  background: var(--fx-primary-soft);
  border-color: currentColor;
  color: var(--fx-primary);
  font-weight: 600;
}
.fx-pagination__nav:disabled { opacity: 0.4; cursor: not-allowed; }
.fx-pagination__gap { padding: 0 0.25rem; color: var(--fx-text-faint); }
</style>
