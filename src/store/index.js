import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		user: {},
		token: null,
		title: '',
		activeName: 'first'
	},
	mutations: {
		[types.LOGIN]: (state, data) => {
			localStorage.token = data;
			state.token = data;
		},
		[types.LOGOUT]: (state) => {
			localStorage.removeItem('token');
			state.token = null
		},
		[types.TITLE]: (state, data) => {
			state.title = data;
		},
		[types.ACTIVENAME]: (state, data) => {
			state.activeName = data
		}
	}
})
