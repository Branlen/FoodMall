<template>
  <div class="gueseeLike">
    <div class="head">猜你喜欢</div>
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
      value2: 4,
      shopInfo: [],
      baseUrl,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goShop(item) {
      this.$router.push({ path: `/detail/${item.shopId}` });
    },
    getList() {
      var city = this.$store.getters.city;
      getShopInfo({
        pageNum: 2,
        pageSize: 8,
        city,
        categoryId: 1,
      })
        .then((result) => {
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
  },
};
</script>

<style lang="scss" scoped>
.gueseeLike {
  width: 1000px;
  margin: 2vh auto 60px;
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.head {
  font-size: 28px;
  text-align: center;
  position: relative;
  margin-bottom: 30px;
  line-height: 26px;
  color: rgb(228, 168, 158);
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
</style>
