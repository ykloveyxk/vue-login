import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			name: 'Hello',
			component(resolve) {
				require.ensure(['@/components/Hello.vue'], () => {
					resolve(require('@/components/Hello.vue'));
				});
			},
			// 设置 mata 字段，表示该字段需要验证
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/login',
			name: 'login',
			component(resolve) {
				require.ensure(['@/components/Login.vue'], () => {
					resolve(require('@/components/Login.vue'));
				});
			}
		},
		{
			path: '/register',
			name: 'register',
			component(resolve) {
				require.ensure(['@/components/Register.vue'], () => {
					resolve(require('@/components/Register.vue'));
				});
			}
		},
		// 简单设置404页面
		{
			path: '*',
			component(resolve) {
				require.ensure(['@/components/404.vue'], () => {
					resolve(require('@/components/404.vue'));
				});
			},
			hidden: true
		}
	]
})

// 验证 token，存在才跳转
router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token')
	if(to.meta.requireAuth) {
		if(token) {
			next()
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		}
	} else {
		next()
	}
})

export default router
