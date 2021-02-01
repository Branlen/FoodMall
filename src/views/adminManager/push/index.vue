<template>
  <div class="app-container">
    <!-- <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">查询搜索</el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form @submit.native.prevent :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>-->
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.pushId}}</template>
        </el-table-column>
        <el-table-column label="照片" width="100" align="center">
          <template slot-scope="scope">
            <el-image style="width: 80px; height: 80px" :src="scope.row.pic" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">{{scope.row.title.slice(0,10)}}</template>
        </el-table-column>
        <el-table-column label="推送时间" align="center">
          <template slot-scope="scope">{{scope.row.pushTime}}</template>
        </el-table-column>

        <el-table-column label="商店" align="center">
          <template slot-scope="scope">{{scope.row.shopEntity.name}}</template>
        </el-table-column>
        <el-table-column label="归属" width="140" align="center">
          <template slot-scope="scope">{{scope.row.type===1?'轮播图':'普通推文'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="190" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleLook(scope.$index, scope.row)">查看文章</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <el-dialog :title="currentArticleTitle" :visible.sync="dialogArticleVisible">
        <el-card>
          <div v-html="currentArticleContent"></div>
        </el-card>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getInfo, ban, getInfoByid } from "@/api/admin/push";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: "",
};
const defaultAdmin = {
  pushId: null,
  content: null,
  pic: null,
  push_time: null,
  shopId: null,
  title: null,
};
export default {
  name: "adminList",
  data() {
    return {
      baseUrl: "http://116.62.26.61:8003/o2o/",
      dialogArticleVisible: false,
      currentArticleContent: "",
      currentArticleTitle: "",
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allocAdminId: null,
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
    },
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
      this.$confirm("是否要删除该推送?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        ban(row.pushId).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.admin = Object.assign({}, row);
    },
    //查看文章
    handleLook(index, row) {
      getInfoByid(row.pushId)
        .then((result) => {
          this.currentArticleContent = result.data.content;
          this.currentArticleTitle = row.title;
          this.dialogArticleVisible = true;
        })
        .catch((err) => {});
    },
    getList() {
      this.listLoading = true;
      getInfo(this.listQuery).then((response) => {
        this.listLoading = false;
        var data = response.data.content;
        data.forEach((item) => {
          item.pic = this.baseUrl + item.pic;
        });
        this.list = response.data.content;
        this.total = response.data.totalElements;
      });
    },
    getRoleListByAdmin(adminId) {
      getRoleByAdmin(adminId).then((response) => {
        let allocRoleList = response.data;
        this.allocRoleIds = [];
        if (allocRoleList != null && allocRoleList.length > 0) {
          for (let i = 0; i < allocRoleList.length; i++) {
            this.allocRoleIds.push(allocRoleList[i].id);
          }
        }
      });
    },
  },
};
</script>
<style></style>


