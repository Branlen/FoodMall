<template>
  <div class="MyFollow">
    <div class="empty" v-if="isEmpty">当前你还没有关注</div>
    <div v-else>
      <ul>
        <li class="followLi" v-infinite-scroll="load" v-for="item in listInfo" :key="item.shopId  ">
          <div class="followr" @click="goDetail(item)">
            <div class="image">
              <img :src="item.pic" alt />
            </div>
            <div class="info">
              <div class="username marginTop">[{{item.name}}]</div>

              <div class="classify marginTop">{{item.categoryName}}</div>
              <div class="rate marginTop">{{item.address}}</div>
            </div>
            <div class="followBtn">
              <el-button @click.stop="cancelAttention(item)">取消关注</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { listAttention, cancelAttention } from "@/api/user";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
};
export default {
  data() {
    return {
      value: 3.0,
      listQuery: Object.assign({}, defaultListQuery),
      listInfo: {},
      isEmpty: false,
      baseUrl: "http://116.62.26.61:8003/o2o/",
      totalElements: 2,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      listAttention(this.listQuery)
        .then((response) => {
          this.totalElements = response.data.totalElements;
          //console.log('conten',response.data.content);
          var data = response.data.content;

          data.forEach((item) => {
            item.pic = this.baseUrl + item.pic;
          });
          this.listInfo = data;
          this.isEmpty = false;
        })
        .catch((err) => {});
    },
    goDetail(item) {
      this.$router.push(`/detail/${item.shopId}`);
    },
    cancelAttention(item) {
      if (item.shopId != null) {
        cancelAttention(item.shopId)
          .then((result) => {
            this.$message({
              type: "success",
              message: "取消关注成功",
            });
            this.getList();
          })
          .catch((err) => {});
      }
    },
    load() {
      if (this.totalElements > this.listQuery.pageSize) {
        this.listQuery.pageSize += 4;
        this.getList();
      }
    },
  },
};
</script>

<style lang='less' scoped>
.marginTop {
  margin: 8px 0;
}
.empty {
  font-size: 17px;
  color: #8e8e8e;
  text-align: center;
  margin-top: 50px;
}
.MyFollow {
  padding: 2px 0;
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
        padding: 8px 20px;
        .username {
          font-size: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #222;
          color: rgb(79, 209, 226);
          font-weight: 500;
        }
        .rate {
          font-size: 12px;
        }
        .classify {
          font-size: 14px;
          color: #999;
        }
      }
      .followBtn {
        width: 20%;
        text-align: center;
      }
    }
  }
}
</style>
