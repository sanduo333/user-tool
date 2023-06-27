<template>
	<view class="item-content box-shadow">
		<view class="first-back">
			<text>{{ shareItem.name }}</text>
			<text>{{ shareItem.phone }}</text>
		</view>
		<view class="division"></view>
		<view class="second-back">
			<text>{{getStartTime()}}</text>
			<text> - </text>
			<text>{{getEndTime()}}</text>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js'
	
	export default {
	    props: {
	        shareItem: {
	            type: Object,
	            default: function(e) {
	                return {}
	            }
	        }
	    },
		methods: {
			getStartTime() {
				return util.dateFormat("YYYY-mm-dd HH:MM", new Date(this.shareItem.validTimeStart))
			},
			getEndTime() {
				return util.dateFormat("YYYY-mm-dd HH:MM", new Date(this.shareItem.validTime))
			},
		}
	}
</script>

<style>
	.item-content {
		border-radius: 10upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-left: 20upx;
		padding-right: 20upx;
		padding-top: 35upx;
		padding-bottom: 35upx;
	}
	
	.first-back {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
	
	.division {
		border-top:1upx dashed #999999; 
		height:1upx;
		width: 100%;
		margin-top: 15upx;
		margin-bottom: 15upx;
	}
	
	.second-back {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
	
</style>
