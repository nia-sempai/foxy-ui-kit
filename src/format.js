/**
 * Форматтеры для интерфейса.
 *
 * Небольшой набор общих утилит: числа, деньги, даты, размеры файлов,
 * склонение. Живут в ките, потому что одни и те же значения показываются на
 * десятках экранов и должны выглядеть одинаково. Все функции чистые и не
 * зависят от Vue.
 *
 * Локаль по умолчанию — ru-RU; переопределяется параметром `locale`.
 */

const DEFAULT_LOCALE = 'ru-RU'

/** Денежная сумма: formatMoney(1234567) → «1 234 567 ₽» */
export function formatMoney(value, { fraction = false, currency = 'RUB', compact = false, locale = DEFAULT_LOCALE } = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fraction ? 2 : 0,
    maximumFractionDigits: fraction ? 2 : 0,
    notation: compact ? 'compact' : 'standard',
  }).format(n)
}

/** Число с разделителями разрядов. */
export function formatNumber(value, { digits = 0, compact = false, locale = DEFAULT_LOCALE } = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    notation: compact ? 'compact' : 'standard',
  }).format(n)
}

/** Процент: formatPercent(0.125) → «12,5 %» */
export function formatPercent(value, { digits = 1, locale = DEFAULT_LOCALE } = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n)
}

/** Дата: «05.09.2026» */
export function formatDate(value, { locale = DEFAULT_LOCALE, style = 'short' } = {}) {
  if (!value) return '—'
  return new Intl.DateTimeFormat(locale, { dateStyle: style }).format(new Date(value))
}

/** Дата и время: «05.09.2026, 14:30» */
export function formatDateTime(value, { locale = DEFAULT_LOCALE } = {}) {
  if (!value) return '—'
  return new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value))
}

/** Относительное время: «через 3 дня», «2 часа назад». */
export function formatRelative(value, { locale = DEFAULT_LOCALE } = {}) {
  if (!value) return '—'
  const diff = new Date(value).getTime() - Date.now()
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const units = [
    ['year', 31536000000],
    ['month', 2592000000],
    ['day', 86400000],
    ['hour', 3600000],
    ['minute', 60000],
    ['second', 1000],
  ]
  for (const [unit, ms] of units) {
    if (Math.abs(diff) >= ms || unit === 'second') return rtf.format(Math.round(diff / ms), unit)
  }
  return ''
}

/** Длительность в секундах → «02:45:10» или «3 д 04:12:00». */
export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.floor(Number(totalSeconds) || 0))
  const pad = (n) => String(n).padStart(2, '0')
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return d > 0 ? `${d} д ${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(h)}:${pad(m)}:${pad(sec)}`
}

/** Размер файла: formatBytes(482301) → «471 КБ» */
export function formatBytes(bytes, { units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'] } = {}) {
  const b = Number(bytes)
  if (!Number.isFinite(b) || b <= 0) return '—'
  let n = b
  let u = 0
  while (n >= 1024 && u < units.length - 1) {
    n /= 1024
    u++
  }
  return `${n.toFixed(u === 0 ? 0 : 1).replace('.', ',')} ${units[u]}`
}

/** Обрезка строки по длине с многоточием. */
export function truncate(text, max = 80) {
  const s = String(text ?? '')
  return s.length > max ? `${s.slice(0, max - 1)}…` : s
}

/** Инициалы из имени: «Иванов Иван» → «ИИ» */
export function initials(name, count = 2) {
  return String(name ?? '')
    .replace(/["«»]/g, '')
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, count)
    .map((w) => w[0].toUpperCase())
    .join('')
}

/**
 * Склонение по числу: plural(3, ['файл', 'файла', 'файлов']) → «файла».
 * Формы: [одна, две-четыре, много].
 */
export function plural(count, forms) {
  const n = Math.abs(Number(count)) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) return forms[2]
  if (n1 > 1 && n1 < 5) return forms[1]
  if (n1 === 1) return forms[0]
  return forms[2]
}

/** Число вместе со склонённым словом: «3 файла». */
export function pluralize(count, forms, { locale = DEFAULT_LOCALE } = {}) {
  return `${formatNumber(count, { locale })} ${plural(count, forms)}`
}
