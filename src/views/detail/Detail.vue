<template>
	<div id="detail">
		<DetailNavBar class="detail-nav"></DetailNavBar>
		<Scroll class="content">
			<DetailSwiper :topImages="topImages"></DetailSwiper>
			<DetailBaseInfo :goods="goods"></DetailBaseInfo>
			<DetailShopInfo :shop="shop"></DetailShopInfo>
			<DetailImageInfo :detailInfo="detailInfo"></DetailImageInfo>
			<DetailParamsInfo :paramInfo="itemParams"></DetailParamsInfo>
		</Scroll>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailImageInfo from './childComps/DetailImageInfo'
	import DetailParamsInfo from './childComps/DetailParamsInfo'
	
	import Scroll from "components/common/scroll/Scroll";
	
	import {getDetail, Goods, Shop } from 'network/detail.js'
	export default{
		name:'Detail',
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailImageInfo,
			DetailParamsInfo,
			Scroll
		},
		data() {
			return {
				iid: null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				itemParams:{}
			}
		},
		created(){
			// 1.保存传入的id
			this.iid = this.$route.params.iid
			// 2.根据id请求详情数据
			getDetail(this.iid).then(res => {
				console.log(res)
				// 1.获取顶部轮播图数据
				const data = res.result
				this.topImages = data.itemInfo.topImages
				// 2.获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				// 创建店铺信息对象
				this.shop = new Shop(data.shopInfo)
				// 商品的详情数据
				this.detailInfo = data.detailInfo
				// 取出参数信息
				this.itemParams = data.itemParams
			})
		}
	}
</script>

<style scoped="scoped">
	#detail{
		position: relative;
		z-index: 9;
		background-color: #FFFFFF;
		height: 100vh;
	}
	.detail-nav{
		position: relative;
		z-index: 9;
		background-color: #FFFFFF;
	}
	.content {
		height: calc(100% - 44px);
	}
</style>
