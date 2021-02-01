<template>
  <div class="push">
    <div class="head">美食博主热门推荐</div>
    <div class="pushs">
      <div class="row">
        <div class="showImage">
          <img :src="url" />
        </div>
        <div class="contents">
          <div class="content" v-for="item in pushInfo[0]" :key="item.pushId">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div @click="goDetail(item)">
                <div class="image">
                 <el-image :lazy="true" :src="item.pic" />
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
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div class="rows">
        <div class="contents2">
          <div class="content" v-for="item in pushInfo[1]" :key="item.pushId">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div @click="goDetail(item)">
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
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPushInfo } from "@/api/index";
export default {
  data() {
    return {
      url: require("@/assets/images/show.jpg"),
      baseUrl: "http://116.62.26.61:8003/o2o/",
      pushInfo: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goDetail(item) {
      //console.log(item);
      this.$router.push({ path: `/article/${item.pushId}` });
    },
    getList() {
      getPushInfo({
        pageNum: 1,
        pageSize: 7,
        keyword: "",
      })
        .then((result) => {
          var data = result.data.content;
          data.forEach((item) => {
            item.pic = this.baseUrl + item.pic;
            item.shopEntity.pic = this.baseUrl + item.shopEntity.pic;
          });

          this.pushInfo.push(data.slice(0, 2));
          this.pushInfo.push(data.slice(2, 6));
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang='less' scoped>
@primary: rgb(207, 181, 177);
.push {
  margin: 60px 0 60px;
  .head {
    font-size: 28px;
    text-align: center;
    position: relative;
    margin-bottom: 50px;
    line-height: 26px;
    color: #ffc300;
    font-family: arial, verdana, helvetica, "PingFang SC", "HanHei SC",
      STHeitiSC-Light, Microsoft Yahei, sans-serif;
    -webkit-font-smoothing: antialiased;
    &::before {
      content: "";
      display: inline-block;
      vertical-align: 8px;
      width: 385px;
      height: 1px;
      background: #d1d4db;
    }
    &::after {
      content: "";
      display: inline-block;
      vertical-align: 8px;
      width: 385px;
      height: 1px;
      background: #d1d4db;
    }
  }
}
.rows {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .contents2 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .content {
      width: 241px;
      cursor: pointer;
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
        height: 30px;
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
            overflow: hidden;
            width: 80px;
            text-overflow: ellipsis;
            white-space: nowrap;
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
  }
}

.pushs {
  width: 1000px;
  margin: 0 auto;

  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .showImage {
      width: 53%;
      height: 332px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
    .contents {
      width: 46%;
      display: flex;
      justify-content: space-between;
    }
    .content {
      width: 225px;
      cursor: pointer;
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
        height: 30px;
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
            margin-left: 6px;
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
  }
}
</style>
