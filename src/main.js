import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/locale'
import iView from 'view-design'

Vue.config.productionTip = false

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
