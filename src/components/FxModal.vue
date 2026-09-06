<script setup>
/**
 * FxModal — модальное окно на нативном <dialog>.
 *
 * Нативный элемент даёт бесплатно: верхний слой над всей страницей, фокус-трап,
 * закрытие по Esc и ::backdrop. Открытие управляется v-model.
 */
import { ref, watch, onBeforeUnmount } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg
  closable: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'close'])

const dialog = ref(null)

function close() {
  emit('update:modelValue', false)
  emit('close')
}

// Esc и клик по ::backdrop закрывают <dialog> сами — синхронизируем v-model.
function onCancel(e) {
  e.preventDefault()
  if (props.closable) close()
}

watch(
  () => props.modelValue,
  (open) => {
    const el = dialog.value
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  },
  { flush: 'post' },
)

onBeforeUnmount(() => {
  if (dialog.value?.open) dialog.value.close()
})
</script>

<template>
  <dialog
    ref="dialog"
    class="fx-modal"
    :class="`fx-modal--${size}`"
    @cancel="onCancel"
    @click.self="closable && close()"
  >
    <div class="fx-modal__panel">
      <header v-if="title || $slots.header" class="fx-modal__header">
        <div class="fx-modal__heading">
          <slot name="header">
            <h2 class="fx-modal__title">{{ title }}</h2>
            <p v-if="subtitle" class="fx-modal__subtitle">{{ subtitle }}</p>
          </slot>
        </div>
        <button v-if="closable" class="fx-modal__close" aria-label="Закрыть" @click="close">
          <FxIcon name="close" :size="18" />
        </button>
      </header>
      <div class="fx-modal__body"><slot /></div>
      <footer v-if="$slots.footer" class="fx-modal__footer"><slot name="footer" /></footer>
    </div>
  </dialog>
</template>

<style scoped>
.fx-modal {
  padding: 0;
  border: none;
  background: none;
  max-width: 100vw;
  max-height: 100vh;
  overflow: visible;
}
.fx-modal::backdrop { background: rgba(15, 23, 42, 0.35); backdrop-filter: blur(2px); }
.fx-modal__panel {
  width: min(92vw, var(--fx-modal-w, 32rem));
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  background: var(--fx-surface);
  border-radius: var(--fx-radius-lg);
  box-shadow: var(--fx-shadow-lg);
  overflow: hidden;
}
.fx-modal--sm { --fx-modal-w: 24rem; }
.fx-modal--md { --fx-modal-w: 34rem; }
.fx-modal--lg { --fx-modal-w: 52rem; }
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
