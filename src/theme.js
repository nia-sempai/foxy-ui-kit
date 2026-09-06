/**
 * Темы оформления.
 *
 * Кит намеренно не привязан к одному фирменному стилю: под каждый проект
 * меняется палитра, скругления и плотность, а разметка и поведение компонентов
 * остаются теми же. Тема — это набор значений для CSS-переменных `--fx-*`,
 * который применяется к любому элементу-контейнеру (обычно к :root).
 *
 *   import { applyTheme, themes } from 'foxy-ui-kit'
 *   applyTheme('slate')                       // готовый пресет
 *   applyTheme({ preset: 'ocean', radius: 'sharp', density: 'compact' })
 *   applyTheme({ accent: '#7c3aed' })         // свой акцент поверх базовой темы
 *
 * Всё, что не задано, наследуется из tokens.css, поэтому частичная тема —
 * законная и самая частая форма настройки.
 */

/**
 * Пресеты акцента и нейтралей.
 *
 * Нейтрали задаются отдельно от акцента: одинаковый синий на холодном и на
 * тёплом сером выглядит как два разных бренда, и подбирать их порознь удобнее,
 * чем держать десяток почти одинаковых палитр.
 */
export const presets = {
  // Базовый: холодный нейтральный фон, деловой синий. Подходит «по умолчанию».
  default: {
    label: 'Default',
    accent: '#2563eb',
    accentHover: '#1d4ed8',
    accentSoft: '#eff6ff',
    neutral: 'cool',
  },
  // Спокойный графитовый акцент: отчёты, админки, внутренние инструменты.
  slate: {
    label: 'Slate',
    accent: '#475569',
    accentHover: '#334155',
    accentSoft: '#f1f5f9',
    neutral: 'cool',
  },
  // Бирюзово-синий: финтех и дашборды, где много графиков.
  ocean: {
    label: 'Ocean',
    accent: '#0891b2',
    accentHover: '#0e7490',
    accentSoft: '#ecfeff',
    neutral: 'cool',
  },
  // Зелёный: сервисы про рост, здоровье, устойчивость.
  forest: {
    label: 'Forest',
    accent: '#059669',
    accentHover: '#047857',
    accentSoft: '#ecfdf5',
    neutral: 'warm',
  },
  // Фиолетовый: продуктовые и креативные интерфейсы.
  violet: {
    label: 'Violet',
    accent: '#7c3aed',
    accentHover: '#6d28d9',
    accentSoft: '#f5f3ff',
    neutral: 'cool',
  },
  // Тёплый оранжевый: маркетплейсы, потребительские сервисы.
  amber: {
    label: 'Amber',
    accent: '#d97706',
    accentHover: '#b45309',
    accentSoft: '#fffbeb',
    neutral: 'warm',
  },
  // Красно-розовый: медиа, события, всё, что должно быть заметным.
  rose: {
    label: 'Rose',
    accent: '#e11d48',
    accentHover: '#be123c',
    accentSoft: '#fff1f2',
    neutral: 'warm',
  },
  // Почти чёрный акцент: минималистичные редакторские интерфейсы.
  mono: {
    label: 'Mono',
    accent: '#18181b',
    accentHover: '#000000',
    accentSoft: '#f4f4f5',
    neutral: 'plain',
  },
}

/** Нейтральные шкалы: фон, поверхности, границы, текст. */
export const neutrals = {
  cool: {
    bg: '#f6f8fb',
    surface: '#ffffff',
    surfaceMuted: '#f8fafc',
    border: '#e4e9f0',
    borderStrong: '#cbd5e1',
    text: '#172033',
    textMuted: '#64748b',
    textFaint: '#94a3b8',
  },
  warm: {
    bg: '#faf9f7',
    surface: '#ffffff',
    surfaceMuted: '#f7f5f2',
    border: '#ebe7e1',
    borderStrong: '#d6cfc5',
    text: '#26211c',
    textMuted: '#6f665c',
    textFaint: '#a39a8f',
  },
  plain: {
    bg: '#fafafa',
    surface: '#ffffff',
    surfaceMuted: '#f4f4f5',
    border: '#e7e7e9',
    borderStrong: '#d0d0d4',
    text: '#18181b',
    textMuted: '#6b7280',
    textFaint: '#a1a1aa',
  },
}

/** Скругления: от строгих прямых углов до подчёркнуто мягких. */
export const radiusScales = {
  sharp: { sm: '2px', md: '3px', lg: '5px' },
  subtle: { sm: '4px', md: '5px', lg: '8px' },
  default: { sm: '6px', md: '8px', lg: '14px' },
  soft: { sm: '9px', md: '12px', lg: '20px' },
  pill: { sm: '12px', md: '16px', lg: '28px' },
}

/** Плотность: высота контролов и базовый шаг. */
export const densities = {
  compact: { controlH: '2.125rem', controlHSm: '1.75rem', gap: '0.375rem' },
  default: { controlH: '2.5rem', controlHSm: '2rem', gap: '0.5rem' },
  comfortable: { controlH: '2.875rem', controlHSm: '2.25rem', gap: '0.625rem' },
}

