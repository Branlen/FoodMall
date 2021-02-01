<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="handleSearchList()" type="primary" size="small">查询结果</el-button>
        <el-button
          style="float: right;margin-right: 15px"
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
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="推文内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddProduct()" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.pushId}}</template>
        </el-table-column>
        <el-table-column label="主图片" width="120" align="center">
          <template slot-scope="scope">
            <img style="width:100px" :src="scope.row.pic" />
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="发布时间" align="center">
          <template slot-scope="scope">{{scope.row.pushTime|formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="归属" width="100" align="center">
          <template slot-scope="scope">{{scope.row.type===1?'轮播图':'普通推文'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleShowProduct(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" @click="handleUpdateProduct(scope.$index, scope.row)">编辑</el-button>
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
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :title="currentArticleTitle" :visible.sync="dialogArticleVisible">
      <el-card class="markdown-body">
        <div v-html="currentArticleContent"></div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import { getPushList, deletePush } from "@/api/shop";

import { formatDate } from "@/utils/date";
const defaultListQuery = {
  keyword: "",
  pageNum: 1,
  pageSize: 10,
};
export default {
  name: "productList",

  data() {
    return {
      baseUrl: "http://116.62.26.61:8003/o2o/",
      dialogArticleVisible: false,
      currentArticleContent: "",
      currentArticleTitle: "",
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      selectProductCateValue: null,
      multipleSelection: [],
      productCateOptions: [],
      brandOptions: [],
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
  watch: {
    selectProductCateValue: function (newValue) {
      if (newValue != null && newValue.length == 2) {
        this.listQuery.productCategoryId = newValue[1];
      } else {
        this.listQuery.productCategoryId = null;
      }
    },
  },

  methods: {
    getProductSkuSp(row, index) {
      let spData = JSON.parse(row.spData);
      if (spData != null && index < spData.length) {
        return spData[index].value;
      } else {
        return null;
      }
    },
    getList() {
      this.listLoading = true;
      getPushList(this.listQuery).then((response) => {
        this.listLoading = false;
        var data = response.data.content;
        data.forEach((item) => {
          item.pic = this.baseUrl + item.pic;
        });
        this.list = data;
        this.total = response.data.totalElements;
      });
    },
    handleSearchEditSku() {
      fetchSkuStockList(this.editSkuInfo.productId, {
        keyword: this.editSkuInfo.keyword,
      }).then((response) => {
        this.editSkuInfo.stockList = response.data;
      });
    },
    handleEditSkuConfirm() {
      if (
        this.editSkuInfo.stockList == null ||
        this.editSkuInfo.stockList.length <= 0
      ) {
        this.$message({
          message: "暂无sku信息",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("是否要进行修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateSkuStockList(
          this.editSkuInfo.productId,
          this.editSkuInfo.stockList
        ).then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
          this.editSkuInfo.dialogVisible = false;
        });
      });
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleAddProduct() {
      this.$router.push({ path: "/doaap/addConsult" });
    },
    handleBatchOperate() {},
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePublishStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updatePublishStatus(row.publishStatus, ids);
    },
    handleNewStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateNewStatus(row.newStatus, ids);
    },
    handleRecommendStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateRecommendStatus(row.recommandStatus, ids);
    },
    handleResetSearch() {
      this.selectProductCateValue = [];
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleDelete(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deletePush(row.pushId)
          .then((result) => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          })
          .catch((err) => {});
      });
    },
    handleUpdateProduct(index, row) {
      //console.log(row);
      row.type = row.type.toString();
      this.$router.push({
        path: "/doaap/addConsult",
        query: row,
      });
    },
    handleShowProduct(index, row) {
      console.log(row.content);
      this.currentArticleContent = row.content;
      this.currentArticleTitle = row.title;
      this.dialogArticleVisible = true;
    },
    handleShowVerifyDetail(index, row) {
      //console.log("handleShowVerifyDetail", row);
    },
  },
};
</script>
<style></style>


