<template>
	<view>
		<view class="box">
			<view class="msg" style="border: 0;">
				<view class="text">任务说明</view>
			</view>
			<view class="text3" style="border-bottom: 1rpx solid #e6e6e6; padding-bottom: 30rpx;">{{task.note}}</view>

			<view class="msg" style="border: 0;">
				<view class="text">完成描述<i style="color: #d93232;">*</i></view>
				<view class="text">{{textNum}}/140</view>
			</view>
			<textarea value="" placeholder-style="color:#b3b3b3" :placeholder="desPalceholder" maxlength='140'
				@input='descInput' v-model="taskDes" @focus="desPalceholder=''"
				@blur="taskDes==''?desPalceholder='请简要描述任务信息':''" />
			<view class="msg" style="border: 0;">
				<view class="text">完成图片<i style="color: #d93232;">*</i></view>
				<view class="text">{{photoCount}}/{{uploadCount}}</view>
			</view>
			<view class="text3">添加任务完成相关图片</view>
			<easyUpload ref='upload' :dataList="imageList" :uploadUrl="uploadUrl" :uploadCount="uploadCount"
				@successImage="successImage" :uploadIcon='uploadIcon' :clearIcon='clearIcon' @imgCount='imgCount'
				:autoUpload='false' />
		</view>
		<view class="btn-container">
			<!-- <button class="btn" type="default">提交任务</button> -->
			<view class="btn1" @tap="submitTask()">提交任务</view>
		</view>
	</view>
</template>

<script>
	import easyUpload from '@/components/easyUpload/easy-upload.vue'
	import requestManger from '@/common/requestManger.js'
	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			easyUpload
		},
		data() {
			return {
				taskId: 0,
				textNum: 0,
				desPalceholder: '请简要描述任务信息',
				taskDes: '',
				imageList: [],
				uploadUrl: this.$websiteUrl + '/v1/uploads',
				category: 'image',
				uploadCount: 1,
				photos: [],
				photoCount: 0,
				uploadIcon: '../../static/btn_02_add.png',
				clearIcon: '../../static/btn_03_del.png',
				task: {},
			}
		},
		onLoad(option) {
			this.task = JSON.parse(decodeURIComponent(option.item))
			this.taskId = JSON.parse(decodeURIComponent(option.item)).objId
			console.log(this.taskId)
		},
		methods: {
			descInput(e) {
				this.textNum = e.detail.value.length
			},
			successImage(e) {
				this.photos.push(e);
				if (this.photoCount == this.uploadCount) {
					requestManger.post('/api/v1/sp_bz/bonus_task/user_finish_bonus_task', {
						finishImage: e,
						finishDescription: this.taskDes,
						objId: this.taskId,
						userId: this.userInfo.userId
					}).then(res => {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '提交成功'
						})
						uni.navigateBack()
						uni.$emit('refresh')
					}).catch(err => {
						if (done) {
							done()
						}
					})
				}
			},
			imgCount(num) {
				this.photoCount = num.length
			},
			submitTask() {
				if (this.taskDes.length == 0) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入任务信息'
					})
					return
				}
				this.$refs.upload.unifiedUpload()
			},
		},
		computed: {
			...mapState(['userInfo'])
		}
	}
</script>

<style lang="scss">
	.btn {
		width: 100%;
		height: 104rpx;
		text-align: center;
		line-height: 104rpx;
		color: #FFFFFF;
		font-size: 34rpx;
		background-color: #68cda2;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.box {
		padding: 0px 28rpx;
		background-color: #FFFFFF;
		padding-bottom: 50rpx;
	}

	.head {
		font-size: 44rpx;
		color: #333333;
		font-weight: bold;
		padding-top: 12rpx;
		padding-bottom: 38rpx;
		border-bottom: 1px solid #e6e6e6;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		font-size: 32rpx;
		color: #333333;
		margin-top: 32rpx;
		font-weight: bold;
	}

	.msg {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 104rpx;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;
	}

	.text {
		display: flex;
		font-size: 30rpx;
		color: #262626;
	}

	input {
		text-align: right;
		font-size: 30rpx;
		color: #4d4d4d;
	}

	.textInput {
		display: flex;
		justify-content: space-between;
		margin-top: 28rpx;
	}

	textarea {
		width: 100%;
		border-bottom: 1rpx solid #e6e6e6;
		height: 200rpx;
	}

	.text3 {
		font-size: 30rpx;
		color: #B3B3B3;
	}

	.text_left {
		font-size: 30rpx;
		color: #262626;
	}

	.text_right {
		font-size: 30rpx;
		color: #808080;
	}

	.btn-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 100rpx;

		.btn {
			width: 90%;
			position: static;
			background-color: #5199ff;
			color: white;
		}

		.btn1 {
			width: 90%;
			height: 100rpx;
			border-radius: 50rpx;
			text-align: center;
			line-height: 104rpx;
			color: #FFFFFF;
			font-size: 34rpx;
			background-color: #5199ff;
			// position: fixed;
			// bottom: 0;
			// left: 0;
		}
	}
</style>