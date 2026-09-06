<script setup>
/**
 * FxShell — каркас приложения: светлый боковой навигатор + верхняя шапка.
 *
 * Сайдбар намеренно светлый (не тёмный, как в ScanFlow): у площадки много
 * табличных экранов, и тёмная колонка перетягивает внимание с данных.
 *
 *   nav: [{ section?, items: [{ label, to, icon?, badge? }] }]
 *
 * Слоты: #logo, #header-actions, #user, по умолчанию — контент страницы.
 */
import { ref } from 'vue'
import FxIcon from './FxIcon.vue'

defineProps({
  nav: { type: Array, default: () => [] },
  title: { type: String, default: '' },
})

const open = ref(false)
</script>

<template>
  <div class="fx-shell" :class="{ 'fx-shell--nav-open': open }">
    <aside class="fx-shell__sidebar">
      <div class="fx-shell__logo">
        <slot name="logo">{{ title }}</slot>
      </div>
      <nav class="fx-shell__nav">
        <template v-for="(group, gi) in nav" :key="gi">
          <p v-if="group.section" class="fx-shell__section">{{ group.section }}</p>
          <router-link
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="fx-shell__link"
            @click="open = false"
          >
            <FxIcon v-if="item.icon" :name="item.icon" :size="17" class="fx-shell__link-icon" />
            <span class="fx-shell__link-label">{{ item.label }}</span>
            <span v-if="item.badge" class="fx-shell__badge">{{ item.badge }}</span>
          </router-link>
        </template>
      </nav>
      <div v-if="$slots.sidebarFooter" class="fx-shell__sidebar-footer">
        <slot name="sidebarFooter" />
      </div>
    </aside>

    <div class="fx-shell__main">
      <header class="fx-shell__header">
        <button class="fx-shell__burger" aria-label="Меню" @click="open = !open">
          <FxIcon :name="open ? 'close' : 'menu'" :size="20" />
        </button>
        <div class="fx-shell__header-left"><slot name="header-left" /></div>
        <div class="fx-shell__header-actions">
          <slot name="header-actions" />
          <slot name="user" />
        </div>
      </header>
      <main class="fx-shell__content"><slot /></main>
    </div>

    <div class="fx-shell__overlay" @click="open = false" />
  </div>
</template>

<style scoped>
.fx-shell { display: flex; min-height: 100vh; background: var(--fx-bg); }
.fx-shell__sidebar {
  width: 15rem;
  flex: none;
  display: flex;
  flex-direction: column;
  background: var(--fx-surface);
  border-right: 1px solid var(--fx-border);
  position: sticky;
  top: 0;
  height: 100vh;
}
.fx-shell__logo {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  height: 3.75rem;
  padding: 0 1.125rem;
  border-bottom: 1px solid var(--fx-border);
  font-size: 1.0625rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}
.fx-shell__nav { flex: 1; overflow-y: auto; padding: 0.75rem 0.625rem; }
.fx-shell__section {
  padding: 0.9rem 0.55rem 0.35rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fx-text-faint);
}
.fx-shell__link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.55rem;
  border-radius: var(--fx-radius-sm);
  color: var(--fx-text-muted);
  font-size: 0.9375rem;
  text-decoration: none;
  transition: background 0.12s, color 0.12s;
}
.fx-shell__link:hover { background: var(--fx-surface-muted); color: var(--fx-text); text-decoration: none; }
.fx-shell__link.router-link-active {
  background: var(--fx-primary-soft);
  color: var(--fx-primary);
  font-weight: 550;
}
.fx-shell__link-icon { color: currentColor; }
.fx-shell__link-label { flex: 1; min-width: 0; }
.fx-shell__badge {
  padding: 0.05rem 0.35rem;
  border-radius: 999px;
  background: var(--fx-danger);
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 600;
}
.fx-shell__sidebar-footer { padding: 0.75rem; border-top: 1px solid var(--fx-border); }

.fx-shell__main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.fx-shell__header {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 3.75rem;
  padding: 0 1.25rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--fx-border);
}
.fx-shell__header-left { flex: 1; min-width: 0; display: flex; align-items: center; gap: 0.75rem; }
.fx-shell__header-actions { display: flex; align-items: center; gap: 0.5rem; }
.fx-shell__burger {
  display: none;
  background: none;
  border: none;
  color: var(--fx-text-muted);
  cursor: pointer;
  padding: 0.25rem;
}
.fx-shell__content { flex: 1; min-width: 0; }
.fx-shell__overlay { display: none; }

@media (max-width: 900px) {
  .fx-shell__sidebar {
    position: fixed;
    z-index: 70;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
    box-shadow: var(--fx-shadow-lg);
  }
  .fx-shell--nav-open .fx-shell__sidebar { transform: none; }
  .fx-shell--nav-open .fx-shell__overlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 60;
    background: rgba(15, 23, 42, 0.3);
  }
  .fx-shell__burger { display: inline-flex; }
}
</style>
