<template>
  <div class="shopcart">
		<!-- 导航 -->
    <nav-bar class="nav-bar">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
		<!-- 商品列表 -->
		<cart-list></cart-list>
		<!-- 底部汇总 -->
		<cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
	import NavBar from "components/common/navbar/NavBar"
	
	import CartList from "./childComps/CartList"
	import CartBottomBar from './childComps/CartBottomBar'
	
	import { mapGetters } from 'vuex'
export default {
  name:'ShopCart',
	components: {
		NavBar,
		CartList,
		CartBottomBar
	},
	computed: {
		// 两种语法  第一种
		...mapGetters([
			'cartLength'
		])
		// 第二种
		// ...mapGetters({
		// 	length:'cartLength'
		// })
	},
}
</script>
<style scoped="scoped">
	.shopcart{
		height: 100vh;
	}
  .nav-bar{
		background-color: #EB4868;
		color: #fff;
		/* font-weight: bold; */
	}
</style>