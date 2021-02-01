<template>
  <div class="indexPage">
    <!--首部-->
    <Top
      @isPerson="backIndex"
      @getOrder="goOrder"
      @getComplain="goComplain"
      @getFollows="goFollows"
    ></Top>
    <!--个人信息中心-->
    <div v-if="isPerson">
      <PersonHandle :currentPage="currentComponnet"></PersonHandle>
    </div>
    <div v-else>
      <!--走马灯部分-->
      <div class="carousel">
        <el-carousel height="400px">
          <el-carousel-item v-for="item in BannerInfo" :key="item.pushId">
            <div class="carouselContent" :date-src="item.src" @click="goDetail(item)"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="backgroundColor:rgb(245,245,245); border:1px solid rgb(245,245,245);">
        <!--美食分类专区-->
        <FoodDivision :categoryArr="categoryArr" :currentCategory="currentCategoryId"></FoodDivision>
        <!--美食咨询-->
        <Push></Push>
        <!--猜你喜欢-->
        <GuessLike></GuessLike>
      </div>
      <!--尾部-->
      <Bottom></Bottom>
    </div>
    <!-- 侧边栏 -->
    <div class="sidebar">
      <ul v-for="item in sidebarCategoryArr " :key="item.categoryId">
        <li @click="changeCategory(item)">{{item.name}}</li>
      </ul>
      <ul class="special">
        <li>美食博文</li>
        <li>猜你喜欢</li>
        <li id="btnTop" @click="scrollToTop">回到顶部</li>
      </ul>
    </div>
  </div>
</template>

