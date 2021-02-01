<template>
  <div class="app-container">
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.complaintId}}</template>
        </el-table-column>
        <el-table-column label="内容" align="center" width="300">
          <template slot-scope="scope">{{scope.row.content}}</template>
        </el-table-column>

        <el-table-column label="商店名" align="center">
          <template slot-scope="scope">{{scope.row.shop.name}}</template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.user.name}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="反馈内容" width='200' align="center">
          <template slot-scope="scope">{{scope.row.reply}}</template>
        </el-table-column>
        <el-table-column label="处理时间" align="center">
          <template slot-scope="scope">{{scope.row.handleTime}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status==1?'处理成功':'处理中'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleDelete(scope.$index, scope.row)">处理反馈</el-button>
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
    <el-dialog title="处理投诉" :visible.sync="complainDialogVisible">
  <el-form @submit.native.prevent :model="complinFrom">
    <el-form-item label="反馈内容" label-width="20">
      <el-input v-model="complinFrom.reply"   autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="complainDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmComplaint()">确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>
<script>
import {
  fetchList,
  createAdmin,
  updateAdmin,
  updateStatus,
  deleteAdmin,
  getRoleByAdmin,
  allocRole
} from "@/api/login";
import { getComplainInfo, handleComplain } from "@/api/shop";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
};
const defaultAdmin = {
  complaintId: null,
  createTime: null,
  handleTime: null,
  shopId: null,
  content: null,
  userId: null
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
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      complainDialogVisible: false,
      allocAdminId: null,
      complinFrom:{
        reply:"",
        complaintId:""
      }
    };
  },
  created() {
    this.getList();
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
    handleDelete(index, row) {
      this.complainDialogVisible = true;
      this.complinFrom.complaintId = row.complaintId;
      this.complinFrom.status = row.status;
    },
    confirmComplaint(){
      if(this.complinFrom.status==0){
        handleComplain(this.complinFrom).then(response => {
          this.complinFrom.reply="";
          this.complinFrom.complaintId= '';
          this.$message({
            type: "success",
            message: "反馈成功!"
          });
          this.complainDialogVisible = false
          this.getList();
        });
      }else{
        this.$message({
          type:"warning",
          message:"已经处理成功"
        })
      }


    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.admin = Object.assign({}, row);
    },
    getList() {
      this.listLoading = true;
      getComplainInfo(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.content;
        this.total = response.data.totalElements;
      });
    },
    getRoleListByAdmin(adminId) {
      getRoleByAdmin(adminId).then(response => {
        let allocRoleList = response.data;
        this.allocRoleIds = [];
        if (allocRoleList != null && allocRoleList.length > 0) {
          for (let i = 0; i < allocRoleList.length; i++) {
            this.allocRoleIds.push(allocRoleList[i].id);
          }
        }
      });
    }
  }
};
</script>

<style></style>


