import request from '@/utils/request'

export function getAdminSelfInfo(){
  return request({
    url: `/o2o/admin/admin/info`,
    method: 'get',
  })
}

export function getInfo(query){
  return request({
    url: `/o2o/admin/admin/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}

export function deleteAdmin(userId) {
  return request({
    url: `/o2o/admin/admin/delete/${userId}`,
    method: 'delete',

  })
}
export function addAdmin(adminInfo) {
  return request({
    url: `/o2o/admin/admin/save`,
    method: 'post',
    data:adminInfo
  })
}
export function updatePassword(id,newPassword) {
  return request({
    url: `/o2o/admin/admin/updatePassword`,
    method: 'put',
    data:{
      "id": id,
      "newPassword": newPassword
    }
  })
}
