const KEY_CUR_SERVER = "curServer"

export default {
	setCurServer(server) {
		uni.setStorageSync(KEY_CUR_SERVER, server)
		console.log('保存server: ', server)
	},

	getCurServerName() {
		let curServer = uni.getStorageSync(KEY_CUR_SERVER)
		console.log('读取本地保存的server: ', curServer)
		return curServer['serverName']
	},

	getCurServerUrl() {
		return "https://tslsh.cn:7011/shlab2"
	},
}