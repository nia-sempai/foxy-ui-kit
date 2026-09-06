# foxy-ui-kit

Светлый UI-kit на Vue 3 для электронных торговых площадок (223-ФЗ / 44-ФЗ).

**Витрина компонентов: <https://nia-sempai.github.io/foxy-ui-kit/>**

32 компонента, доменные форматтеры (деньги, ИНН, комиссия площадки), светлая
тема без тёмного варианта: интерфейс площадки состоит из таблиц и цифр, и
контраст должен работать на данные, а не на оформление.

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

## Компоненты

| Группа | Компоненты |
|---|---|
| Каркас | `FxShell`, `FxPage`, `FxCard`, `FxTabs`, `FxSegmented` |
| Формы | `FxInput`, `FxTextarea`, `FxSelect`, `FxCheckbox`, `FxRadioGroup`, `FxSwitch`, `FxFileUpload` |
| Действия | `FxButton`, `FxDropdown`, `FxMenuItem` |
| Данные | `FxTable`, `FxPagination`, `FxDescriptions`, `FxTimeline`, `FxEmpty` |
| Статусы | `FxBadge`, `FxAlert`, `FxStat`, `FxProgress`, `FxSteps`, `FxToast` |
| Домен ЭТП | `FxMoney`, `FxCountdown`, `FxFilterBar`, `FxAvatar` |
| Прочее | `FxIcon`, `FxModal`, `FxTooltip` |

## Форматтеры

```js
import { formatMoney, formatInn, calcFee, plural } from 'foxy-ui-kit'

formatMoney(4850000)          // «4 850 000 ₽»
formatInn('7701234567')       // «7701 234 567»
calcFee(4220000)              // { amount: 42200, capped: false, … } — 1% с полом и потолком
plural(3, ['заявка', 'заявки', 'заявок'])
```

`calcFee` реализует тарифную модель площадки: 1% от цены победителя, пол
1 000 ₽, потолок 300 000 ₽ за процедуру. Пол и потолок обязательны:
без потолка комиссия с крупного лота становится неподъёмной, без пола не
покрывает издержки процедуры.

## Токены

Все цвета и метрики — CSS-переменные с префиксом `--fx-`. Переопределяются в
приложении после импорта:

```css
:root {
  --fx-primary: #0f62fe;
  --fx-radius: 10px;
}
```

## Разработка

```bash
yarn install
yarn dev          # витрина всех компонентов на localhost:5173
yarn build        # сборка библиотеки в dist/
yarn build:demo   # сборка витрины для GitHub Pages
```

Витрина живёт в `demo/Showcase.vue` и служит и документацией, и площадкой для
визуальной проверки при изменении токенов.

## Лицензия

MIT
