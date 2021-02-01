<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
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
        <el-table-column label="介绍" align="center">
          <template slot-scope="scope">{{scope.row.intro}}</template>
        </el-table-column>
        <el-table-column label="价格" width="100" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="状态" width="160" align="center">
          <template slot-scope="scope">{{scope.row.status==1?'下架':'上架'}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="0"
              :inactive-value="1"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            </template>
        </el-table-column>-->
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
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :title="isEdit?'编辑菜单':'添加菜单'" :visible.sync="dialogVisible" width="40%">
      <el-form @submit.native.prevent :model="menu" ref="menuFrom" label-width="150px" size="small">
        <el-form-item label="套餐名">
          <el-input v-model="menu.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="介绍：">
          <el-input v-model="menu.intro" type="textarea" :rows="5" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="menu.price" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="照片：">
          <el-upload
            class="upload-demo"
            action="/o2o/sys/file/uploadPic"
            :on-success="handleUpload"
            :limit="1"
            accept=".jpg, .png, .jpeg"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态:">
          <el-radio v-model="menu.status" label="0">上架</el-radio>
          <el-radio v-model="menu.status" label="1">下架</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getMenuInfo, banMenu, sell, saveMenu } from "@/api/shop";
import { uploadPic } from "@/api/file";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultMenu = {
  menuId: null,
  intro: null,
  name: null,
  pic: 0,
  price: 21,
  shopId: 10,
  status: "0",
};
export default {
  name: "roleList",
  data() {
    return {
      baseUrl: "http://116.62.26.61:8003/o2o/",
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      fileList: [],
      menu: Object.assign({}, defaultMenu),
      isEdit: false,
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
    //上传轮播图
    handleUpload(response, file, fileList) {
      //console.log(response);
      this.menu.pic = response.data;
    },
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
      this.menu = Object.assign({}, defaultMenu);
    },
    handleStatusChange(index, row) {
      //console.log(row);
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //注意，由于切换了状态，所以row.sratus提前改变了
          if (row.status == 0) {
            sell(row.menuId)
              .then((result) => {
                this.$message({
                  type: "success",
                  message: "上架成功",
                });
              })
              .catch((err) => {});
          } else if (row.status == 1) {
            banMenu(row.menuId)
              .then((result) => {
                this.$message({
                  type: "success",
                  message: "下架成功",
                });
              })
              .catch((err) => {});
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
          this.getList();
        });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.menu = Object.assign({}, row);
      this.menu.status = this.menu.status.toString();
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.menu.status = parseInt(this.menu.status);
        this.menu.price = parseInt(this.menu.price);
        //获得商店id
        this.menu.shopId = this.$store.getters.shopId | 1;
        if (this.isEdit) {
          updateRole(this.role.id, this.role).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          saveMenu(this.menu).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },

    getList() {
      this.listLoading = true;
      getMenuInfo(this.listQuery).then((response) => {
        this.listLoading = false;
        var data = response.data.content;
        data.forEach((item) => {
          item.pic = this.baseUrl + item.pic;
        });
        this.list = data;
        this.total = response.data.totalElements;
      });
    },
  },
};
</script>
<style></style>


