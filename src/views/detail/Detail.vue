<template>
	<div id="detail">
		<DetailNavBar class="detail-nav" @titleClick="titleClick" ref="NavBarIndex"></DetailNavBar>	
		<Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
			<DetailSwiper :topImages="topImages"></DetailSwiper>
			<DetailBaseInfo :goods="goods"></DetailBaseInfo>
			<DetailShopInfo :shop="shop"></DetailShopInfo>
			<DetailImageInfo :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></DetailImageInfo>
			<DetailParamsInfo :paramInfo="itemParams" ref="params"></DetailParamsInfo>
			<DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
			<GoodsList :goods="recommends" ref="recommend"></GoodsList>
		</Scroll>
		<DetailBottomBar @addCart="addToCart"></DetailBottomBar>
		<BackTop @click.native="BackTopClick" v-show="isShowBackTop"></BackTop>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailImageInfo from './childComps/DetailImageInfo'
	import DetailParamsInfo from './childComps/DetailParamsInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import DetailBottomBar from './childComps/DetailBottomBar'

	import Scroll from "components/common/scroll/Scroll";

	import GoodsList from 'components/content/goods/GoodsList'
	
	import { mapActions } from 'vuex'

	import {
		getDetail,
		Goods,
		Shop,
		getRecommend
	} from 'network/detail.js'
	import {
		debounce
	} from 'common/utils'

	import {
		itemListenerMixin,
		backTopMixin
	} from 'common/mixin'
	export default {
		name: 'Detail',
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailImageInfo,
			DetailParamsInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList
		},
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				itemParams: {},
				commentInfo: {},
				recommends: [],
				themeTopYs: [],
				getThemeTopY: null,
				currentIndex: 0
			}
		},
		created() {
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
				// 取出评论信息
				if (data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0]
				}
				// this.$nextTick(()=>{
				// 	
				// })
			})
			getRecommend().then(res => {
				this.recommends = res.data.list
			})
			this.getThemeTopY = debounce(() => {
				this.themeTopYs = []
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
				console.log(this.themeTopYs)
			}, 50)
		},
		methods: {
			...mapActions(['addCart']),
			detailImageLoad() {
				this.refresh()
				this.getThemeTopY()
			},
			titleClick(index) {
				// console.log(index)
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
			},
			contentScroll(position) {
				// 判断backTop是否显示
				this.isShowBackTop = (-position.y) > 700
				// 决定tabControl是否吸顶 （position：fixed）
				this.isTabFixed = (-position.y) > this.tabOffsetTop - 40
				// 获取y值
				const positionY = -position.y
				// 将positionY的值和themeTopYs的值作对比
				length = this.themeTopYs.length
				for (let i = 0; i < length; i++) {
					// console.log(i+1)
					if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[
							i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
						this.currentIndex = i
						// console.log(this.currentIndex)
						this.$refs.NavBarIndex.currentIndex = this.currentIndex
					}
				}
				// console.log(position)
			},
			addToCart(){
				// 获取购物车展示的信息
				const product = {}
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.realPrice
				product.iid = this.iid
				// 将商品添加到购物车
				// mutations 调用方法
				// this.$store.commit('addCart', product)
				// actions 调用方法
				// this.$store.dispatch('addCart', product).then(res => {
				// 	console.log(res)
				// })
				this.addCart(product).then(res => {
					this.$toast.show(res, 1500)
					console.log(this.$toast)
				})
			}
		},
		mounted() {
			// console.log('mounted')
		},
		destroyed() {
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		}
	}
</script>

<style scoped="scoped">
	#detail {
		position: relative;
		z-index: 9;
		background-color: #FFFFFF;
		height: 100vh;
	}

	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #FFFFFF;
	}

	.content {
		height: calc(100% - 44px - 49px);
	}
</style>
