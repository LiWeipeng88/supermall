<template>
	<van-swipe :autoplay="3000" indicator-color="white" class="swiper">
		<van-swipe-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
			<img :src="item" alt="">
		</van-swipe-item>
	</van-swipe>
</template>
<script>
	export default {
		name:'DetailSwiper',
		data() {
			return {
			}
		},
		props: {
			topImages: {
				type: Array,
				default(){
					return []
				}
			},
		},
	}
</script>
<style scoped>
	.swiper{
		height: 300px;
		overflow: hidden;
	}
	.swiper-item img{
		width: 100%;
	}
</style>