<template>
  <div class="detail">
    <Top></Top>
    <div class="other">
      <!-- 商家团购及优惠 -->
      <div class="dish">
        <div class="header">
          <span id="target">商家团购及优惠</span>
          <span>
            <el-button type="warning" @click.prevent="lineUp($event)">前往排队</el-button>
            <el-button type="warning" @click="DialogFormVisible=true">预约</el-button>
          </span>
        </div>
        <div class="dishBox">
          <span>主要套餐</span>
          <div class="dishOne" v-for="item in menuInfo" :key="item.menuId">
            <div class="pic">
              <img src="../../assets/images/card.jpg" alt srcset />
            </div>
            <div class="dishInfo">
              <div class="name">
                {{item.name}}
                <span style="font-size:26px">
                  <svg-icon icon-class="recommend"></svg-icon>
                </span>
              </div>
              <div class="intro">{{item.intro}}</div>
              <div class="price">
                <b style="font-size:14px">￥</b>
                {{item.price}}
                <span
                  class="grey"
                >门店价￥{{item.price+parseInt(Math.random()*10+10)}}</span>
              </div>
            </div>
            <div class="do">
              <el-button type="primary" @click="nowOrder(item)">立即下单</el-button>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="预约" :visible.sync="DialogFormVisible">
        <el-form @submit.native.prevent :model="dialogInfo">
          <el-form-item label="人数" label-width="50">
            <el-radio v-model="dialogInfo.people" label="2">两人</el-radio>
            <el-radio v-model="dialogInfo.people" label="4">四人</el-radio>
            <el-radio v-model="dialogInfo.people" label="6">四人以上</el-radio>
          </el-form-item>
          <el-form-item label="时间" label-width="50">
            <el-date-picker
              v-model="dialogInfo.arriveTime"
              type="datetime"
              format="yyyy-M-d HH:mm"
              selectableRange="2019-12-20 - 2019-12-22"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="DialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBook">确 定</el-button>
        </div>
      </el-dialog>
      <!--底部功能-->
      <div class="bottomFunc">
        <div class="comments">
          <span>网友评论</span>
          <div class="commentBox">
            <div v-if="commentEmpty">暂无新的评价</div>
            <div v-else>
              <div class="comment" v-for="item in evaluationInfo" :key="item.evaluationId">
                <div class="picture">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="commentInfo">
                  <div class="username">{{item.userEntity.name}}</div>
                  <div class="grade">
                    <el-rate v-model="item.grade" :colors="colors" disabled></el-rate>
                  </div>
                  <div class="time">2020年1月26日</div>
                  <div class="content">{{item.content}}</div>
                  <div class="like">
                    <svg-icon icon-class="like"></svg-icon>
                    <span @click.once="addOne($event)">({{item.likeMount}})</span>
                  </div>
                </div>
              </div>
              <el-pagination
                style="text-align:center"
                layout="prev, pager, next"
                :current-page.sync="listQuery.pageNum"
                @current-change="handleCurrentChange"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div class="shopInfo">
          <div class="image">
            <img :src="shopInfo.pic" alt />
          </div>
          <div class="allInfo">
            <div class="username">
              <div class="userLeft">
                <p>{{shopInfo.name}}</p>
                <el-rate v-model="value2" :colors="colors" disabled></el-rate>
              </div>
              <div class="userRight">
                <el-button type="primary" @click.stop="guanzhu($event)">关注</el-button>
              </div>
            </div>
            <div class="info">
              <p>{{shopInfo.intro}}</p>
              <p>地址：{{shopInfo.address}}</p>
              <p>电话：{{shopInfo.phone}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 聊天咨询功能 -->
      <el-popover placement="left" style="padding:0px" width="360" trigger="click">
        <div class="chatBox">
          <div class="head">
            <h4>智能客服</h4>
            <p>24小时竭诚为你服务</p>
          </div>
          <div id="chatContent">
            <div class="give clearfix">智能客服为您服务。</div>
            <div style="clear:both"></div>
          </div>
          <div class="sendMsg">
            <div class="icon">
              <svg-icon icon-class="biaoqing"></svg-icon>
              <svg-icon icon-class="yuyin"></svg-icon>
              <svg-icon icon-class="gengduo"></svg-icon>
            </div>
            <textarea name="msg" v-model="chatConetent" maxlength="100" placeholder="请输入你要咨询的问题" id></textarea>
            <div class="operation">
              <el-button @click="closeMsg" size="mini">关闭</el-button>
              <el-button type="primary" @click="sendMsg" size="mini">发送</el-button>
            </div>
          </div>
        </div>
        <el-button class="chat" slot="reference">
          <div>
            <svg-icon icon-class="chat"></svg-icon>
            <span>客服</span>
          </div>
        </el-button>
      </el-popover>
      <Bottom></Bottom>
    </div>
  </div>
</template>

<script>
import Top from "../indexPage/components/top";
import Bottom from "../indexPage/components/bottom";
import { Attention, addBook, goOrder } from "@/api/user";
import { listEvaluation, listMenu, getShopInfoById } from "@/api/index";
import { parseTime } from "@/utils/index";
import { getToken } from "@/utils/auth";

export default {
  components: {
    Top,
    Bottom,
  },

  data() {
    const defaultListQuery = {
      pageNum: 1,
      pageSize: 10,
      shopId: parseInt(this.$route.params.id),
    };
    return {
      baseUrl: "http://116.62.26.61:8003/o2o/",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      value2: 4,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      chatConetent: "",
      dialogTitle: "",
      DialogFormVisible: false,
      listQuery: Object.assign({}, defaultListQuery),
      dialogInfo: {
        people: "1",
        arriveTime: "",
        shopId: this.$route.params.id,
      },
      shopInfo: {
        shopId: "",
      },
      total: null,
      evaluationInfo: {},
      menuInfo: {},
      commentEmpty: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      //获取商店信息
      getShopInfoById(this.$route.params.id).then((result) => {
        this.shopInfo = result.data;
        this.shopInfo.pic = this.baseUrl + this.shopInfo.pic;
      });
      listEvaluation(this.listQuery)
        .then((result) => {
          this.total = result.data.totalElements;
          if (this.total == 0) {
            this.commentEmpty = true;
          }
          this.evaluationInfo = result.data.content;
          this.evaluationInfo.forEach((item) => {
            item.likeMount = parseInt(Math.random() * 100 + 150);
          });
        })
        .catch((err) => {});
      listMenu({ pageNum: 1, pageSize: 100, shopId: this.$route.params.id })
        .then((response) => {
          var data = response.data.content;
          data.forEach((item) => {
            item.pic = this.baseUrl + item.pic;
          });
          this.menuInfo = data;
        })
        .catch((err) => {});
    },
    //排队
    lineUp(e) {
      if (!getToken()) {
        this.$confirm("你还没登录，前往登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "未登录无法查看",
            });
          });
      } else {
        var _this = this;
        //webSocket实现聊天，客户端需要做的事情，总结起来，其实就是一下几件
        //1，获取连接，new WebSocket()
        //服务端地址和请求类型
        var wsUrl = `ws://116.62.26.61:8003/o2o/websocket/${getToken()}`;
        //客户端与服务端建立连接，建立连接以后，它会发出一个ws.open事件
        var ws = new WebSocket(wsUrl);
        //编写数据；
        var json = {
          token: getToken(),
          userName: _this.$store.getters.name,
          shopId: _this.shopInfo.shopId,
          shopName: _this.shopInfo.name,
        };
        //连接成功后，提示浏览器客户端输入名称
        ws.onopen = function () {
          ws.send(JSON.stringify(json));
        };
        //客户端收到服务端发送的消息
        ws.onmessage = function (message) {
          //获取以后，在客户端显示,messages是聊天内容的框的id
          var messageJson = JSON.parse(message.data);
          if (messageJson.status == 200) {
            if (messageJson.data.status == 0) {
              _this.$message({ type: "success", message: "排队成功" });
              e.target.innerText = `你前面还有${messageJson.data.wait}桌，请等待一下...`;
              //console.log(e);

              if (e.target.nodeName === "SPAN") {
                e.target.parentNode.disabled = true;
                e.target.parentNode.style.backgroundColor = "#99a9bf";
                e.target.parentNode.style.borderColor = "#99a9bf";
              } else {
                e.target.disabled = true;
                e.target.style.backgroundColor = "#99a9bf ";
                e.target.style.borderColor = "#99a9bf ";
              }
            } else if (messageJson.data.status == 1) {
              _this.$message({ type: "success", message: "轮到你了" });
              e.target.innerText = `轮到你了`;
            }
          } else {
            _this.$message({ type: "warning", message: "排队失败" });
          }
        };

        //当关闭页面或者用户退出时，会执行一个ws.close()方法
        window.onbeforeunload = function () {
          ws.close();
        };
      }
    },

    nowOrder(item) {
      if (!getToken()) {
        this.$confirm("你还没登录，前往登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "未登录无法查看",
            });
          });
      } else {
        goOrder(item.menuId)
          .then((result) => {
            this.$message({ type: "success", message: "下单成功" });
            setTimeout(() => {
              this.$confirm("是否继续进行付款?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success",
              })
                .then(() => {
                  this.$message({
                    type: "success",
                    message: "支付成功",
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "可前往我的订单页面进行继续付款",
                  });
                });
            }, 500);
          })
          .catch((err) => {});
      }
    },
    confirmBook() {
      if (!getToken()) {
        this.$confirm("你还没登录，前往登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "未登录无法查看",
            });
          });
      } else {
        // this.dialogInfo.arriveTime = parseTime(this.dialogInfo.arriveTime);
        this.dialogInfo.people = parseInt(this.dialogInfo.people);
        this.dialogInfo.shopId = parseInt(this.dialogInfo.shopId);
        addBook(this.dialogInfo)
          .then((result) => {
            this.$message({
              type: "success",
              message: "预约成功，可以后面再个人中心查看预约情况",
            });
            this.DialogFormVisible = false;
          })
          .catch((err) => {});
      }
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    guanzhu(e) {
      if (!getToken()) {
        this.$confirm("你还没登录，前往登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "未登录无法查看",
            });
          });
      } else {
        //console.log(e.target);
        if (this.shopInfo.shopId != null) {
          Attention(this.shopInfo.shopId)
            .then((result) => {
              this.$message({ type: "success", message: "关注成功" });
              e.target.innerText = "已关注";
            })
            .catch((err) => {});
        }
      }
    },
    addOne(e) {
      //console.log(e);
      if (e.target === "svg") {
      } else {
        var text = e.target.innerText.toString();
        var value = parseInt(text.replace(/[^0-9]/gi, ""));
        //console.log(value);
        e.target.innerText = `(${++value})`;
        //console.log(value);
      }
    },
    //获得时间
    getCurrentTime() {
      var date = new Date();
      var month = date.getMonth() + 1;

      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var hours = date.getHours();
      if (hours >= 0 && hours <= 9) {
        if (hours == 0) {
          hours = "00";
        } else {
          hours = "0" + hours;
        }
      }
      var minutes = date.getMinutes();
      if (minutes >= 0 && minutes <= 9) {
        if (minutes == 0) {
          minutes = "00";
        } else {
          minutes = "0" + minutes;
        }
      }
      var seconds = date.getSeconds();
      if (seconds >= 0 && seconds <= 9) {
        if (seconds == 0) {
          seconds = "00";
        } else {
          seconds = "0" + seconds;
        }
      }

      var currentdate =
        date.getFullYear() +
        "-" +
        month +
        "-" +
        strDate +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

      //console.log(currentdate);
      //2017.07.11 15:14:44
      return currentdate;
    },
    //发送消息
    sendMsg() {
      var content = document.getElementById("chatContent");
      var timeDom = document.createElement("div");
      timeDom.style.textAlign = "center";
      timeDom.style.color = "#999";
      timeDom.style.fontSize = "12px";
      timeDom.style.margin = "5px 0";

      var time = this.getCurrentTime();
      timeDom.innerHTML = time;
      content.appendChild(timeDom);
      var msg = document.createElement("div");
      msg.innerText = this.chatConetent;
      this.chatConetent = "";
      msg.style.float = "right";
      msg.style.textAlign = "right";
      msg.style.backgroundColor = "rgb(103, 163, 241)";
      msg.style.color = "rgb(255,255,255)";
      msg.style.width = "auto";
      msg.style.maxWidth = "250px";
      msg.style.height = "auto";
      msg.style.wordBreak = "break-all";
      msg.style.margin = "5px";
      msg.style.padding = "15px 17px";
      msg.style.borderRadius = "20px 5px 20px 20px";
      content.appendChild(msg);
      var div = document.createElement("div");
      div.style = "clear:both";
      content.appendChild(div);
      content.scrollTop = content.scrollHeight - 400;
      setTimeout(this.replyMsg, 1000);
    },
    replyMsg() {
      //回复消息
      var content = document.getElementById("chatContent");
      var msg = document.createElement("div");
      msg.innerText = "我没有听清你的问题";
      msg.style.float = "left";
      msg.style.textAlign = "left";
      msg.style.backgroundColor = "white";
      msg.style.color = "black";

      msg.style.width = "auto";
      msg.style.maxWidth = "250px";
      msg.style.height = "auto";
      msg.style.wordBreak = "break-all";
      msg.style.margin = "5px";
      msg.style.padding = "15px 17px";
      msg.style.borderRadius = "5px 20px 20px 20px";
      content.appendChild(msg);
      var div = document.createElement("div");
      div.style = "clear:both";
      content.appendChild(div);
      content.scrollTop = content.scrollHeight - 400;
    },
    closeMsg() {
      document.getElementsByClassName("chat")[0].click();
    },
  },
};
</script>

