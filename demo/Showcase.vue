<script setup>
/**
 * Витрина foxy-ui-kit: все компоненты кита на одной странице с примерами из
 * предметной области ЭТП. Служит и документацией, и площадкой для визуальной
 * проверки при изменении токенов.
 */
import { computed, ref } from 'vue'
import { iconNames, calcFee, formatMoney, useToast } from '../src/index.js'

const toast = useToast()

// --- демо-состояние ---
const search = ref('')
const inn = ref('7701234567')
const okpd = ref('')
const region = ref('')
const law = ref('223')
const comment = ref('')
const agree = ref(true)
const notify = ref(true)
const role = ref('supplier')
const files = ref([{ name: 'Устав.pdf', size: 482301 }])
const tab = ref('all')
const view = ref('table')
const page = ref(1)
const sortKey = ref('nmck')
const sortDir = ref('desc')
const modal = ref(false)
const step = ref(1)

const soon = new Date(Date.now() + 3 * 3600 * 1000 + 12 * 60 * 1000)
const veryS = new Date(Date.now() + 47 * 1000)

const columns = [
  { key: 'number', label: '№ извещения', width: '11rem', nowrap: true },
  { key: 'name', label: 'Предмет закупки' },
  { key: 'customer', label: 'Заказчик', width: '14rem' },
  { key: 'nmck', label: 'НМЦК', width: '9rem', align: 'right', sortable: true },
  { key: 'status', label: 'Статус', width: '10rem' },
  { key: 'actions', label: '', width: '5rem', actions: true },
]

const rows = [
  { id: 1, number: '32413456789', name: 'Поставка серверного оборудования', customer: 'ПАО «Энергосети»', nmck: 4850000, status: 'Приём заявок', tone: 'primary' },
  { id: 2, number: '32413456012', name: 'Услуги технической поддержки ИС', customer: 'АО «Ростелеком-Регион»', nmck: 1240000, status: 'Аукцион идёт', tone: 'warning' },
  { id: 3, number: '32413455980', name: 'Ремонт кровли административного здания', customer: 'МУП «Городское хозяйство»', nmck: 780000, status: 'Подведение итогов', tone: 'info' },
  { id: 4, number: '32413455871', name: 'Закупка канцелярских товаров', customer: 'ГБУ «Центр услуг»', nmck: 145000, status: 'Завершена', tone: 'neutral' },
]

const bids = [
  { time: '14:32:07', title: 'Участник №3 — 4 220 000 ₽', text: 'Снижение 2,1% от текущей цены', tone: 'success', icon: 'down' },
  { time: '14:29:41', title: 'Участник №1 — 4 310 000 ₽', text: 'Снижение 1,0%', tone: 'primary', icon: 'down' },
  { time: '14:22:15', title: 'Участник №5 — 4 355 000 ₽', text: 'Первое предложение', tone: 'neutral', icon: 'auction' },
  { time: '14:20:00', title: 'Аукцион начат', text: 'НМЦК 4 850 000 ₽, шаг 0,5–5%', tone: 'warning', icon: 'clock' },
]

const fee = computed(() => calcFee(4220000))

const activeFilters = computed(() => {
  const out = []
  if (law.value) out.push({ key: 'law', label: `Закон: ${law.value}-ФЗ` })
  if (region.value) out.push({ key: 'region', label: `Регион: ${region.value}` })
  if (okpd.value) out.push({ key: 'okpd', label: `ОКПД2: ${okpd.value}` })
  return out
})

const nav = [
  { items: [
    { label: 'Дашборд', to: '/', icon: 'dashboard' },
    { label: 'Закупки', to: '/procurements', icon: 'procurement', badge: 12 },
    { label: 'Торговый зал', to: '/auctions', icon: 'auction' },
  ] },
  { section: 'Организация', items: [
    { label: 'Профиль', to: '/org', icon: 'customer' },
    { label: 'Финансы', to: '/finance', icon: 'wallet' },
  ] },
]

