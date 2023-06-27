<template>
	<view>
		<view class="image_content">
			<image style="width: 100%; height: 100%; border-radius: 20rpx;" :src="banner.image" mode="scaleToFill"
				lazy-load="true"></image>
		</view>
		<view class="head">{{ banner.name }}</view>
		<view class="record">
			<image style="width: 40rpx; height: 40rpx;" src="../../static/btn_07_time.png" mode="scaleToFill" />
			<view class="text">{{ banner.createTime | timeStamp }}</view>
		</view>
		<view class="version">
			<text>{{banner.note}}</text>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		timeStamp
	} from '../../utils/time.js'

	export default {
		data() {
			return {
				banner: {},
			}
		},
		filters: {
			timeStamp,
		},
		onLoad(option) {
			this.banner = JSON.parse(decodeURIComponent(option.item))
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: white;
	}

	.image_content {
		width: 95%;
		height: 390rpx;
		margin: 30rpx auto;
		border-radius: 20rpx;
	}

	.head {
		font-size: 40rpx;
		color: #262626;
		line-height: 56rpx;
		width: 95%;
		margin: 0 auto;
		font-weight: bold;
		word-break: break-all;
	}

	.record {
		display: flex;
		align-items: center;
		width: 95%;
		margin: 0 auto;
		margin-top: 12rpx;
		padding-bottom: 12rpx;
		border-bottom: 1px solid #e6e6e6;

		.text {
			font-size: 24rpx;
			color: #b3b3b3;
			margin-left: 8rpx;
		}
	}

	.version {
		width: 95%;
		margin: 0 auto;
		margin-top: 40rpx;
		margin-bottom: 38rpx;
	}
</style>