<template>
	<view>
		<swiper-tab-head class="tab_head" :tabBars='tabBars' :tabIndex='tabIndex' @tabtap='tabtap' />
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange"
				duration="200">
				<swiper-item>
					<custom-scroll class="list" ref="scroll" @onPullDown="onIncomePullDown"
						@onLoadMore="onIncomeLoadMore">
						<view v-if="incomeList.length != 0">
							<view class="bonus_item" v-for="(item, index) in incomeList" :key="index">
								<BonusItem :title="dictType[item.source]" :time="item.createTime" :money="item.total"
									type="income" />
							</view>
							<uni-load-more :status="moreStatus"></uni-load-more>
						</view>
						<view v-else>
							<view class="nothing">没有数据</view>
						</view>
					</custom-scroll>
				</swiper-item>
				<swiper-item>
					<custom-scroll class="list" ref="scroll" @onPullDown="onConsumePullDown"
						@onLoadMore="onConsumeLoadMore">
						<view v-if="consumeList.length != 0">
							<view class="bonus_item" v-for="(item, index) in consumeList" :key="index">
								<BonusItem :title="item.shopName" :time="item.createTime" :money="item.consumed" />
							</view>
							<uni-load-more :status="moreStatus"></uni-load-more>
						</view>
						<view v-else>
							<view class="nothing">没有数据</view>
						</view>
					</custom-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import SwiperTabHead from '../../components/common/swiper_tab_head.vue'
	import BonusItem from '../../components/bonus-item/bonus-item.vue'
	import requestManger from '@/common/requestManger.js'
	import customScroll from '@/components/custom-scroll/custom-scroll.vue'

	export default {
		components: {
			SwiperTabHead,
			BonusItem
		},
		data() {
			return {
				dictType: [],
				moreStatus: 'more',
				tabBars: [{
						'name': '获取',
						'id': 0
					},
					{
						'name': '消费',
						'id': 1
					},
				],
				tabIndex: 0,
				swiperheight: 500,
				incomeList: [],
				consumeList: [],
				isLoadMore: false,
				page: 1,
				scrollTop: 0,
				hasMore: true,
				loadingText: '加载中...',
				requestIncomeParams: {
					"pageInfo": {
						"page": 1,
						"size": 10
					},
					"entity": {}
				},
				requestConsumeParams: {
					"pageInfo": {
						"page": 1,
						"size": 10
					},
					"entity": {}
				}
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height;
				}
			});
			this.getDict()
			this.getIncomeList(null);
			this.getConsumeList(null);
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
			},
			// 左右滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
				if (e.detail.current == 0) {
					this.requestIncomeParams.pageInfo.page = 1
					this.moreStatus = "more"
					this.getIncomeList(null);
				} else {
					this.requestConsumeParams.pageInfo.page = 1
					this.moreStatus = "more"
					this.getConsumeList(null);
				}
			},
			pay(id) {
				uni.navigateTo({
					url: '../pay_detail/propertyPay?id=' + id
				})
			},
			getDict() {
				requestManger.get('/api/v1/sp_bz/common/dict', {
					dict_type: "bonus_source"
				}).then(res => {
					this.dictType = res
				}).catch(err => {

				})
			},
			onIncomePullDown(done) {
				this.requestIncomeParams.pageInfo.page = 1
				this.moreStatus = "more"
				this.getIncomeList(done)
			},
			onIncomeLoadMore() {
				console.log("----------------------")
				this.requestIncomeParams.pageInfo.page++
				this.getIncomeList(null)
			},
			getIncomeList(done) {
				if (this.moreStatus == "no-more") {
					return
				}

				requestManger.post('/api/v1/sp_bz/bonus_point/get_bonus_point', this.requestIncomeParams).then(res => {
					if (done) {
						done()
					}
					if (res.pageInfo.page == 1) {
						this.incomeList = res.results
					} else {
						this.incomeList = this.incomeList.concat(res.results)
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
			onConsumePullDown(done) {
				this.requestConsumeParams.pageInfo.page = 1
				this.moreStatus = "more"
				this.getConsumeList(done)
			},
			onConsumeLoadMore() {
				this.requestConsumeParams.pageInfo.page++
				this.getConsumeList(null)
			},
			getConsumeList(done) {
				if (this.moreStatus == "no-more") {
					return
				}

				requestManger.post('/api/v1/sp_bz/bonus_point/get_bonus_point_consume', this.requestConsumeParams).then(
					res => {
						if (done) {
							done()
						}
						if (res.pageInfo.page == 1) {
							this.consumeList = res.results
						} else {
							this.consumeList = this.consumeList.concat(res.results)
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
			//滚动时触发事件
			scroll: function(e) {
				this.scrollTop = e.detail.scrollTop;
			},
			//切换scroll-view事件
			changeScrollView() {
				this.scrollTop = 0; //回到最顶部
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab_head {
		background-color: white;
	}

	.uni-tab-bar {
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		background-color: #F4F8FB;

		.swiper-box {
			flex: 1;
			width: 100%;
			height: calc(100% - 100upx);
		}

		.list {
			width: 750upx;
			height: 100%;
		}
	}

	.bonus_item {}

	.loading-more {
		margin-top: 30upx;
		margin-bottom: 30upx;
		align-self: center;
		text-align: center;
	}

	.loading-more-text {
		color: #B3B3B3;
	}

	.nothing {
		color: #B3B3B3;
		width: 100%;
		height: 30rpx;
		text-align: center;
		padding: 20rpx 0;
	}
</style>