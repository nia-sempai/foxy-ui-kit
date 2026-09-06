<script setup>
/**
 * FxFileUpload — зона загрузки документов (устав, МЧД, документация закупки).
 *
 * Демо-режим: компонент только собирает имена файлов и отдаёт их наверх, сама
 * загрузка — забота приложения. Поддерживает drag-and-drop и список с удалением.
 */
import { ref } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  label: { type: String, default: 'Перетащите файлы или нажмите для выбора' },
  hint: { type: String, default: 'PDF, DOCX, XLSX до 50 МБ' },
  accept: { type: String, default: '' },
  multiple: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const input = ref(null)
const dragging = ref(false)

function add(fileList) {
  const files = Array.from(fileList).map((f) => ({
    name: f.name,
    size: f.size,
    type: f.type,
  }))
  emit('update:modelValue', props.multiple ? [...props.modelValue, ...files] : files.slice(0, 1))
}

function onDrop(e) {
  dragging.value = false
  if (props.disabled) return
  add(e.dataTransfer.files)
}

function remove(i) {
  emit('update:modelValue', props.modelValue.filter((_, idx) => idx !== i))
}

function human(size) {
  if (!size) return ''
  const units = ['Б', 'КБ', 'МБ', 'ГБ']
  let n = size
  let u = 0
  while (n >= 1024 && u < units.length - 1) { n /= 1024; u++ }
  return `${n.toFixed(u === 0 ? 0 : 1)} ${units[u]}`
}
</script>

<template>
  <div class="fx-upload">
    <button
      type="button"
      class="fx-upload__zone"
      :class="{ 'fx-upload__zone--drag': dragging, 'fx-upload__zone--disabled': disabled }"
      :disabled="disabled"
      @click="input?.click()"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop"
    >
      <FxIcon name="upload" :size="20" class="fx-upload__icon" />
      <span class="fx-upload__label">{{ label }}</span>
      <span v-if="hint" class="fx-upload__hint">{{ hint }}</span>
    </button>
    <input
      ref="input"
      type="file"
      class="fx-upload__input"
      :accept="accept"
      :multiple="multiple"
      @change="add($event.target.files); $event.target.value = ''"
    />

    <ul v-if="modelValue.length" class="fx-upload__list">
      <li v-for="(file, i) in modelValue" :key="`${file.name}-${i}`" class="fx-upload__file">
        <FxIcon name="document" :size="16" class="fx-upload__file-icon" />
        <span class="fx-upload__file-name">{{ file.name }}</span>
        <span class="fx-upload__file-size">{{ human(file.size) }}</span>
        <button type="button" class="fx-upload__remove" aria-label="Удалить" @click="remove(i)">
          <FxIcon name="close" :size="14" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.fx-upload__zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
  padding: 1.25rem;
  background: var(--fx-surface-muted);
  border: 1px dashed var(--fx-border-strong);
  border-radius: var(--fx-radius);
  font: inherit;
  color: var(--fx-text-muted);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.fx-upload__zone:hover:not(:disabled) { border-color: var(--fx-primary); background: var(--fx-primary-soft); }
.fx-upload__zone--drag { border-color: var(--fx-primary); background: var(--fx-primary-soft); }
.fx-upload__zone--disabled { opacity: 0.6; cursor: not-allowed; }
.fx-upload__icon { color: var(--fx-text-faint); }
.fx-upload__label { font-size: 0.875rem; color: var(--fx-text); }
.fx-upload__hint { font-size: 0.75rem; }
.fx-upload__input { display: none; }
.fx-upload__list { margin: 0.625rem 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 0.375rem; }
.fx-upload__file {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  background: var(--fx-surface);
  border: 1px solid var(--fx-border);
  border-radius: var(--fx-radius-sm);
  font-size: 0.875rem;
}
.fx-upload__file-icon { color: var(--fx-text-faint); }
.fx-upload__file-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fx-upload__file-size { font-size: 0.75rem; color: var(--fx-text-muted); }
.fx-upload__remove { background: none; border: none; color: var(--fx-text-faint); cursor: pointer; padding: 0.1rem; }
.fx-upload__remove:hover { color: var(--fx-danger); }
</style>
