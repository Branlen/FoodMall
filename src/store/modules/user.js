import { getAdminSelfInfo } from "@/api/admin/admin";
import { login } from "@/api/login";
import { getShopInfo } from "@/api/shop";
import { getUserInfo } from "@/api/user";
import { getToken, removeToken, setToken } from "@/utils/auth";
import { getCookie, removeCookie, setCookie } from "@/utils/support";
const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    city: ""
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_CITY: (state, city) => {
      state.city = city;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_SHOPID: (state, shopId) => {
      state.shopId = shopId;
    },
    SET_ADMINID: (state, adminId) => {
      state.adminId = adminId;
    },
    SET_ADMINROLE: (state, adminRole) => {
      state.adminRole = adminRole;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const roles =
        userInfo.port === 1 ? "admin" : userInfo.port === 2 ? "user" : "shop";
      console.log(roles);
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.port)
          .then(response => {
            const data = response.data;
            const tokenStr = data.token;
            setToken(tokenStr, data.expireTime);
            setCookie("roles", roles, 1);
            console.log(roles);
            commit("SET_ROLES", roles);
            commit("SET_TOKEN", tokenStr);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log("roles", state.roles);
        console.log("roles", getCookie("roles"));
        let role = state.roles;
        if (role.length === 0) {
          role = getCookie("roles");
        }
        console.log(role === "user");
        if (role === "shop") {
          getShopInfo()
            .then(result => {
              const data = result.data;
              commit("SET_NAME", data.name);
              commit("SET_SHOPID", data.shopId);
              resolve(result);
            })
            .catch(err => {});
        } else if (role === "user") {
          getUserInfo()
            .then(result => {
              const data = result.data;
              commit("SET_NAME", data.username);
              commit("SET_USERID", data.userId);
              console.log(data);
              resolve(result);
            })
            .catch(err => {
              reject(error);
            });
        } else if (role == "admin") {
          getAdminSelfInfo()
            .then(result => {
              console.log("admin", result);
              const data = result.data;
              commit("SET_NAME", data.username);
              commit("SET_ADMINROLE", data.roleEntities);
              resolve(result);
            })
            .catch(err => {
              reject(error);
            });
        }
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        commit("SET_NAME", "");
        removeToken();
        removeCookie("roles");
        removeCookie("username");
        window.sessionStorage.clear();
        window.sessionStorage.removeItem("store");
        window.sessionStorage.removeItem("vuex");
        resolve();
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        removeCookie("roles");
        removeCookie('username')
        window.sessionStorage.removeItem("store");
        window.sessionStorage.removeItem("vuex");
        window.sessionStorage.clear();
        resolve();
      });
    }
  }
};

export default user;
