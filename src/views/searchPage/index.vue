<template>
  <div id="search">
    <headerInfo></headerInfo>
    <search></search>
    <footerInfo></footerInfo>
  </div>
</template>

<script>
import headerInfo from "../indexPage/components/top";
import footerInfo from "../indexPage/components/bottom";
import search from "../../components/searchContent/searchContent";

export default {
  data() {
    return {
      msg: "",
      categoryId: this.$route.params.id,
      baseUrl: "http://116.62.26.61:8003/o2o/",
      pushInfo: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {},
  },
  components: {
    headerInfo,
    footerInfo,
    search,
  },
};
</script>

<style>
</style>
