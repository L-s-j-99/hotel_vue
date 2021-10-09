import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import './assets/css/global.css'

import axios from 'axios'

Vue.prototype.$axios = axios /* 这样每个组件都可以使用axios */
Vue.config.productionTip = false/* 取消提示工具 */

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
