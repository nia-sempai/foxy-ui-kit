<script setup>
/**
 * FxFilterBar — панель поиска и фильтров над списком.
 *
 * Слоты: #search (обычно FxInput), по умолчанию — сами фильтры, #actions —
 * кнопки справа. Ниже показываются активные фильтры чипами со сбросом: без
 * этого пользователь теряет из виду, почему список пуст.
 *
 *   active: [{ key, label }]
 */
import FxIcon from './FxIcon.vue'

defineProps({
  active: { type: Array, default: () => [] },
})

defineEmits(['remove', 'reset'])
</script>

<template>
  <div class="fx-filterbar">
    <div class="fx-filterbar__row">
      <div v-if="$slots.search" class="fx-filterbar__search"><slot name="search" /></div>
      <div class="fx-filterbar__fields"><slot /></div>
      <div v-if="$slots.actions" class="fx-filterbar__actions"><slot name="actions" /></div>
    </div>
    <div v-if="active.length" class="fx-filterbar__chips">
      <span v-for="chip in active" :key="chip.key" class="fx-filterbar__chip">
        {{ chip.label }}
        <button class="fx-filterbar__chip-x" aria-label="Убрать фильтр" @click="$emit('remove', chip)">
          <FxIcon name="close" :size="12" />
        </button>
      </span>
      <button class="fx-filterbar__reset" @click="$emit('reset')">Сбросить всё</button>
    </div>
  </div>
</template>

<style scoped>
.fx-filterbar {
  background: var(--fx-surface);
  border: 1px solid var(--fx-border);
  border-radius: var(--fx-radius);
  box-shadow: var(--fx-shadow-sm);
  padding: 0.875rem 1rem;
}
.fx-filterbar__row { display: flex; align-items: flex-end; gap: 0.75rem; flex-wrap: wrap; }
.fx-filterbar__search { flex: 1 1 20rem; min-width: 14rem; }
.fx-filterbar__fields { display: flex; align-items: flex-end; gap: 0.75rem; flex-wrap: wrap; }
.fx-filterbar__actions { display: flex; align-items: center; gap: 0.5rem; margin-left: auto; }
.fx-filterbar__chips {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--fx-border);
}
.fx-filterbar__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0.3rem 0.15rem 0.55rem;
  background: var(--fx-primary-soft);
  color: #1d4ed8;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}
.fx-filterbar__chip-x {
  display: inline-flex;
  background: none;
  border: none;
  color: inherit;
  opacity: 0.65;
  cursor: pointer;
  padding: 0.1rem;
}
.fx-filterbar__chip-x:hover { opacity: 1; }
.fx-filterbar__reset {
  background: none;
  border: none;
  font: inherit;
  font-size: 0.75rem;
  color: var(--fx-text-muted);
  cursor: pointer;
  text-decoration: underline;
}
.fx-filterbar__reset:hover { color: var(--fx-text); }
</style>
