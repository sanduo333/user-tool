var token = ''
var userInfo = {}

export default {
	// 设置储存token
	setTokenStorage(token) {
		this.token = token
		uni.setStorageSync('am_token', token)
		console.log('设置token: ' + token)
	},

	// 获取token
	getTokenStorage() {
		// if this.token.
		try {
			token = uni.getStorageSync('am_token')
		} catch (e) {
			console.log('获取token失败')
		}

		return token
	},
	isLogin() {
		this.token = this.getTokenStorage()
		if (this.token.length == 0) {
			return false
		} else {
			return true
		}
	}
}