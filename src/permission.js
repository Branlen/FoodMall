import { getRoute } from "@/store/modules/permission";
import { getToken } from "@/utils/auth"; // 验权
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import router, { adminRouterMap, shopRouterMap } from "./router";
import store from "./store";

const whiteList = ["/login", "/register", "/", "/detail/:content"]; // 不重定向白名单
//定义一个变量是否刷新
let registerFresh = true;
router.beforeEach((to, from, next) => {
  NProgress.start();

  if (getToken()) {
    console.log(store.getters);
    if (store.getters.name.length === 0) {
      //重新打开页面，执行登录操作
      store
        .dispatch("GetInfo")
        .then(res => {
          // 拉取用户信息
          store
            .dispatch("GenerateRoutes")
            .then(() => {
              // 生成可访问的路由表
              //addRoute有问题
              var routeMap = store.getters.addRouters;
              console.log(routeMap);
              router.addRoutes(routeMap); // 动态添加可访问路由表
              //这里有点问题，需要重新思考
              next({ ...to, replace: true });
            })
            .catch(err => {});
        })
        .catch(err => {});
    } else if (registerFresh) {
      let routerMap = [];
      //当前如果是shop商家用户，则加入router
      const role = store.getters.roles;
      if (role === "shop") {
        routerMap = shopRouterMap;
      } else if (role === "admin") {
        //当前是admin管理端
        routerMap = getRoute(adminRouterMap, store.getters.adminRole);
      }
      router.addRoutes(routerMap);
      registerFresh = false;
      next({ ...to, replace: true });
    } else {
      next();
    }
  } else {
    var key = to.path.split("/");
    var keyFlag = key[1] === "detail" || key[1] === "search" || key[1] === "  ";
    if (whiteList.indexOf(to.path) !== -1 || keyFlag) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
