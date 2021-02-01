import request from '@/utils/request'

export function login(username, password,type) {
  return request({
    url: '/o2o/sys/login',
    method: 'post',
    data: {
      username,
      password,
      type
    }
  })
}

//注册商家
export function registerShop(username,password,phone,name) {
  return request({
    url:"/o2o/sys/register/shop",
    method:'post',
    data:{
      username,
      password,
      phone,
      name
    }
  })
}

//注册用户
export function registerUser(username,password,phone,name) {
  return request({
    url:"/o2o/sys/register/user",
    method:'post',
    data:{
      username,
      password,
      phone,
      name
    }
  })
}
export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}
