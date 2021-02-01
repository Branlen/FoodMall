<template>
  <div class="bottom">
    <div class="bottomInfo">
      <div class="container">
        <div class="service footerItem">
          <p class="title">客户服务</p>
          <span>
            <i class="iconfont icon-people_fill" />在线客服
          </span>
          <span>
            <i class="iconfont icon-fabulous" />用户反馈
          </span>
        </div>
        <div class="intro footerItem">
          <p class="title">何为桥乔瞧翘</p>
          <p class="intro-p">桥乔瞧翘原创饮食类电商品牌，秉承网易一贯的严谨态度，我们深入世界各地，从源头全程严格把控商家生产环节，力求帮消费者甄选到优质的食物</p>
          <div class="guanzhu">
            关注我们：
            <img src="http://yanxuan.nosdn.127.net/60068701f3a380911f237c26c91b39d0.png" alt />
            <img src="http://yanxuan.nosdn.127.net/031e783d7ee645b6096980d0bf83079b.png" alt />
            <img src="http://yanxuan.nosdn.127.net/0c8759a89cdbd7acf7f2921e6f0fad19.png" alt />
          </div>
        </div>
        <div class="code footerItem">
          <p class="title">扫码下载APP</p>
          <img src="@/assets/images/code.png" alt />
          <span>下载领1000元新人礼包</span>
        </div>
      </div>
    </div>
    <footer>
      <div class="container">
        <ul class="footerTop">
          <li>
            <img src="//yanxuan.nosdn.127.net/e6021a6fcd3ba0af3a10243b7a2fda0d.png" alt />
            <span>30天无忧退换货</span>
          </li>
          <li>
            <img src="//yanxuan.nosdn.127.net/e09c44e4369232c7dd2f6495450439f1.png" alt />
            <span>满88元送优惠券</span>
          </li>
          <li>
            <img src="//yanxuan.nosdn.127.net/e72ed4de906bd7ff4fec8fa90f2c63f1.png" alt />
            <span>XX品质保证</span>
          </li>
        </ul>
        <div class="footerBottom">
          <ul>
            <li>关于我们</li>
            <li>帮助中心</li>
            <li>售后服务</li>
            <li>配送与验收</li>
            <li>商务合作</li>
            <li>企业采购</li>
            <li>开放平台</li>
            <li>搜索推荐</li>
            <li>友情链接</li>
          </ul>
          <p>XX公司版权所有 © 1996-2018 食品经营许可证：XXXXXXXXXXXXXXXXX</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "@/assets/css/var.scss";
$primary: rgb(207, 181, 177);
.bottomInfo {
  width: 100%;
  height: 300px;
  border-top: 1px solid $borderColor;
  overflow: hidden;
  .footerItem {
    width: 33%;
    height: 210px;
    position: relative;
    top: 45px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    color: $fontDefaultColor;
    .title {
      color: $fontDeepColor;
      margin-top: 0;
      margin-bottom: 30px;
    }
  }
  .service {
    border-right: 1px solid $borderColor;
    span {
      display: inline-block;
      width: 80px;
      height: 100px;
      border: 1px solid $borderColor;
      text-align: center;
      margin: 0 10px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: $thirdColor;
      }
      i {
        display: block;
        font-size: 30px;
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }
  }
  .intro {
    border-right: 1px solid $borderColor;
    .intro-p {
      font-size: 13px;
      width: 300px;
      margin: 0 auto;
      text-align: left;
      color: $fontDeepColor;
      line-height: 1.8em;
    }
    div {
      font-size: 14px;
      margin: 20px auto 0;
      img {
        margin: 0 6px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .code {
    img {
      width: 110px;
      display: block;
      margin: 0 auto;
    }
    span {
      font-size: 12px;
      color: $thirdColor;
      margin-top: 10px;
      display: block;
    }
  }
}
footer {
  width: 100%;
  height: 218px;
  background-color: #414141;
  color: white;
  overflow: hidden;
  padding-bottom: 10px;
  .footerTop {
    padding: 36px 0;
    border-bottom: 1px solid #4f4f4f;
    width: 100%;
    li {
      display: inline-block;
      width: 33%;
      text-align: center;
      img {
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        font-size: 18px;
        margin-left: 10px;
      }
    }
  }
  .footerBottom {
    color: $fontDefaultColor;
    margin-top: 30px;

    font-size: 13px;
    text-align: center;
    ul {
      li {
        display: inline-block;
        cursor: pointer;
        padding: 0 6px;
        border-right: 2px solid $fontDefaultColor;
        &:last-child {
          border-right: none;
        }
      }
    }
    p {
      margin-top: 5px;
    }
  }
}
</style>
