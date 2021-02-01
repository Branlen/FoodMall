<template>
  <div class="MyOrder">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="预约中心" style="font-size:15px" name="second">
        <div class="empty" v-if="false">当前暂未更多的订单</div>
        <div v-else class="myOrder">
          <ul>
            <li class="followLi" v-for="item in bookInfo" :key="item.bookId">
              <div class="followr">
                <div class="image">
                  <img :src="item.shopEntity.pic" alt />
                </div>
                <div class="info">
                  <div class="username marginTop">{{item.shopEntity.name}}</div>
                  <div class="status marginTop">
                    状态：
                    <span>{{item.status==0?'预约中':item.status==1?'已取消':item.status==2?'已确定':'已拒绝'}}</span>
                  </div>
                  <div class="infoMsg">
                    到达时间：{{item.arriveTime|formatDateTime}}
                    人数：{{item.people}}人
                  </div>
                </div>
                <div class="information">
                  <div style="margin-bottom:5px">
                    <el-button
                      slot="reference"
                      type="primary"
                      size="small"
                      @click="placeOrder(item)"
                    >下单</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    type="primary"
                    size="small"
                    @click="cancelBook(item)"
                  >取消预约</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>

      <el-tab-pane label="待付款" style="font-size:15px" name="fourth">
        <div class="empty" v-if="false">当前暂未更多的订单</div>
        <div v-else class="myOrder">
          <ul>
            <li class="followLi" v-for="item in payMoneyInfo" :key="item.orderEntity.orderId">
              <div class="followr">
                <div class="image">
                  <img :src="item.shopEntity.pic" alt />
                </div>
                <div class="info">
                  <div class="username marginTop">{{item.shopEntity.name}}</div>
                  <div class="status marginTop">
                    状态：
                    <span>{{item.orderEntity.status}}</span>
                  </div>
                  <div class="infoMsg">价格：{{item.orderEntity.orderPrice}}</div>
                </div>
                <div class="information">
                  <div style="margin-bottom:5px">
                    <el-button
                      slot="reference"
                      size="small"
                      type="primary"
                      @click="giveMoney(item)"
                    >付款</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    size="small"
                    type="primary"
                    @click="cancelOrder(item)"
                  >取消订单</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="未完成" style="font-size:15px" name="firth">
        <div class="empty" v-if="false">当前暂未更多的订单</div>
        <div v-else class="myOrder">
          <ul>
            <li class="followLi" v-for="item in unCompleteInfo" :key="item.orderEntity.orderId">
              <div class="followr">
                <div class="image">
                  <img :src="item.shopEntity.pic" alt />
                </div>
                <div class="info">
                  <div class="username marginTop">{{item.shopEntity.name}}</div>
                  <div class="status marginTop">
                    状态：
                    <span>{{item.orderEntity.status}}</span>
                  </div>
                  <div class="infoMsg">{{item.menuEntity.name}}</div>
                </div>
                <div class="information">
                  <el-button slot="reference" type="primary" @click="applyDrawback(item)">申请退款</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待评价" style="font-size:15px" name="sixth">
        <div class="empty" v-if="false">当前暂未更多的订单</div>
        <div v-else class="myOrder">
          <ul>
            <li class="followLi" v-for="item in completeInfo" :key="item.orderEntity.orderId">
              <div class="followr">
                <div class="image">
                  <img :src="item.shopEntity.pic" alt />
                </div>
                <div class="info">
                  <div class="username marginTop">{{item.shopEntity.name}}</div>
                  <div class="status marginTop">
                    状态：
                    <span>{{item.orderEntity.status}}</span>
                  </div>
                  <div class="infoMsg">{{item.menuEntity.name}}</div>
                </div>
                <div class="information">
                  <div style="margin-bottom:5px">
                    <el-button slot="reference" type="primary" @click="commentOperation(item)">评价</el-button>
                  </div>
                  <el-button slot="reference" type="primary" @click="complaintOperation(item)">投诉</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 我的评价 -->
    <el-dialog title="评价" :visible.sync="commnetDialogFormVisible">
      <el-form @submit.native.prevent :model="commentInfo">
        <el-form-item label="内容" label-width="20">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="commentInfo.content"></el-input>
        </el-form-item>
        <el-form-item label-width="20">
          <el-rate v-model="commentInfo.grade" show-text></el-rate>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commnetDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commentOrder">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 我的投诉 -->
    <el-dialog title="评价" :visible.sync="complaintDialogFormVisible">
      <el-form :model="complaintInfo">
        <el-form-item label="内容" label-width="20">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="complaintInfo.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="complaintDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="complaintOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  goOrder,
  listOrder,
  cancelOrder,
  evaluation,
  payOrder,
  applyRefund,
  listBook,
  cancelBook,
  addComplain,
} from "@/api/user";

