<template>
	<view class="news_list">
		<view class="list_box" v-for="(item, index) in  list " :key="index" @tap="noticeDetail(item, item.views)">
			<image style="width: 160rpx; height: 160rpx; border-radius: 6rpx;" :src="item.image" mode="aspectFill"
				lazy-load />
			<view class="box_detail">
				<view class="title">{{ item.name }}</view>
				<uni-rate style="padding: 10rpx 0rpx;" :readonly="true" size="15" :value="item.creditScore / 2000" />
				<view class="detail">
					<view class="detail_text">{{ item.name }}</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		}
	},
	methods: {
		noticeDetail(item, allViews) {
			this.$emit('noticeDetail', item)
		}
	}
}
</script>

<style lang="scss" scoped>
.news_list {
	width: 100%;
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
		margin-left: 36rpx;
		display: flex;
		flex-direction: column;

		.title {
			height: 30%;
			font-size: 30rpx;
			color: #323232;
			word-break: break-all;
		}

		.detail {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			.detail_text {
				font-size: 24rpx;
				color: #b3b3b3;
			}
		}
	}
}

.list_box:last-child {
	margin-bottom: 80rpx;
}
</style>