# foxy-ui-kit

Светлый UI-kit на Vue 3 со сменными темами оформления.

**Витрина и конструктор темы: <https://nia-sempai.github.io/foxy-ui-kit/>**

32 компонента, 79 иконок, восемь готовых тем и конструктор своей. Разметка и
поведение компонентов одни и те же, а стилистика подбирается под проект: цвет,
нейтрали, скругления, плотность, тени и шрифт задаются CSS-переменными.

## Установка

```bash
yarn add foxy-ui-kit
```

Публикуется в npm по тегу `v*`. Прямая установка из репозитория:

```bash
yarn add foxy-ui-kit@github:nia-sempai/foxy-ui-kit
```

## Использование

Глобально:

```js
import { createApp } from 'vue'
import FoxyUiKit from 'foxy-ui-kit'
import 'foxy-ui-kit/style.css'
import App from './App.vue'

createApp(App).use(FoxyUiKit).mount('#app')
```

Точечно (tree-shaking):

```vue
<script setup>
import { FxButton, FxTable, FxMoney } from 'foxy-ui-kit'
</script>
```

Базовый reset страницы подключается отдельно, чтобы кит не навязывал глобальные
правила приложению:

```js
import 'foxy-ui-kit/src/base.css'
```

## Темы

Тема — это набор значений для переменных `--fx-*`. Меняется в рантайме, без
пересборки стилей.

```js
import { applyTheme } from 'foxy-ui-kit'

applyTheme('violet')                                    // готовый пресет
applyTheme({ preset: 'ocean', radius: 'sharp' })        // пресет с правками
applyTheme({ accent: '#e11d48', density: 'compact' })   // свой акцент
```

| Ось | Значения |
|---|---|
| `preset` | `default`, `slate`, `ocean`, `forest`, `violet`, `amber`, `rose`, `mono` |
| `neutral` | `cool`, `warm`, `plain` |
| `radius` | `sharp`, `subtle`, `default`, `soft`, `pill` |
| `density` | `compact`, `default`, `comfortable` |
| `elevation` | `flat`, `default`, `lifted` |
| `font` | `system`, `grotesk`, `serif`, `mono` или своя строка |

Не заданные оси наследуются из `tokens.css`, поэтому частичная тема — обычный
способ настройки. Для статической темы удобнее сгенерировать CSS один раз:

```js
import { themeToCss } from 'foxy-ui-kit'
themeToCss({ preset: 'forest', radius: 'soft' })  // ':root { --fx-primary: … }'
```

Отдельные переменные всегда можно переопределить руками:

```css
:root {
  --fx-primary: #0f62fe;
  --fx-radius: 10px;
}
```

## Компоненты

| Группа | Компоненты |
|---|---|
| Каркас | `FxShell`, `FxPage`, `FxCard`, `FxTabs`, `FxSegmented` |
| Формы | `FxInput`, `FxTextarea`, `FxSelect`, `FxCheckbox`, `FxRadioGroup`, `FxSwitch`, `FxFileUpload` |
| Действия | `FxButton`, `FxDropdown`, `FxMenuItem` |
| Данные | `FxTable`, `FxPagination`, `FxDescriptions`, `FxTimeline`, `FxEmpty` |
| Статусы | `FxBadge`, `FxAlert`, `FxStat`, `FxProgress`, `FxSteps`, `FxToast` |
| Значения | `FxMoney`, `FxCountdown`, `FxAvatar`, `FxFilterBar` |
| Прочее | `FxIcon`, `FxModal`, `FxTooltip` |

Иконки задаются семантическим именем (`<FxIcon name="settings" />`). Своя
иконка передаётся компонентом: `<FxIcon :component="MyIcon" />`.

## Форматтеры

```js
import { formatMoney, formatBytes, formatDuration, pluralize } from 'foxy-ui-kit'

formatMoney(4850000)                                 // «4 850 000 ₽»
formatBytes(482301)                                  // «471,0 КБ»
formatDuration(9930)                                 // «02:45:30»
pluralize(3, ['файл', 'файла', 'файлов'])            // «3 файла»
```

Также: `formatNumber`, `formatPercent`, `formatDate`, `formatDateTime`,
`formatRelative`, `truncate`, `initials`, `plural`.

## Разработка

```bash
yarn install
yarn dev          # витрина с конструктором темы на localhost:5173
yarn build        # сборка библиотеки в dist/
yarn build:demo   # сборка витрины для GitHub Pages
```

Витрина живёт в `demo/Showcase.vue` и служит и документацией, и площадкой для
визуальной проверки при изменении токенов.

## Лицензия

MIT
