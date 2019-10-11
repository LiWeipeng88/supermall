import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types'

export default {
		addCart(context, payload) {
			return new Promise((resolve, reject) => {
				// payload 新添加的商品
				let oldProduct = context.state.cartList.find(item => item.iid === payload.iid )
				// 判断 oldProduct 
				if (oldProduct) { //数量 +1
					// oldProduct.count += 1
					context.commit(ADD_COUNTER, oldProduct)
					resolve('当前的商品数量+1')
				} else{ //新商品添加成功
					payload.count = 1
					// state.cartList.push(payload)
					context.commit(ADD_TO_CART, payload)
					resolve('新商品添加成功')
				}
			})
		}
	}