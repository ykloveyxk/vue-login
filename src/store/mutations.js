import * as types from './types'

const mutations = {
	[types.LOGIN]: (state, data) => {
		localStorage.token = data;
		state.token = data;
	},
	[types.LOGOUT](state) {
		localStorage.removeItem('token');
		state.token = null
	}
}
export default mutations