/** Тени: от плоского интерфейса до выраженной глубины. */
export const elevations = {
  flat: {
    sm: 'none',
    md: '0 1px 2px rgba(15, 23, 42, 0.06)',
    lg: '0 6px 20px rgba(15, 23, 42, 0.10)',
  },
  default: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.05)',
    md: '0 4px 16px rgba(15, 23, 42, 0.08)',
    lg: '0 18px 44px rgba(15, 23, 42, 0.14)',
  },
  lifted: {
    sm: '0 1px 3px rgba(15, 23, 42, 0.08)',
    md: '0 8px 24px rgba(15, 23, 42, 0.12)',
    lg: '0 24px 60px rgba(15, 23, 42, 0.20)',
  },
}

/** Шрифтовые пары. */
export const fontStacks = {
  system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  grotesk: "'Inter', 'Segoe UI', system-ui, sans-serif",
  serif: "'Georgia', 'Times New Roman', serif",
  mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
}

/**
 * Собирает карту CSS-переменных для темы.
 *
 * Возвращает простой объект, а не строку стилей: его одинаково удобно
 * применить через element.style.setProperty и отрендерить в <style> при SSR.
 */
export function buildTheme(theme = {}) {
  const spec = typeof theme === 'string' ? { preset: theme } : theme
  const preset = presets[spec.preset] ?? presets.default
  const neutral = neutrals[spec.neutral ?? preset.neutral] ?? neutrals.cool
  const radius = radiusScales[spec.radius] ?? radiusScales.default
  const density = densities[spec.density] ?? densities.default
  const elevation = elevations[spec.elevation] ?? elevations.default
  const font = fontStacks[spec.font] ?? spec.font ?? fontStacks.system

  const accent = spec.accent ?? preset.accent
  const accentHover = spec.accentHover ?? (spec.accent ? shade(accent, -0.12) : preset.accentHover)
  const accentSoft = spec.accentSoft ?? (spec.accent ? tint(accent, 0.92) : preset.accentSoft)

  return {
    '--fx-primary': accent,
    '--fx-primary-hover': accentHover,
    '--fx-primary-soft': accentSoft,

    '--fx-bg': spec.bg ?? neutral.bg,
    '--fx-surface': spec.surface ?? neutral.surface,
    '--fx-surface-muted': neutral.surfaceMuted,
    '--fx-border': neutral.border,
    '--fx-border-strong': neutral.borderStrong,
    '--fx-text': neutral.text,
    '--fx-text-muted': neutral.textMuted,
    '--fx-text-faint': neutral.textFaint,

    '--fx-radius-sm': radius.sm,
    '--fx-radius': radius.md,
    '--fx-radius-lg': radius.lg,

    '--fx-control-h': density.controlH,
    '--fx-control-h-sm': density.controlHSm,
    '--fx-gap': density.gap,

    '--fx-shadow-sm': elevation.sm,
    '--fx-shadow-md': elevation.md,
    '--fx-shadow-lg': elevation.lg,

    '--fx-font': font,
  }
}

/**
 * Применяет тему к элементу (по умолчанию к :root).
 *
 * Возвращает функцию отката — удобно для витрин и предпросмотра, где тема
 * временная.
 */
export function applyTheme(theme = {}, target = null) {
  const el = target ?? (typeof document !== 'undefined' ? document.documentElement : null)
  if (!el) return () => {}

  const vars = buildTheme(theme)
  const previous = {}
  for (const [key, value] of Object.entries(vars)) {
    previous[key] = el.style.getPropertyValue(key)
    el.style.setProperty(key, value)
  }

  return () => {
    for (const [key, value] of Object.entries(previous)) {
      if (value) el.style.setProperty(key, value)
      else el.style.removeProperty(key)
    }
  }
}

/** Тема как строка для атрибута style или тега <style>. */
export function themeToCss(theme = {}, selector = ':root') {
  const body = Object.entries(buildTheme(theme))
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')
  return `${selector} {\n${body}\n}`
}

/** Список готовых тем для переключателей в интерфейсе. */
export const themes = Object.entries(presets).map(([value, p]) => ({
  value,
  label: p.label,
  accent: p.accent,
}))

// --- вспомогательное: смешивание цвета с чёрным/белым ---

function parseHex(hex) {
  const s = hex.replace('#', '')
  const full = s.length === 3 ? s.split('').map((c) => c + c).join('') : s
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
}

function toHex(rgb) {
  return `#${rgb.map((c) => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, '0')).join('')}`
}

/** Затемняет (amount < 0) или осветляет (amount > 0) цвет. */
function shade(hex, amount) {
  const rgb = parseHex(hex)
  const target = amount < 0 ? 0 : 255
  return toHex(rgb.map((c) => c + (target - c) * Math.abs(amount)))
}

/** Смешивает цвет с белым: 0 — исходный, 1 — белый. */
function tint(hex, amount) {
  return shade(hex, amount)
}
