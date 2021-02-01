const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,
  city:state=> state.user.city,
  userId:state=> state.user.userId,
  shopId:state=> state.user.shopId,
  adminId:state=> state.user.adminId,
  adminRole:state=>state.user.adminRole
}
export default getters
