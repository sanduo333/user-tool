<template>
	<!-- 	<scroll-view :style="{height:scrollheight+'px'}" scroll-y="true" class="list" @scrolltolower="lower">
		<view class="top">
			<text>玩转积分\r\n畅赢大礼</text>
		</view>
		<view class="item_bg" v-if="taskList.length != 0">
			<TaskItem class="item" :list='taskList' @detail='detail' />
			<uni-load-more :status="moreStatus"></uni-load-more>
		</view>
		<view v-else>
			<view class="nothing">没有数据</view>
		</view>
	</scroll-view> -->

	<view :style="{height:scrollheight+'px'}">
		<custom-scroll class="list" ref="scroll" @onPullDown="pullDown" @onLoadMore="onLoadMore">
			<view class="top">
				<text>玩转积分\r\n畅赢大礼</text>
			</view>
			<view class="item_bg" v-if="taskList.length != 0">
				<TaskItem class="item" :list='taskList' @detail='detail' />
				<uni-load-more :status="moreStatus"></uni-load-more>
			</view>
			<view v-else>
				<view class="nothing">没有数据</view>
			</view>
		</custom-scroll>
	</view>

</template>

<script>
	import requestManger from '@/common/requestManger.js'
	import TaskItem from '@/components/task-item/task-item.vue'
	import customScroll from '@/components/custom-scroll/custom-scroll.vue'

	export default {
		components: {
			TaskItem,
			customScroll
		},
		data() {
			return {
				taskList: [],
				moreStatus: 'no-more',
				requestParams: {
					"pageInfo": {
						"page": 1,
						"size": 6
					},
					"entity": {
						"statusInfo": "waiting_accept"
					}
				},
				scrollheight: 750,
			};
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight
					this.scrollheight = height;
				}
			});
			this.pullDown(null);
			uni.$on('refresh', () => {
				this.pullDown(null)
			})
		},
		methods: {
			onLoadMore() {
				this.requestParams.pageInfo.page++
				this.getTaskList(null)
			},
			detail(item) {
				let parameters = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: "../taskDetail/taskDetail?item=" + parameters
				})
			},
			pullDown(done) {
				this.requestParams.pageInfo.page = 1
				this.moreStatus = "more"
				this.getTaskList(done);
			},
			getTaskList(done) {
				if (this.moreStatus == "no-more") {
					return
				}

				requestManger.post('/api/v1/sp_bz/bonus_task/get_bonus_task', this.requestParams).then(res => {
					if (done) {
						done()
					}
					if (res.pageInfo.page == 1) {
						this.taskList = res.results
					} else {
						this.taskList = this.taskList.concat(res.results)
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
			}
		}
	}
</script>

<style lang="scss">
	.list {
		width: 100%;

		.top {
			height: 350rpx;
			width: 100%;
			position: relative;
			background-color: #5199ff;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				color: white;
				font-size: 60rpx;
				font-weight: bold;
				margin-top: 50rpx;
			}
		}

		.item_bg {
			display: flex;
			flex-direction: column;
			align-items: center;

			.item {
				width: 90%;
			}
		}
	}

	.nothing {
		color: #B3B3B3;
		width: 100%;
		height: 30rpx;
		text-align: center;
		padding: 20rpx 0;
		margin-top: 100rpx;
	}
</style>