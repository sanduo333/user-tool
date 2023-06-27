<template>
	<view class="content">
		<view class="top">
			<view class="info_bg">
				<image :src="profileUrl" mode="aspectFill">
				</image>
				<view class="user_bg">
					<text>昵称</text>
					<text>{{ phone }}</text>
				</view>
			</view>

			<view class="bonus_bg">
				<view class="bonus">
					<text>300</text>
					<text>积分余额</text>
				</view>
				<view class="bonus">
					<text>30</text>
					<text>累计获取</text>
				</view>
				<view class="bonus">
					<text>50</text>
					<text>累计支出</text>
				</view>
			</view>
		</view>


		<view class="list-content">
			<me-item class="list" icon="/static/icon_detail.png" title="积分明细" @click.native="detailClick()">
			</me-item>
			<me-item class="list" icon="/static/icon_task.png" title="我的任务" @click.native="taskClick()">
			</me-item>
			<me-item class="list" icon="/static/icon_rule.png" title="积分规则" @click.native="ruleClick()">
			</me-item>
			<me-item class="list" icon="/static/icon_about.png" title="关于我们" @click.native="aboutClick()">
			</me-item>
			<me-item class="list" icon="/static/icon_logout.png" title="退出登录" @click.native="logoutClick()">
			</me-item>
		</view>
	</view>
</template>

<script>
	import meItem from '../../components/me-item.vue'
	import tokenManager from '@/common/tokenManager.js'
	import requestManger from '@/common/requestManger.js'
	import {
		mapState
	} from 'vuex'

	export default {
		onShow: function() {
			uni.hideLoading()
		},
		data() {
			return {

			}
		},
		components: {
			meItem
		},
		methods: {
			detailClick() {
				uni.navigateTo({
					url: "../bonusDetail/bonusDetail"
				})
			},
			taskClick() {
				uni.navigateTo({
					url: "../myTask/myTask"
				})
			},
			ruleClick() {
				let p = encodeURIComponent("https://baidu.com")
				uni.navigateTo({
					url: `/pages/webView/webView?path=${p}`
				})
			},
			aboutClick() {
				let p = encodeURIComponent("https://baidu.com")
				uni.navigateTo({
					url: `/pages/webView/webView?path=${p}`
				})
			},
			logoutClick() {
				tokenManager.setTokenStorage("")
				this.$store.commit('setPhone', "")
				this.$store.commit('setToken', "")
				uni.reLaunch({
					url: "../login/login"
				})
			}
		},
		computed: {
			profileUrl() {
				return '/static/profile.png'
			},
			...mapState(['phone', 'userInfo'])
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.top {
		height: 450rpx;
		width: 100%;
		position: relative;
		background-color: #5199ff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.info_bg {
			display: flex;
			flex-direction: row;
			width: 100%;
			margin-top: 130rpx;

			image {
				width: 140upx;
				height: 140upx;
				border-radius: 70upx;
				margin-left: 70rpx;
			}

			.user_bg {
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				justify-content: center;

				text {
					color: white;
					font-weight: bold;
					padding: 5rpx 0rpx;
				}
			}
		}

		.bonus_bg {
			margin-top: auto;
			margin-bottom: 30rpx;
			display: flex;
			width: 100%;
			justify-content: space-around;

			.bonus {
				display: flex;
				flex-direction: column;
				align-items: center;

				text {
					color: white;
				}

				.phone {
					margin: 10rpx;
				}
			}
		}
	}

	.list-content {
		width: 100%;
		margin-top: 50upx;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.list {
		width: 85%;
		margin-bottom: 25upx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
</style>