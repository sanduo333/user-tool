#### 这里只展示app版使用示例    
##### 重要提示：不要一开始就一直将卡片靠近nfc通信区域，否则点我读卡后失效
##### 正确操作：先点击点我读卡，让nfc处于监听状态后，再将卡片靠近
	<template>
	  <view class="member-page">
		<uni-notice-bar show-icon text="读卡须知: 每次读卡之前先点击读卡按钮!" />
		<button @click="readData()">点我读卡</button>
	  </view>
    </template>

    <script>
	import nfc from '../../utils/nfc/tool.js'
	export default {
		data() {
			return {
				cardUID: ""
			}
		},
		methods: {
			readData() {
				let _this = this;
				nfc.nfcGetId({
					success: function(data) {
						console.log(data)
						_this.cardUID = data
					},
					fail: function(err) {

					},
					complete: function() {

					}
				});

			}
			
		},
		onHide() {
			// #ifdef APP-PLUS
			plus.globalEvent.removeEventListener('newintent', function() {
				//console.log('remove newintent');
			});
			plus.globalEvent.removeEventListener('pause', function(e) {
				//console.log('remove pause');
			});
			plus.globalEvent.removeEventListener('resume', function(e) {
				//console.log('remove resume');
			});
			// #endif
		},
		// 销毁监听事件 避免重新进入页面重复读卡
		beforeDestroy() {
			// #ifdef APP-PLUS 
			plus.globalEvent.removeEventListener('newintent', function() {
				//console.log('remove newintent');
			});
			plus.globalEvent.removeEventListener('pause', function(e) {
				//console.log('remove pause');
			});
			plus.globalEvent.removeEventListener('resume', function(e) {
				//console.log('remove resume');
			});
			// #endif
		}
		
	}
    </script>
#### 微信小程序版体验一下(手机功能 --> nfc读卡)
![avatar](https://mp-a9f90fc5-628e-43f8-a370-00b89368841b.cdn.bspapp.com/cloudstorage/16ff40bb-d352-4f46-a9ed-2ef0406b19c0.jpg)
