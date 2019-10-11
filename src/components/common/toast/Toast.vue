<template>
	<div class="toast" v-show="isShow">
		<div>{{message}}</div>
	</div>
</template>

<script>
	export default {
		name:'Toast',
		data(){
			return {
				message:'',
				isShow:false
			}
		},
		// props: {
		// 	message: {
		// 		type: String,
		// 		default: ''
		// 	},
		// 	show:{
		// 		type: Boolean,
		// 		default: false
		// 	}
		// },
		methods:{
			show(message = '默认文字', duration = 1500) {
				console.log('---------')
				this.message = message;
				this.isShow = true;
				
				setTimeout(() => {
					this.isShow = false;
					this.message = ''
				},duration)
			}
		}
	}
</script>

<style scoped="scoped">
	.toast{
		position: fixed;
		z-index: 99;
		padding: 10px;
		color: #fff;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: rgba(0,0,0,0.75);
		}
</style>
