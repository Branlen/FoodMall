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
        <el-form
          @submit.native.prevent
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="角色名称" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>-->
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.bookId}}</template>
        </el-table-column>
        <el-table-column label="预约人" align="center">
          <template slot-scope="scope">{{scope.row.userEntity.name}}</template>
        </el-table-column>
        <el-table-column label="到达时间" align="center">
          <template slot-scope="scope">{{scope.row.arriveTime|formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="人数" align="center">
          <template slot-scope="scope">{{scope.row.people}}</template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleConfirm(scope.$index, scope.row)"
            >确定预约</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleRefuse(scope.$index, scope.row)"
            >拒绝预约</el-button>
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
  </div>
</template>
<script>
import { getBookListInfo, confirmBook, refuseBook } from "@/api/shop";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
const defaultAdmin = {
  evalutionId: null,
  createTime: null,
  menuId: null,
  orderPrice: null,
  shopId: null,
  userId: null,
  status: 1
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
      allocDialogVisible: false,
      allocRoleIds: [],
      allocAdminId: null
    };
  },
  props: {
    shopId: ""
  },
  created() {
    this.listQuery.shopId = this.shopId;
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
    reback() {},
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
    handleConfirm(index, row) {
      if (row.status === "预约中") {
        confirmBook(row.bookId).then(response => {
          this.$message({
            type: "success",
            message: "确定预约成功!"
          });
          this.getList();
        });
      } else {
        this.$message({
          type: "warning",
          message: "当前已经预约成功/取消了"
        });
      }
    },
    handleRefuse(index, row) {
      if (row.status === "预约中") {
        this.$confirm("是否要拒绝预约吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          refuseBook(row.bookId).then(response => {
            this.$message({
              type: "success",
              message: "拒绝成功!"
            });
            this.getList();
          });
        });
      } else {
        this.$message({
          type: "warning",
          message: "当前已经预约成功/取消了"
        });
      }
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.admin = Object.assign({}, row);
    },
    getList() {
      this.listLoading = true;
      getBookListInfo(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.content;
        this.list.forEach(item => {
          let status = item.status;
          switch (status) {
            case 0:
              item.status = "预约中";
              break;
            case 1:
              item.status = "已取消";
              break;
            case 2:
              item.status = "已确定";
              break;
            case 3:
              item.status = "已拒绝";
              break;
          }
        });
        this.total = response.data.totalElements;
      });
    },
    reback() {
      this.$emit("reback");
    }
  }
};
</script>
<style>
.back {
  font-size: 26px;
}
</style>


