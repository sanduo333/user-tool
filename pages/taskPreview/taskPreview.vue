<template>
	<view>
		<uni-section title="任务说明" type="line" padding>
			<text>{{task.note}}</text>
		</uni-section>

		<uni-section title="完成描述" type="line" padding>
			<text>{{task.finishDescription}}</text>
		</uni-section>

		<uni-section title="任务说明" type="line" padding>
			<image class="image" :src="task.finishImage" mode="aspectFill"></image>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				task: {},
			}
		},
		onLoad(option) {
			this.task = JSON.parse(decodeURIComponent(option.item))
		},
		methods: {

		}
	}
</script>

<style>
	.image {
		width: 200rpx;
		height: 200rpx;
	}
</style>