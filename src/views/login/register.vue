<template>
  <div class="register">
    <div class="white">
      <div class="logo">
        <img src="http://xj.gdtimg.com/xjimg/0/78e1f1142e36cf5d62560576063f80741bbc3f69.png/0" alt />
      </div>
    </div>

    <div class="backImg">
      <div class="box">
        <el-card>
          <h2 style="color:#8794A7;">Register</h2>
          <el-form
          @submit.native.prevent
            label-width="auto"
            label-position="left"
            status-icon
            :rules="rules"
            ref="registerInfo"
            :model="registerInfo"
          >
            <el-form-item
              prop="username"
              :rules="[
      { required: true, message: '登录名不能为空', trigger: 'blur' },]"
              label="登录名："
              :error="errorMsg"
            >
              <el-input
                v-model="registerInfo.username"
                placeholder="UserName"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[
      { required: true, message: '密码不能为空', trigger: 'blur' },]"
              label="密码："
              :error="errorMsg2"
            >
              <el-input
                v-model="registerInfo.password"
                type="password"
                placeholder="password"
                prefix-icon="el-icon-lock"
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="phone"
              :error="errorMsg3"
              label="手机："
            >
              <el-input
                v-model="registerInfo.phone"
                placeholder="phone"
                prefix-icon="el-icon-phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="name"
              :rules="[
              { required: true, message: '请输入昵称', trigger: 'blur' }
            ]"
              :error="errorMsg3"
              label="昵称："
            >
              <el-input
                v-model="registerInfo.name"
                placeholder="Name"
                prefix-icon="el-icon-receiving"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-radio-group v-model="registerInfo.port" size="small">
                <el-radio :label="1">成为用户</el-radio>
                <el-radio :label="2">入驻商家</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button
                class="loginSubmit"
                type="primary"
                size="medium"
                @click="submitForm('registerInfo')"
              >注册</el-button>
              <el-button class="loginSubmit" type="primary" size="medium" @click="backLogin()">返回登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <img src="../../assets/images/bg1.jpg" class="login-center-layout" />
  </div>
</template>

<script>
import { registerShop, registerUser } from "../../api/login";
// import getBack from"./backgound"
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      //console.log("Asd");
      var phone = value.replace(/\s/g, ""); //去除空格
      //校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、176~178。14号段为上网卡专属号段
      let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if (value.length == 0) {
       callback([new Error("请输入手机号")]);
      } else {
        if (!regs.test(phone)) {
          callback([new Error("手机号输入不合法")]);
        } else {
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerInfo.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerInfo: {
        name: "",
        username: "",
        password: "",
        phone: "",
        port: 1
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }]
      },
      errorMsg: "",
      errorMsg2: "",
      errorMsg3: ""
    };
  },
  mounted() {
    //判断当前是否是手机设备
    if (/Android|webOS|iPhone|BlackBerry/i.test(navigator.userAgent)) {
      var logo = document.getElementsByClassName("logo")[0];
      var formLayout = document.getElementsByClassName(" backImg")[0];
      var centerLayout = document.getElementsByClassName(
        "login-center-layout"
      )[0];
      logo.style.marginLeft = "0px";
      formLayout.style.right = "5px";
      formLayout.style.width = "50%";
      formLayout.style.top = "10%";
      centerLayout.style.marginLeft = "0";
      centerLayout.style.marginTop = "120px";
    }
  },
  methods: {
    submitForm() {
      var _this = this
      var fullFlag =
        this.registerInfo.username !== "" &&
        this.registerInfo.password !== "" &&
        this.registerInfo.phone !== "" &&
        this.registerInfo.name !== "";
      if (fullFlag) {
        if(_this.registerInfo.port===1){
           registerUser(_this.registerInfo.username,_this.registerInfo.password,_this.registerInfo.phone,_this.registerInfo.name)
          .then(result => {
            this.$message({
              type:'success',
              message:"恭喜你成功注册"
            })
            this.$router.push("/login");
          })
          .catch(err => {});
        }else if(_this.registerInfo.port===2){
          registerShop(_this.registerInfo.username,_this.registerInfo.password,_this.registerInfo.phone,_this.registerInfo.name)
          .then((result) => {
            this.$message({
              type:'success',
              message:"恭喜你成为商家"
            })
            this.$router.push("/login");
          }).catch((err) => {

          });
        }

      } else {
        this.$message({
          message: "你的信息未填写完全",
          type: "warning"
        });
      }
    },
    backLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
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
.register {
  width: 100%;
  height: 100vh;
  background-color: #f8f8f7;

  .backTitle {
    width: 250px;
    margin: -40px 120px;
    box-sizing: border-box;
    img {
      height: 200px;
      margin-right: 1%;
    }
    h1 {
      margin: 0;
      font-size: 2em;
      font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
  }

  .backImg {
    width: 450px;
    position: absolute;
    top: 15vh;
    right: 180px;
    .box {
      width: 100%;
      // margin: 140px auto;
      border-top: 10px solid #96a28c;
      .loginSubmit {
        width: 150px;
        background-color: #ffb31a;
        border-color: #ffb31a;
        border-radius: 10px;
      }
      .el-input__icon {
        color: #96a28c;
      }
    }
  }
}

a {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  flex-flow: row-reverse wrap-reverse;
  justify-content: center;
  align-items: baseline;
  align-content: stretch;
  order: 22;
  flex-grow: 2;
  flex-shrink: 0.5;
  flex-basis: 635px;
}

.login-center-layout {
  width: 538px;
  height: 362px;
  margin-top: 10vh;
  margin-left: 20vw;
}
</style>
