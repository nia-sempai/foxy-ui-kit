<script setup>
/**
 * FxPagination — постраничная навигация на @zag-js/pagination.
 *
 * Контролируемая: компонент не хранит состояние, а сообщает нужную страницу
 * через update:page. Диапазон страниц сворачивается многоточиями, чтобы ширина
 * не зависела от объёма выборки.
 *
 *   <FxPagination v-model:page="page" :page-size="20" :total="total" />
 */
import * as pagination from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, useId } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 20 },
  total: { type: Number, default: 0 },
  siblings: { type: Number, default: 1 },
  showInfo: { type: Boolean, default: true },
})

const emit = defineEmits(['update:page'])

const service = useMachine(pagination.machine, {
  id: useId(),
  translations: {
    rootLabel: 'Постраничная навигация',
    prevTriggerLabel: 'Назад',
    nextTriggerLabel: 'Вперёд',
    itemLabel: ({ page }) => `Страница ${page}`,
  },
  get count() {
    return props.total
  },
  get pageSize() {
    return props.pageSize || 1
  },
  get siblingCount() {
    return props.siblings
  },
  get page() {
    return props.page
  },
  onPageChange({ page }) {
    if (page !== props.page) emit('update:page', page)
  },
})

const api = computed(() => pagination.connect(service, normalizeProps))

const rangeFrom = computed(() => (props.total ? api.value.pageRange.start + 1 : 0))
const rangeTo = computed(() => api.value.pageRange.end)
</script>

<template>
  <nav class="fx-pagination" v-bind="api.getRootProps()">
    <span v-if="showInfo" class="fx-pagination__info">{{ rangeFrom }}–{{ rangeTo }} из {{ total }}</span>
    <div class="fx-pagination__pages">
      <button class="fx-pagination__nav" v-bind="api.getPrevTriggerProps()">
        <FxIcon name="chevron-left" :size="16" />
      </button>
      <template v-for="(item, i) in api.pages" :key="item.type === 'page' ? item.value : `ellipsis-${i}`">
        <span v-if="item.type === 'ellipsis'" class="fx-pagination__gap" v-bind="api.getEllipsisProps({ index: i })">…</span>
        <button v-else class="fx-pagination__page" v-bind="api.getItemProps(item)">{{ item.value }}</button>
      </template>
      <button class="fx-pagination__nav" v-bind="api.getNextTriggerProps()">
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
.fx-pagination__pages { display: flex; align-items: center; gap: 0.25rem; margin-left: auto; }
.fx-pagination__page,
.fx-pagination__nav {
  min-width: var(--fx-control-h-sm);
  height: var(--fx-control-h-sm);
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
.fx-pagination__page[data-selected] {
  background: var(--fx-primary-soft);
  border-color: currentColor;
  color: var(--fx-primary);
  font-weight: 600;
}
.fx-pagination__nav:disabled { opacity: 0.4; cursor: not-allowed; }
.fx-pagination__gap { padding: 0 0.25rem; color: var(--fx-text-faint); }
</style>
