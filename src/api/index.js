import request from '@/utils/request'

//查询城市
export function listLocation() {
  return request({
    url: '/o2o/common/listLocation',
    method: 'get'
  })
}
//查询推文或者通过关键字进行搜索
export function getPushInfo(query){

  return request({
    url: `/o2o/common/listPush?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}&keyword=${query.keyword}`,
    method: 'get',
  })
}

//查询商店信息
export function getShopInfo(query){
  return request({
    url: `/o2o/common/listShopByCity?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}&city=${query.city}&categoryId=${query.categoryId}`,
    method: 'get',
  })
}
//获得分类
export function getListCategory(query){
  return request({
    url: `/o2o/common/listCategory?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}

export function listCarouselPush(query) {
  return request({
    url: `/o2o/common/listCarouselPush?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}
//
export function pushById(pushId) {
  return request({
    url: `/o2o/common/getPush/${pushId}`,
    method: 'get',
  })
}

export function listEvaluation(query) {
  return request({
    url: `/o2o/common/listEvaluation?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}&shopId=${query.shopId}`,
    method: 'get',
  })
}
export function listMenu(query) {
  return request({
    url: `/o2o/common/listMenu?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}&shopId=${query.shopId}`,
    method: 'get',
  })
}
// 根据shopId查询商店

export function getShopInfoById(shopId) {
  return request({
    url: `/o2o/common/getShopById/${shopId}`,
    method: 'get',
  })
}
