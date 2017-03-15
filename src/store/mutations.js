import * as types from './types'
export default {
	[types.LOGIN]: (state, data) => {
		localStorage.token = data;
		state.token = data;
	},
	[types.LOGOUT]: (state) => {
		localStorage.removeItem('token');
		state.token = null
	},
	[types.ACTIVENAME]: (state, data) => {
		state.activeName = data
	}
}
