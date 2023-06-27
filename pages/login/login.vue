<template>
	<view class="content">
		<view class="shop_login_bg">
			<text>商户登录></text>
		</view>

		<view class="logo-container">
			<image src="../../static/task_detail.png" mode="aspectFit"></image>
			<text>用户端</text>
		</view>

		<view class="main">
			<button v-if="showAgree==false" hover-class="none" type="primary" size="default"
				@click="checkAgree">微信登录/注册</button>
			<button v-else type="primary" hover-class="none" size="default" open-type="getPhoneNumber"
				@getphonenumber="getPhoneNumber">微信登录/注册</button>

			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree ? 'cuIcon-radiobox' : 'cuIcon-round'">
					阅读并同意以下协议</text>
				<text class="agreement" @tap="privateClick">《协议》</text>
				<!-- <navigator class="agreement" url="../userAgreement/userAgreement" open-type="navigate">《协议》</navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import util from '@/common/util.js'
	import Md5 from 'js-md5'
	import requestManger from '@/common/requestManger.js'
	import tokenManager from '@/common/tokenManager.js'

	export default {
		onShow() {
			uni.hideLoading()
		},
		data() {
			return {
				showAgree: false, //协议是否选择
			}
		},
		methods: {
			privateClick() {
				let p = encodeURIComponent("https://baidu.com")
				uni.navigateTo({
					url: `/pages/webView/webView?path=${p}`
				})
			},
			isShowAgree() {
				this.showAgree = !this.showAgree;
			},
			checkAgree() {
				if (this.showAgree == false) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请先同意《协议》'
					});
				}
			},
			getPhoneNumber(e) {
				console.log(e)
				requestManger.post('/rights/v1/get_phone', {
					code: e.detail.code,
				}).then(res => {
					this.$store.commit('setPhone', res.phone_info.phoneNumber)
					this.$store.commit('setToken', res.token)
					this.$store.commit('setUserInfo', {
						userId: res.userId
					})
					tokenManager.setTokenStorage(res.token)
					uni.switchTab({
						url: '/pages/index/index'
					})
				}).catch(err => {})
			},
		},
	}
</script>

<style lang="scss">
	@import url("../../components/css/icon.css");

	.content {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
	}

	.shop_login_bg {
		margin-top: 50rpx;
		display: flex;
		width: 100%;
		justify-content: flex-end;
		color: #007AFF;

		text {
			margin-right: 50rpx;
		}
	}

	.logo-container {
		margin-top: 100rpx;
		width: 100%;
		height: 150px;
		flex-grow: 0;
		background-image: url('~@/static/logo_back.png');
		background-repeat: no-repeat;
		background-size: 100% auto;
		overflow: hidden;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text {
			margin-top: 20rpx;
		}

		image {
			width: 150rpx;
			height: 150rpx;
		}
	}

	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		width: 90%;
		margin-top: 100rpx;

		button {
			width: 100%;
			background-color: $uni-color-primary;
			color: white;
		}
	}

	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;

		.agreement {
			color: var(--theme-btn-bg);
		}
	}
</style>ss