<script>
import TipsInput from "../../components/TipsInput";
import GuessLike from "./components/guessLike";
import PersonHandle from "./components/personHandle";
import Bottom from "./components/bottom";
import FoodDivision from "./components/foodDivision";
import Push from "./components/push";
import Top from "./components/top";
import { baseUrl } from "@/utils/const";
import { getListCategory, getShopInfo, listCarouselPush } from "@/api/index";
export default {
  components: {
    TipsInput,
    GuessLike,
    PersonHandle,
    Bottom,
    FoodDivision,
    Push,
    Top,
  },
  data() {
    return {
      baseUrl,
      isLogin: true,
      //是否是个人信息中心
      isPerson: false,
      username: "",
      //个人中心页面的组件是什么
      currentComponnet: "",
      tips: ["aa", "bb", "cc"],
      searchText: "",
      activeIndex: "1-1",
      BannerInfo: [],
      cityName: [],
      options: [],
      timer: null,
      categoryArr: [],
      sidebarCategoryArr: [],
      currentCategoryId: 1,
    };
  },
  watch: {
    isPerson: function () {
      this.$nextTick(() => {
        var contents = document.getElementsByClassName("carouselContent");
        let len = contents.length;
        for (var i = 0; i < len; i++) {
          var content = contents[i];
          //有点问题。留言一下
          var url = content.attributes["date-src"].value;
          content.style.backgroundImage = `url(${url})`;
        }
      });
    },
  },
  mounted() {},
  created() {
    this.getCategory();
    this.getCarousel();
  },
  methods: {
    getCarousel() {
      listCarouselPush({ pageNum: 1, pageSize: 5 })
        .then((response) => {
          var data = response.data.content;
          data.forEach((item) => {
            item.src = this.baseUrl + item.pic;
          });
          this.BannerInfo = response.data.content;
          this.$nextTick(() => {
            var contents = document.getElementsByClassName("carouselContent");
            let len = contents.length;
            for (var i = 0; i < len; i++) {
              var content = contents[i];
              //有点问题。留言一下
              var url = content.attributes["date-src"].value;
              content.style.backgroundImage = `url(${url})`;
            }
          });
        })
        .catch((err) => {});
    },
    //轮播图跳转到详情
    goDetail(item) {
      this.$router.push({ path: `/article/${item.pushId}` });
    },
    getCategory() {
      getListCategory({ pageNum: 1, pageSize: 100 })
        .then((result) => {
          this.categoryArr = result.data.content;
          this.sidebarCategoryArr = this.categoryArr.slice(1, 25);
        })
        .catch((err) => {});
    },
    changeCategory(item) {
      this.currentCategoryId = item.categoryId;
    },
    backIndex() {
      this.isPerson = false;
    },
    //回到顶部

    scrollToTop() {
      var _this = this;
      this.timer = setInterval(function () {
        var backTop = _this.getScrollTop();
        var speedTop = backTop / 10;
        //修改当前视口的数值，产生向上活动的效果
        _this.setScrollTop(backTop - speedTop);
        if (backTop == 0) {
          //结束函数执行
          clearInterval(_this.timer);
        }
      }, 30);
    },
    getScrollTop() {
      var sTop;
      if (document.compatMode == "BackCompat") {
        sTop = document.body.scrollTop;
      } else {
        //document.compatMode == \"CSS1Compat\"
        sTop =
          document.documentElement.scrollTop == 0
            ? document.body.scrollTop
            : document.documentElement.scrollTop;
      }
      return sTop;
    },
    setScrollTop(top) {
      if (document.compatMode == "BackCompat") {
        document.body.scrollTop = top;
      } else {
        if (document.documentElement.scrollTop == 0) {
          document.body.scrollTop = top;
        } else {
          document.documentElement.scrollTop = top;
        }
      }
    }, //改变城市的位置。
    changeCity() {},
    handleSelect() {},
    searchTip() {},
    searchConfirm() {},

    //跳转到个人中心页面
    goOrder(e) {
      this.isPerson = false;
      this.currentComponnet = e.currentComponnet;
      this.isPerson = e.isPerson;
    },
    goFollows(e) {
      this.isPerson = false;
      this.currentComponnet = e.currentComponnet;
      this.isPerson = e.isPerson;
    },
    goComplain(e) {
      this.isPerson = false;
      this.currentComponnet = e.currentComponnet;
      this.isPerson = e.isPerson;
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: rgb(207, 181, 177);
.topHead {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #f8f8f7;
  background-color: $primary;
  display: flex;
  padding: 0 10vw;
  justify-content: space-between;
  align-items: center;
  .toggleCity {
    height: 100%;
    width: 12%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-bottom: 1px;
    color: #ffffff;
    .el-cascader {
      margin-left: 5px;
      display: inline;
      .el-input {
        input {
          width: 200px;
          border: none;
        }
      }
    }
  }
  .loginBtn {
    height: 100%;
    display: flex;
    align-items: center;
    color: #f8f8f7;
  }
}

.search {
  width: 100%;
  margin: 0 auto;
  padding: 10px 130px;
  display: flex;
  justify-content: start;
  .logo {
    font-size: 16px;
    min-width: 220px;
    height: 60px;
    box-sizing: content-box;
    vertical-align: sub;
    img {
      width: 210px;
      height: 90px;
      position: relative;
      top: -15px;
    }
  }
  .searchBox {
    display: inline-block;
    width: 550px;
    height: 40px;
    margin-left: 10%;
    padding: 10px 0;
    background: #fff;
    vertical-align: middle;
    display: flex;
    justify-content: start;
    .TipsInput {
      margin-left: 30px;
      height: 40px;
    }
    .searchButton {
      display: inline-block;
      width: 80px;
      height: 40px;
      background-color: $primary;
      text-align: center;
      line-height: 35px;
      box-sizing: border-box;
      outline: none;
      cursor: pointer;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    .icon-search {
      font-size: 24px;
      font-weight: bold;
      color: white;
      cursor: pointer;
      position: relative;
      top: 4px;
    }
  }
}

.carousel {
  width: 100%;
  height: 400px;
}
.carousel .carouselContent {
  background: no-repeat center center;
  width: 100%;
  height: 400px;
  background-size: cover;
}

.sidebar {
  width: 70px;
  height: auto;
  display: block;
  padding: 4px 5px 0px;
  position: fixed;
  left: 10px;
  top: 60%;
  transform: translateY(-50%);
  z-index: 999;
  background-color: rgba(252, 247, 246, 0.753);
  li:hover {
    font-size: 15px;
    height: 28px;

    line-height: 28px;
  }
  ul {
    font-size: 14px;
    color: #5f5f5f;
    text-align: center;
    padding: 0;
    margin: 0;
    cursor: pointer;
    li {
      height: 25px;
      line-height: 25px;
      border-bottom: 1px solid #f4f4f4;
    }
  }
  .special {
    background-color: $primary;
    color: white;
    li {
      border: none;
    }
  }
}
</style>
