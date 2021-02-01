import request from '@/utils/request'



export function getInfo(query){
  return request({
    url: `/o2o/admin/complaint/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}

export function ban(Id) {
  return request({
    url: `/o2o/admin/complaint/delete/${Id}`,
    method: 'delete',

  })
}
