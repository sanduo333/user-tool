<script>
	import tokenManager from '@/common/tokenManager.js'

	export default {
		onLaunch: function() {
			console.log('App Launch')
			if (tokenManager.isLogin() == true) {
				console.log('已经登录')
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import './common/uni.css';
	@import './common/iconfont/iconfont.css';
	@import './components/firstui/fui-theme/fui-theme.css';

	/*每个页面公共css */
	page {
		background-color: #F4F8FB;
		/* background-color: aquamarine; */
		/* height: 100%; */
	}
</style>