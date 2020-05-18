import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import toast from '@/components/common/toast'
import Echart from 'echarts';


import Icon from '@/components/common/Icon.vue'
import Layout from '@/components/common/Layout.vue'

Vue.prototype.$echarts = Echart;

// 安装toast插件
Vue.use(toast)

Vue.component('Icon', Icon)
Vue.component('Layout', Layout)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

