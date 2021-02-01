<template>
  <div class="foodDivision">
    <div class="head">美食分类专区</div>
    <div class="division">
      <ul>
        <div v-for="item in oneCategory" :key="item.categoryId">
          <li @click="changeCategory(item,$event)">{{item.name}}</li>
        </div>

        <li>
          <el-popover placement="left" width="600" trigger="click">
            <el-card>
              <el-row :gutter="20" v-for="(item,index) in moreCategory" :key="index">
                <el-col :span="4" v-for="ite in item" :key="ite.categoryId ">
                  <el-button
                    type="text"
                    style="color:#000"
                    @click="changeCategory(ite)"
                  >{{ite.name}}</el-button>
                </el-col>
              </el-row>
            </el-card>
            <el-button slot="reference" type="text">更多分类</el-button>
          </el-popover>
        </li>
      </ul>
    </div>
    <div class="contentPadding" v-loading="loading">
      <el-row v-for="(o, index) in shopInfo" :key="index" :offset="index > 0 ? 2 : 0" :gutter="20">
        <el-col :span="6" v-for="(item) in o " :key="item.shopId">
          <Restaurant :boxData="item" :goShop="goShop"></Restaurant>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getShopInfo } from "@/api/index";
import { baseUrl } from "@/utils/const";
import Restaurant from "./component/Restaurant";
export default {
  components: {
    Restaurant,
  },
  data() {
    return {
      baseUrl,
      value2: 4,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      oneCategory: [],
      moreCategory: [],
      categoryId: 1,
      loading: true,
      shopInfo: [],
    };
  },

  watch: {
    currentCategory: function () {
      this.categoryId = this.currentCategory;
      this.getList();
    },
    categoryArr: function () {
      this.changeArr();
    },
  },
  props: {
    currentCategory: "",
    categoryArr: {
      type: Array,
    },
  },

  created() {
    this.getList();
    this.changeArr();
  },
  methods: {
    getList() {
      var city = this.$store.getters.city;
      getShopInfo({
        pageNum: 1,
        pageSize: 8,
        city,
        categoryId: this.categoryId,
      })
        .then((result) => {
          if (this.shopInfo !== null) {
            this.shopInfo = [];
          }
          this.loading = false;
          var data = result.data.content;
          data.forEach((item) => {
            item.pic = this.baseUrl + item.pic;
            item.grade = parseInt(Math.random() * 2 + 3);
          });

          this.shopInfo.push(data.slice(0, 4));
          this.shopInfo.push(data.slice(4, 8));
        })
        .catch((err) => {});
    },
    changeCategory(item, e) {
      var li = document.getElementsByTagName("li");
      for (let i = 0; i < li.length; i++) {
        li[i].setAttribute("id", "");
      }
      e.target.setAttribute("id", "isActive");
      this.categoryId = item.categoryId;
      this.loading = true;
      this.getList();
    },
    changeArr() {
      console.log(this.categoryArr);
      this.moreCategory = [];
      this.oneCategory = this.categoryArr.slice(0, 7);
      this.moreCategory.push(this.categoryArr.slice(0, 6));
      this.moreCategory.push(this.categoryArr.slice(7, 13));
      this.moreCategory.push(this.categoryArr.slice(14, 20));
      this.moreCategory.push(this.categoryArr.slice(21, 27));
      this.moreCategory.push(this.categoryArr.slice(28, 30));
    },
    goShop(item) {
      this.$router.push({ path: `/detail/${item.shopId}` });
    },
  },
};
</script>

<style lang='scss' scoped>
$primary: rgb(207, 181, 177);
.foodDivision {
  margin: 60px 0;
  .head {
    font-size: 30px;
    text-align: center;
    position: relative;
    margin-bottom: 30px;
    line-height: 26px;
    color: rgb(26, 177, 214);
    font-family: arial, verdana, helvetica, "PingFang SC", "HanHei SC",
      STHeitiSC-Light, Microsoft Yahei, sans-serif;
    -webkit-font-smoothing: antialiased;
    &::before {
      content: "";
      display: inline-block;
      vertical-align: 8px;
      margin: 0 10px;
      width: 400px;
      height: 1px;
      background: #d1d4db;
    }
    &::after {
      content: "";
      display: inline-block;
      vertical-align: 8px;
      margin: 0 10px;
      width: 400px;
      height: 1px;
      background: #d1d4db;
    }
  }
}
.division {
  width: 1000px;
  border: 1px solid whitesmoke;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
  height: 50px;
  ul {
    display: flex;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-size: 14px;
    height: 100%;
  }
  li {
    width: 60px;
    color: #8e8e88;
    height: 100%;
    line-height: 50px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  li:last-child {
    width: 100px;
  }
  li:hover {
    color: $primary;
    border-bottom: 3px solid $primary;
  }
}
#isActive {
  color: rgb(207, 181, 177);
  border-bottom: 3px solid $primary;
}
.contentPadding {
  width: 1000px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px auto;
  padding: 20px 20px;
}



.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
