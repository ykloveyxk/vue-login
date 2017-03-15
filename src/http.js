import axios from 'axios'
import router from './router/index'
import store from './store/index'
import * as types from './store/types'

axios.default.timeout = 5000
axios.default.baseURL = ''
//
// axios.interceptors.request.use(
// 	config => {
// 		if(store.state.token) {
// 			config.headers.Authorization = `token ${store.state.token}`;
// 		}
// 		return config;
// 	},
// 	err => {
// 		return Promise.reject(err);
// 	});
//
// axios.interceptors.response.use(
// 	response => {
// 		return response;
// 	},
// 	error => {
// 		if(error.response) {
// 			switch(error.response.status) {
// 			case 401:
// 				// 401 清除token信息并跳转到登录页面
// 				store.commit(types.LOGOUT);
// 				router.replace({
// 					path: 'login',
// 					query: { redirect: router.currentRoute.fullPath }
// 				})
// 			}
// 		}
// 		// console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
// 		return Promise.reject(error.response.data)
// 	});



export default axios
