<template>
  <div class="app-container">
    <div v-if="isMenu">
      <Menu @reback="rebackShop" :shopId="currentShopId"></Menu>
    </div>
    <div v-else-if="isOrder">
      <Order @reback="rebackShop" :shopId="currentShopId"></Order>
    </div>
    <div v-else-if="isComment">
      <Comment @reback="rebackShop" :shopId="currentShopId"></Comment>
    </div>
    <div v-else>
      <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float:right"
            type="primary"
            @click="handleSearchList()"
            size="small"
          >查询搜索</el-button>
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
              <el-input v-model="listQuery.name" class="input-width" placeholder="商店名" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="table-container">
        <el-table ref="adminTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
          <el-table-column label="编号" width="100" align="center">
            <template slot-scope="scope">{{scope.row.shopId}}</template>
          </el-table-column>
          <el-table-column label="照片" width="100" align="center">
            <template slot-scope="scope">
              <el-image style="width: 80px; height: 80px" :src="scope.row.pic" fit="fill"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="帐号" align="center">
            <template slot-scope="scope">{{scope.row.username}}</template>
          </el-table-column>
          <el-table-column label="店铺" align="center">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="电话号码" align="center">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="介绍" width="280" align="center">
            <template slot-scope="scope">{{scope.row.intro}}</template>
          </el-table-column>
          <el-table-column label="地址" width="180" align="center">
            <template slot-scope="scope">{{scope.row.address}}</template>
          </el-table-column>
          <el-table-column label="商品分类" align="center">
            <template slot-scope="scope">{{scope.row.categoryName}}</template>
          </el-table-column>
          <el-table-column label="起步价格" align="center">
            <template slot-scope="scope">{{scope.row.price}}</template>
          </el-table-column>
          <el-table-column label="电话号码" align="center">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">{{scope.row.status==1?"封禁":"正常"}}</template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center" fixed="right">
            <template slot-scope="scope">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >封禁/解封</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleOrder(scope.$index, scope.row)"
                  >订单</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleMenu(scope.$index, scope.row)"
                  >菜单</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleComment(scope.$index, scope.row)"
                  >评价</el-button>
                </el-col>
              </el-row>
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
  </div>
</template>
<script>
import { getInfo, ban, backBan } from "@/api/admin/shop";
import { formatDate } from "@/utils/date";
import Comment from "../comment/index";
import Order from "../order/index";
import Menu from "../menu/index";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: "",
};
const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  name: null,
  intro: null,
  address: null,
  status: 1,
  price: null,
};
export default {
  name: "adminList",
  components: {
    Comment,
    Order,
    Menu,
  },
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
      //判断当前状态
      isOrder: false,
      isMenu: false,
      isComment: false,
      currentShopId: 1,
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
      if (row.status === 0) {
        this.$confirm("是否要禁用该商店?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          ban(row.shopId).then((response) => {
            this.$message({
              type: "success",
              message: "禁用成功!",
            });
            this.getList();
          });
        });
      } else if (row.status == 1) {
        this.$confirm("是否要解封该商店?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          backBan(row.shopId).then((response) => {
            this.$message({
              type: "success",
              message: "解封成功!",
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

        this.total = response.data.totalElements;
      });
    },
    handleOrder(index, row) {
      this.currentShopId = row.shopId;
      this.isOrder = true;
    },
    handleMenu(index, row) {
      this.currentShopId = row.shopId;
      this.isMenu = true;
    },
    handleComment(index, row) {
      this.currentShopId = row.shopId;
      this.isComment = true;
    },
    rebackShop(val) {
      this.isOrder = false;
      this.isMenu = false;
      this.isComment = false;
    },
  },
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>


