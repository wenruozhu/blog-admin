import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import '@/icons'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
