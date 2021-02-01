<template>
  <div class="infoMana">
    <el-form  @submit.native.prevent label-position="right" ref="adminInfo" label-width="80px" :model="adminInfo">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="adminInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="adminInfo.password" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="password">
        <el-select v-model="value" multiple disabled placeholder="请选择">
          <el-option
            v-for="item in adminInfo.roleEntities"
            :key="item.roleId"
            :label="item.name"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAdminSelfInfo } from "@/api/admin/admin";
export default {
  data() {
    return {
      adminInfo: {
        username: "",
        password: ""
      },
      value: []
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      getAdminSelfInfo()
        .then(result => {
          if (result.status == 200) {
            this.adminInfo = result.data;
            result.data.roleEntities.forEach(item => {
              this.value.push(item.name);
            });
          }
        })
        .catch(err => {});
    },
    submitForm(formName) {
      //console.log("hello");
    },
    resetForm(formName) {
      let _self = this;
      this.$nextTick(() => {
        _self.$refs["adminInfo"].resetFields();
        //console.log(_self.$refs["adminInfo"].resetFields);
      });
    }
  }
};
</script>

<style scoped>
.infoMana {
  padding: 40px 20px;
  width: 400px;
  margin: 40px auto;
  border: 1px solid #dddcdc;
  border-radius: 5px;
}
</style>
