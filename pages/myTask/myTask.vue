<template>
	<view>
		<view class="dropdown">
			<fui-dropdown-menu :minWidth="300" right="0" :size="28" selectedColor="#465CFF" :options="options"
				@click="rangeItemClick" isCheckMark checkmarkColor="#465CFF" isReverse @close="rangeClose"
				ref="ddmRange">
				<view class="fui-filter__item" @tap="filterTap">
					<text>{{range}}</text>
					<view class="fui-filter__icon" :class="{'fui-icon__ani':rangeShow}">
						<fui-icon name="turningdown" :size="32"></fui-icon>
					</view>
				</view>
			</fui-dropdown-menu>
		</view>

		<view :style="{height:scrollheight+'px'}">
			<custom-scroll class="list" ref="scroll" @onPullDown="pullDown" @onLoadMore="onLoadMore">
				<view class="item_bg" v-if="taskList.length != 0">
					<MyTaskItem class="item" :list='taskList' :statusInfo="statusInfo" @detail='detail' />
					<uni-load-more :status="moreStatus"></uni-load-more>
				</view>
				<view v-else>
					<view class="nothing">没有数据</view>
				</view>
			</custom-scroll>
		</view>
	</view>
</template>

<script>
	import fuiDropdownMenu from "@/components/firstui/fui-dropdown-menu/fui-dropdown-menu.vue"
	import fuiIcon from "@/components/firstui/fui-icon/fui-icon.vue"
	import requestManger from '@/common/requestManger.js'
	import MyTaskItem from '@/components/my-task-item/my-task-item.vue'
	import customScroll from '@/components/custom-scroll/custom-scroll.vue'

	export default {
		components: {
			fuiDropdownMenu,
			fuiIcon,
			customScroll,
			MyTaskItem
		},
		data() {
			return {
				options: [{
					text: '审核中',
					value: 1,
					checked: true,
					statusInfo: "user_finished"
				}, {
					text: '审核成功',
					value: 2,
					statusInfo: "check_success"
				}, {
					text: '审核失败',
					value: 3,
					statusInfo: "check_rejected"
				}],
				range: '审核中',
				rangeShow: false,
				taskList: [],
				moreStatus: 'no-more',
				requestParams: {
					"pageInfo": {
						"page": 1,
						"size": 8
					},
					"entity": {
						"statusInfo": "user_finished"
					}
				},
				scrollheight: 750,
				statusInfo: 'user_finished',
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(88)
					this.scrollheight = height;
				}
			});
			this.pullDown(null);
		},
		methods: {
			filterTap() {
				//显示下拉框
				this.$refs.ddmRange.show()
				this.rangeShow = true;
			},
			rangeItemClick(e) {
				console.log(e)
				this.range = e.text
				this.rangeClose()
				this.requestParams.entity.statusInfo = this.options[e.index].statusInfo
				this.statusInfo = this.options[e.index].statusInfo
				this.pullDown(null);
			},
			rangeClose() {
				this.rangeShow = false;
			},
			onLoadMore() {
				console.log("额···························1231")
				this.requestParams.pageInfo.page++
				this.getTaskList(null)
			},
			detail(item) {
				let parameters = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: "../taskPreview/taskPreview?item=" + parameters
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
	.dropdown {
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		justify-content: center;
	}

	.fui-filter__item {
		width: 300rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		background-color: #fff;
	}

	.fui-filter__icon {
		transition: all .15s linear;
	}

	.fui-icon__ani {
		transform: rotate(180deg);
	}

	.list {
		width: 100%;

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