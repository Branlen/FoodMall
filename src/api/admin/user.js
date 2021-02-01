import request from '@/utils/request'

export function getInfoById(userId){
  return request({
    url: `/o2o/admin/user/info/${userId}`,
    method: 'get',

  })
}

export function getInfo(query){
  return request({
    url: `/o2o/admin/user/list/?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}&name=${query.name}`,
    method: 'get',
  })
}

export function banUser(userId) {
  return request({
    url: `/o2o/admin/user/ban/${userId}`,
    method: 'delete',

  })
}
export function reopenUser(userId) {
  return request({
    url: `/o2o/admin/user/reopen/${userId}`,
    method: 'put',

  })
}
