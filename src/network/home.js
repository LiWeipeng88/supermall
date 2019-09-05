import {request} from './request'

export function getHomeMultiData(){
  return request({
    url:'/api/v1/home/multidata'
  })
}