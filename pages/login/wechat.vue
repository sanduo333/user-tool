<template>
	<view>
		<view class="lo_icon">
			<view class="lo_image">
				<image src="../../static/common/icon.png" mode=""></image>
			</view>
			<view class="lo_text">
				<image src="../../static/common/iconfont.png" mode=""></image>
			</view>
		</view>

		<view class="content" style="border-top: 1px solid #CCCCCC;">
			<view>申请获取以下权限</view>
			<view class="content_text">获得你的公开信息(昵称、头像等)</view>
			<button type="primary" style="background-color: #65bb25;" open-type="getPhoneNumber"
				@getphonenumber="getPhoneNumber">微信验证登录</button>
			<button type="default" @tap="cancel">取消登录</button>
			<wyb-loading ref="loading" title="登录中..." />
		</view>
	</view>
</template>

<script>
	import requestManger from '@/common/requestManger.js'

	export default {
		data() {
			return {
				jsCode: ''
			}
		},
		onLoad() {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					console.log("login", JSON.stringify(res));
					this.jsCode = res.code;
					//console.log('res.code',res.code)
				}
			})
		},
		methods: {
			getPhoneNumber(e) {
				console.log(e)
				// uni.checkSession({
				// 	success() {
				// 		console.log('success')
				// 	},
				// 	fail() {
				// 		console.log('fail')
				// 	},
				// 	complete() {
				// 		console.log('complete')
				// 	}
				// })

				requestManger.post('/rights/v1/get_phone', {
					code: e.detail.code,
				}).then(res => {
					console.log(res)
					let resObj = JSON.parse(res)
					console.log(resObj)
					// requestManger.post('/rights/v1/decrypt_phone', {
					// 	sessionID: resObj.session_key,
					// 	encrypteData: e.detail.encryptedData,
					// 	iv: e.detail.iv
					// }).then(res => {
					// 	console.log(res)

					// }).catch(err => {

					// })

				}).catch(err => {

				})
			},
			cancel() {
				uni.getUserProfile({
					desc: "huoqu",
					success: res => {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.lo_icon {
		margin-bottom: 95rpx;
		margin-top: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.lo_image {
			margin-bottom: 22rpx;

			image {
				width: 124rpx;
				height: 124rpx;
			}
		}

		.lo_text {
			image {
				width: 196rpx;
				height: 54rpx;
			}
		}
	}

	.content {
		width: 80%;
		margin: 0 auto;
		padding: 20rpx 0;

		.content_text {
			font-size: 24rpx;
			color: #CCCCCC;
			margin: 30rpx 0 60rpx 0;
		}

		button {
			margin-bottom: 30rpx;
		}
	}
</style>