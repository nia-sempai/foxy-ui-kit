<script setup>
/**
 * FxModal — модальное окно на @zag-js/dialog: фокус-трап, блокировка скролла,
 * закрытие по Esc и возврат фокуса. Открытие управляется v-model.
 *
 * Клик по фону по умолчанию не закрывает окно: случайный клик мимо формы не
 * должен терять введённое. Включается пропом `close-on-outside`.
 *
 *   <FxModal v-model="open" title="Новый документ" size="md">
 *     <form @submit.prevent="save">…</form>
 *     <template #footer><FxButton variant="primary" @click="save">Сохранить</FxButton></template>
 *   </FxModal>
 */
import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, useId } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg
  closable: { type: Boolean, default: true },
  closeOnOutside: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'close'])

const service = useMachine(dialog.machine, {
  id: useId(),
  get open() {
    return props.modelValue
  },
  get closeOnInteractOutside() {
    return props.closeOnOutside && props.closable
  },
  get closeOnEscape() {
    return props.closable
  },
  onOpenChange({ open }) {
    emit('update:modelValue', open)
    if (!open) emit('close')
  },
})

const api = computed(() => dialog.connect(service, normalizeProps))
</script>

<template>
  <Teleport to="body">
    <template v-if="api.open">
      <div class="fx-modal__backdrop" v-bind="api.getBackdropProps()" />
      <div class="fx-modal__positioner" v-bind="api.getPositionerProps()">
        <div class="fx-modal__panel" :class="`fx-modal__panel--${size}`" v-bind="api.getContentProps()">
          <header v-if="title || $slots.header" class="fx-modal__header">
            <div class="fx-modal__heading">
              <slot name="header">
                <h2 class="fx-modal__title" v-bind="api.getTitleProps()">{{ title }}</h2>
                <p v-if="subtitle" class="fx-modal__subtitle" v-bind="api.getDescriptionProps()">{{ subtitle }}</p>
              </slot>
            </div>
            <button v-if="closable" class="fx-modal__close" aria-label="Закрыть" v-bind="api.getCloseTriggerProps()">
              <FxIcon name="close" :size="18" />
            </button>
          </header>
          <div class="fx-modal__body"><slot /></div>
          <footer v-if="$slots.footer" class="fx-modal__footer"><slot name="footer" /></footer>
        </div>
      </div>
    </template>
  </Teleport>
</template>

<style scoped>
.fx-modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: var(--fx-overlay);
  backdrop-filter: blur(2px);
}
.fx-modal__positioner {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.fx-modal__panel {
  width: min(92vw, var(--fx-modal-w, 34rem));
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  background: var(--fx-surface);
  border-radius: var(--fx-radius-lg);
  box-shadow: var(--fx-shadow-lg);
  overflow: hidden;
  outline: none;
}
.fx-modal__panel--sm { --fx-modal-w: 24rem; }
.fx-modal__panel--md { --fx-modal-w: 34rem; }
.fx-modal__panel--lg { --fx-modal-w: 52rem; }
.fx-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.125rem 1.25rem;
  border-bottom: 1px solid var(--fx-border);
}
.fx-modal__title { font-size: 1.0625rem; font-weight: 600; }
.fx-modal__subtitle { margin-top: 0.15rem; font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-modal__close {
  background: none;
  border: none;
  color: var(--fx-text-muted);
  cursor: pointer;
  padding: 0.15rem;
  border-radius: var(--fx-radius-sm);
  flex: none;
}
.fx-modal__close:hover { background: var(--fx-surface-muted); color: var(--fx-text); }
.fx-modal__body { padding: 1.25rem; overflow-y: auto; }
.fx-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-top: 1px solid var(--fx-border);
  background: var(--fx-surface-muted);
}
</style>
