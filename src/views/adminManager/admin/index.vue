<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.adminId}}</template>
        </el-table-column>
        <el-table-column label="帐号" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="密码" align="center">
          <template slot-scope="scope">{{scope.row.password}}</template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>

        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleSelectRole(scope.$index, scope.row)"
            >分配角色</el-button>
            <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">更新密码</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :title="isEdit?'编辑用户':'添加用户'" :visible.sync="dialogVisible" width="40%">
      <el-form @submit.native.prevent :model="admin" ref="adminForm" label-width="150px" size="small">
        <el-form-item label="帐号：">
          <el-input v-model="admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="admin.password" type="password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="admin.name" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="allocDialogVisible" width="30%">
      <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">
        <el-option
          v-for="item in allRoleList"
          :key="item.roleId"
          :label="item.name"
          :value="item.roleId"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="更换密码" :visible.sync="passwordDialogVisible" width="30%">
      <el-form :model="changePassword" ref="adminForm" label-width="150px" size="small">
        <el-form-item label="新密码：">
          <el-input v-model="changePassword.newPassword" type="password" ></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码：">
          <el-input v-model="changePassword.rePassword" type="password" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleChangePassword()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getInfo,
  deleteAdmin,
  addAdmin,
  updatePassword
} from "@/api/admin/admin";
import {
  getRoleInfo,
  addRole,
  getRoleInfoByAdminId,
  removeRole
} from "@/api/role";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
};
const defaultAdmin = {
  username: null,
  password: null,
  name: null
};
export default {
  name: "adminList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      passwordDialogVisible: false,
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocAdminId: null,
      changePassword: {
        id: "",
        newPassword: "",
        rePassword: ""
      },
      //当前该管理员所拥有的roleId
      currentAllocRoleIds: []
    };
  },
  created() {
    this.getList();
    this.getAllRoleList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.admin = Object.assign({}, defaultAdmin);
    },

    handleDelete(index, row) {
      this.$confirm("是否要删除该管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteAdmin(row.adminId).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.changePassword.id = row.adminId;
      this.changePassword.newPassword = "";
      this.changePassword.rePassword = "";
      this.passwordDialogVisible = true;
    },
    handleChangePassword() {
      if (this.changePassword.newPassword !== this.changePassword.rePassword) {
        this.$message({
          type: "warning",
          message: "两次密码不一致"
        });
      } else {
        var _this = this;
        this.$confirm("是否要确认?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          //这里还要修改\
          updatePassword(
            _this.changePassword.id,
            _this.changePassword.newPassword
          )
            .then(result => {
              _this.$message({
                type: "success",
                message: "更新密码正确"
              });
              this.passwordDialogVisible = false;
              _this.getList();
            })
            .catch(err => {});
        });
      }
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.isEdit) {
          updateAdmin(this.admin.id, this.admin).then(response => {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          addAdmin(this.admin).then(response => {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },
    handleAllocDialogConfirm() {
      var _this = this;
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //这里还要修改\
        //判断两个数组那些是需要新增角色，那些移除角色
        let addRoles = [];
        let deleteRoles = [];
        var newArray = this.allocRoleIds;
        var oldArray = this.currentAllocRoleIds;
        //实现深复制
        addRoles = newArray.slice(0);
        deleteRoles = oldArray.slice(0);
        for (var i = 0; i < newArray.length; i++) {
          for (var j = 0; j < oldArray.length; j++) {
            if (newArray[i] === oldArray[j]) {
              //找到重复的值进行删除，兵发现该值在数组的索引
              addRoles.splice(addRoles.indexOf(newArray[i]), 1);
              deleteRoles.splice(deleteRoles.indexOf(newArray[i]), 1);
            }
          }
        }
        //console.log(addRoles);
        //console.log(deleteRoles);
        //对所有回调执行完后，统一发出一个信息提示
        if(deleteRoles!=null){
           deleteRoles.forEach(item => {
          removeRole(_this.allocAdminId, item).then(response => {
             _this.$message({
              message: "重新分配成功！",
              type: "success"
            });
            _this.allocDialogVisible = false;
          });
        });
        }
        if(addRoles!=null){
          addRoles.forEach(item => {
          addRole(_this.allocAdminId, item).then(response => {
            _this.$message({
              message: "重新分配成功！",
              type: "success"
            });
            _this.allocDialogVisible = false;
          });
        });
        }

      });
    },
    //跳转到分配角色页面
    handleSelectRole(index, row) {
      this.allocAdminId = row.adminId;
      this.allocDialogVisible = true;
      this.getRoleListByAdmin(row.adminId);
    },
    getList() {
      this.listLoading = true;
      getInfo(this.listQuery).then(response => {
        this.listLoading = false;
        //console.log("response :", response);
        this.list = response.data.content;
        this.total = response.data.total;
      });
    },
    getAllRoleList() {
      getRoleInfo().then(response => {
        this.allRoleList = response.data.content;
      });
    },
    getRoleListByAdmin(adminId) {
      getRoleInfoByAdminId(adminId).then(response => {
        //console.log("responses :", response);
        let allocRoleList = response.data;
        this.allocRoleIds = [];
        if (allocRoleList != null && allocRoleList.length > 0) {
          for (let i = 0; i < allocRoleList.length; i++) {
            this.allocRoleIds.push(allocRoleList[i].roleId);
          }
        }
        this.currentAllocRoleIds = this.allocRoleIds;
      });
    }
  }
};
</script>
<style></style>


