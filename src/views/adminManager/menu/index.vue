<template>
  <div class="app-container">
    <div class="back" style="cursor:pointer" @click="reback">
      <i class="el-icon el-icon-back"></i>
    </div>
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.menuId}}</template>
        </el-table-column>
        <el-table-column label="照片" width="100" align="center">
          <template slot-scope="scope">
            <el-image style="width: 80px; height: 80px" :src="scope.row.pic" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="套餐名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="套餐介绍" align="center">
          <template slot-scope="scope">{{scope.row.intro}}</template>
        </el-table-column>
        <el-table-column label="套餐价格" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status==1?'下架':'上架'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)"
            >下架/上架</el-button>
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
import { getInfo, ban, sell } from "@/api/admin/menu";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
  shopId: 1,
};
const defaultAdmin = {
  menuId: null,
  name: null,
  intro: null,
  pic: null,
  price: null,
  shopId: null,
  status: 1,
};
export default {
  name: "adminList",
  data() {
    return {
      baseUrl: "http://116.62.26.61:8003/o2o/",
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
  props: {
    shopId: "",
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
      if (row.status === 0) {
        this.$confirm("是否要下架该菜单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          ban(row.menuId).then((response) => {
            this.$message({
              type: "success",
              message: "下架成功!",
            });
            this.getList();
          });
        });
      } else if (row.status == 1) {
        this.$confirm("是否要上架该菜单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          sell(row.menuId).then((response) => {
            this.$message({
              type: "success",
              message: "上架成功!",
            });
            this.getList();
          });
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
      getInfo(this.listQuery).then((response) => {
        this.listLoading = false;
        var data = response.data.content;
        data.forEach((item) => {
          item.pic = this.baseUrl + item.pic;
        });
        this.list = response.data.content;
        this.list = response.data.content;
        this.total = response.data.totalElements;
      });
    },
    reback() {
      this.$emit("reback");
    },
  },
};
</script>
<style>
.back {
  font-size: 26px;
}
</style>


