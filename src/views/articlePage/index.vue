<template>
  <div class="article">
    <Top></Top>
    <div class="articleContent">
      <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href>推文详情</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="mainContent">
        <el-card class="Aritle">
          <div
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <div class="AritleHeader">
              <div class="AritleTitle">{{articleInfo.title}}</div>
              <div class="AritleInfo">
                <span class="username">
                  <el-avatar shape="circle" size="small" :src="articleInfo.shopEntity.pic"></el-avatar>
                  <span class="name">{{articleInfo.shopEntity.name}}</span>
                </span>
                <span class="much">
                  <svg-icon icon-class="love"></svg-icon>300
                </span>
              </div>
            </div>
            <div class="AritleContent markdown-body">
              <p v-html="articleInfo.content"></p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../indexPage/components/top";
import Bottom from "../indexPage/components/bottom";
import { pushById } from "@/api/index";
export default {
  components: {
    Top,
    Bottom,
  },
  data() {
    return {
      baseUrl: "http://116.62.26.61:8003/o2o/",
      articleInfo: `<p>1、烟火人间，风味长存</p><p>2、那些我为你烹饪的食物，是写给你最美的情书</p><p>3、视体重为无物，视美食为全部</p><p>4、料理是一场原地的旅行</p><p>5、把眼睛留给风光，把体重留给美食</p><p class="ztext-empty-paragraph"><br/></p><figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-c94dd19dbcb1a530deaed119a3a73275_b.jpg" data-caption="" data-size="normal" data-rawwidth="690" data-rawheight="434" class="origin_image zh-lightbox-thumb" width="690" data-original="https://pic2.zhimg.com/v2-c94dd19dbcb1a530deaed119a3a73275_r.jpg"/></noscript><img src="data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;690&#39; height=&#39;434&#39;&gt;&lt;/svg&gt;" data-caption="" data-size="normal" data-rawwidth="690" data-rawheight="434" class="origin_image zh-lightbox-thumb lazy" width="690" data-original="https://pic2.zhimg.com/v2-c94dd19dbcb1a530deaed119a3a73275_r.jpg" data-actualsrc="https://pic2.zhimg.com/v2-c94dd19dbcb1a530deaed119a3a73275_b.jpg"/></figure><p class="ztext-empty-paragraph"><br/></p><p>6、吃货，嘴里的享受，心里的想瘦。</p><p>7、吃货的格言：今天吃喝不努力明天努力找吃喝。</p><p>8、吃货最高境界，眼见为食。</p><p>9、再简单的食物都有自己的灵魂，人生有很多味道无法复制。</p><p>10、吃货敢于直面粗壮的大腿，敢于挑战隆起的小腹。</p><p class="ztext-empty-paragraph"><br/></p><figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-7bfda22c1f9acf0a1fdf318535d691da_b.jpg" data-caption="" data-size="normal" data-rawwidth="700" data-rawheight="495" class="origin_image zh-lightbox-thumb" width="700" data-original="https://pic3.zhimg.com/v2-7bfda22c1f9acf0a1fdf318535d691da_r.jpg"/></noscript><img src="data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;700&#39; height=&#39;495&#39;&gt;&lt;/svg&gt;" data-caption="" data-size="normal" data-rawwidth="700" data-rawheight="495" class="origin_image zh-lightbox-thumb lazy" width="700" data-original="https://pic3.zhimg.com/v2-7bfda22c1f9acf0a1fdf318535d691da_r.jpg" data-actualsrc="https://pic3.zhimg.com/v2-7bfda22c1f9acf0a1fdf318535d691da_b.jpg"/></figure><p class="ztext-empty-paragraph"><br/></p><p>11、满肚子的食物，人才不会空虚。</p><p>12、唤醒沉睡的味蕾,与食物相濡以。</p><p>13、世界那么大，我们去吃吃看。</p><p>14、我总徘徊在吃饱与吃撑之间。</p><p>15、对不起我们不合适，这辈子我唯一拿得起放不下的是筷子。</p><p class="ztext-empty-paragraph"><br/></p><figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/v2-d929d46fcb0a03715af28238e0a60b06_b.jpg" data-caption="" data-size="normal" data-rawwidth="1363" data-rawheight="798" class="origin_image zh-lightbox-thumb" width="1363" data-original="https://pic3.zhimg.com/v2-d929d46fcb0a03715af28238e0a60b06_r.jpg"/></noscript><img src="data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;1363&#39; height=&#39;798&#39;&gt;&lt;/svg&gt;" data-caption="" data-size="normal" data-rawwidth="1363" data-rawheight="798" class="origin_image zh-lightbox-thumb lazy" width="1363" data-original="https://pic3.zhimg.com/v2-d929d46fcb0a03715af28238e0a60b06_r.jpg" data-actualsrc="https://pic3.zhimg.com/v2-d929d46fcb0a03715af28238e0a60b06_b.jpg"/></figure><p class="ztext-empty-paragraph"><br/></p><p>16、天要我胖，不得不胖。</p><p>17、当吃货挺好，吃着吃着就忘了。</p><p>18、美食皆可贵 减肥价不高</p><p>19、但愿人长久 千里不长肉</p><p>20、请给我来一杯威士忌加红枣枸杞</p><p class="ztext-empty-paragraph"><br/></p><figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-d40cbc864b9b3af1321dbd554c31a08b_b.jpg" data-caption="" data-size="normal" data-rawwidth="700" data-rawheight="455" class="origin_image zh-lightbox-thumb" width="700" data-original="https://pic4.zhimg.com/v2-d40cbc864b9b3af1321dbd554c31a08b_r.jpg"/></noscript><img src="data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;700&#39; height=&#39;455&#39;&gt;&lt;/svg&gt;" data-caption="" data-size="normal" data-rawwidth="700" data-rawheight="455" class="origin_image zh-lightbox-thumb lazy" width="700" data-original="https://pic4.zhimg.com/v2-d40cbc864b9b3af1321dbd554c31a08b_r.jpg" data-actualsrc="https://pic4.zhimg.com/v2-d40cbc864b9b3af1321dbd554c31a08b_b.jpg"/></figure><p><br/>21、与千百种美食相遇，与千百个人相识，与千百种人生相知相惜</p><p>22、一个人的火锅，一座城市的烟花，一首想你的歌</p><p>23、做的每一道菜都是对你最深情的告白</p><p>24、脑子装不下的东西就用肚子来装</p><p>25、料理是一场期待的旅行 跨过山和大海 一路走来，只为遇见你的舌尖</p><figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/v2-83a79787fb75b72399073463d9db9caf_b.jpg" data-caption="" data-size="normal" data-rawwidth="1315" data-rawheight="566" class="origin_image zh-lightbox-thumb" width="1315" data-original="https://pic4.zhimg.com/v2-83a79787fb75b72399073463d9db9caf_r.jpg"/></noscript><img src="data:image/svg+xml;utf8,&lt;svg xmlns=&#39;http://www.w3.org/2000/svg&#39; width=&#39;1315&#39; height=&#39;566&#39;&gt;&lt;/svg&gt;" data-caption="" data-size="normal" data-rawwidth="1315" data-rawheight="566" class="origin_image zh-lightbox-thumb lazy" width="1315" data-original="https://pic4.zhimg.com/v2-83a79787fb75b72399073463d9db9caf_r.jpg" data-actualsrc="https://pic4.zhimg.com/v2-83a79787fb75b72399073463d9db9caf_b.jpg"/></figure><p>26、我们要有最朴素的生活，与最遥远的梦想。即使明日天寒地冻，路远马亡。</p><p>27、既生瑜何生亮，既生美食何生脂肪</p><p>28、你们去征服世界吧，我只想征服一个人的胃和心</p><p>29、燃情长假即将结束，请开启日常xxx模式</p><p>30、岁月悠然，茶知冷暖，给灵魂一个出口。</p><p>内容来源网络，侵删。</p><p>欢迎关注专栏 或者 <a class="member_mention" href="https://www.zhihu.com/people/b21b1bb966a98c5633e85de6261f0193" data-hash="b21b1bb966a98c5633e85de6261f0193" data-hovercard="p$b$b21b1bb966a98c5633e85de6261f0193">@欧文酥</a>  收看更多。</p>`,
      //最新文章的文章
      newCategoryInfo: {},
      //    文章的内容
      ariticleInfos: {
        createTime: "",
      },
      // //栏目的相关信息
      // categoryInfo:{}
      loading: false,
    };
  },
  watch: {
    $route: function (to, from) {
      this.getArticleInfo();
    },
  },
  methods: {
    goDetail(item) {
      //console.log(item);
      this.$router.push({ path: `/article/${item.pushId}` });
    },
    //增加图片
    $imgAdd(pos, $file) {
      //console.log(pos,$file);
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      axios({
        url: "server url",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾

        this.$refs.md.$img2Url(pos, url);
      });
    },

    //获取当前文章的内容
    getArticleInfo() {
      //console.log("tag", this.$route.params.id);
      pushById(this.$route.params.id)
        .then((response) => {
          var data = response.data;

          data.shopEntity.pic = this.baseUrl + data.shopEntity.pic;

          this.articleInfo = data;
        })
        .catch((err) => {});
    },
  },
  mounted() {
    this.getArticleInfo();
  },
};
</script>