function removeFilter(chip) {
  if (chip.key === 'law') law.value = ''
  if (chip.key === 'region') region.value = ''
  if (chip.key === 'okpd') okpd.value = ''
}

function resetFilters() {
  law.value = ''
  region.value = ''
  okpd.value = ''
}
</script>

<template>
  <div class="showcase">
    <header class="showcase__hero">
      <div class="showcase__hero-inner">
        <div class="showcase__brand">
          <span class="showcase__logo"><FxIcon name="auction" :size="20" /></span>
          <div>
            <h1>foxy-ui-kit</h1>
            <p>Светлый UI-kit на Vue 3 для электронных торговых площадок (223-ФЗ / 44-ФЗ)</p>
          </div>
        </div>
        <div class="showcase__hero-actions">
          <FxButton variant="secondary" icon="external">GitHub</FxButton>
          <FxButton variant="primary" icon="download">yarn add foxy-ui-kit</FxButton>
        </div>
      </div>
    </header>

    <main class="showcase__body">
      <!-- Кнопки -->
      <section class="showcase__section">
        <h2 class="showcase__title">Кнопки</h2>
        <FxCard>
          <div class="showcase__row">
            <FxButton variant="primary">Подать заявку</FxButton>
            <FxButton variant="secondary">Сохранить черновик</FxButton>
            <FxButton variant="ghost">Отмена</FxButton>
            <FxButton variant="success" icon="check">Аккредитовать</FxButton>
            <FxButton variant="danger" icon="reject">Отклонить</FxButton>
            <FxButton variant="link">Подробнее</FxButton>
          </div>
          <div class="showcase__row showcase__row--mt">
            <FxButton variant="primary" size="lg" icon="certificate">Войти по сертификату</FxButton>
            <FxButton variant="primary" icon="auction">В торговый зал</FxButton>
            <FxButton variant="secondary" size="sm" icon="download">Выгрузить</FxButton>
            <FxButton variant="primary" loading>Подписание…</FxButton>
            <FxButton variant="secondary" icon="more" />
            <FxButton variant="primary" disabled>Недоступно</FxButton>
          </div>
        </FxCard>
      </section>

      <!-- Формы -->
      <section class="showcase__section">
        <h2 class="showcase__title">Поля ввода</h2>
        <div class="showcase__grid showcase__grid--2">
          <FxCard title="Основные контролы">
            <div class="showcase__stack">
              <FxInput v-model="search" label="Поиск" placeholder="Название или № извещения" prefix-icon="search" />
              <FxInput v-model="inn" label="ИНН организации" required hint="10 цифр для юрлица, 12 для ИП" suffix="ЕГРЮЛ" />
              <FxInput model-value="9 900 000" label="Цена предложения" suffix="₽" error="Ниже минимально допустимой" />
              <FxSelect
                v-model="region"
                label="Регион поставки"
                placeholder="Любой регион"
                :options="['Москва', 'Санкт-Петербург', 'Новосибирская обл.', 'Татарстан']"
              />
              <FxTextarea v-model="comment" label="Комментарий к заявке" placeholder="Необязательно" :rows="3" />
            </div>
          </FxCard>
          <FxCard title="Выбор и переключатели">
            <div class="showcase__stack">
              <FxRadioGroup
                v-model="role"
                label="Роль в закупках"
                :options="[
                  { value: 'supplier', label: 'Поставщик', hint: 'Участие в торгах, подача заявок' },
                  { value: 'customer', label: 'Заказчик', hint: 'Публикация закупок по 223-ФЗ' },
                ]"
              />
              <FxCheckbox v-model="agree" label="Согласен с регламентом площадки" hint="Комиссия 1% удерживается с победителя" />
              <FxSwitch v-model="notify" label="Уведомления о новых закупках" hint="По моим ОКПД2, раз в сутки" />
              <FxSegmented
                v-model="view"
                :options="[
                  { value: 'table', icon: 'procurement', label: 'Таблица' },
                  { value: 'cards', icon: 'dashboard', label: 'Карточки' },
                ]"
              />
              <FxFileUpload v-model="files" />
            </div>
          </FxCard>
        </div>
      </section>

      <!-- Статусы -->
      <section class="showcase__section">
        <h2 class="showcase__title">Статусы и метрики</h2>
        <div class="showcase__grid showcase__grid--4">
          <FxStat label="Оборот за месяц" value="284,6 млн ₽" icon="finance" tone="primary" :trend="12.4" hint="к августу" />
          <FxStat label="Комиссия площадки" value="2,41 млн ₽" icon="percent" tone="success" :trend="8.1" hint="1% с победителей" />
          <FxStat label="Активных торгов" value="37" icon="auction" tone="warning" hint="из них 4 сейчас" />
          <FxStat label="На модерации" value="9" icon="shield" tone="danger" :trend="-25" invert hint="заявок на аккредитацию" />
        </div>
        <FxCard class="showcase__mt">
          <div class="showcase__row">
            <FxBadge tone="primary" dot>Приём заявок</FxBadge>
            <FxBadge tone="warning" dot>Аукцион идёт</FxBadge>
            <FxBadge tone="info">Подведение итогов</FxBadge>
            <FxBadge tone="success" icon="check-badge">Аккредитован</FxBadge>
            <FxBadge tone="danger" icon="reject">В РНП</FxBadge>
            <FxBadge tone="neutral">Черновик</FxBadge>
            <FxBadge tone="success" size="sm">Комиссия удержана</FxBadge>
          </div>
          <div class="showcase__row showcase__row--mt">
            <FxMoney :value="4850000" size="lg" />
            <FxMoney :value="4220000" tone="success" />
            <FxMoney :value="42200" :fraction="true" tone="muted" />
            <FxMoney :value="284600000" compact />
            <FxCountdown :to="soon" size="lg" />
            <FxCountdown :to="veryS" />
          </div>
          <div class="showcase__stack showcase__row--mt">
            <FxProgress label="Заполненность профиля" :value="72" show-value />
            <FxProgress label="Проверка документов" :value="100" tone="success" show-value />
            <FxProgress label="До окончания приёма заявок" :value="18" tone="warning" show-value />
          </div>
        </FxCard>
      </section>

      <!-- Плашки -->
      <section class="showcase__section">
        <h2 class="showcase__title">Оповещения</h2>
        <div class="showcase__stack">
          <FxAlert tone="info" title="Требуется квалифицированная подпись">
            Просматривать закупки можно после любого входа, подписывать заявки — только с УКЭП.
          </FxAlert>
          <FxAlert tone="success" title="Организация аккредитована">
            ООО «Ромашка», ИНН 7701234567. Данные подтянуты из ЕГРЮЛ, в РНП не значится.
          </FxAlert>
          <FxAlert tone="warning" title="Срок подачи заявок истекает через 3 часа" />
          <FxAlert tone="danger" title="Сертификат отозван" closable>
            Проверка OCSP вернула статус revoked. Войдите с действующим сертификатом.
          </FxAlert>
        </div>
      </section>

      <!-- Фильтры и таблица -->
      <section class="showcase__section">
        <h2 class="showcase__title">Поиск, фильтры и таблица</h2>
        <FxFilterBar :active="activeFilters" @remove="removeFilter" @reset="resetFilters">
          <template #search>
            <FxInput v-model="search" placeholder="Поиск по предмету закупки, ИНН или № извещения" prefix-icon="search" />
          </template>
          <FxSelect
            v-model="law"
            label="Закон"
            placeholder="Все"
            :options="[
              { value: '44', label: '44-ФЗ' },
              { value: '223', label: '223-ФЗ' },
              { value: 'comm', label: 'Коммерческая' },
            ]"
          />
          <FxSelect v-model="region" label="Регион" placeholder="Все" :options="['Москва', 'Санкт-Петербург', 'Татарстан']" />
          <FxInput v-model="okpd" label="ОКПД2" placeholder="26.20.13" />
          <template #actions>
            <FxButton variant="secondary" icon="sliders">Ещё фильтры</FxButton>
            <FxButton variant="primary" icon="bell">Подписаться</FxButton>
          </template>
        </FxFilterBar>

        <FxCard padding="none" class="showcase__mt">
          <template #header>
            <FxTabs
              v-model="tab"
              :items="[
                { value: 'all', label: 'Все закупки', count: 128 },
                { value: 'my', label: 'Мои заявки', count: 6 },
                { value: 'won', label: 'Победы', count: 2 },
                { value: 'draft', label: 'Черновики', count: 1 },
              ]"
              variant="pill"
            />
          </template>
          <FxTable
            :columns="columns"
            :rows="rows"
            v-model:page="page"
            v-model:sort-key="sortKey"
            v-model:sort-dir="sortDir"
            :page-size="4"
            :total="128"
            clickable
          >
            <template #cell-name="{ row }">
              <span class="showcase__cell-name">{{ row.name }}</span>
            </template>
            <template #cell-nmck="{ row }"><FxMoney :value="row.nmck" /></template>
            <template #cell-status="{ row }">
              <FxBadge :tone="row.tone" dot>{{ row.status }}</FxBadge>
            </template>
            <template #cell-actions>
              <FxDropdown>
                <template #trigger><FxButton variant="ghost" size="sm" icon="more" /></template>
                <FxMenuItem icon="eye">Открыть карточку</FxMenuItem>
                <FxMenuItem icon="star">В избранное</FxMenuItem>
                <FxMenuItem icon="download">Скачать документацию</FxMenuItem>
                <FxMenuItem icon="reject" danger>Скрыть из ленты</FxMenuItem>
              </FxDropdown>
            </template>
          </FxTable>
        </FxCard>
      </section>

      <!-- Мастер, хронология, описания -->
      <section class="showcase__section">
        <h2 class="showcase__title">Процессы</h2>
        <div class="showcase__grid showcase__grid--2">
          <FxCard title="Мастер публикации закупки">
            <FxSteps
              :items="[
                { label: 'Сведения', hint: 'закон и способ' },
                { label: 'Лоты', hint: 'ОКПД2, НМЦК' },
                { label: 'Требования' },
                { label: 'Документация' },
                { label: 'Подпись' },
              ]"
              :current="step"
              clickable
              @select="step = $event"
            />
            <div class="showcase__row showcase__row--mt">
              <FxButton variant="secondary" icon="back" @click="step = Math.max(0, step - 1)">Назад</FxButton>
              <FxButton variant="primary" icon-end="forward" @click="step = Math.min(4, step + 1)">Далее</FxButton>
            </div>
          </FxCard>

          <FxCard title="Лента торгов" subtitle="Лот №1 — серверное оборудование">
            <template #actions><FxCountdown :to="veryS" /></template>
            <FxTimeline :items="bids" />
          </FxCard>

          <FxCard title="Карточка организации">
            <template #actions><FxBadge tone="success" icon="check-badge">Аккредитован</FxBadge></template>
            <FxDescriptions
              :items="[
                { key: 'name', label: 'Наименование', value: 'ООО «Ромашка»', wide: true },
                { key: 'inn', label: 'ИНН / КПП', value: '7701234567 / 770101001' },
                { key: 'ogrn', label: 'ОГРН', value: '1157746123456' },
                { key: 'head', label: 'Руководитель', value: 'Иванов И. И.' },
                { key: 'msp', label: 'Реестр МСП', value: 'Малое предприятие' },
                { key: 'addr', label: 'Адрес', value: 'г. Москва, ул. Тверская, д. 1', wide: true },
              ]"
            />
          </FxCard>

          <FxCard title="Расчёт комиссии площадки">
            <FxDescriptions
              :columns="1"
              :items="[
                { key: 'base', label: 'Цена победителя (с НДС)', value: formatMoney(4220000) },
                { key: 'rate', label: 'Тариф', value: '1%' },
                { key: 'raw', label: 'Расчётная комиссия', value: formatMoney(fee.raw, { fraction: true }) },
                { key: 'amount', label: 'К удержанию', value: formatMoney(fee.amount, { fraction: true }) },
              ]"
            />
            <FxAlert tone="info" class="showcase__mt">
              Пол 1 000 ₽, потолок 300 000 ₽ за процедуру. Списывается с лицевого счёта при подписании договора.
            </FxAlert>
          </FxCard>
        </div>
      </section>

      <!-- Оболочка -->
      <section class="showcase__section">
        <h2 class="showcase__title">Каркас приложения</h2>
        <div class="showcase__shell-frame">
          <FxShell :nav="nav">
            <template #logo>
              <span class="showcase__logo showcase__logo--sm"><FxIcon name="auction" :size="15" /></span>
              Торги
            </template>
            <template #header-left>
              <FxBadge tone="primary" icon="supplier">Поставщик · ООО «Ромашка»</FxBadge>
            </template>
            <template #header-actions>
              <FxButton variant="ghost" icon="bell" />
              <FxDropdown>
                <template #trigger><FxAvatar name="Иванов Иван" size="sm" /></template>
                <FxMenuItem icon="user">Личный кабинет</FxMenuItem>
                <FxMenuItem icon="customer">Сменить организацию</FxMenuItem>
                <FxMenuItem icon="logout" danger>Выйти</FxMenuItem>
              </FxDropdown>
            </template>
            <FxPage title="Дашборд поставщика" subtitle="Сводка по вашим заявкам и торгам">
              <template #actions><FxButton variant="primary" icon="search">Найти закупки</FxButton></template>
              <div class="showcase__grid showcase__grid--3">
                <FxStat label="Заявок подано" value="6" icon="document" tone="primary" />
                <FxStat label="Побед" value="2" icon="check-badge" tone="success" />
                <FxStat label="Баланс счёта" value="128 400 ₽" icon="wallet" />
              </div>
            </FxPage>
          </FxShell>
        </div>
      </section>

      <!-- Прочее -->
      <section class="showcase__section">
        <h2 class="showcase__title">Вспомогательное</h2>
        <div class="showcase__grid showcase__grid--2">
          <FxCard title="Модальное окно и уведомления">
            <div class="showcase__row">
              <FxButton variant="primary" @click="modal = true">Открыть модалку</FxButton>
              <FxButton variant="secondary" @click="toast.success('Заявка подписана', 'УКЭП: Иванов И. И.')">Успех</FxButton>
              <FxButton variant="secondary" @click="toast.warning('Срок истекает', 'Осталось 3 часа')">Внимание</FxButton>
              <FxButton variant="secondary" @click="toast.error('Ошибка подписи', 'Плагин КриптоПро не найден')">Ошибка</FxButton>
            </div>
            <div class="showcase__row showcase__row--mt">
              <FxTooltip text="1% от цены победителя, но не более 300 000 ₽ за процедуру">
                <FxBadge tone="info" icon="info">Как считается комиссия</FxBadge>
              </FxTooltip>
              <FxAvatar name="Иванов Иван" />
              <FxAvatar name="ООО Ромашка" square />
              <FxAvatar icon="customer" size="lg" name="Энергосети" />
            </div>
          </FxCard>

          <FxCard title="Пустое состояние" padding="none">
            <FxEmpty
              icon="search"
              title="Закупки не найдены"
              description="Попробуйте убрать часть фильтров или расширить диапазон НМЦК."
            >
              <FxButton variant="secondary" icon="refresh" @click="resetFilters">Сбросить фильтры</FxButton>
            </FxEmpty>
          </FxCard>
        </div>
      </section>

      <!-- Иконки -->
      <section class="showcase__section">
        <h2 class="showcase__title">Иконки <span class="showcase__count">{{ iconNames.length }}</span></h2>
        <FxCard>
          <div class="showcase__icons">
            <div v-for="name in iconNames" :key="name" class="showcase__icon">
              <FxIcon :name="name" :size="19" />
              <span>{{ name }}</span>
            </div>
          </div>
        </FxCard>
      </section>
    </main>

    <FxModal v-model="modal" title="Подписание заявки" subtitle="Заявка на участие в закупке №32413456789" size="md">
      <div class="showcase__stack">
        <FxAlert tone="info">Будет использован сертификат УКЭП, выданный УЦ ФНС.</FxAlert>
        <FxDescriptions
          :columns="1"
          :items="[
            { key: 'owner', label: 'Владелец сертификата', value: 'Иванов Иван Иванович' },
            { key: 'org', label: 'Организация', value: 'ООО «Ромашка», ИНН 7701234567' },
            { key: 'valid', label: 'Действителен до', value: '14.03.2027' },
          ]"
        />
        <FxCheckbox :model-value="true" label="Подтверждаю достоверность сведений в заявке" />
      </div>
      <template #footer>
        <FxButton variant="ghost" @click="modal = false">Отмена</FxButton>
        <FxButton variant="primary" icon="certificate" @click="modal = false; toast.success('Заявка подписана и отправлена')">
          Подписать
        </FxButton>
      </template>
    </FxModal>

    <FxToast />
  </div>
