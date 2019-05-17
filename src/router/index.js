import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import axios from 'axios';

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/redirect',
            component: Layout,
            hidden: true,
            children: [{
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }]
        },
        {
            path: '',
            component: Layout,
            redirect: 'dashboard',
            children: [{
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'dashboard',
            }]
        },
        {
            path: '/article',
            component: Layout,
            children: [{
                    path: 'list',
                    component: () => import('@/views/article/list.vue'),
                    name: 'articleList'
                },
                {
                    path: 'release',
                    component: () => import('@/views/article/release.vue'),
                    name: 'articleRelease'
                },
            ]
        },
        {
            path: '/tag',
            component: Layout,
            redirect: 'articleTag',
            children: [{
                path: '',
                component: () => import('@/views/article-tags/index'),
                name: 'analysis',
            }]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/personal',
            component: Layout,
            redirect: 'personal',
            children: [{
                path: '',
                component: () => import('@/views/personal-center/index'),
                name: 'personal',
            }]
        },
        {
            path: '/analysis',
            component: Layout,
            redirect: 'analysis',
            children: [{
                path: '',
                component: () => import('@/views/data-analysis/index'),
                name: 'dataAnalysis',
            }]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if(localStorage.joeyToken){
        axios.get(
            'api/v1/tokens/check',{
                headers: {
                    Authorization: `Bearer ${localStorage.joeyToken}`
                }
            })
        .then(() => {
            next()
        })
        .catch(() => {
            // token验证不通过
            if (to.path !== '/login') {
                next('login')
            }
            else {
                next()
            }
        })
    }else{
        if(to.path !== '/login'){
            next('login')
        }else{
            next()
        }
    }
})
export default router
