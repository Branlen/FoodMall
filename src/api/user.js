import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/o2o/user/info',
    method: 'get',
  })
}

//列出关注店铺
export function listAttention(query){
  return request({
    url: `/o2o/user/attention/listAttention?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}
//关注
export function Attention(shopId){
  return request({
    url: `/o2o/user/attention/attention/${shopId}`,
    method: 'post',

  })
}
//取消关注
export function cancelAttention(shopId){
  return request({
    url: `/o2o/user/attention/cancelAttention/${shopId}`,
    method: 'delete',

  })
}
//列出投诉：
export function listComplain(query){
  return request({
    url: `/o2o/user/complaint/listAttention?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}
export function addComplain(data){
  return request({
    url: `/o2o/user/complaint/addComplaint`,
    method: 'post',
    data
  })
}
//下单
export function goOrder(menuId){
  return request({
    url: `/o2o/user/order/add/${menuId}`,
    method: 'post',
  })
}
//获得个人订单

export function listOrder(query){
  return request({
    url: `/o2o/user/order/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}
// 取消订单
export function cancelOrder(orderId){
  return request({
    url: `/o2o/user/order/cancel/${orderId}`,
    method: 'put',

  })
}
//评价订单
export function evaluation(info){
  return request({
    url: `/o2o/user/order/evaluation`,
    method: 'post',
    data:info
  })
}
//付款
export function payOrder(orderId){
  return request({
    url: `/o2o/user/order/pay/${orderId}`,
    method: 'put',

  })
}

//申请退款

export function applyRefund(orderId){
  return request({
    url: `/o2o/user/order/refund/${orderId}`,
    method: 'put',

  })
}

//预约
export function addBook(info){
  return request({
    url: `/o2o/user/book/addBook`,
    method: 'post',
    data:info
  })
}
//取消预约
export function cancelBook(bookId){
  return request({
    url: `/o2o/user/book/cancelBook/${bookId}`,
    method: 'put',
  })
}
export function listBook(query){
  return request({
    url: `/o2o/user/book/listBook?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}

