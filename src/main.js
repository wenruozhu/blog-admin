import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/icons'
import '../public/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.IP = process.env.VUE_APP_BASE_URL;
Vue.use(ElementUI);
Vue.use(VueAxios, axios)
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
//  请求拦截器
axios.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json"
        config.headers["Accept"] = "*/*"
        let token = sessionStorage.getItem('joeyToken') || null
        if (token) {
            // 如果token不为null，否则传token给后台
            config.headers["Authorization"] = `Bearer ${token}`; //请求头加上token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        const res = response
        //届时根据后端返回success或者code值判断
        if (res.success === true) {
            return res
        } else {
            return res
        }
    },
    (error) => {
        //响应错误
        return Promise.reject(error)
    }
)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
