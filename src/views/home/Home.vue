<template>
	<div id="home">
		<NavBar class="home-nav">
			<div slot="center">购物街</div>
		</NavBar>
		<tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed" />
		<Scroll class="content" ref="scroll" :probe-type='3' :pull-up-load="true" @scroll="contentScroll" @clickPullingUp='loadMore'>
			<HomeSwiper :banners="banners" @swiperImageLoad='swiperImageLoad' />
			<HomeRecommend :recommends="recommends" />
			<feature-view />
			<tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
			<good-list :goods="showGoods" />
		</Scroll>
		<BackTop @click.native="BackTopClick" v-show="isShowBackTop"></BackTop>
	</div>
</template>
<script>
	import NavBar from "components/common/navbar/NavBar";
	import TabControl from "components/content/tabControl/TabControl";
	import GoodList from "components/content/goods/GoodsList";
	import Scroll from "components/common/scroll/Scroll";

	import HomeSwiper from "views/home/childComps/HomeSwiper";
	import HomeRecommend from "./childComps/HomeRecommend";
	import FeatureView from "./childComps/FeatureView";

	import {
		getHomeMultidata,
		getHomeGoods
	} from "network/home";
	import {
		debounce
	} from 'common/utils'
	import {
		itemListenerMixin,
		backTopMixin
	} from 'common/mixin'
	export default {
		name: "Home",
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					pop: {
						page: 0,
						list: []
					},
					new: {
						page: 0,
						list: []
					},
					sell: {
						page: 0,
						list: []
					}
				},
				currentType: "pop",

				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0
			};
		},
		mixins: [itemListenerMixin, backTopMixin],
		components: {
			NavBar,
			HomeSwiper,
			HomeRecommend,
			TabControl,
			GoodList,
			FeatureView,
			Scroll
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list;
			}
		},
		created() {
			// 1.请求多个数据
			this.getHomeMultidata();
			// 2.请求商品数据
			this.getHomeGoods("pop");
			this.getHomeGoods("new");
			this.getHomeGoods("sell");
		},
		mounted() {
			this.tabClick(0)
		},
		methods: {
			/**
			 * 事件监听相关的方法
			 */
			tabClick(index) {
				switch (index) {
					case 0:
						this.currentType = "pop";
						break;
					case 1:
						this.currentType = "new";
						break;
					case 2:
						this.currentType = "sell";
						break;
				}
				if (this.$refs.tabControl1 !== undefined) {
					this.$refs.tabControl1.currentIndex = index;
					this.$refs.tabControl2.currentIndex = index;
				}
			},
			contentScroll(position) {
				// 判断backTop是否显示
				this.isShowBackTop = (-position.y) > 700
				// 决定tabControl是否吸顶 （position：fixed）
				this.isTabFixed = (-position.y) > this.tabOffsetTop - 40
			},
			loadMore() {
				this.getHomeGoods(this.currentType)
			},
			swiperImageLoad() {
				// 获取tabcontrol的offsetTop
				// 所有组件都有一个属性$el：用于获取组件中的元素
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			},
			/**
			 * 网络请求相关的方法
			 */
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					// this.result = res;
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				});
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page += 1;
					// 完成下拉加载更多
					this.$refs.scroll.finishPullUp()
				});
			},
		},
		destroyed() {
			// home页面离开（销毁）时打印
			console.log('home')
		},
		activated() {
			this.$refs.scroll.scrollTo(0, this.saveY, 0)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			// 1.保存Y值
			this.saveY = this.$refs.scroll.getScrollY()
			// console.log(this.saveY)
			// 2. 取消全局事件的监听
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		}
	};
</script>
<style scoped>
	#home {
		height: 100vh;
		position: relative;
	}

	.home-nav {
		background-color: #ff5777;
		color: #fff;
	}
	.content {
		/* height: 300px; */
		overflow: hidden;
		position: absolute;
		top: 0px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	.tab-control {
		position: relative;
		z-index: 9;
	}
</style>
