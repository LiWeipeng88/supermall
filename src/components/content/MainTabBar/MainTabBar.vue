<template>
<TabBar>
      <TabBarItem path='/home' activeColor='#ff5777'>
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt />
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path='/category' activeColor='#ff5777'>
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt />
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path='/shopcart' activeColor='#ff5777'>
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt />
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path='/profile' activeColor='#ff5777'>
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt />
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
</template>
<script>
import TabBar from "components/common/tabber/TabBar";
import TabBarItem from "components/common/tabber/TabBarItem";

export default {
  name:'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>
<style>
  
</style>