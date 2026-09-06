<script setup>
/**
 * FxAlert — информационная плашка: подсказка, предупреждение, сообщение об
 * ошибке.
 *
 *   tone — 'info' | 'success' | 'warning' | 'danger'
 */
import { computed } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  tone: { type: String, default: 'info' },
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  closable: { type: Boolean, default: false },
})

defineEmits(['close'])

const defaultIcons = { info: 'info', success: 'check-badge', warning: 'alert', danger: 'reject' }
const iconName = computed(() => props.icon || defaultIcons[props.tone] || 'info')
</script>

<template>
  <div class="fx-alert" :class="`fx-alert--${tone}`" role="status">
    <FxIcon :name="iconName" :size="18" class="fx-alert__icon" />
    <div class="fx-alert__body">
      <p v-if="title" class="fx-alert__title">{{ title }}</p>
      <div v-if="$slots.default" class="fx-alert__text"><slot /></div>
    </div>
    <button v-if="closable" class="fx-alert__close" aria-label="Закрыть" @click="$emit('close')">
      <FxIcon name="close" :size="15" />
    </button>
  </div>
</template>

<style scoped>
.fx-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.75rem 0.875rem;
  border: 1px solid transparent;
  border-radius: var(--fx-radius-sm);
  font-size: 0.875rem;
}
.fx-alert__icon { margin-top: 0.1rem; flex: none; }
.fx-alert__body { flex: 1; min-width: 0; }
.fx-alert__title { font-weight: 600; }
.fx-alert__title + .fx-alert__text { margin-top: 0.15rem; }
.fx-alert__close {
  background: none;
  border: none;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  padding: 0;
  flex: none;
}
.fx-alert__close:hover { opacity: 1; }
.fx-alert--info { background: var(--fx-primary-soft); border-color: #bfdbfe; color: #1e40af; }
.fx-alert--success { background: var(--fx-success-soft); border-color: #a7f3d0; color: #065f46; }
.fx-alert--warning { background: var(--fx-warning-soft); border-color: #fde68a; color: #92400e; }
.fx-alert--danger { background: var(--fx-danger-soft); border-color: #fecaca; color: #991b1b; }
</style>
