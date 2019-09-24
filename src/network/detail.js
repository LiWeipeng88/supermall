import { request } from './request.js'

export function getDetail(iid) {
	return request({
		url: '/detail',
		params: {
			iid
		}
	})
}
// 商品信息
export class Goods {
	constructor(itemInfo, columns, services) {
	    this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.disconut = itemInfo.discountDesc
		this.columns = columns
		this.services = services
		this.realPrice = itemInfo.lowNowPrice
	}
}
// 商家信息
export class Shop {
	constructor(shopInfo) {
	    this.logo = shopInfo.shopLogo
		this.name = shopInfo.name
		this.fans = shopInfo.cFans
		this.sells = shopInfo.cSells
		this.score = shopInfo.score
		this.goodsCount = shopInfo.cGoods
	}
}