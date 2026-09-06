<script setup>
/**
 * FxPage — стандартная обвязка экрана: хлебные крошки, заголовок, действия
 * справа и контент. Используйте как корень каждого маршрута, чтобы отступы и
 * расположение кнопок не разъезжались между страницами.
 */
import FxIcon from './FxIcon.vue'

defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  // [{ label, to? }] — последний элемент отрисуется как текущий, без ссылки
  breadcrumbs: { type: Array, default: () => [] },
  back: { type: [String, Object], default: null },
  width: { type: String, default: 'wide' }, // wide | narrow | full
})
</script>

<template>
  <div class="fx-page" :class="`fx-page--${width}`">
    <nav v-if="breadcrumbs.length" class="fx-page__crumbs" aria-label="Хлебные крошки">
      <template v-for="(crumb, i) in breadcrumbs" :key="i">
        <component
          :is="crumb.to && i < breadcrumbs.length - 1 ? 'router-link' : 'span'"
          :to="crumb.to"
          class="fx-page__crumb"
          :class="{ 'fx-page__crumb--current': i === breadcrumbs.length - 1 }"
        >{{ crumb.label }}</component>
        <FxIcon v-if="i < breadcrumbs.length - 1" name="chevron-right" :size="13" class="fx-page__crumb-sep" />
      </template>
    </nav>

    <header class="fx-page__header">
      <div class="fx-page__heading">
        <router-link v-if="back" :to="back" class="fx-page__back" aria-label="Назад">
          <FxIcon name="back" :size="18" />
        </router-link>
        <div class="fx-page__titles">
          <div class="fx-page__title-row">
            <slot name="title"><h1>{{ title }}</h1></slot>
            <slot name="title-extra" />
          </div>
          <p v-if="subtitle" class="fx-page__subtitle">{{ subtitle }}</p>
        </div>
      </div>
      <div v-if="$slots.actions" class="fx-page__actions"><slot name="actions" /></div>
    </header>

    <slot />
  </div>
</template>

<style scoped>
.fx-page { padding: 1.75rem 2rem 3rem; margin: 0 auto; width: 100%; }
.fx-page--wide { max-width: 1360px; }
.fx-page--narrow { max-width: 880px; }
.fx-page__crumbs { display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.6rem; font-size: 0.8125rem; }
.fx-page__crumb { color: var(--fx-text-muted); text-decoration: none; }
.fx-page__crumb:hover { color: var(--fx-primary); }
.fx-page__crumb--current { color: var(--fx-text); }
.fx-page__crumb-sep { color: var(--fx-text-faint); }
.fx-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.fx-page__heading { display: flex; align-items: flex-start; gap: 0.625rem; min-width: 0; }
.fx-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-top: 0.15rem;
  border: 1px solid var(--fx-border);
  border-radius: var(--fx-radius-sm);
  background: var(--fx-surface);
  color: var(--fx-text-muted);
  flex: none;
}
.fx-page__back:hover { background: var(--fx-surface-muted); color: var(--fx-text); }
.fx-page__titles { min-width: 0; }
.fx-page__title-row { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.fx-page__subtitle { margin-top: 0.25rem; font-size: 0.875rem; color: var(--fx-text-muted); }
.fx-page__actions { display: flex; align-items: center; gap: 0.5rem; flex: none; flex-wrap: wrap; justify-content: flex-end; }

@media (max-width: 720px) {
  .fx-page { padding: 1.25rem 1rem 2.5rem; }
  .fx-page__header { flex-direction: column; align-items: stretch; }
}
</style>
