<template>
	<view class="news_list">
		<view class="list_box" v-for="(item, index) in list" :key="index" @tap="detail(item)">
			<view style="overflow: hidden;">
				<image style="width: 160rpx; height: 160rpx; border-radius: 6rpx;" :src="item.image" mode="aspectFill"
					lazy-load />
			</view>
			<view class="box_detail">
				<view class="title">{{ item.name }}</view>
				<view class="sub_title">{{ item.note }}</view>
				<view class="detail">
					<view class="score_title">奖励{{ item.score }}分</view>
					<view class="detail_text">
						<text>活动时间:</text>
						<text> {{ item.startTime | timeStamp }}</text>
						<text> - {{ item.expireTime | timeStamp }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		timeStamp
	} from '../../utils/time.js'

	export default {
		filters: {
			timeStamp,
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		methods: {
			detail(item) {
				this.$emit('detail', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.news_list {
		width: 100%;
		padding-top: 50upx;
	}

	.list_box {
		display: flex;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
		margin-top: 25rpx;
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

			.sub_title {
				font-size: 28rpx;
				color: rgba(0, 0, 0, 0.7);
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

	.list_box:last-child {
		margin-bottom: 80rpx;
	}
</style>