<style lang='less' scoped>
@primary: rgb(207, 181, 177);
.other {
  background-color: #f4f4f4;
}
.bottomFunc {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .comments {
    width: 70%;
    height: auto;
    span {
      font-size: 20px;
      color: #222;
    }
    .commentBox {
      margin-top: 8px;
      padding: 15px 20px;
      box-sizing: border-box;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
    }
    .comment {
      display: flex;
      margin-top: 15px;
      justify-content: space-between;

      .picture {
        width: 60px;
        height: 60px;
        margin: 0 10px;
      }
      .commentInfo {
        border-bottom: 1px solid #e5e5e5;
        width: 92%;
        .username {
          font-size: 16px;
          color: #222;
        }
        .time {
          text-align: right;
          width: auto;
          height: 17px;
          font-size: 12px;
          color: #999;
        }
        .content {
          font-size: 14px;
          color: #666;
          min-height: 30px;
        }
        .like {
          text-align: right;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .like:hover {
          color: rosybrown;
        }
        .like span:hover {
          color: rosybrown;
        }
      }
    }
  }
  .shopInfo {
    width: 28%;
    font-size: 12px;
    color: #666;
    background-color: #fff;
    margin-bottom: 30px;
    border-radius: 10px;
    border: 1px solid #e5e5e5;
    margin-top: 30px;
    box-shadow: 0 5px 14px 0 rgba(0, 0, 0, 0.1);

    overflow: hidden;
    .image {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .allInfo {
      padding: 5px 20px 20px;
      .username {
        display: flex;
        justify-content: space-between;
        .userLeft {
          font-size: 22px;
          color: #666;
          margin: 0;
          p {
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .userRight {
          align-self: center;
        }
      }
    }
  }
}
.dish {
  width: 90%;
  margin: 0px auto 60px;
  padding: 30px 0;
  span {
    font-size: 20px;
    color: #222;
    font-weight: 700;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
    button {
      border-radius: 35px;
    }
  }
  .dishBox {
    margin: 10px 0 40px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 25px 35px 30px;
    span {
      color: #222;
      font-size: 16px;
      font-weight: 700;
    }
    .dishOne {
      display: flex;
      justify-content: flex-start;
      margin-top: 17px;
      width: 100%;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
      .pic {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .dishInfo {
        margin-left: 15px;
        flex-grow: 2;
        .name {
          color: #222;
          font-size: 19px;
        }
        .intro {
          font-size: 14px;
          color: #666;
          margin: 3px 0 22px;
        }
        .price {
          color: #ff6600;
          font-size: 30px;
          cursor: 30px;
          .grey {
            color: #999;
            font-size: 12px;
            margin-left: 10px;
            font-weight: 0;
          }
        }
      }
      .do {
        justify-self: end;
        align-self: center;
        button {
          border-radius: 35px;
        }
      }
    }
    .dishOne:last-child {
      border-bottom: none;
    }
  }
}
.chat {
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 20vh;
  right: 30px;
  padding: 2px;
  div {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 6px;
    font-size: 22px;
    span {
      font-size: 14px;
    }
  }
}
.chatBox {
  height: 585px;
  .head {
    width: 100%;
    height: 70px;
    overflow: hidden;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: white;
    box-shadow: 0 9.5px 12.7px 0 rgba(0, 0, 0, 0.05);
    padding: 5px 24px;
    padding-left: 10px;
    color: black;
    font: bold 18px/30px "Microsoft YaHei";
    h4 {
      padding: 0;
      margin: 0;
      color: black;
    }
    p {
      margin: 0;
      font-size: 13px;
    }
  }
  #chatContent {
    width: 100%;
    background-color: rgb(243, 243, 251);
    height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    .give {
      float: left;
      text-align: left;
      background-color: white;
      color: black;
      width: auto;
      max-width: 250px;
      height: auto;
      word-break: break-all;
      margin: 5px;
      padding: 15px 17px;
      border-radius: 5px 20px 20px 20px;
    }
    .send {
      float: right;
      text-align: right;
      background: rgb(103, 163, 241);
      color: rgb(255, 255, 255);
      border-radius: 20px 5px 20px 20px;
      width: auto;
      max-width: 250px;
      height: auto;
      word-break: break-all;
      margin: 5px;
      font-size: 16px;
      line-height: 20px;
      word-wrap: break-word;
      white-space: pre-wrap;
      max-width: 100%;
      padding: 15px 17px;
    }
    .time {
      text-align: center;
      font-size: 12px;
      color: #999;
      margin: 5px 0;
    }
  }
  .sendMsg {
    border-top: 1px solid rgb(234, 234, 234);
    padding-top: 5px;
    padding-left: 5px;
    .icon {
      font-size: 20px;
      color: #999;
      cursor: pointer;
    }
    textarea {
      border: none;
      width: 100%;
      height: 50px;
      overflow-y: visible;
      outline: none;
      resize: none;
    }
    .operation {
      position: relative;
      left: 214px;
      top: -18px;
    }
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix {
  clear: both;
}
.clearfix:after {
  clear: both;
}
</style>