<style lang='less' scoped>
.articleContent {
  width: 80%;
  margin: 0 auto 50px;
}

.el-breadcrumb {
  font-size: 16px;
  margin-top: 2%;
}
.mainContent {
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
  min-height: 500px;
  .Aritle {
    width: 100%;
  }
}
.Aritle {
  display: inline-block;
  width: 47%;
  background-color: #fff;
  margin-bottom: 3.5%;
  // display: flex;
  // justify-content: space-between;
  .AritleHeader {
    padding: 3% 4% 2%;
    border-bottom: 1px solid #999;
    box-sizing: border-box;
    .AritleTitle {
      text-align: center;
      font-size: 20px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      color: rgb(20, 21, 22);
      margin-bottom: 1%;
    }
    .AritleInfo {
      text-align: center;
      color: #534f4f46;
      font-size: 15px;
      align-items: center;
      .username {
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        margin-right: 10px;
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
        position: relative;
        top: 2px;
        svg {
          margin-right: 2px;
        }
      }
    }
  }
  .AritleContent {
    padding: 3% 4% 2%;
  }
}

.newArticle {
  display: inline-block;
  width: 47%;
  background-color: #fff;
  padding: 1% 1%;
  margin-bottom: 3.5%;
  max-height: 300px;
  // display: flex;
  // justify-content: space-between;
  .categoryHeader {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 2% 1% 0.5%;
    border-bottom: 1px outset #000;
    .categoryName {
      font-size: 25px;
      font-weight: bold;
      color: dodgerblue;
      cursor: pointer;
    }
    .categoryMore {
      cursor: pointer;
    }
  }
  .categoryContent {
    width: 100%;
    box-sizing: border-box;
    padding: 3% 2%;
    font-size: 16px;
    ul {
      list-style: none;
      width: 100%;
      li {
        margin-bottom: 0%;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .el-divider {
          margin: 8px 0;
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
img {
  width: 100%;
  background-color: #000;
}
</style>
