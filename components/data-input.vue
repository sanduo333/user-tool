<template>
	<view class="main-list input-border" @click="dataclick">
		<!-- 文本框 -->
		<input 
			class="main-input" 
			:value="value" 
			:placeholder="placeholder"
			type="text"  
			disabled="disabled"
			@input="onInput"
		/>
		<span 
			class="img iconfont icon-rili"
		/>
	</view>
</template>

<script>
	export default{
		data(){
			return {
			}
		},
		props:{
			value: String, //值
			placeholder: String, //框内提示
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		mounted() {
		},
		methods:{
			onInput(e) {
				//传出值
				this.$emit('input', e.target.value)
			},
			dataclick() {
				this.$emit('dataclick')
			}
		},
		computed:{
			
		}
	}
</script>

<style>
	@import url("./css/icon.css");
	
	.main-list{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: var(--input-height);   /* Input 高度 */
		padding: var(--input-height);
	}
	.main-input{
		flex: 1;
		text-align: left;
		font-size: var(--font-size-title);
		padding-right: 10upx;
	}
	.span{
		width: 25upx;
		height: 25upx;
	}
</style>
