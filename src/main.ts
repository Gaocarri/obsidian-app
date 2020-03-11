import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Icon from '@/components/Icon.vue'
import Layout from '@/components/Layout.vue'

Vue.component('Icon', Icon)
Vue.component('Layout', Layout)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
