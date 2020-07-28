import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'view-design'
import i18n from '@/locale'
import config from '@/config'
import'./index.less'

if(process.env.NODE_ENV !== 'production') require('@/mock')

Vue.config.productionTip = false

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * @description 生产环境关闭提示
 * */
Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 * */
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
