import Vue from 'vue'
// import Vuex from 'vuex'
import getters from "./getters";
import createPersistedState from "vuex-persistedstate"
import app from "./modules/app";
import permission from "./modules/permission";
import user from "./modules/user";

// Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          user: val.user,
          permission: val.permission
        };
      }
    })
  ]
});

export default store;
