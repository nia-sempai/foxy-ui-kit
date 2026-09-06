<script setup>
/**
 * FxIcon — единственная точка входа для иконок кита.
 *
 * Оборачивает Lucide (https://lucide.dev, ISC). Компоненты и приложения
 * ссылаются на иконку по *семантическому* имени ("auction", "supplier"), а не
 * по форме, поэтому набор можно заменить в одном месте — см. icon-registry.js.
 *
 * Использование: <FxIcon name="auction" :size="16" />
 */
import { computed } from 'vue'
import { iconRegistry } from './icon-registry.js'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 18 },
  strokeWidth: { type: [Number, String], default: 2 },
  spin: { type: Boolean, default: false },
})

const component = computed(() => {
  const c = iconRegistry[props.name]
  if (!c && import.meta.env?.DEV) {
    console.warn(`[FxIcon] неизвестная иконка "${props.name}" — добавьте её в icon-registry.js`)
  }
  return c || null
})
</script>

<template>
  <component
    :is="component"
    v-if="component"
    class="fx-icon"
    :class="{ 'fx-icon--spin': spin }"
    :size="Number(size)"
    :stroke-width="Number(strokeWidth)"
    aria-hidden="true"
  />
</template>

<style scoped>
.fx-icon { display: inline-block; vertical-align: -0.15em; flex-shrink: 0; }
.fx-icon--spin { animation: fx-icon-spin 1s linear infinite; }
@keyframes fx-icon-spin { to { transform: rotate(360deg); } }
</style>