</template>

<style scoped>
.showcase { min-height: 100vh; }
.showcase__hero {
  background: linear-gradient(180deg, #ffffff 0%, #f2f6fc 100%);
  border-bottom: 1px solid var(--fx-border);
}
.showcase__hero-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 2.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.showcase__brand { display: flex; align-items: center; gap: 0.875rem; }
.showcase__brand h1 { font-size: 1.5rem; }
.showcase__brand p { margin-top: 0.2rem; color: var(--fx-text-muted); font-size: 0.9375rem; }
.showcase__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--fx-radius);
  background: var(--fx-primary);
  color: #fff;
  box-shadow: var(--fx-shadow-md);
}
.showcase__logo--sm { width: 1.75rem; height: 1.75rem; border-radius: var(--fx-radius-sm); box-shadow: none; }
.showcase__hero-actions { display: flex; gap: 0.5rem; }

.showcase__body { max-width: 1160px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }
.showcase__section + .showcase__section { margin-top: 2.5rem; }
.showcase__title { font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--fx-text-faint); margin-bottom: 0.75rem; }
.showcase__count { color: var(--fx-text-muted); }
.showcase__row { display: flex; align-items: center; gap: 0.625rem; flex-wrap: wrap; }
.showcase__row--mt, .showcase__mt { margin-top: 1rem; }
.showcase__stack { display: flex; flex-direction: column; gap: 0.875rem; }
.showcase__grid { display: grid; gap: 1rem; }
.showcase__grid--2 { grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr)); }
.showcase__grid--3 { grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); }
.showcase__grid--4 { grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); }
.showcase__cell-name { font-weight: 500; }
.showcase__shell-frame {
  border: 1px solid var(--fx-border);
  border-radius: var(--fx-radius);
  overflow: hidden;
  box-shadow: var(--fx-shadow-sm);
  height: 26rem;
}
.showcase__shell-frame :deep(.fx-shell) { min-height: 100%; height: 100%; }
.showcase__shell-frame :deep(.fx-shell__sidebar) { height: 100%; position: static; }
.showcase__shell-frame :deep(.fx-shell__header) { position: static; }
.showcase__icons { display: grid; grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr)); gap: 0.5rem; }
.showcase__icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.55rem;
  border-radius: var(--fx-radius-sm);
  font-size: 0.75rem;
  color: var(--fx-text-muted);
}
.showcase__icon:hover { background: var(--fx-surface-muted); color: var(--fx-text); }
</style>
