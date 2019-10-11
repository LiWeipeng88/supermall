import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import VueLazyload from 'vue-lazyload'

import Vant from 'vant';
import 'vant/lib/index.css';
// 安装toast插件
Vue.use(toast)

Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

// 使用懒加载的插件
Vue.use(VueLazyload, {
	loading:require('./assets/img/common/hoder.gif')
})
new Vue({
  render: h => h(App),
  router,
	store
}).$mount('#app')
