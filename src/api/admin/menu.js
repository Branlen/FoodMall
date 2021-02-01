import request from '@/utils/request'



export function getInfo(query){
  return request({
    url: `/o2o/admin/menu/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}&shopId=${query.shopId}`,
    method: 'get',
  })
}

export function ban(Id) {
  return request({
    url: `/o2o/admin/menu/ban/${Id}`,
    method: 'delete',

  })
}

export function sell(Id) {
  return request({
    url: `/o2o/admin/menu/sell/${Id}`,
    method: 'put',

  })
}
