<template>
  <div class="downloadInfo">
    <div class="first">
      <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href>搜索结果</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="list">
        <div class="mainContent">
          <div class="allAritle">
            <div class="categoryHeader">
              <div class="categoryName">搜索结果页</div>
              <div class="searchInfo">
                查询到
                <span style="color:red">{{totalCount}}</span>条相关信息
              </div>
            </div>
            <div class="failure" v-if="failureSearch">没有查找相关信息，请重新查询</div>
            <div
              v-else
              class="categoryContent"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
            >
              <ul>
                <div class="content" v-for="item in pushInfo" :key="item.pushId">
                  <router-link :to="'/article/'+item.pushId" tag="li" :title="item.title">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                      <div class="image">
                        <img :src="item.pic" />
                      </div>
                      <div style="padding: 2px 14px 8px;">
                        <div class="article">{{item.title}}</div>
                        <div class="second">
                          <span class="username">
                            <el-avatar shape="circle" size="small" :src="item.shopEntity.pic"></el-avatar>
                            <span class="name">{{item.shopEntity.name}}</span>
                          </span>
                          <span class="much">
                            <svg-icon icon-class="love"></svg-icon>300
                          </span>
                        </div>
                      </div>
                    </el-card>
                  </router-link>
                </div>
              </ul>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :total="totalCount"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPushInfo } from "@/api/index";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 12,
  keyword: "",
};
export default {
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      // 搜索的结果内容
      searchInfo: {},
      //是否成功搜索
      failureSearch: false,
      //是否加载的判断信息
      loading: true,
      //查询结果的条数
      totalCount: 1,
      baseUrl: "http://116.62.26.61:8003/o2o/",
      pushInfo: [],

      //    categoryId:parseInt(this.$route.params.id),
    };
  },
  //随时监听router有没有改变，令当前页面可以再次搜索

  watch: {
    $route: function (to, from) {
      this.loading = true;
      // //console.log(this.$route.params.content);
      this.searchDownload();
    },
  },
  methods: {
    //    分页器的页数改变触发
    currentChange(val) {
      this.listQuery.pageNum = val;
      this.loading = true;
      this.searchDownload();
    },
    //搜索推文专区的文章
    searchDownload() {
      var content = this.$route.params.content;
      this.listQuery.keyword = content;
      if (content != "") {
        getPushInfo(this.listQuery)
          .then((result) => {
            this.totalCount = result.data.totalElements;
            var data = result.data.content;
            data.forEach((item) => {
              item.pic = this.baseUrl + item.pic;
              item.shopEntity.pic = this.baseUrl + item.shopEntity.pic;
            });
            this.pushInfo = data;
            this.loading = false;
          })
          .catch((err) => {});
      }
    },
  },

  mounted() {
    this.$message({
      message: "搜索的结果如下",
      type: "success",
    });
    this.searchDownload();
  },
};
</script>

<style lang="less" scoped>
@primary: #cfb5b1;
.first {
  width: 1000px;
  margin: 0 auto;
}
.el-breadcrumb {
  font-size: 16px;
  margin-top: 5%;
}

.mainContent {
  margin-top: 2%;
  min-height: 500px;
}

.allAritle {
  display: inline-block;
  width: 100%;
  background-color: #fff;
  margin-bottom: 3.5%;
  // display: flex;
  // justify-content: space-between;
  .categoryHeader {
    display: flex;
    flex-wrap: wrap;
    padding: 2% 1% 1%;
    border-bottom: 1px outset #000;
    border-bottom: 1px solid @primary;
    margin-bottom: 5px;
    .categoryName {
      font-size: 20px;
      font-weight: bold;
      color: @primary;
      padding-left: 5px;
      border-left: 5px solid @primary;
      cursor: pointer;
    }
    .searchInfo {
      font-size: 16px;
      // font-weight: bold;
      margin-left: 3%;
      color: black;
      cursor: default;
    }
  }
  .categoryContent {
    width: 100%;
    box-sizing: border-box;

    font-size: 16px;
    ul {
      list-style: none;
      width: 100%;
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      .content {
        width: 240px;
        box-sizing: border-box;
        margin-right: 10px;
        margin-top: 10px;
        li {
          margin-bottom: 2%;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          .image {
            width: 100%;
            img {
              width: 100%;
            }
          }
          .article {
            font-size: 14px;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            margin-bottom: 5px;
          }
          .second {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .username {
              height: 28px;
              line-height: 28px;
              font-size: 14px;
              img {
                vertical-align: middle;
              }
              span {
                display: inline-block;
                vertical-align: middle;
              }
              .name {
                margin-left: 3px;
                color: #999;
              }
            }
            .much {
              color: #999999;
              font-weight: 500;
              font-size: 14px;
              svg {
                margin-right: 2px;
              }
            }
          }
        }
        li:last-child {
          margin-bottom: 0%;
        }
        li:hover {
          color: #c85900;
          text-decoration: underline;
          transform: scale(1.05, 1.05);
        }
      }
    }
  }
  .pagination {
    width: 100%;
    text-align: center;
  }
}

.failure {
  padding: 10% 0%;
  text-align: center;
  font-size: 18px;
  height: 100px;
}
</style>
