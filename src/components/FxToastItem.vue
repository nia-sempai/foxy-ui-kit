<script setup>
/**
 * FxToastItem — одно уведомление внутри FxToast. Внутренний компонент: машина
 * тоста получает родительский сервис группы и свой индекс в стопке.
 */
import * as toast from '@zag-js/toast'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  actor: { type: Object, required: true },
  index: { type: Number, required: true },
  parent: { type: Object, required: true },
})

const machineProps = computed(() => ({ ...props.actor, parent: props.parent, index: props.index }))

const service = useMachine(toast.machine, machineProps)
const api = computed(() => toast.connect(service, normalizeProps))

const icons = { info: 'info', success: 'check-badge', warning: 'alert', error: 'reject', loading: 'spinner' }
</script>

<template>
  <div class="fx-toast" v-bind="api.getRootProps()">
    <span v-bind="api.getGhostBeforeProps()" />
    <FxIcon :name="icons[api.type] || 'info'" :size="18" class="fx-toast__icon" :spin="api.type === 'loading'" />
    <div class="fx-toast__body">
      <p v-if="api.title" class="fx-toast__title" v-bind="api.getTitleProps()">{{ api.title }}</p>
      <p v-if="api.description" class="fx-toast__text" v-bind="api.getDescriptionProps()">{{ api.description }}</p>
    </div>
    <button v-if="api.closable" class="fx-toast__close" aria-label="Закрыть" v-bind="api.getCloseTriggerProps()">
      <FxIcon name="close" :size="14" />
    </button>
    <span v-bind="api.getGhostAfterProps()" />
  </div>
</template>

<style scoped>
.fx-toast {
  /* Координаты и прозрачность приходят от машины в CSS-переменных; здесь они
     только отображаются на свойства, чтобы стопка анимировалась плавно. */
  translate: var(--x) var(--y);
  scale: var(--scale, 1);
  opacity: var(--opacity);
  height: var(--height, auto);
  z-index: var(--z-index);
  will-change: translate, opacity, scale;
  transition:
    translate 400ms cubic-bezier(0.21, 1.02, 0.73, 1),
    scale 400ms,
    opacity 400ms,
    height 400ms;
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  width: min(24rem, calc(100vw - 2rem));
  padding: 0.75rem 0.875rem;
  background: var(--fx-surface);
  border: 1px solid var(--fx-border);
  border-left: 3px solid var(--fx-primary);
  border-radius: var(--fx-radius-sm);
  box-shadow: var(--fx-shadow-md);
  color: var(--fx-text);
}
.fx-toast[data-type='success'] { border-left-color: var(--fx-success); }
.fx-toast[data-type='warning'] { border-left-color: var(--fx-warning); }
.fx-toast[data-type='error'] { border-left-color: var(--fx-danger); }
.fx-toast__icon { margin-top: 0.1rem; color: var(--fx-text-muted); flex: none; }
.fx-toast[data-type='success'] .fx-toast__icon { color: var(--fx-success); }
.fx-toast[data-type='warning'] .fx-toast__icon { color: var(--fx-warning-strong); }
.fx-toast[data-type='error'] .fx-toast__icon { color: var(--fx-danger); }
.fx-toast__body { flex: 1; min-width: 0; }
.fx-toast__title { font-size: 0.9375rem; font-weight: 600; }
.fx-toast__text { font-size: 0.8125rem; color: var(--fx-text-muted); white-space: pre-line; overflow-wrap: break-word; }
.fx-toast__close {
  background: none;
  border: none;
  color: var(--fx-text-faint);
  cursor: pointer;
  padding: 0;
  flex: none;
}
.fx-toast__close:hover { color: var(--fx-text); }
</style>
