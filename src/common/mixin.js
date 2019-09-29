import {debounce} from './utils';

export const itemListenerMixin = {
	data(){
		return {
			itemImgListener:null,
			refresh:null
		}
	},
	mounted () {
		// 监听item的图片加载完成
		this.refresh = debounce(this.$refs.scroll.refresh, 50)
		
		this.itemImgListener = ()=>{
			this.refresh()
		}
		
		this.$bus.$on('itemImgLoad', this.itemImgListener)
		console.log('我是混入的内容')
	}
}