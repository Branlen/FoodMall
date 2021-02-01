<template> 
  <div class="app-container">
    <div class="back" style="cursor:pointer" @click="reback">
      <i class="el-icon el-icon-back"></i>
    </div>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.evaluationId}}</template>
        </el-table-column>
         <el-table-column label="用户" align="center">
          <template slot-scope="scope">{{scope.row.userEntity.name}}</template>
        </el-table-column>
        <el-table-column label="评价内容" align="center">
          <template slot-scope="scope">{{scope.row.content}}</template>
        </el-table-column>
        <el-table-column label="星级" align="center">
          <template slot-scope="scope">{{scope.row.grade}}</template>
        </el-table-column>
         <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
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
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>

  import {getInfo,ban} from '@/api/admin/comment';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    shopId:1
  };
  const defaultAdmin = {
    evalutionId: null,
    content: null,
    grade: null,
    orderId: null,
    email: null,
    note: null,
    status: 1
  };
  export default {
    name: 'adminList',
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
        allocRoleIds:[],
        allocAdminId:null
      }
    },
    props:{
      shopId:''
    },
    created() {
      this.listQuery.shopId = this.shopId
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
        this.$confirm('是否要删除该评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ban(row.evaluationId).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.admin = Object.assign({},row);
      },
      getList() {
        this.listLoading = true;
        getInfo(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.content;
          this.total = response.data.totalElements;
        });
      },
      reback(){this.$emit('reback')},
    }
  }
</script>
<style>.back{
  font-size: 26px;
  cursor: pointer;
}</style>


