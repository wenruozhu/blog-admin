import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/icons'
import '../public/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.data_paging = function (value, page_sum) { //整理数据，供element分页组件使用
    //数据分页展示
    var number = Math.ceil(value.length / page_sum)
    var count = 0;
    var value_array = [];
    for (var s = 0; s < number; s++) {
        var arr_i = []
        for (var i = 0; i < page_sum; i++) {
            if (!value[count]) {
                break;
            }
            arr_i.push(value[count])
            count++;
        }
        value_array[s] = arr_i;
    }
    return {
        data: value_array[0], //第一页的数据
        value_data: value_array, //全部数据
        total: number * 10 //页码
    }
};
axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
