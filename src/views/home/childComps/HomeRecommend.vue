<template>
  <div class="recommend">
      <div v-for="(item,index) in recommends" :key="index" class="recommendItem">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <span>{{ item.title }}</span>
        </a>
      </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style>
.recommend{
  display: flex;
  text-align: center;
  font-size: 14px;
  border-bottom: 8px solid #f2f2f2;
  padding: 12px 0 22px 0;
}
.recommendItem{
  flex: 1;
}
.recommendItem img{
  width: 76px;
  height: 76px;
}
.recommendItem span{
  display: block;
  padding-top: 6px;
}
</style>