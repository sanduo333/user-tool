import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		phone: "",
		token: "",
		userInfo: {
			userId: "",
			name: "",
		}
	},
	mutations: {
		setPhone(state, phone) {
			console.log("-----------", phone)
			state.phone = phone
		},
		setToken(state, token) {
			state.token = token
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		}
	},
	plugins: [createPersistedState({
		storage: {
			getItem: key => uni.getStorageSync(key),
			setItem: (key, value) => uni.setStorageSync(key, value),
			removeItem: key => uni.removeStorageSync(key)
		}
	})]
})

export default store