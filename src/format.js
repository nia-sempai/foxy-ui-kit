/**
 * Форматтеры предметной области ЭТП.
 *
 * Живут в ките, потому что суммы, ИНН, даты и сроки показываются на десятках
 * экранов и должны выглядеть одинаково в приложении, в письмах и в печатных
 * формах. Все функции чистые и не зависят от Vue.
 */

/** Денежная сумма в рублях: 1 234 567 ₽ */
export function formatMoney(value, { fraction = false, currency = 'RUB', compact = false } = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: fraction ? 2 : 0,
    maximumFractionDigits: fraction ? 2 : 0,
    notation: compact ? 'compact' : 'standard',
  }).format(n)
}

/** Число с разделителями разрядов. */
export function formatNumber(value, digits = 0) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n)
}

/** Дата: 05.09.2026 */
export function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short' }).format(new Date(value))
}

/** Дата и время: 05.09.2026, 14:30 */
export function formatDateTime(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value))
}

/** Относительный срок: «через 3 дня», «2 часа назад». */
export function formatRelative(value) {
  if (!value) return '—'
  const diff = new Date(value).getTime() - Date.now()
  const rtf = new Intl.RelativeTimeFormat('ru-RU', { numeric: 'auto' })
  const units = [
    ['day', 86400000],
    ['hour', 3600000],
    ['minute', 60000],
    ['second', 1000],
  ]
  for (const [unit, ms] of units) {
    if (Math.abs(diff) >= ms || unit === 'second') {
      return rtf.format(Math.round(diff / ms), unit)
    }
  }
  return ''
}

/**
 * Комиссия площадки: 1% от цены победителя с полом и потолком.
 *
 * Пол и потолок обязательны экономически: без потолка комиссия с крупного лота
 * становится неподъёмной, без пола — не покрывает издержки процедуры.
 */
export function calcFee(price, { rate = 0.01, min = 1000, max = 300000 } = {}) {
  const raw = Number(price) * rate
  const amount = Math.min(max, Math.max(min, raw))
  return {
    rate,
    raw,
    amount,
    capped: raw > max,
    floored: raw < min,
  }
}

/** Маска ИНН/ОГРН для читаемости: 7701 234 567 */
export function formatInn(inn) {
  const s = String(inn ?? '').replace(/\D/g, '')
  if (s.length === 10) return `${s.slice(0, 4)} ${s.slice(4, 7)} ${s.slice(7)}`
  if (s.length === 12) return `${s.slice(0, 4)} ${s.slice(4, 8)} ${s.slice(8)}`
  return s || '—'
}

/** Правильное окончание: 3 заявки, 5 заявок. */
export function plural(count, forms) {
  const n = Math.abs(count) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) return forms[2]
  if (n1 > 1 && n1 < 5) return forms[1]
  if (n1 === 1) return forms[0]
  return forms[2]
}
