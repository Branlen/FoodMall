import request from '@/utils/request'


export function getRoleInfo() {
  return request({
    url: `/o2o/admin/role/list?pageNum=0&pageSize=20`,
    method: 'get',
  })
}
export function getRoleInfoByAdminId(adminId) {
  return request({
    url: `/o2o/admin/role/getRole/${adminId}`,
    method: 'get',
  })
}

export function removeRole(adminId,roleId) {
  return request({
    url: `/o2o/admin/role/removeRole?adminId=${adminId}&roleId=${roleId}`,
    method: 'delete',

  })
}

export function addRole(adminId,roleId) {
  return request({
    url: `/o2o/admin/role/addRole?adminId=${adminId}&roleId=${roleId}`,
    method: 'post',
  })
}
