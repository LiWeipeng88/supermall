<template>
	<div class="cart-list">
		<Scroll class="content" ref="scroll">
			<cart-list-item v-for="(item, index) in cartList" :product="item" :key='index'></cart-list-item>
		</Scroll>
	</div>
</template>

<script>
	import Scroll from 'components/common/scroll/Scroll'
	import CartListItem from './CartListItem'
	import { mapGetters } from 'vuex'
	export default {
		name:'CartList',
		computed: {
			...mapGetters(['cartList'])
		},
		components: {
			Scroll,
			CartListItem
		},
		activated(){
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped="scoped">
	.cart-list{
		
		height: calc(100% - 44px - 49px - 40px);
		overflow: hidden;
	}
	.content {
		height: 100%;
	}
</style>
