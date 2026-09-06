/**
 * foxy-ui-kit — светлый UI-kit на Vue 3 для электронных торговых площадок.
 *
 * Точка входа: именованные экспорты компонентов + плагин для глобальной
 * регистрации. Стили токенов подключаются автоматически; базовый reset
 * (`foxy-ui-kit/src/base.css`) приложение импортирует само, чтобы кит не
 * навязывал глобальные правила.
 *
 *   import { FxButton, FxTable } from 'foxy-ui-kit'
 *   import 'foxy-ui-kit/style.css'
 *
 * либо всё сразу:
 *   import FoxyUiKit from 'foxy-ui-kit'
 *   app.use(FoxyUiKit)
 */
import './tokens.css'

import FxAlert from './components/FxAlert.vue'
import FxAvatar from './components/FxAvatar.vue'
import FxBadge from './components/FxBadge.vue'
import FxButton from './components/FxButton.vue'
import FxCard from './components/FxCard.vue'
import FxCheckbox from './components/FxCheckbox.vue'
import FxCountdown from './components/FxCountdown.vue'
import FxDescriptions from './components/FxDescriptions.vue'
import FxDropdown from './components/FxDropdown.vue'
import FxEmpty from './components/FxEmpty.vue'
import FxFileUpload from './components/FxFileUpload.vue'
import FxFilterBar from './components/FxFilterBar.vue'
import FxIcon from './components/FxIcon.vue'
import FxInput from './components/FxInput.vue'
import FxMenuItem from './components/FxMenuItem.vue'
import FxModal from './components/FxModal.vue'
import FxMoney from './components/FxMoney.vue'
import FxPage from './components/FxPage.vue'
import FxPagination from './components/FxPagination.vue'
import FxProgress from './components/FxProgress.vue'
import FxRadioGroup from './components/FxRadioGroup.vue'
import FxSegmented from './components/FxSegmented.vue'
import FxSelect from './components/FxSelect.vue'
import FxShell from './components/FxShell.vue'
import FxStat from './components/FxStat.vue'
import FxSteps from './components/FxSteps.vue'
import FxSwitch from './components/FxSwitch.vue'
import FxTable from './components/FxTable.vue'
import FxTabs from './components/FxTabs.vue'
import FxTextarea from './components/FxTextarea.vue'
import FxTimeline from './components/FxTimeline.vue'
import FxToast from './components/FxToast.vue'
import FxTooltip from './components/FxTooltip.vue'

export {
  FxAlert, FxAvatar, FxBadge, FxButton, FxCard, FxCheckbox, FxCountdown,
  FxDescriptions, FxDropdown, FxEmpty, FxFileUpload, FxFilterBar, FxIcon,
  FxInput, FxMenuItem, FxModal, FxMoney, FxPage, FxPagination, FxProgress,
  FxRadioGroup, FxSegmented, FxSelect, FxShell, FxStat, FxSteps, FxSwitch, FxTable,
  FxTabs, FxTextarea, FxTimeline, FxToast, FxTooltip,
}

export { iconNames, iconRegistry } from './components/icon-registry.js'
export { useToast, pushToast, dismissToast, toasts } from './composables/useToast.js'
export * from './format.js'

const components = {
  FxAlert, FxAvatar, FxBadge, FxButton, FxCard, FxCheckbox, FxCountdown,
  FxDescriptions, FxDropdown, FxEmpty, FxFileUpload, FxFilterBar, FxIcon,
  FxInput, FxMenuItem, FxModal, FxMoney, FxPage, FxPagination, FxProgress,
  FxRadioGroup, FxSegmented, FxSelect, FxShell, FxStat, FxSteps, FxSwitch, FxTable,
  FxTabs, FxTextarea, FxTimeline, FxToast, FxTooltip,
}

export default {
  install(app) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component)
    }
  },
}
