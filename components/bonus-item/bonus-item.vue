<template>
	<view class="content">
		<view class="content_left">
			<text class="title">{{title}}</text>
			<text class="time">{{time | timeSecond}}</text>
		</view>
		<view class="content_right">
			<view v-if="type === 'income'">
				<text class="income_money">+{{money}}</text>
			</view>
			<view v-else>
				<text class="money">-{{money}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		timeSecond
	} from '../../utils/time.js'

	export default {
		name: "bonus-item",
		props: {
			title: String,
			time: Number,
			money: Number,
			type: String
		},
		data() {
			return {};
		},
		filters: {
			timeSecond,
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 25rpx;
		margin: 20rpx 30rpx;
		border-radius: 20rpx;
		background-color: white;
	}

	.content_left {
		display: flex;
		flex-direction: column;

		.title {
			font-size: 35rpx;
			margin-bottom: 10rpx;
		}

		.time {
			font-size: 26rpx;
			color: #b3b3b3;
		}
	}

	.content_right {
		display: flex;
		justify-content: center;
		align-items: center;

		.income_money {
			color: #60C49A;
			font-weight: bold;
		}

		.money {
			color: red;
			font-weight: bold;
		}
	}
</style>