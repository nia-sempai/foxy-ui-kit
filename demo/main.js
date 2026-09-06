/**
 * Точка входа витрины компонентов. Демо намеренно не использует роутер:
 * это одна прокручиваемая страница-каталог.
 *
 * Компоненты кита (FxShell, FxPage, FxMenuItem) ссылаются на <router-link>,
 * потому что в приложении навигация идёт через vue-router. Чтобы не тащить
 * роутер в витрину, регистрируем лёгкую заглушку, рендерящую обычную ссылку.
 */
import { createApp, h } from 'vue'
import FoxyUiKit from '../src/index.js'
import '../src/base.css'
import Showcase from './Showcase.vue'

const RouterLinkStub = {
  name: 'RouterLink',
  props: { to: { type: [String, Object], default: '' } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'a',
        { ...attrs, href: typeof props.to === 'string' ? props.to : '#', onClick: (e) => e.preventDefault() },
        slots.default?.(),
      )
  },
}

createApp(Showcase).component('RouterLink', RouterLinkStub).use(FoxyUiKit).mount('#app')
