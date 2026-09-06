<script setup>
/**
 * FxDropdown — меню действий у триггера (профиль в шапке, «ещё» в строке).
 *
 * Закрывается по клику вне, Esc и по выбору пункта. Позиция задаётся пропом
 * align, потому что в правом краю шапки меню должно прижиматься вправо.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  align: { type: String, default: 'end' }, // start | end
  width: { type: String, default: '13rem' },
})

const open = ref(false)
const root = ref(null)

function close() { open.value = false }

function onDocClick(e) {
  if (open.value && root.value && !root.value.contains(e.target)) close()
}
function onKey(e) { if (e.key === 'Escape') close() }

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="fx-dropdown">
    <span class="fx-dropdown__trigger" @click="open = !open">
      <slot name="trigger" :open="open" />
    </span>
    <Transition name="fx-dropdown">
      <div
        v-if="open"
        class="fx-dropdown__menu"
        :class="`fx-dropdown__menu--${align}`"
        :style="{ width }"
        role="menu"
        @click="close"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fx-dropdown { position: relative; display: inline-flex; }
.fx-dropdown__trigger { display: inline-flex; }
.fx-dropdown__menu {
  position: absolute;
  top: calc(100% + 0.35rem);
  z-index: 60;
  padding: 0.3rem;
  background: var(--fx-surface);
  border: 1px solid var(--fx-border);
  border-radius: var(--fx-radius);
  box-shadow: var(--fx-shadow-md);
}
.fx-dropdown__menu--end { right: 0; }
.fx-dropdown__menu--start { left: 0; }
.fx-dropdown-enter-active, .fx-dropdown-leave-active { transition: opacity 0.12s, transform 0.12s; }
.fx-dropdown-enter-from, .fx-dropdown-leave-to { opacity: 0; transform: translateY(-0.25rem); }
</style>
