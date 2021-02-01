<template>
  <div class="top">
    <!--图标和头顶信息-->
    <div class="topHead">
      <div class="toggleCity">
        <i class="el-icon el-icon-location-information"></i>
        <el-cascader
          v-model="cityName"
          placeholder="切换城市"
          :show-all-levels="false"
          :options="options"
          @change="changeCity"
        ></el-cascader>
      </div>
      <div class="loginBtn">
        <span v-if="isLogin">
          <span>你好，{{username}}</span>&nbsp;|
          <span >
            <el-button type="text" @click="logOut()" style="color:white">退出</el-button>
          </span>
        </span>
        <span v-else>
          <router-link to="/login"> <span>登录</span></router-link>
         &nbsp;|
         <router-link to="/register"><span>注册</span></router-link>

        </span>
      </div>
    </div>

    <!--搜索部分-->
    <div class="search">
      <div class="logo">
        <a @click.prevent="backIndex">
          <img src="http://xj.gdtimg.com/xjimg/0/78e1f1142e36cf5d62560576063f80741bbc3f69.png/0" alt />
        </a>
      </div>
      <div class="searchBox">
        <TipsInput
          placeholder="请输入推文咨询的内容"
          :tips="tips"
          @tipsChosen="searchTip"
          ref="TipsInput"
          v-model="searchText"
        />
        <div class="searchButton" @click="searchConfirm">
          <i class="iconfont icon-search" />
        </div>
      </div>
    </div>
    <!-- 导航条部分-->
    <div class="menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#cfb5b1"
      >
        <el-menu-item index="1" @click="goHomePage">我的首页</el-menu-item>
        <el-menu-item index="2" @click="goOrder">我的订单</el-menu-item>
        <el-menu-item index="3" @click="goFollows">我的关注</el-menu-item>
        <el-menu-item index="4" @click="goComplain">我的投诉</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import TipsInput from "../../../components/TipsInput";
import Cookies from 'js-cookie'
import { getToken } from "@/utils/auth"; // 验权
import { listLocation } from "@/api/index";
export default {
  components: {
    TipsInput
  },
  data() {
    return {
      isLogin: false,
      username: "",
      activeIndex: "1",
      tips: ["aa", "bb", "cc"],
      searchText: "",
      cityName: ["广东省", ""],
      options: null
    };
  },
  created() {
    if (getToken() != null) {
      this.isLogin = true;
      this.username = Cookies.get('username');
    }
    this.getCityInfo();
    this.cityName[1] =  this.$store.getters.city?this.$store.getters.city:'湛江市'
    this.$store.commit("SET_CITY", this.cityName[1]);
  },
  methods: {
    //获得城市信息
    getCityInfo() {
      listLocation()
        .then(result => {
          const data = result.data;
          data.forEach(element => {
            element.value = element.label;
            element.children.forEach(item => {
              item.value = item.label;
            });
          });
          this.options = data;
        })
        .catch(err => {});
    },
    goHomePage() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
      this.$emit("isPerson");
    },
    changeCity() {
      this.$store.commit("SET_CITY", this.cityName[1]);
      window.location.reload(true);
    },
    handleSelect() {},
    searchTip() {},
    searchConfirm() {
      //console.log("tag", this.searchText);
      if (this.searchText == "") {
        this.$message("搜索内容不能为空");
      } else {
        this.$router.push("/search/" + this.searchText);
      }
    },
    backIndex() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
      this.$emit("isPerson");
    },
    //跳转到个人中心页面
    goOrder() {
      if (!this.isLogin) {
        this.$confirm("你还没登录，前往登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "未登录无法查看"
            });
          });
      } else {
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
        this.$emit("getOrder", { currentComponnet: "MyOrder", isPerson: true });
      }
    },
    goFollows() {
      if (!this.isLogin) {
        this.$confirm("你还没登录，前往登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "未登录无法查看"
            });
          });
      } else {
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
        this.$emit("getFollows", {
          currentComponnet: "MyFollows",
          isPerson: true
        });
      }
    },
    goComplain() {
      if (!this.isLogin) {
        this.$confirm("你还没登录，前往登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "未登录无法查看"
            });
          });
      } else {
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
        this.$emit("getComplain", {
          currentComponnet: "MyComplain",
          isPerson: true
        });
      }
    },
    logOut(){

      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug

      })

    }
  }
};
</script>

<style lang="less" scoped>
@primary: rgb(209, 157, 148);
.topHead {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #f8f8f7;
  background-color: @primary;
  display: flex;
  padding: 0 10vw;
  justify-content: space-between;
  align-items: center;
  .toggleCity {
    height: 100%;
    width: 12%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-bottom: 1px;
    color: #ffffff;
    .el-cascader {
      margin-left: 5px;
      display: inline;
      .el-input {
        input {
          width: 200px;
          border: none;
        }
      }
    }
  }
  .loginBtn {
    height: 100%;
    display: flex;
    align-items: center;
    color: #f8f8f7;
  }
}
.search {
  width: 100%;
  margin: 0 auto;
  padding: 10px 130px;
  display: flex;
  justify-content: start;
  .logo {
    font-size: 16px;
    min-width: 220px;
    height: 60px;
    box-sizing: content-box;
    vertical-align: sub;
    img {
      width: 210px;
      height: 90px;
      position: relative;
      top: -15px;
    }
  }
  .searchBox {
    display: inline-block;
    width: 550px;
    height: 40px;
    margin-left: 10%;
    padding: 10px 0;
    vertical-align: middle;
    display: flex;
    justify-content: start;
    .TipsInput {
      margin-left: 30px;
      height: 40px;
    }
    .searchButton {
      display: inline-block;
      width: 80px;
      height: 40px;
      background-color: @primary;
      text-align: center;
      line-height: 35px;
      box-sizing: border-box;
      outline: none;
      cursor: pointer;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    .icon-search {
      font-size: 24px;
      font-weight: bold;
      color: white;
      cursor: pointer;
      position: relative;
      top: 4px;
    }
  }
}
.menu {
  position: relative;
  width: 100%;
}
.menu .el-menu-demo {
  padding-left: 10vw;
}
.menu .el-menu-demo li:hover {
  color: @primary;
}
</style>
