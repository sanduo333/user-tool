<template>
	<view class="content">
		<view class="header">
			<image class="image-tip" src="../../static/left_tip.png" mode="aspectFit"></image>
			<text class="text-tip">请将二维码靠近扫描器</text>
			<image class="image-tip" src="../../static/right_tip.png" mode="aspectFit"></image>
		</view>
		<view class="qr-container box-shadow">
			<span class="img iconfont icon-refresh" v-on:click="refreshQRCode()" />
			<view class="qrcode-back">
				<!-- <image class="image_mask" src="../../static/qrcode_mask.png" mode="aspectFit"></image> -->
				<tki-qrcode ref="qrcode" :val="val" :size="size" :unit="unit" :background="background"
					:foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval"
					:loadMake="loadMake" />
			</view>
			<text>{{ tip }}</text>
		</view>
	</view>
</template>

<script>
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode"
import requestManger from '@/common/requestManger.js'
import tokenManager from '@/common/tokenManager.js'
import {
	mapState
} from 'vuex'
import qrRuleUtil from '../../common/qrRuleUtil.js'

var curScreenBrightness;
var intervalID = 0;

export default {
	onShow: function () {
		if (tokenManager.isLogin()) {
			uni.setScreenBrightness({
				value: 1
			})
			this.startTimeQRCode()
			this.refreshQRCode()
		} else {
			uni.showModal({
				title: '提示信息',
				content: '请先登录',
				cancelText: '取消',
				confirmText: '去登录',
				cancelColor: "#262626",
				success(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				}
			})
		}
	},
	onLoad() {
		uni.getScreenBrightness({
			success: function (res) {
				console.log('当前屏幕亮度值：' + res.value);
				curScreenBrightness = res.value
			}
		})
	},
	onHide: function () {
		console.log('Home hid')
		clearInterval(intervalID)
		intervalID = 0
		uni.hideLoading()
		// uni.setScreenBrightness({
		// 	value: curScreenBrightness
		// })
		// console.log('恢复屏幕亮度值：' + curScreenBrightness);
	},
	mounted: function () { },
	data() {
		return {
			val: '123456789123456789123456789', // 要生成的二维码值
			size: 350, // 二维码大小
			unit: 'upx', // 单位
			background: '#FFFFFF', // 背景色
			foreground: '#000000', // 前景色
			pdground: '#000000', // 角标色
			icon: '', // 二维码图标
			iconsize: 40, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: true, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '', // 二维码生成后的图片地址或base64
			permissionInfo: {
				personType: "",
				personId: -1,
				personName: "",
				projectId: -1,
				projectName: "",
				passGroups: "",
				validTimeStart: -1,
				validTime: -1,
				token: "",
				aesKey: ""
			},
			tip: "每分钟自动刷新，请勿重复使用",
		}
	},
	components: {
		tkiQrcode
	},
	methods: {
		refreshQRCode() {
			let date = new Date()
			date.setMinutes(date.getMinutes() + 1)
			let timeStamp = parseInt(date.getTime() / 1000);
			let info = {
				phone: this.phone,
				time: timeStamp
			}
			this.val = qrRuleUtil(JSON.stringify(info), "1acop7c01df456m3")
			// this.val = qrRuleUtil('{"phone":"13248331547","time":1687708108663}', "1acop7c01df456m3")
			this.$refs.qrcode._makeCode()
		},
		startTimeQRCode() {
			if (intervalID == 0) {
				console.log("启动定时刷新二维码")
				intervalID = setInterval(() => {
					console.log("刷新二维码")
					this.refreshQRCode()
				}, 60000)
			}
		},
	},
	computed: {
		...mapState(['phone'])
	}
}
</script>

<style>
page {
	position: fixed;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
}

.custom-button {
	background-color: #4178E7;
	width: 150upx;
	height: 150upx;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	border-radius: 5px;
}

.header {
	width: 85%;
	height: 100upx;
	overflow: hidden;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.header image {
	height: 100%;
	flex-flow: 0;
}

.header text {
	height: 100%;
	flex-flow: 1;
	flex-shrink: 0;
	margin-left: 40upx;
	margin-right: 40upx;
	font-size: 35upx;
	color: #8C8999;

	display: flex;
	flex-direction: column;
	justify-content: center;
}

.qr-container {
	width: 85%;
	background-color: white;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.qr-container span {
	align-self: flex-end;
	margin-top: 20upx;
	margin-right: 20upx;
}

.qrcode-back {
	width: 100%;
	height: 100%;
	margin-top: 20upx;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

/* .image_mask {
		position: absolute;
		left: 0upx;
		top: 0upx;
		z-index: -2;
	}

	.image_qrcode {
		position: absolute;
		left: 10upx;
		top: 10upx;
	} */

.image_qrcode {
	margin-top: 20upx;
}

.qr-container text {
	padding-top: 40upx;
	padding-bottom: 50upx;
	font-size: 35upx;
	color: #8C8999;
}

.share-container {
	margin-top: 20px;
	width: 85%;
	height: 140upx;
	border-radius: 5px;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.share-container image {
	height: 90upx;
	width: 90upx;
}

.share-container .content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-left: 20upx;
}

.share-title {}

.share-subtitle {
	font-size: 30upx;
	color: var(--theme-color-title);
}
</style>