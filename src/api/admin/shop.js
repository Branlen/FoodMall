import request from '@/utils/request'

export function getInfoById(userId){
  return request({
    url: `/o2o/admin/user/info/${userId}`,
    method: 'get',

  })
}

export function getInfo(query){
  return request({
    url: `/o2o/admin/shop/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}&name=${query.name}`,
    method: 'get',
  })
}

export function ban(shopId) {
  return request({
    url: `/o2o/admin/shop/ban/${shopId}`,
    method: 'delete',

  })
}
export function backBan(shopId) {
  return request({
    url: `/o2o/admin/shop/reopen/${shopId}`,
    method: 'put',

  })
}
