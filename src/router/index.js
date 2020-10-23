import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'

Vue.use(VueRouter)
const router = new VueRouter({
	mode: 'history',
	base: '/admin/',
	routes: [
		{
			path: '/redirect',
			component: Layout,
			meta: {
				title: '重定向',
				keepAlive: false, //是否缓存
			},
			children: [
				{
					path: '/redirect/:path*',
					component: () => import('@/views/redirect/index')
				}
			]
		},
		{
			path: '',
			component: Layout,
			redirect: 'dashboard',
			meta: {
				title: '我的面板',
				keepAlive: false, //是否缓存
			},
			children: [
				{
					path: 'dashboard',
					component: () => import('@/views/dashboard/index'),
					name: 'dashboard'
				}
			]
		},
		{
			path: '/article',
			component: Layout,
			children: [
				{
					path: 'list',
					component: () => import('@/views/article/list.vue'),
					name: 'articleList',
					meta: {
						title: '文章列表',
						keepAlive: false, //是否缓存
					}
				},
				{
					path: 'comments',
					component: () => import('@/views/article/comments.vue'),
					name: 'comments',
					meta: {
						title: '文章评论',
						keepAlive: false, //是否缓存
					}
				},
				{
					path: 'release',
					component: () => import('@/views/article/release.vue'),
					name: 'articleRelease',
					meta: {
						title: '发布文章',
						keepAlive: false, //是否缓存
					}
				}
			]
		},
		{
			path: '/tag',
			component: Layout,
			meta: {
				title: '文章标签',
				keepAlive: false, //是否缓存
			},
			children: [
				{
					path: '',
					component: () => import('@/views/article_tags/index'),
					name: 'tag'
				}
			]
		},
		{
			path: '/message',
			component: Layout,
			meta: {
				title: '文章标签',
				keepAlive: false, //是否缓存
			},
			children: [
				{
					path: '',
					component: () => import('@/views/message/index'),
					name: 'message'
				}
			]
		},
		{
			path: '/login',
			component: Login,
			meta: {
				title: '登录',
				keepAlive: false, //是否缓存
			},
		},
		{
			path: '/book',
			component: Layout,
			redirect: 'book',
			meta: {
				title: '阅读列表',
				keepAlive: false, //是否缓存
			},
			children: [
				{
					path: '',
					component: () => import('@/views/book/index'),
					name: 'book'
				}
			]
		},
		{
			path: '/personal',
			component: Layout,
			redirect: 'personal',
			meta: {
				title: '个人中心',
				keepAlive: false, //是否缓存
			},
			children: [
				{
					path: '',
					component: () => import('@/views/personal_center/index'),
					name: 'personal'
				}
			]
		},
		{
			path: '/analysis',
			component: Layout,
			redirect: 'analysis',
			meta: {
				title: '数据分析',
				keepAlive: false, //是否缓存
			},
			children: [
				{
					path: '',
					component: () => import('@/views/data_analysis/index'),
					name: 'dataAnalysis'
				}
			]
		}
	]
})
router.beforeEach((to, from, next) => {
	if (localStorage.joeyToken) {
		axios.get(
			'api/v1/tokens/check', {
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
				} else {
					next()
				}
			})
	} else {
		if (to.path !== '/login') {
			next('login')
		} else {
			next()
		}
	}
})
export default router
