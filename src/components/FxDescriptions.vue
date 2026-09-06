<script setup>
/**
 * FxDescriptions — список «поле → значение» для карточек организации, закупки,
 * договора. Значение можно переопределить слотом `#value-<key>`.
 *
 *   items: [{ key, label, value? }]
 */
defineProps({
  items: { type: Array, default: () => [] },
  columns: { type: Number, default: 2 },
})
</script>

<template>
  <dl class="fx-desc" :style="{ '--fx-desc-cols': columns }">
    <div v-for="item in items" :key="item.key" class="fx-desc__row" :class="{ 'fx-desc__row--wide': item.wide }">
      <dt class="fx-desc__label">{{ item.label }}</dt>
      <dd class="fx-desc__value">
        <slot :name="`value-${item.key}`" :item="item">{{ item.value ?? '—' }}</slot>
      </dd>
    </div>
  </dl>
</template>

<style scoped>
.fx-desc {
  display: grid;
  grid-template-columns: repeat(var(--fx-desc-cols, 2), minmax(0, 1fr));
  gap: 0.875rem 1.5rem;
  margin: 0;
}
.fx-desc__row { min-width: 0; }
.fx-desc__row--wide { grid-column: 1 / -1; }
.fx-desc__label { font-size: 0.75rem; color: var(--fx-text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.fx-desc__value { margin: 0.2rem 0 0; font-size: 0.9375rem; overflow-wrap: anywhere; }

@media (max-width: 720px) {
  .fx-desc { grid-template-columns: 1fr; }
}
</style>
