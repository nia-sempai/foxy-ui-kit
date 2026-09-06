<script setup>
/**
 * FxToast — контейнер всплывающих уведомлений.
 *
 * Ставится один раз в корне приложения; сообщения добавляются через
 * composable useToast() — так вызывающему коду не нужен доступ к компоненту.
 */
import FxIcon from './FxIcon.vue'
import { toasts, dismissToast } from '../composables/useToast.js'

const icons = { info: 'info', success: 'check-badge', warning: 'alert', danger: 'reject' }
</script>

<template>
  <Teleport to="body">
    <div class="fx-toasts" role="region" aria-live="polite">
      <TransitionGroup name="fx-toast">
        <div v-for="t in toasts" :key="t.id" class="fx-toast" :class="`fx-toast--${t.tone}`">
          <FxIcon :name="icons[t.tone] || 'info'" :size="18" class="fx-toast__icon" />
          <div class="fx-toast__body">
            <p v-if="t.title" class="fx-toast__title">{{ t.title }}</p>
            <p v-if="t.text" class="fx-toast__text">{{ t.text }}</p>
          </div>
          <button class="fx-toast__close" aria-label="Закрыть" @click="dismissToast(t.id)">
            <FxIcon name="close" :size="14" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.fx-toasts {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}
.fx-toast {
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
  pointer-events: auto;
}
.fx-toast--success { border-left-color: var(--fx-success); }
.fx-toast--warning { border-left-color: #f59e0b; }
.fx-toast--danger { border-left-color: var(--fx-danger); }
.fx-toast__icon { margin-top: 0.1rem; color: var(--fx-text-muted); flex: none; }
.fx-toast--success .fx-toast__icon { color: var(--fx-success); }
.fx-toast--warning .fx-toast__icon { color: #b45309; }
.fx-toast--danger .fx-toast__icon { color: var(--fx-danger); }
.fx-toast__body { flex: 1; min-width: 0; }
.fx-toast__title { font-size: 0.9375rem; font-weight: 600; }
.fx-toast__text { font-size: 0.8125rem; color: var(--fx-text-muted); }
.fx-toast__close { background: none; border: none; color: var(--fx-text-faint); cursor: pointer; padding: 0; flex: none; }
.fx-toast__close:hover { color: var(--fx-text); }

.fx-toast-enter-active, .fx-toast-leave-active { transition: all 0.2s ease; }
.fx-toast-enter-from, .fx-toast-leave-to { opacity: 0; transform: translateX(1rem); }
</style>
