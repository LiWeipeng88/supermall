<template>
    <van-swipe :autoplay="3000" indicator-color="white" class="swiper">
      <van-swipe-item v-for="(item,index) in banners" :key="index" class="swiper-item">
        <a :href="item.link">
          <img :src="item.image" />
        </a>
      </van-swipe-item>
    </van-swipe>
</template>
<script>
export default {
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>
.swiper{
  padding-top: 44px;
}
.swiper-item a img{
  width: 100%;
}
</style>