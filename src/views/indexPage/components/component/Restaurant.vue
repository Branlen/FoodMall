<template>
  <div class="content" @click="goShop(boxData)">
    <el-card shadow="hover" :body-style="{ padding: '0px' }">
      <div class="image">
        <el-image :lazy="true" :src="boxData.pic" />
      </div>
      <div style="padding: 14px 14px 8px;">
        <div class="restaurant marginTop">{{ boxData.name }}</div>
        <div class="second marginTop">
          <span class="rate">
            <el-rate
              v-model="boxData.grade"
              :colors="colors"
              disabled
            ></el-rate>
          </span>
          <span class="comment"
            >{{ parseInt(Math.random() * 500 + 600) }}个评价</span
          >
        </div>
        <div class="address marginTop">{{ boxData.address }}</div>
        <div class="price marginTop">
          ￥
          <span>{{ boxData.price }}</span
          >起
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    boxData: {
      type: Object,
      default: {}
    },
    goShop: {
      type: Function
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.content {
  cursor: pointer;
  transition: all 0.6s;
  .image {
    width: 100%;
    display: block;
  }

  .restaurant {
    font-size: 14px;
    font-weight: 700;
  }
  .second {
    display: flex;
    justify-content: start;
  }
  .rate {
    font-size: 12px;
  }
  .comment {
    margin-left: 10px;
    line-height: 20px;
    font-size: 10px;
    color: #999;
  }
  .address {
    font-size: 13px;
    color: #999;
    @include ellipse;
  }
  .price {
    font-size: 15px;
    color: tomato;
    span {
      font-size: 20px;
    }
  }
}
.content:hover {
  transform: scale(1.05);
}

.marginTop {
  margin: 3px 0;
}
</style>
