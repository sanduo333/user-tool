<template>
	<view class="news_list">
		<view
			:class="{list_box_finished_bg: finishedStatus,list_box_success_bg: successStatus,list_box_fail_bg: failStatus}"
			v-for="(item, index) in list" :key="index" @tap="detail(item)">
			<view class="list_box">
				<view style="overflow: hidden;">
					<image style="width: 160rpx; height: 160rpx; border-radius: 6rpx;" :src="item.image"
						mode="aspectFill" lazy-load />
				</view>
				<view class="box_detail">
					<view class="title">
						<text>{{ item.name }}</text>
					</view>
					<view class="detail">
						<view class="score_title">奖励{{ item.score }}分</view>
						<view class="detail_text">
							<text>提交时间:</text>
							<text> {{ item.startTime | timeSecond }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		timeSecond
	} from '../../utils/time.js'

	export default {
		filters: {
			timeSecond,
		},
		props: {
			list: {
				type: Array,
				default: []
			},
			statusInfo: {
				type: String,
				default: 'user_finished'
			},
		},
		data() {
			return {
				finishedStatus: false,
				successStatus: true,
				failStatus: false
			}
		},
		methods: {
			detail(item) {
				this.$emit('detail', item)
			}
		},
		computed: {
			classObj() {
				if (this.statusInfo == 'user_finished') {
					this.finishedStatus = true
					this.successStatus = false
					this.failStatus = false
				} else if (this.statusInfo == 'check_success') {
					this.finishedStatus = false
					this.successStatus = true
					this.failStatus = false
				} else if (this.statusInfo == 'check_rejected') {
					this.finishedStatus = false
					this.successStatus = false
					this.failStatus = true
				}

				return {
					list_box_finished_bg: this.finishedStatus,
					list_box_success_bg: this.successStatus,
					list_box_fail_bg: this.failStatus
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.news_list {
		width: 100%;
	}

	.list_box_finished_bg {
		position: relative;
		overflow: hidden;
		margin-top: 25rpx;
	}

	.list_box_finished_bg:before {
		content: "审核中";
		position: absolute;
		top: 0px;
		right: -27px;
		z-index: 1;
		padding: 14px 22px 5px;
		background-color: #FD9A08;
		transform: rotate(45deg);
		font-size: 12px;
		color: #FFFFFF;
	}

	.list_box_success_bg {
		position: relative;
		overflow: hidden;
		margin-top: 25rpx;
	}

	.list_box_success_bg:before {
		content: "审核成功";
		position: absolute;
		top: 0px;
		right: -27px;
		z-index: 1;
		padding: 14px 22px 5px;
		background-color: #13C463;
		transform: rotate(45deg);
		font-size: 12px;
		color: #FFFFFF;
	}

	.list_box_fail_bg {
		position: relative;
		overflow: hidden;
		margin-top: 25rpx;
	}

	.list_box_fail_bg:before {
		content: "审核失败";
		position: absolute;
		top: 0px;
		right: -27px;
		z-index: 1;
		padding: 14px 22px 5px;
		background-color: #F45151;
		transform: rotate(45deg);
		font-size: 12px;
		color: #FFFFFF;
	}

	.list_box {
		display: flex;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
		padding: 30rpx 30rpx;
		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);

		.box_detail {
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;

			.title {
				font-size: 34rpx;
				font-weight: 500;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;

				color: rgba(0, 0, 0, 0.9);
			}

			.detail {
				margin-top: 10rpx;
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;

				.score_title {
					float: right;
					font-size: 28rpx;
					color: rgba(242, 121, 0, 1);

					font-weight: 500;
				}

				text {
					font-size: 26rpx;
					color: rgba(0, 0, 0, 0.6);
					font-weight: 400;
				}
			}
		}
	}
</style>