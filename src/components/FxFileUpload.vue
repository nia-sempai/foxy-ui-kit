<script setup>
/**
 * FxFileUpload — зона загрузки файлов на @zag-js/file-upload: drag-and-drop,
 * выбор по клику, проверка типа и размера, список выбранного с удалением.
 *
 * В v-model живут объекты File; отправка — забота приложения, кит не
 * навязывает транспорт. Отклонённые файлы приходят событием `reject`.
 *
 *   <FxFileUpload v-model="files" accept=".pdf,application/pdf" :max-file-size="50 * 1024 * 1024" />
 */
import * as fileUpload from '@zag-js/file-upload'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, useId } from 'vue'
import FxIcon from './FxIcon.vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  label: { type: String, default: 'Перетащите файлы или нажмите для выбора' },
  hint: { type: String, default: '' },
  accept: { type: String, default: '' },
  multiple: { type: Boolean, default: true },
  maxFileSize: { type: Number, default: Infinity },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'reject'])

const service = useMachine(fileUpload.machine, {
  id: useId(),
  locale: 'ru-RU',
  get accept() {
    return props.accept ? props.accept.split(',').map((s) => s.trim()).filter(Boolean) : undefined
  },
  get maxFiles() {
    return props.multiple ? Infinity : 1
  },
  get maxFileSize() {
    return props.maxFileSize
  },
  get disabled() {
    return props.disabled
  },
  get acceptedFiles() {
    return props.modelValue
  },
  onFileChange({ acceptedFiles, rejectedFiles }) {
    emit('update:modelValue', acceptedFiles)
    if (rejectedFiles.length) emit('reject', rejectedFiles)
  },
})

const api = computed(() => fileUpload.connect(service, normalizeProps))
</script>

<template>
  <div class="fx-upload" v-bind="api.getRootProps()">
    <div class="fx-upload__zone" v-bind="api.getDropzoneProps()">
      <FxIcon name="upload" :size="20" class="fx-upload__icon" />
      <span class="fx-upload__label">{{ label }}</span>
      <span v-if="hint" class="fx-upload__hint">{{ hint }}</span>
    </div>
    <input v-bind="api.getHiddenInputProps()" />

    <ul v-if="api.acceptedFiles.length" class="fx-upload__list" v-bind="api.getItemGroupProps()">
      <li
        v-for="file in api.acceptedFiles"
        :key="`${file.name}-${file.size}-${file.lastModified}`"
        class="fx-upload__file"
        v-bind="api.getItemProps({ file })"
      >
        <FxIcon name="document" :size="16" class="fx-upload__file-icon" />
        <span class="fx-upload__file-name" v-bind="api.getItemNameProps({ file })">{{ file.name }}</span>
        <span class="fx-upload__file-size" v-bind="api.getItemSizeTextProps({ file })">{{ api.getFileSize(file) }}</span>
        <button class="fx-upload__remove" aria-label="Удалить" v-bind="api.getItemDeleteTriggerProps({ file })">
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
  color: var(--fx-text-muted);
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
}
.fx-upload__zone:hover:not([data-disabled]),
.fx-upload__zone[data-dragging],
.fx-upload__zone:focus-visible { border-color: var(--fx-primary); background: var(--fx-primary-soft); }
.fx-upload__zone[data-disabled] { opacity: 0.6; cursor: not-allowed; }
.fx-upload__icon { color: var(--fx-text-faint); }
.fx-upload__label { font-size: 0.875rem; color: var(--fx-text); }
.fx-upload__hint { font-size: 0.75rem; }
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
