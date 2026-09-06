<script setup>
/**
 * FxToast — контейнер всплывающих уведомлений на @zag-js/toast.
 *
 * Ставится один раз в корне приложения; сообщения добавляются через
 * useToast() — вызывающему коду доступ к компоненту не нужен.
 */
import * as toast from '@zag-js/toast'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, useId } from 'vue'
import FxToastItem from './FxToastItem.vue'
import { toastStore } from '../composables/useToast.js'

const service = useMachine(toast.group.machine, { id: useId(), store: toastStore })
const api = computed(() => toast.group.connect(service, normalizeProps))
</script>

<template>
  <Teleport to="body">
    <div class="fx-toasts" v-bind="api.getGroupProps({ label: 'Уведомления' })">
      <FxToastItem
        v-for="(item, index) in api.getToasts()"
        :key="item.id"
        :actor="item"
        :index="index"
        :parent="service"
      />
    </div>
  </Teleport>
</template>

<style scoped>
.fx-toasts { z-index: 1300; }
</style>
