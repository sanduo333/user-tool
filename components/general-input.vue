<template>
	<view class="main-list input-border">
		<!-- 文本框 -->
		<input 
			class="main-input" 
			:value="value" 
			:type="type" 
			:focus="focus"
			adjust-position="true"
			:maxlength="maxlength" 
			:placeholder="placeholder" 
			@input="onInput"
		/>
	</view>
</template>

<script>
	export default{
		data() {
			return {}
		},
		props: {
			type: String, //类型
			value: String, //值
			placeholder: String, //框内提示
			maxlength: {
				//最大长度
				type: [Number,String],
				default: 20,
			},
			focus: {
				type: Boolean,
				default: false
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		methods: {
			onInput(e) {
				//传出值
				this.$emit('input', e.target.value)
			},
		},
		computed: {
			_type(){
				//处理值
				const type = this.type
				return type == 'password' ? 'text' : type
			},
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
		font-size: 28upx;
		padding-right: 10upx;
	}
	
</style>
