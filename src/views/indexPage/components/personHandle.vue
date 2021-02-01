<template>
  <div class="personHandle">
    <div class="container">
      <el-container>
        <el-aside width="28%" class="left">
          <div class="info">
            <div class="img">
              <img src="@/assets/images/avatar.png" alt />
            </div>
            <div class="username">桥乔瞧翘</div>
          </div>
          <div class="infoList">
            <ul id="ulList">
              <li @click.prevent="componentId='MyOrder'">
                <svg-icon icon-class="tea"></svg-icon>我的订单
              </li>
              <li @click.prevent="componentId='MyFollows'">
                <svg-icon icon-class="catrtor"></svg-icon>我的关注
              </li>
              <li @click.prevent="componentId='MyComplain'">
                <svg-icon icon-class="rainbow"></svg-icon>我的投诉
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main class="right">
          <component :is="componentId"></component>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import MyFollows from "./component/MyFollows";
import MyOrder from "./component/MyOrder";
import MyComplain from "./component/MyComplain";
export default {
  components: {
    MyFollows: MyFollows,
    MyOrder: MyOrder,
    MyComplain: MyComplain
  },
  data() {
    return {
      componentId: "MyFollows"
    };
  },
  props: {
    currentPage: {
      type: String
    }
  },
  watch:{
    currentPage:function(newValue,oldValue){
      this.componentId = newValue
    }
  },
  created() {
    this.componentId = this.currentPage;
  },
  methods: {
    hasClass(elements, cName) {
      return !!elements.className.match(
        new RegExp("(\\s|^)" + cName + "(\\s|$)")
      );
    },
    addClass(elements, cName) {
      if (!this.hasClass(elements, cName)) {
        elements.className += " " + cName;
      }
    },
    removeClass(elements, cName) {
      if (this.hasClass(elements, cName)) {
        elements.className = elements.className.replace(
          new RegExp("(\\s|^)" + cName + "(\\s|$)"),
          " "
        );
      }
    }
  },
  mounted() {
    var that = this;
    var lists = document.getElementById("ulList");
    var childrens = lists.children;
    lists.addEventListener("click", function(e) {
      for (var item of childrens) {
        that.removeClass(item, "isActive");
      }
      that.addClass(e.target, "isActive");
    });
    if (this.componentId == "MyOrder") {
      that.addClass(childrens[0], "isActive");
    } else if (this.componentId == "MyFollows") {
      that.addClass(childrens[1], "isActive");
    } else if (this.componentId == "MyComplain") {
      that.addClass(childrens[2], "isActive");
    }
  }
};
</script>

<style lang="less" scoped>
@media only screen and(max-width: 700px) {
  .container {
    width: 100%;
  }
}
@primary: rgb(177, 122, 125);
.personHandle {
  width: 100%;
  background-color: rgb(105, 100, 123);
  min-height: 90vh;
  padding-bottom: 20px;
  .container {
    width: 900px;
    margin: 0 auto;
    padding-top: 40px;
    min-height: 800px;
    .el-container {
      min-height: 800px;
    }
    .left {
      height: 600px;
      background-color: rgb(207, 181, 177);
      .info {
        height: 210px;
        padding-top: 30px;
        .img {
          width: 100px;
          height: 100px;
          border-radius: 100px;
          background-color: rgb(222, 221, 226);
          padding: 3px;
          overflow: hidden;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
            border-radius: 100px;
          }
        }
        .username {
          padding: 10px 0;
          color: @primary;
          font-size: 27px;
          font-weight: 500;
          text-align: center;
        }
      }
      .infoList {
        width: 100%;
        ul {
          padding: 0;
          list-style: none;
          li {
            padding: 0 0 0 30px;
            height: 75px;
            line-height: 75px;
            font-size: 18px;
            cursor: pointer;
            svg {
              font-size: 23px;
              margin-right: 7px;
            }
          }
        }
      }
    }
    .right {
      background-color: rgb(255, 255, 255);
      min-height: 1000px;
    }
  }
}
.isActive {
  background-color: @primary;
  color: white;
}
</style>
