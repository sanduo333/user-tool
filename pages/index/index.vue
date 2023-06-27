<template>
	<view :style="{ height: scrollheight + 'px' }">
		<custom-scroll class="list" ref="scroll" @onPullDown="pullDown" @onLoadMore="onLoadMore">
			<view class="top">
				<view class="background"></view>
			</view>

			<view class="content">
				<view class="banner-content">
					<uni-swiper-dot class="uni-swiper-dot-box" :info="bannerList" :current="current" field="name"
						:mode="mode">
						<swiper :autoplay="true" :interval="5000" :duration="1000" :circular='true' :indicator-dots="false"
							duration="1000" class="swiper-box" @change="change">
							<swiper-item v-for="item in bannerList" :key='item.cid' @click="openBanner(item)">
								<view class="swiper-item">
									<image :src="item.deployImg" lazy-load mode="scaleToFill">
									</image>
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view>

				<view class="nav_content">
					<view v-for="(item, index) in indexClassList" :key='item.id' @tap="openClass(item)" class="nav_box">
						<view class="nav_img">
							<image style="width: 100%; height: 100%;" :src="item.image" lazy-load mode="scaleToFill" />
						</view>
						<view class="nav_text">
							{{ item.name }}
						</view>
					</view>
				</view>

				<ListItem class="shop_content" :list='shopList' @noticeDetail='openShopDetail' />
				<uni-load-more :status="moreStatus"></uni-load-more>
			</view>
		</custom-scroll>
	</view>
</template>

<script>
import requestManger from '@/common/requestManger.js'
import tokenManager from '@/common/tokenManager.js'
import ListItem from '@/components/index-item/index-item.vue'
import customScroll from '@/components/custom-scroll/custom-scroll.vue'

export default {
	components: {
		ListItem,
		customScroll
	},
	data() {
		return {
			bannerList: [], //banner图片
			indexClassList: [],
			shopList: [], // 店铺列表
			current: 0,
			mode: 'nav',
			scrollheight: 750,
			page: 1,
			moreStatus: "more"
		}
	},
	onLoad() {
		uni.getSystemInfo({
			success: (res) => {
				let height = res.windowHeight
				this.scrollheight = height;
			}
		});
		this.getIndexClassList();
		this.getbannerList();
		this.getShopList(null)
	},
	methods: {
		openBanner(item) {
			let parameters = encodeURIComponent(JSON.stringify(item))
			uni.navigateTo({
				url: "../bannerDetail/bannerDetail?item=" + parameters
			})
		},
		openClass(item) {
			if (tokenManager.isLogin()) {
				if (item.id == 2 || item.id == 3) {
					uni.navigateTo({
						url: item.path
					})
				} else {
					uni.switchTab({
						url: item.path
					})
				}
			} else {
				uni.showModal({
					title: '提示信息',
					content: '请先登录',
					cancelText: '取消',
					confirmText: '去登录',
					cancelColor: "#262626",
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					}
				})
			}
		},
		openShopDetail(item) {
			let parameters = encodeURIComponent(JSON.stringify(item))
			uni.navigateTo({
				url: "../shopDetail/shopDetail?item=" + parameters
			})
		},
		pullDown(done) {
			this.page = 1
			this.moreStatus = "more"
			this.getbannerList();
			this.getShopList(done)
		},
		onLoadMore() {
			this.page++
			this.getShopList(null)
		},
		getbannerList() {
			requestManger.get('/api/v1/sp_bz/front_page/banner').then(res => {
				if (res.length != 0) {
					this.bannerList = res
				} else {
					this.bannerList = [{
						"cid": 0,
						"deployText": "banner1",
						"deployImg": "../../static/banner1.png",
					}, {
						"cid": 1,
						"deployText": "banner1",
						"deployImg": "../../static/banner2.png",
					}]
				}
			}).catch(err => { })
		},
		getShopList(done) {
			if (this.moreStatus == "no-more") {
				return
			}

			requestManger.get('/api/v1/sp_bz/common/sys_param?paramName=shop_total_score').then(res => {

			}).catch(err => {

			})

			requestManger.get('/api/v1/sp_bz/front_page/front_page_shops', {
				page: this.page
			}).then(res => {
				if (done) {
					done()
				}
				if (res.pageInfo.page == 1) {
					this.shopList = res.results
				} else {
					this.shopList = this.shopList.concat(res.results)
				}
				if (res.pageInfo.page >= res.pageInfo.sumPage) {
					this.moreStatus = "no-more"
				} else {
					this.moreStatus = "more"
				}
			}).catch(err => {
				if (done) {
					done()
				}
			})
		},
		change(e) {
			this.current = e.detail.current;
		},
		getIndexClassList() {
			this.indexClassList = [{
				"id": 0,
				"name": "支付",
				"image": "../../static/pay.png",
				"path": "../code/code",
			}, {
				"id": 1,
				"name": "活动",
				"image": "../../static/task.png",
				"path": "../task/task",
			}, {
				"id": 2,
				"name": "积分明细",
				"image": "../../static/bonus.png",
				"path": "../bonusDetail/bonusDetail",
			}, {
				"id": 3,
				"name": "我的任务",
				"image": "../../static/task_detail.png",
				"path": "../myTask/myTask",
			}];
		},
	},
}
</script>

<style lang="scss">
.top {
	height: 350rpx;
	position: relative;

	.background {
		background-color: #5199ff;
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px;
		position: absolute;
		height: 350rpx;
		width: 100%;
	}
}

@media screen and (min-width: 500px) {
	.uni-swiper-dot-box {
		width: 400px;
		margin: 0 auto;
		margin-top: 8px;
	}

	.image {
		width: 100%;
	}
}

.content {
	margin-top: -200rpx;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.banner-content {
		width: 90%;
		height: 370rpx;
		border-radius: 20rpx;
		overflow: hidden;

		.swiper-box {
			// height: 100%;
			height: 370rpx;
			width: 100%;

			.swiper-item {
				height: 100%;
				width: 100%;
			}

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.shop_content {
		width: 90%;
		margin-top: 30rpx;
	}

}

.nav_content {
	background-color: #FFFFFF;
	margin-top: 30rpx;
	display: flex;
	width: 90%;
	align-items: center;
	flex-wrap: nowrap;
	justify-content: space-around;
	border-radius: 20rpx;
	overflow: hidden;
	padding: 25rpx 0rpx;

	.nav_box {
		flex: 0 0 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.nav_img {
			margin: 0;
			width: 88rpx;
			height: 88rpx;
			border-radius: 44rpx;
			overflow: hidden;
		}

		.nav_text {
			margin-top: 10rpx;
			font-size: 32rpx;
			color: #262626;
		}
	}
}
</style>