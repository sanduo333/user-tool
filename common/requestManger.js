import Request from '@/js_sdk/luch-request/request'
import tokenManager from '@/common/tokenManager.js'
import serversManager from './serversManager'

const host = "https://opendoor.cel165.com"

const http = new Request()
let baseUrl = ''

http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = serversManager.getCurServerUrl()
    baseUrl = config.baseUrl
	config.header = {
		...config.header,
		dataType: 'json',
	}

	console.log('配置全局网络请求')
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
	// console.log('自定义验证器')
	console.log(statusCode)
	return statusCode === 200
}

/* 请求之前拦截器 */
http.interceptor.request((config, cancel) => {
	let token = tokenManager.getTokenStorage()
	if (token == null || token.length == 0) {
		config.header = {
			...config.header,
		}
	} else {
		config.header = {
			...config.header,
			token: token
		}
	}

	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	// console.log('请求之前拦截器')
	return config
})

/* 请求之后拦截器 */
http.interceptor.response((response) => {
	// if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//   return Promise.reject(response)
	// }
	// console.log('请求之后拦截器')
	return response
}, (response) => { // 请求错误做点什么
	return response
})

export default {
	HOST: host,
    changeConfig() {
        http.setConfig((config) => { /* 设置全局配置 */
            config.baseUrl = serversManager.getCurServerUrl()
            config.header = {
                ...config.header,
                dataType: 'json',
            }

            console.log('配置全局网络请求')
            return config
        })
    },
	request(options) {
		if (!options) {
			options = {}
		}
		uni.showLoading({})
		// 统一的请求日志记录
		this.reqlog(options)
		return new Promise((resolve, reject) => {
			http.request(options).then(res => {
				uni.hideLoading()
				this.reslog(res)
				if (res.data.code == 0) {
					resolve(res.data.data)
				} else if (res.data.code == 2) {
					uni.reLaunch({
						url: "../login/login"
					})
				} else {
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: res.data.msg
					});
					reject(res)
				}
			}).catch(err => {
				uni.hideLoading()
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: err
				});
				// 统一的响应日志记录
				this.reslog(err)
				reject(err)
			})
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
	/**
	 * 请求接口日志记录
	 */
	reqlog(req) {
		// if (process.env.NODE_ENV === 'development') {
		// 	console.log("【请求地址】 :" + req.url)
		// 	if (req.data) {
		// 		console.log("【请求参数】 : " + JSON.stringify(req.data))
		// 	}
		// }
		console.log("【请求地址】 : " + baseUrl + req.url)
		if (req.data) {
			console.log("【请求参数】 : " + JSON.stringify(req.data))
		}
	},
	/**
	 * 响应接口日志记录
	 */
	reslog(res) {
		let _statusCode = res.statusCode;
		// if (process.env.NODE_ENV === 'development') {
		// 	console.log("【响应结果地址】 : " + res.config.baseUrl + res.config.url)
		// 	if (res.data) {
		// 		console.log("【响应结果】: " + JSON.stringify(res.data))
		// 	}
		// }
		console.log("【响应结果地址】 : " + res.config.baseUrl + res.config.url)
		if (res.data) {
			console.log("【响应结果】: " + JSON.stringify(res.data))
		}
	}
}

