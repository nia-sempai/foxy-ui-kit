<script setup>
/**
 * FxTable — таблица данных с сортировкой, пустым состоянием и пагинацией.
 *
 * Колонки описываются спецификацией, ячейки по умолчанию берут row[col.key];
 * любую можно переопределить слотом `#cell-<key>`. Пагинация контролируемая
 * (серверная): передайте total + pageSize и v-model:page.
 *
 *   columns: [{ key, label, width?, align?, nowrap?, sortable?, actions? }]
 *
 *   <FxTable :columns="cols" :rows="rows" v-model:page="page"
 *            :page-size="20" :total="total" clickable @row-click="open">
 *     <template #cell-status="{ row }"><FxBadge>{{ row.status }}</FxBadge></template>
 *   </FxTable>
 */
import { computed } from 'vue'
import FxIcon from './FxIcon.vue'
import FxPagination from './FxPagination.vue'

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  rowKey: { type: [String, Function], default: 'id' },
  loading: { type: Boolean, default: false },
  emptyText: { type: String, default: 'Ничего не найдено' },
  clickable: { type: Boolean, default: false },
  dense: { type: Boolean, default: false },
  sortKey: { type: String, default: '' },
  sortDir: { type: String, default: 'asc' }, // asc | desc
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
})

const emit = defineEmits(['update:page', 'update:sortKey', 'update:sortDir', 'row-click'])

function keyOf(row, i) {
  return typeof props.rowKey === 'function' ? props.rowKey(row) : (row[props.rowKey] ?? i)
}

function toggleSort(col) {
  if (!col.sortable) return
  if (props.sortKey === col.key) {
    emit('update:sortDir', props.sortDir === 'asc' ? 'desc' : 'asc')
  } else {
    emit('update:sortKey', col.key)
    emit('update:sortDir', 'asc')
  }
}

const showPagination = computed(() => props.pageSize > 0 && props.total > props.pageSize)
</script>

<template>
  <div class="fx-table" :class="{ 'fx-table--dense': dense }">
    <div class="fx-table__scroll">
      <table class="fx-table__table">
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :style="{ width: col.width, textAlign: col.align || 'left' }"
              :class="{ 'fx-table__th--sortable': col.sortable }"
              @click="toggleSort(col)"
            >
              <span class="fx-table__th-inner">
                {{ col.label }}
                <FxIcon
                  v-if="col.sortable"
                  :name="sortKey === col.key && sortDir === 'desc' ? 'chevron-down' : 'chevron-up'"
                  :size="13"
                  :class="['fx-table__sort', { 'fx-table__sort--active': sortKey === col.key }]"
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="columns.length" class="fx-table__msg">
              <FxIcon name="spinner" :size="18" spin /> Загрузка…
            </td>
          </tr>
          <tr v-else-if="!rows.length">
            <td :colspan="columns.length" class="fx-table__msg">
              <slot name="empty">{{ emptyText }}</slot>
            </td>
          </tr>
          <tr
            v-for="(row, i) in rows"
            v-else
            :key="keyOf(row, i)"
            :class="{ 'fx-table__row--clickable': clickable }"
            @click="clickable && emit('row-click', row)"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :style="{ textAlign: col.align || 'left', whiteSpace: col.nowrap ? 'nowrap' : null }"
            >
              <div v-if="col.actions" class="fx-table__actions" @click.stop>
                <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="i" />
              </div>
              <slot v-else :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="i">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <FxPagination
      v-if="showPagination"
      :page="page"
      :page-size="pageSize"
      :total="total"
      @update:page="emit('update:page', $event)"
    />
  </div>
</template>

<style scoped>
.fx-table__scroll { overflow-x: auto; }
.fx-table__table { width: 100%; border-collapse: collapse; font-size: 0.9375rem; }
.fx-table__table th,
.fx-table__table td {
  padding: 0.7rem 0.875rem;
  text-align: left;
  border-bottom: 1px solid var(--fx-border);
  vertical-align: middle;
}
.fx-table--dense .fx-table__table th,
.fx-table--dense .fx-table__table td { padding: 0.45rem 0.75rem; font-size: 0.875rem; }
.fx-table__table th {
  position: sticky;
  top: 0;
  background: var(--fx-surface-muted);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fx-text-muted);
  white-space: nowrap;
}
.fx-table__th-inner { display: inline-flex; align-items: center; gap: 0.25rem; }
.fx-table__th--sortable { cursor: pointer; user-select: none; }
.fx-table__th--sortable:hover { color: var(--fx-text); }
.fx-table__sort { opacity: 0.35; }
.fx-table__sort--active { opacity: 1; color: var(--fx-primary); }
.fx-table__table tbody tr:last-child td { border-bottom: none; }
.fx-table__actions { display: inline-flex; align-items: center; gap: var(--fx-gap); }
.fx-table__row--clickable { cursor: pointer; }
.fx-table__row--clickable:hover { background: var(--fx-primary-soft); }
.fx-table__msg {
  text-align: center;
  color: var(--fx-text-muted);
  padding: 2rem;
}
</style>
