// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(VueRouter)

/* Layout */
import Layout from "../views/layout/Layout";

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: "/",
    component: (resolve) => require(["@/views/indexPage/index"], resolve),
    hidden: true,
  },
  {
    path: "/detail/:id",
    component: (resolve) => require(["@/views/detailPage/index"], resolve),
    hidden: true,
    meta: { hash: "target" },
  },
  {
    path: "/search/:content",
    component: (resolve) => require(["@/views/searchPage/index"], resolve),
    hidden: true,
  },
  {
    path: "/article/:id",
    component: (resolve) => require(["@/views/articlePage/index"], resolve),
    hidden: true,
  },
  {
    path: "/login",
    component: (resolve) => require(["@/views/login/index"], resolve),
    hidden: true,
  },
  {
    path: "/register",
    component: (resolve) => require(["@/views/login/register"], resolve),
    hidden: true,
  },
];
export const shopRouterMap = [
  {
    path: "",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: (resolve) => require(["@/views/home/index"], resolve),
        meta: {
          title: "首页",
          icon: "home",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    redirect: "/appointment",
    children: [
      {
        path: "appointment",
        name: "appointment",
        component: (resolve) =>
          require(["@/views/bussinessManager/appointment/index"], resolve),
        meta: {
          title: "预约管理",
          icon: "gengduo",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    redirect: "/queue",
    children: [
      {
        path: "queue",
        name: "queue",
        component: (resolve) =>
          require(["@/views/bussinessManager/queue/index"], resolve),
        meta: {
          title: "排队管理",
          icon: "tree",
        },
      },
    ],
  },
  {
    path: "/doaap",
    component: Layout,
    redirect: "/doaap/consult",
    name: "doaap",
    meta: {
      title: "美食咨询",
      icon: "product",
    },
    children: [
      {
        path: "consult",
        name: "consult",
        component: (resolve) =>
          require(["@/views/bussinessManager/consult/index"], resolve),
        meta: {
          title: "咨询列表",
          icon: "product-list",
        },
      },
      {
        path: "addConsult",
        name: "addConsult",
        component: (resolve) =>
          require(["@/views/bussinessManager/addConsult/index"], resolve),
        meta: {
          title: "添加咨询",
          icon: "product-add",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    redirect: "/product",
    children: [
      {
        path: "product",
        name: "product",
        component: (resolve) =>
          require(["@/views/bussinessManager/product/index"], resolve),
        meta: {
          title: "更新菜品",
          icon: "marker",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    redirect: "/order",
    children: [
      {
        path: "order",
        name: "order",
        component: (resolve) =>
          require(["@/views/bussinessManager/order/index"], resolve),
        meta: {
          title: "订单管理",
          icon: "example",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    redirect: "/handCompl",
    children: [
      {
        path: "handCompl",
        name: "handCompl",
        component: (resolve) =>
          require(["@/views/bussinessManager/complain/index"], resolve),
        meta: {
          title: "处理投诉",
          icon: "order-return",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    redirect: "/personInfo",
    children: [
      {
        path: "personInfo",
        name: "personInfo",
        component: (resolve) =>
          require(["@/views/bussinessManager/personInfo/index"], resolve),
        meta: {
          title: "个人信息",
          icon: "product-attr",
        },
      },
    ],
  },
  {
    path: "*",
    component: (resolve) => require(["@/views/404"], resolve),
    hidden: true,
  },
];
export const adminRouterMap = [
  {
    path: "",
    role: "all",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: (resolve) =>
          require(["@/views/adminManager/home/index"], resolve),
        meta: {
          title: "首页",
          icon: "home",
        },
      },
    ],
  },
  {
    path: "",
    role: "admin/data",
    component: Layout,
    redirect: "/dataMan",
    children: [
      {
        path: "dataMan",
        name: "dataMan",
        component: (resolve) =>
          require(["@/views/adminManager/DA/index"], resolve),
        meta: {
          title: "数据分析管理",
          icon: "example",
        },
      },
    ],
  },
  {
    path: "",
    role: "admin/push",
    component: Layout,
    redirect: "/consultMan",
    children: [
      {
        path: "consultMan",
        name: "consultMan",
        component: (resolve) =>
          require(["@/views/adminManager/push/index"], resolve),
        meta: {
          title: "推送管理",
          icon: "push",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    role: "admin/complaint",
    redirect: "/complainMan",
    children: [
      {
        path: "complainMan",
        name: "complainMan",
        component: (resolve) =>
          require(["@/views/adminManager/complain/index"], resolve),
        meta: {
          title: "投诉管理",
          icon: "complain",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    role: "admin/shop;admin/menu;shop/order;shop/evaluation",
    redirect: "/shopMan",
    children: [
      {
        path: "shopMan",
        name: "shopMan",
        component: (resolve) =>
          require(["@/views/adminManager/shop/index"], resolve),
        meta: {
          title: "商家管理",
          icon: "comment",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    role: "admin/user",
    redirect: "/userMan",
    children: [
      {
        path: "userMan",
        name: "userMan",
        component: (resolve) =>
          require(["@/views/adminManager/user/index"], resolve),
        meta: {
          title: "用户管理",
          icon: "user",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    role: "admin/admin;admin/role",
    redirect: "/roleMan",
    children: [
      {
        path: "roleMan",
        name: "roleMan",
        component: (resolve) =>
          require(["@/views/adminManager/role/index"], resolve),
        meta: {
          title: "角色列表",
          icon: "ums-admin",
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    role: "admin/admin;admin/role",
    redirect: "/admin",
    children: [
      {
        path: "admin",
        name: "admin",
        component: (resolve) =>
          require(["@/views/adminManager/admin/index"], resolve),
        meta: {
          title: "管理员管理",
          icon: "table",
        },
      },
    ],
  },
  {
    path: "",
    role: "all",
    component: Layout,
    redirect: "/info",
    children: [
      {
        path: "info",
        name: "info",
        component: (resolve) =>
          require(["@/views/adminManager/info/index"], resolve),
        meta: {
          title: "信息管理",
          icon: "order-return",
        },
      },
    ],
  },
  {
    path: "*",
    component: (resolve) => require(["@/views/404"], resolve),
    hidden: true,
  },
];

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior(to, from, savedPosition) {
      if (to.meta.hash === "target") {
        return {
          y: 200,
        };
      }
    },
    routes: constantRouterMap,
  });
const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
export default router;