import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
};
export default {
  data() {
    return {
      value: 3.0,
      baseUrl: "http://116.62.26.61:8003/o2o/",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      activeName: "second",
      commentInfo: {
        content: "",
        grade: 0,
        orderId: "",
      },
      listQuery: Object.assign({}, defaultListQuery),
      formLabelWidth: "20",
      //是否打开评价
      commnetDialogFormVisible: false,
      complaintDialogFormVisible: false,
      complaintInfo: {},
      totalElements: 2,
      //预约
      bookInfo: [],
      //待付款
      payMoneyInfo: [],
      //付款完
      unCompleteInfo: [], //待评价
      completeInfo: [],
    };
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
  created() {
    this.getList();
    this.getBookList();
  },
  methods: {
    getBookList() {
      listBook({
        pageNum: 1,
        pageSize: 100,
      })
        .then((result) => {
          var data = result.data.content;
          //console.log("objects", data);

          data.forEach((item) => {
            item.shopEntity.pic = this.baseUrl + item.shopEntity.pic;
          });
          this.bookInfo = data;
        })
        .catch((err) => {});
    },
    getList() {
      // 预约中心

      listOrder(this.listQuery)
        .then((result) => {
          var data = result.data.content;
          //将数据分为三种
          this.payMoneyInfo = [];
          this.unCompleteInfo = [];
          this.completeInfo = [];
          data.forEach((item) => {
            item.shopEntity.pic = this.baseUrl + item.shopEntity.pic;
            if (item.orderEntity.status == 0 || item.orderEntity.status == 2) {
              this.payMoneyInfo.push(item);
            } else if (
              item.orderEntity.status == 1 ||
              item.orderEntity.status == 4 ||
              item.orderEntity.status == 5
            ) {
              this.unCompleteInfo.push(item);
            } else if (
              item.orderEntity.status == 3 ||
              item.orderEntity.status == 6
            ) {
              this.completeInfo.push(item);
            }
            //重新命名
            let status = item.orderEntity.status;
            switch (status) {
              case 0:
                item.orderEntity.status = "已下单";
                break;
              case 1:
                item.orderEntity.status = "已付款";
                break;
              case 2:
                item.orderEntity.status = "已取消";
                break;
              case 3:
                item.orderEntity.status = "已使用";
                break;
              case 4:
                item.orderEntity.status = "申请退款中";
                break;
              case 5:
                item.orderEntity.status = "已退款";
                break;
              case 6:
                item.orderEntity.status = "已评价";
                break;
            }
          });
        })
        .catch((err) => {});
    },
    handleClick() {},
    //取消预约
    cancelBook(item) {
      if (item.status == 0) {
        cancelBook(item.bookId)
          .then((result) => {
            this.$message({ type: "success", message: "取消预约成功" });
            this.getBookList();
          })
          .catch((err) => {});
      } else {
        this.$message({
          type: "warning",
          message: "当前状态不可以取消预约",
        });
      }
    },
    //下单1
    placeOrder(item) {
      if (item) {
        if (item.status == 2) {
          this.$router.push("/detail/1");
        } else {
          this.$message({ type: "warning", message: "你当前还没有预约成功" });
        }
      }
    },
    //取消订单
    cancelOrder(item) {
      this.$confirm("是否要确定取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        cancelOrder(item.orderId).then((response) => {
          this.$message({
            type: "success",
            message: "取消成功!",
          });
          this.getList();
          //刷新页面，重新获取数据
        });
      });
    },
    //付款
    giveMoney(item) {
      payOrder(item.orderEntity.orderId)
        .then((result) => {
          this.$message({ type: "success", message: "支付成功" });
          this.getList();
        })
        .catch((err) => {});
    },
    //申请退款
    applyDrawback(item) {
      console.log(item.orderEntity.status);
      if (item.orderEntity.status == "已付款") {
        this.$confirm("是否要确定申请退款?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          applyRefund(item.orderEntity.orderId).then((response) => {
            this.$message({
              type: "success",
              message: "退款成功!",
            });
            this.getList();
          });
        });
      } else {
        this.$message({
          type: "warning",
          message: "当前状态无法申请退款",
        });
      }
    },
    commentOperation(item) {
      if (item.orderEntity.status == "已评价") {
        this.$message({
          type: "warning",
          message: "已评价过，无需再评价",
        });
      } else {
        this.commnetDialogFormVisible = true;
        this.commentInfo.orderId = item.orderEntity.orderId;
      }
    },
    complaintOperation(item) {
      this.complaintDialogFormVisible = true;
      this.complaintInfo.shopId = item.shopEntity.shopId;
    },
    //评价
    commentOrder() {
      if (this.commentInfo.content !== "" && this.commentInfo.grade !== 0) {
        evaluation(this.commentInfo)
          .then((result) => {
            if (result.status === 200) {
              this.commnetDialogFormVisible = false;
              this.$message({
                type: "success",
                message: "评价成功",
              });
              this.getList();
            }
          })
          .catch((err) => {});
      } else {
        this.$message({
          type: "warning",
          message: "信息未填完整",
        });
      }
    },
    //投诉
    complaintOrder() {
      if (this.complaintInfo.content !== "") {
        addComplain(this.complaintInfo)
          .then((result) => {
            if (result.status === 200) {
              this.complaintDialogFormVisible = false;
              this.$message({
                type: "success",
                message: "投诉成功",
              });
              this.getList();
            }
          })
          .catch((err) => {});
      } else {
        this.$message({
          type: "warning",
          message: "信息未填完整",
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
.MyOrder {
  // height: 1000px;
  // overflow: auto;;
}
.text {
  font-size: 14px;
}
.item {
  padding: 8px 0;
}
.empty {
  font-size: 17px;
  color: #8e8e8e;
  text-align: center;
  margin-top: 50px;
}
.more-font {
  font-size: 15px;
}
.tabs {
  .el-tabs__header {
    font-size: 20px;
    .el-tabs__active-bar {
      background-color: seagreen;
    }
  }
}
.marginTop {
  margin: 10px 0;
}
.myOrder {
  ul {
    list-style: none;
    padding: 0;
    .followLi {
      border-bottom: 1px solid #e5e5e5;
      padding: 10px 0;
    }
    .followLi:last-child {
      border: none;
    }
    .followr {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .image {
        width: 160px;
        height: 90px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
      .info {
        // margin-left: 10px;
        width: 60%;
        padding: 2px 10px;
        height: 100%;
        .username {
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #222;
          font-weight: 500;
        }
        .status {
          font-size: 14px;
          color: #999;
          span {
            color: rgb(247, 119, 45);
          }
        }
        .infoMsg {
          font-size: 13px;
          color: #999;
        }
      }
      .information {
        width: 20%;
        text-align: center;
        ul {
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
