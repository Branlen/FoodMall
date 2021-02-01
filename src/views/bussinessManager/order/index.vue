<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
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
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="下单人" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.orderEntity.orderId}}</template>
        </el-table-column>
        <el-table-column label="下单人" align="center">
          <template slot-scope="scope">{{scope.row.userEntity.name}}</template>
        </el-table-column>
        <el-table-column label="订单内容" align="center">
          <template slot-scope="scope">{{scope.row.menuEntity.name}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.orderEntity.createTime}}</template>
        </el-table-column>
        <el-table-column label="订单价格" align="center">
          <template slot-scope="scope">{{scope.row.orderEntity.orderPrice}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.orderEntity.status===0?'已下单':scope.row.orderEntity.status===1?'付款成功':scope.row.orderEntity.status==2?'已取消':scope.row.orderEntity.status===3?'已使用':scope.row.orderEntity.status===4?'申请退款中':scope.row.orderEntity.status===5?'已退款':'已评价'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button
                size="mini"
                type="text"
                @click="confirmRefund(scope.$index, scope.row)"
              >确认退款</el-button>
              <el-button
                size="mini"
                type="text"
                @click="refuseRefund(scope.$index, scope.row)"
              >拒绝退款</el-button>
            </el-row>
            <el-row>
              <el-button
                size="mini"
                type="text"
                @click="completeOrder(scope.$index, scope.row)"
              >完成订单</el-button>
              <el-button size="mini" type="text" @click="refund(scope.$index, scope.row)">退款</el-button>
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
</template>
<script>
import { getOrderInfo,confirmRefund,confuseRefund,refund,confirmOrder } from "@/api/shop";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  shopId: 1
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
    //完成订单
    completeOrder(index,row) {
      console.log(row.orderEntity.status);
       if(row.orderEntity.status==1){
        this.$confirm("是否完成订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        confirmOrder(row.orderEntity.orderId).then(response => {
          this.$message({
            type: "success",
            message: "完成订单成功!"
          });
          this.getList();
        });
      });
      }else{
        this.$message({
          type:'warning',
          message:'当前状态不可完成订单'
        })
      }
    },
    //退款
    refund(index,row) {
      if(row.orderEntity.status==1){
        this.$confirm("是否要确定退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        refund(row.orderEntity.orderId).then(response => {
          this.$message({
            type: "success",
            message: "退款成功!"
          });
          this.getList();
        });
      });
      }else{
        this.$message({
          type:'warning',
          message:'当前状态不可退款'
        })
      }

    },
    //确认退款
    confirmRefund(index,row) {
       if(row.orderEntity.status==4){
        this.$confirm("是否要确定退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        confirmRefund(row.orderEntity.orderId).then(response => {
          this.$message({
            type: "success",
            message: "退款成功!"
          });
          this.getList();
        });
      });
      }else{
        this.$message({
          type:'warning',
          message:'用户没有申请退款'
        })
      }
    },
    //拒绝退款
    refuseRefund(index,row){
       if(row.orderEntity.status==4){
        this.$confirm("是否要拒绝退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        refuseRefund(row.orderEntity.orderId).then(response => {
          this.$message({
            type: "success",
            message: "退款成功!"
          });
          this.getList();
        });
      });
      }else{
        this.$message({
          type:'warning',
          message:'用户没有申请退款'
        })
      }
    },
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
    handleDelete(index, row) {
      this.$confirm("是否要删除该订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ban(row.orderId).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
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
    getList() {
      this.listLoading = true;
      getOrderInfo(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.content;
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


