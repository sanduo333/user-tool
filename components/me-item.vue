<template>
	<view class="item-content box-shadow">
		<image :src="icon" mode="aspectFit"></image>
		<text>{{ title }}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			icon: String, 
			title: String,
		},
	}
</script>

<style>

.item-content {
	border-radius: 5upx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.item-content image {
	width: 90upx;
	height: 90upx;
	margin-left: 20upx;
	margin-top: 20upx;
	margin-bottom: 20upx;
	margin-right: 30upx;
}

</style>
