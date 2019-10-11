<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button class="check-all" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
			<span>全选</span>
		</div>
		<div class="price">
			合计 : ¥ {{ totalPrice}}
		</div>
		<div class="calculate" @click="calcClick">
			去计算 ({{ checkLength }}) 
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	import { mapGetters } from 'vuex'
	export default {
		name:'CartBottomBar',
		components: {
			CheckButton
		},
		computed: {
			...mapGetters(['cartList']),
			totalPrice() {
				return this.cartList.filter(item =>{
					return item.checked
				}).reduce((preValue, item) =>{
					return preValue + item.price * item.count
				}, 0).toFixed(2)
			},
			checkLength(){
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll(){
				if(this.cartList.length === 0) return false
				// 1.filter函数方法   全部查找，性能不佳
				// return !(this.cartList.filter(item => !item.checked).length)
				// 2.find函数方法  查找到一个立即返回值，性能好一点
				// return !this.cartList.find(item => !item.checked)
				// 3.for循环遍历
				for (let item of this.cartList) {
					if (!item.checked) {
						return false
					}
				}
				return true
			}
		},
		methods:{
			checkClick(){
				if (this.isSelectAll) { //全部选中的情况
					this.cartList.forEach(item => item.checked = false)
				} else{ //部分或全部选中的情况
					this.cartList.forEach(item => item.checked = true)
				}
			},
			calcClick(){
				if(!this.isSelectAll) {
					this.$toast.show('请选择购买的商品', 1500)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.bottom-bar{
		height: 40px;
		background-color: #eee;
		position: relative;
		line-height: 40px;
		display: flex;
		font-size: 14px;
	}
	.check-content{
		display: flex;
		align-items: center;
		margin-left: 5px;
		width: 60px;
	}
	.check-all{
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		margin-right: 5px;
	}
	.price{
		margin-left: 50px;
		flex: 1;
	}
	.calculate{
		text-align: center;
		width: 84px;
		background-color: #FF5777;
		color: #fff;
	}
</style>
