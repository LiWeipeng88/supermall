<template>
	<div class="detail">
		<DetailNavBar></DetailNavBar>
		<DetailSwiper :topImages="topImages"></DetailSwiper>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import {getDetail} from 'network/detail.js'
	export default{
		name:'Detail',
		components: {
			DetailNavBar,
			DetailSwiper
		},
		data() {
			return {
				iid: null,
				topImages:[]
			}
		},
		created(){
			// 1.保存传入的id
			this.iid = this.$route.params.iid
			// 2.根据id请求详情数据
			getDetail(this.iid).then(res => {
				console.log(res)
				// 获取顶部轮播图数据
				this.topImages = res.result.itemInfo.topImages
			})
		}
	}
</script>

<style scoped="scoped">
</style>
