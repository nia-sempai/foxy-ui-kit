<script setup>
/**
 * FxTooltip — всплывающая подсказка над обёрнутым элементом: расшифровка
 * статуса, пояснение к полю. Только hover/focus, без интерактива внутри:
 * для меню есть FxDropdown.
 */
defineProps({
  text: { type: String, default: '' },
  placement: { type: String, default: 'top' }, // top | bottom
})
</script>

<template>
  <span class="fx-tooltip" :class="`fx-tooltip--${placement}`" tabindex="0">
    <slot />
    <span class="fx-tooltip__bubble" role="tooltip"><slot name="content">{{ text }}</slot></span>
  </span>
</template>

<style scoped>
.fx-tooltip { position: relative; display: inline-flex; outline: none; }
.fx-tooltip__bubble {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-0.2rem);
  z-index: 80;
  width: max-content;
  max-width: 18rem;
  padding: 0.4rem 0.55rem;
  background: #172033;
  color: #fff;
  border-radius: var(--fx-radius-sm);
  font-size: 0.75rem;
  line-height: 1.4;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.12s, visibility 0.12s;
  pointer-events: none;
}
.fx-tooltip--top .fx-tooltip__bubble { bottom: calc(100% + 0.35rem); }
.fx-tooltip--bottom .fx-tooltip__bubble { top: calc(100% + 0.35rem); }
.fx-tooltip:hover .fx-tooltip__bubble,
.fx-tooltip:focus-visible .fx-tooltip__bubble { opacity: 1; visibility: visible; transform: translateX(-50%); }
</style>
