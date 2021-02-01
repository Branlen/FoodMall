<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { shopRouterMap, adminRouterMap } from "./router";
import { getCookie, removeCookie, setCookie } from "@/utils/support";
export default {
  name: "App",
  created() {
    // this.$store.commit("SET_ROUTERS", adminRouterMap);
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    var app = document.getElementById("app");
    app.style.width = that.screenWidth + "px";
    // //console.log(document.body.clientWidth);
    var phoneWidth = parseInt(window.screen.width);
    var phoneHeight = parseInt(window.screen.height);
    var phoneScale = phoneWidth / 1000; //除以的值按手机的物理分辨率
    var ua = navigator.userAgent;
    if (/Android (\d+\.\d+)/.test(ua)) {
      var version = parseFloat(RegExp.$1);
      // andriod 2.3
      if (version > 2.3) {
        document.write(
          '<meta name="viewport" content="width=device-width,initial-scale=' +
            phoneScale +
            ",minimum-scale=" +
            phoneScale +
            ",maximum-scale=" +
            phoneScale +
            ',user-scalable=no">'
        );
        // andriod 2.3以上
      } else {
        document.write(
          '<meta name="viewport" content="width=device-width,user-scalable=no">'
        );
      }
      // 其他系统
    } else {
      document.write(
        '<meta name="viewport" content="width=device-width, initial-scale=' +
          0.5 +
          ",minimum-scale=" +
          phoneScale +
          ",maximum-scale =" +
          phoneScale +
          ',user-scalable=no,">'
      );
    }
  },
  beforeDestroy(){
    window.sessionStorage.clear();
    removeCookie('username')
    removeCookie('roles')
    removeCookie('loginToken')
  }
};
</script>

<style lang='less'>
.marginTop {
  margin: 3px 0;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
