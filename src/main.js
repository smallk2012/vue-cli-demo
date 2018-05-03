import babelpolyfill from 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import store from './vuex/store'

import Mock from './mock'


Vue.prototype.$api = api
Vue.config.productionTip = false

api.mock && Mock.bootstrap(api.errBack);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')
