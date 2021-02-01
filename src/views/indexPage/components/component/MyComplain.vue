<template>
  <div class="MyComplain">
     <div class="empty" v-if="isEmpty">当前暂未更多的订单</div>
     <div v-else>
    <div v-for="(item,index) in complains" v-infinite-scroll="load" :key="index" class="box">
      <el-card class="box-card">
        <div slot="header" class="header clearfix">
          <span class="username">{{item.shop.name}}</span>
          <span class="status">
            当前状态：
            <span class="color" style="color:rgb(247, 119, 45);font-size:16px;">{{item.status=='1'?'已处理':'待处理中'}}</span>
          </span>
        </div>
        <div class="comment clearfix">{{item.content}}</div>
        <div id="replyContent">反馈信息：{{item.reply}}</div>
        <div class="time">{{item.createTime}}~{{item.handleTime}}</div>
      </el-card>
    </div>
     </div>
  </div>
</template>

<script>
import {listComplain} from '@/api/user';
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
export default {
  data() {
    return {
      complains: [{}, {}],
      listQuery: Object.assign({}, defaultListQuery),
      isEmpty:false,
      totalElements:2
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
    }
  },
  methods: {
    getList() {
      listComplain(this.listQuery).then((result) => {
        this.complains = result.data.content
        this.totalElements = result.data.totalElements
      }).catch((err) => {

      });
    },
    load() {
      if(this.totalElements>this.listQuery.pageSize){
        this.listQuery.pageSize += 4;
        this.getList()
      }

    }
  }
};
</script>

<style lang='less' scoped>
.empty {
  font-size: 17px;
  color: #8e8e8e;
  text-align: center;
  margin-top: 50px;
}
.MyComplain{
  height: 1000px;
  overflow: auto;
}
.box {
  margin-bottom: 10px;


  .username {
    font-size: 15px;
    font-weight: 700;
  }
  .status {
    float: right;
    font-size: 14px;
  }
  .comment {
    font-size: 15px;
    min-height: 60px;
  }

  .time {
    text-align: end;
    color: #999999;
    font-size: 12px;
  }
}
#replyContent {
  color: #999999;
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
