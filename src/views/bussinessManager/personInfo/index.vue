<template>
  <div class="personInfo">
    <el-form
      @submit.native.prevent
      :model="infoFrom"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商家名" prop="name">
        <el-input v-model="infoFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺介绍" prop="intro">
        <el-input v-model="infoFrom.intro" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone" required>
        <el-input v-model="infoFrom.phone"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="categoryId" required>
        <el-select v-model="infoFrom.categoryId" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in categoryArr"
            :key="item.categoryId"
            :label="item.name"
            :value="item.categoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="infoFrom.address"></el-input>
      </el-form-item>
      <el-form-item label="照片" prop="pic">
        <el-upload
          class="upload-demo"
          action="/o2o/sys/file/uploadPic"
          :on-success="handleUpload"
          :limit="1"
          accept=".jpg, .png, .jpeg"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="起步价格" prop="price" required>
        <el-input v-model.number="infoFrom.price"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" @click="submitForm('ruleForm')">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPersonInfo, updatePersonInfo } from "@/api/shop";
import { getListCategory } from "@/api/index";
export default {
  name: "personInfo",
  data() {
    var validatePhone = (rule, value, callback) => {
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
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入正确的价格"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      baseUrl: "http://116.62.26.61:8003/o2o/",
      infoFrom: null,
      rules: {
        name: [
          { required: true, message: "请输入商店名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        intro: [{ required: true, message: "请输入店铺介绍", trigger: "blur" }],
        pic: [{ required: true, message: "文件不能为空", trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        price: [{ validator: checkNumber, trigger: "blur" }],
        categoryId: [
          { required: true, message: "分类不能为空", trigger: "blur" },
        ],
      },
      categoryArr: [],
    };
  },
  created() {
    this.getCategory();
    this.getInfo();
  },

  methods: {
    //上传轮播图
    handleUpload(response, file, fileList) {
      //console.log(response);
      this.infoFrom.pic = response.data;
    },
    getCategory() {
      getListCategory({ pageNum: 1, pageSize: 100 })
        .then((result) => {
          this.categoryArr = result.data.content;
        })
        .catch((err) => {});
    },
    getInfo() {
      getPersonInfo()
        .then((result) => {
          this.infoFrom = result.data;
        })
        .catch((err) => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePersonInfo(this.infoFrom)
            .then((result) => {
              this.$message({ type: "success", message: "修改成功" });
            })
            .catch((err) => {});
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.personInfo {
  width: 60%;
  margin: 20px auto;
}
</style>
