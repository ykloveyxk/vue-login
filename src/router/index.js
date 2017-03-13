import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			name: 'Hello',
			component: Hello,
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
		}
	]
})

router.beforeEach((to, from, next) => {
	if(to.meta.requireAuth) {
		if(localStorage.token) {
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
