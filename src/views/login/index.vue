<template>
  <div class="login-all">
    <div class="white">
      <div class="logo">
        <img src="http://xj.gdtimg.com/xjimg/0/78e1f1142e36cf5d62560576063f80741bbc3f69.png/0" alt />
      </div>
    </div>

    <el-card class="login-form-layout">
      <el-form
        @submit.native.prevent
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <h2 class="login-title color-main">登录</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autocomplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="loginForm.port">
            <el-radio :label="2">用户</el-radio>
            <el-radio :label="3">商家</el-radio>
            <el-radio :label="1">管理员</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button
            style="width: 45%"
            type="primary"
            :loading="loading"
            @click.prevent="handleLogin"
            >登录</el-button
          >
          <el-button
            style="width: 45%"
            type="primary"
            :loading="loading"
            @click.prevent="handleRegister"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <img src="../../assets/images/bg1.jpg" class="login-center-layout" />
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { setSupport, getSupport, setCookie, getCookie } from "@/utils/support";
import { login } from "@/api/login";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        port: 2
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      dialogVisible: false,
      supportDialogVisible: false
    };
  },
  created() {
    this.$alert("该系统分为三个端口，大家可以随意查看，但请不要删除数据，谢谢你的配合！！！！只供学习参考----------------------------用户端账号：huang，密码：123 ------------------------------------- 商家端账号：huang ，密码：123  -------------------------------------  管理端账号：admin，密码：123", "登陆有关信息", {
      confirmButtonText: "确定",

    });
    this.loginForm.username = getCookie("username");
    this.loginForm.password = getCookie("password");
    if (
      this.loginForm.username === undefined ||
      this.loginForm.username == null ||
      this.loginForm.username === ""
    ) {
      this.loginForm.username = "admin";
    }
    if (
      this.loginForm.password === undefined ||
      this.loginForm.password == null
    ) {
      this.loginForm.password = "";
    }
  },
  mounted() {
    //判断当前是否是手机设备
    if (/Android|webOS|iPhone|BlackBerry/i.test(navigator.userAgent)) {
      var logo = document.getElementsByClassName("logo")[0];
      var formLayout = document.getElementsByClassName("login-form-layout")[0];
      var centerLayout = document.getElementsByClassName(
        "login-center-layout"
      )[0];
      logo.style.marginLeft = "0px";
      formLayout.style.right = "5px";
      formLayout.style.width = "40%";
      centerLayout.style.marginLeft = "0";
      centerLayout.style.marginTop = "120px";
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //console.log("object");
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              setCookie("username", this.loginForm.username, 0.1);

              // setCookie("password",this.loginForm.password,2);
              if (this.loginForm.port == 2) {
                this.$router.push({ path: "/" });
              } else {
                this.$router.push({ path: "/home" });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          //console.log('参数验证不合法！');
          return false;
        }
      });
    },
    handleRegister() {
      this.$router.push({ path: "/register" });
    },
    handleTry() {
      this.dialogVisible = true;
    },
    dialogConfirm() {
      this.dialogVisible = false;
      setSupport(true);
    },
    dialogCancel() {
      this.dialogVisible = false;
      setSupport(false);
    }
  }
};
</script>

<style lang="less" scoped>
.login-all {
  background-color: #f8f8f7;
  height: 100vh;
}
.white {
  width: 100%;
  height: 90px;
  background-color: #fff;
}
.logo {
  width: 200px;
  margin: -15px 150px;
  box-sizing: border-box;
}
.logo img {
  margin: 10px 0;
  width: 100%;
}
.login-form-layout {
  position: absolute;
  top: 120px;
  right: 10vw;
  width: 30%;
  padding: 0px 30px 0px;
  // margin: 140px auto;
  border-top: 10px solid #96a28c;
}
.login-form-layout svg {
  color: #96a28c;
}

.login-form-layout button {
  background-color: #ffb31a;
  border-color: #ffb31a;
}
.login-title {
  text-align: center;
  color: #8794a7;
}

.login-center-layout {
  width: 538px;
  height: 362px;
  margin-top: 10vh;
  margin-left: 15vw;
}
</style>
