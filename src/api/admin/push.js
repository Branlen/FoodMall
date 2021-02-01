import request from '@/utils/request'



export function getInfo(query){
  return request({
    url: `/o2o/admin/push/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}&keyword=${query.keyword}`,
    method: 'get',
  })
}

export function ban(Id) {
  return request({
    url: `/o2o/admin/push/delete/${Id}`,
    method: 'delete',

  })
}
export function getInfoByid(Id) {
  return request({
    url: `/o2o/admin/push/getPush/${Id}`,
    method: 'get',

  })
}
