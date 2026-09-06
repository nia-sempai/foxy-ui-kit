/**
 * Всплывающие уведомления.
 *
 * Очередь живёт в модуле, а не в компоненте: любой сторе или обработчику
 * достаточно импортировать useToast(), не пробрасывая ссылку на <FxToast>.
 * Сам контейнер монтируется один раз в корне приложения.
 */
import { ref } from 'vue'

export const toasts = ref([])

let nextId = 1

export function dismissToast(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

export function pushToast({ title = '', text = '', tone = 'info', timeout = 4000 } = {}) {
  const id = nextId++
  toasts.value = [...toasts.value, { id, title, text, tone }]
  if (timeout) setTimeout(() => dismissToast(id), timeout)
  return id
}

export function useToast() {
  return {
    toast: pushToast,
    success: (title, text) => pushToast({ title, text, tone: 'success' }),
    info: (title, text) => pushToast({ title, text, tone: 'info' }),
    warning: (title, text) => pushToast({ title, text, tone: 'warning' }),
    error: (title, text) => pushToast({ title, text, tone: 'danger' }),
    dismiss: dismissToast,
  }
}
