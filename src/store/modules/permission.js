import {
  adminRouterMap,
  constantRouterMap,
  shopRouterMap
} from "@/router/index";
import { getCookie } from "@/utils/support";

//判断是否有权限访问该菜单
function hasPermission(menus, route) {
  if (route.name) {
    let currMenu = getMenu(route.name, menus);
    if (currMenu != null) {
      //设置菜单的标题、图标和可见性
      if (currMenu.title != null && currMenu.title !== "") {
        route.meta.title = currMenu.title;
      }
      if (currMenu.icon != null && currMenu.title !== "") {
        route.meta.icon = currMenu.icon;
      }
      if (currMenu.hidden != null) {
        route.hidden = currMenu.hidden !== 0;
      }
      if (currMenu.sort != null && currMenu.sort !== "") {
        route.sort = currMenu.sort;
      }
      return true;
    } else {
      route.sort = 0;
      if (route.hidden !== undefined && route.hidden === true) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
}

//根据路由名称获取菜单
function getMenu(name, menus) {
  for (let i = 0; i < menus.length; i++) {
    let menu = menus[i];
    if (name === menu.name) {
      return menu;
    }
  }
  return null;
}
//对菜单进行排序
function sortRouters(accessedRouters) {
  for (let i = 0; i < accessedRouters.length; i++) {
    let router = accessedRouters[i];
    if (router.children && router.children.length > 0) {
      router.children.sort(compare("sort"));
    }
  }
  accessedRouters.sort(compare("sort"));
}
//降序比较函数
function compare(p) {
  return function(m, n) {
    let a = m[p];
    let b = n[p];
    return b - a;
  };
}

export function getRoute(routes, roles) {
  return routes.filter((item, index, array) => {
    var flag = false;
    if (item.role === "all") {
      flag = true;
    }
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].role === item.role) {
        flag = true;
      }
    }
    return flag;
  });
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit, getters }, data) {
      return new Promise(resolve => {
        //当前如果是shop商家用户，则加入router

        let role = getters.roles;
        if (role.length === 0) {
          role = getCookie("roles");
        }
        console.log('roel',role)
        if (role === "shop") {
          commit("SET_ROUTERS", shopRouterMap);
          resolve();
        } else if (role === "admin") {
          //当前是admin管理端
          // //console.log(getters);
          var routerMap = getRoute(adminRouterMap, getters.adminRole);
          commit("SET_ROUTERS", routerMap);
          resolve(routerMap);
        } else if (role == "user") {
          resolve();
        }
      });
    }
  }
};

export default permission;
