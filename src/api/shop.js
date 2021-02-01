import request from '@/utils/request'

export function getShopInfo() {
  return request({
    url: '/o2o/shop/info',
    method: 'get',
  })
}
//获取菜单信息
export function getMenuInfo(query){
  return request({
    url: `/o2o/shop/menu/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}
//下架菜品
export function banMenu(menuId) {
  return request({
    url: `/o2o/shop/menu/ban/${menuId}`,
    method: 'delete',

  })
}
//上架菜品
export function sell(menuId) {
  return request({
    url: `/o2o/shop/menu/sell/${menuId}`,
    method: 'put',

  })
}
//新增菜单
export function saveMenu(info){
  return request({
    url:"/o2o/shop/menu/save",
    method:'post',
    data:{
      "intro":info.intro,
      "name":info.name,
      "pic":info.pic,
      "price":info.price,
      "shopId":info.shopId,
      "status":info.status
    }
  })
}
//获取订单信息
export function getOrderInfo(query){
  return request({
    url: `/o2o/shop/order/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}

//确认退款
export function confirmRefund(orderId){
  return request({
    url: `/o2o/shop/order/confirmRefund/${orderId}`,
    method: 'put',

  })
}
//拒绝退款
export function refuseRefund(orderId){
  return request({
    url: `/o2o/shop/order/refuseRefund/${orderId}`,
    method: 'put',

  })
}
//退款
export function refund(orderId){
  return request({
    url: `/o2o/shop/order/refund/${orderId}`,
    method: 'put',

  })
}
//确认订单

export function confirmOrder(orderId){
  return request({
    url: `/o2o/shop/order/confirm/${orderId}`,
    method: 'put',

  })
}

//列出预约情况
export function getBookListInfo(query) {
  return request({
    url: `/o2o/shop/book/listBook?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}
//确定预约
export function confirmBook(bookId){
  return request({
    url: `/o2o/shop/book/confirmBook/${bookId}`,
    method: 'put',

  })
}
//拒绝预约
export function refuseBook(bookId){
  return request({
    url: `/o2o/shop/book/refuseBook/${bookId}`,
    method: 'put',

  })
}

//获取数据

export function getDataInfo(data) {
  return request({
    url: `/o2o/shop/data/list?startTime=${data.startTime}&endTime=${data.endTime}`,
    method: 'get',

  })
}
//查询投诉信息
export function getComplainInfo(query) {
  return request({
    url: `/o2o/shop/complaint/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}`,
    method: 'get',
  })
}
//处理投诉
export function handleComplain(info){
  return request({
    url: `/o2o/shop/complaint/handle`,
    method: 'put',
    data:info

  })
}
//列出推文
export function getPushList(query){
  return request({
    url: `/o2o/shop/push/list?pageNum=${query.pageNum-1}&pageSize=${query.pageSize}&keyword=${query.keyword}`,
    method: 'get',
  })
}
//删掉推文
export function deletePush(pushId) {
  return request({
    url: `/o2o/shop/push/delete/${pushId}`,
    method: 'delete',

  })
}
//增加推文
export function addPush(info) {
  return request({
    url: `/o2o/shop/push/add`,
    method: 'post',
    data:info
  })
}
//修改推文
export function updatePush(info) {
  return request({
    url: `/o2o/shop/push/update`,
    method: 'put',
    data:info
  })
}
//获得排队
export function getQueueList(){
  return request({
    url: `/o2o/shop/queue/list`,
    method: 'get',
  })
}
//下一位
export function nextOne(){
  return request({
    url: `/o2o/shop/queue/next`,
    method: 'get',
  })
}
//获得个人信息，修改个人信息
export function getPersonInfo(){
  return request({
    url: `/o2o/shop/info`,
    method: 'get',
  })
}
export function updatePersonInfo(data){
  return request({
    url: `/o2o/shop/info/update`,
    method: 'put',
    data
  })
}

