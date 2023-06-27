<template>
	<view class="page">		
<!-- 		<scroll-view 
			class="listview" 
			enableBackToTop="true" 
			scroll-y 
			@scrolltoupper="doRefresh()" 
			@scrolltolower="doInfinite()">
				<view v-for="(item, index) in dataList" :key="index">
					<share-item :shareItem="item" class="list-item">
					</share-item>
				</view>
				<view class="loading-more" v-if="isLoading || dataList.length > 4">
					<text class="loading-more-text">{{loadingText}}</text>
				</view>
				
				<share-item class="list-item">
				</share-item>
				<share-item class="list-item">
				</share-item>
				
		</scroll-view> -->
		<view class="no-content" v-if="dataList.length == 0">
			<text>您还没有分享记录!</text>
		</view>
		
		<custom-scroll 
			class="listview" 
			v-if="dataList.length != 0"
			ref="scroll" 
			@onPullDown="onPullDown"  
			@onLoadMore="onLoadMore">
				<view class="">
					<div class="list-item" v-for="(item, index) in dataList" :key="index">
						<share-item :shareItem="item">
						</share-item>
					</div>
					<view class="loading-more" v-if="isLoading || dataList.length > 4">
						<text class="loading-more-text">{{loadingText}}</text>
					</view>
				</view>
		</custom-scroll>
		
	</view>
</template>

<script>
	import shareItem from "../../components/share-item/share-item.vue"
	import requestManger from '@/common/requestManger.js'
	import customScroll from '@/components/custom-scroll/custom-scroll.vue'
	import { mapState } from 'vuex'
	import util from '@/common/util.js'
	
	export default {
		data() {
			return {
				dataList: [],
				hasMore: true,
				loadingText: '加载中...',
			}
		},
		onShow() {
			this.loadData(true)
		},
		created() {
			this.requestParams = {
				"pageInfo":{
					"page": 0,
					"size": 10
				},
				"entity":{
					"phone": this.phone
				}
			};
		},
		components: {
			shareItem,
			customScroll
		},
		methods: {
			onPullDown(done) {
				this.loadData(true, done)
			},
			onLoadMore() {
				this.loadData(false, null)
			},
			loadData(refresh, done) {
				if (refresh == true) {
					this.hasMore = true
					this.requestParams.pageInfo.page = 0
				}
				if (this.hasMore == false) {
					return
				}
				
				this.requestParams.pageInfo.page++
				requestManger.post('/api/v1/abcore/permission/phone/share/history', this.requestParams).then(res => {
					if (done) {
						done()
					}
					if (res.results.length > 0) {
						this.hasMore = true
						this.loadingText = "加载中..."
						this.dataList = this.dataList.concat(res.results)
					} else {
						this.hasMore = false
						this.loadingText = "没有更多数据了"
					}
				}).catch(err => {
					if (done) {
						done()
					}
				})
			}
		},
		computed: {
			...mapState(['phone'])
		}
	}
</script>

<style>
	
	.page {
		height: 100%;
	}
	
	.listview {
		height: 100%;
/* 		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center; */
	}

	.list-item {
		margin: 40upx;
	}
	
	.loading-more {
		margin-top: 30upx;
		margin-bottom: 30upx;
		align-self: center;
		text-align: center;
	}
	
	.no-content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;		
	}

</style>
