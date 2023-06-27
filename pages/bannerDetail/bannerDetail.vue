<template>
	<view>
		<view class="image_content">
			<image style="width: 100%; height: 100%; border-radius: 20rpx;" :src="banner.deployImg" mode="scaleToFill"
				lazy-load="true"></image>
		</view>
		<view class="head">{{ banner.name }}</view>
		<view class="record">
			<image style="width: 40rpx; height: 40rpx;" src="../../static/btn_07_time.png" mode="scaleToFill" />
			<view class="text">{{ banner.createTime | timeStamp }}</view>
		</view>
		<view class="version">
			<!-- <text>{{banner.detail}}</text> -->
			<rich-text :nodes="richdata"></rich-text>
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
				richdata: '',
				testTxt: '<h1>1111111</h1><h2><span style="background-color: rgb(114, 192, 64);">2222222</span></h2><h3>3333333333</h3><p><span style="color: rgb(255, 122, 69); background-color: rgb(115, 209, 61);">11111111</span></p><table style="width: auto;"><tbody><tr><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr></tbody></table><p><br></p>'
			}
		},
		filters: {
			timeStamp,
		},
		onLoad(option) {
			this.banner = JSON.parse(decodeURIComponent(option.item))
			this.formatRichText(this.banner.deployText)
		},
		methods: {
			formatRichText(data) {
				let newContent = data.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:330px;height:auto;display:inline-block;margin:18px auto;"');
				// return newContent;
				this.richdata = newContent
			}
		}
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