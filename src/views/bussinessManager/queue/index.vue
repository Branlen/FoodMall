<template>
  <div class="queue">
    <el-card>
      <div class="content">
        <div class="button">
          <el-button type="primary" @click="nextOne($event)">下一位</el-button>
        </div>
        <p v-if="isEmpty">真不巧，还没有人排队</p>
        <p v-else>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
            >{{activity.content}}正在排队中</el-timeline-item>
          </el-timeline>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getQueueList, nextOne } from "@/api/shop";

export default {
  data() {
    return {
      activities: [],
      isEmpty: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(e) {
      getQueueList()
        .then(result => {
          if (result.data !== "当前没有人在排队") {
            this.activities = result.data;
            this.activities.forEach((item, index) => {
              item.size = "large";
              item.content = item.userName;
              if (index < 5) {
                item.color = "#0bbd87";
              }
            });
          } else {
            this.isEmpty = true;
          }
        })
        .catch(err => {});
      if (e.target.nodeName === "SPAN") {
        e.target.parentNode.disabled = false;
        e.target.parentNode.style.backgroundColor = "#CFB5B1";
        e.target.parentNode.style.borderColor = "#CFB5B1";
      } else {
        e.target.disabled = false;
        e.target.style.backgroundColor = "#CFB5B1 ";
        e.target.style.borderColor = "#CFB5B1 ";
      }
    },
    nextOne(e) {
      if (!this.isEmpty) {
        nextOne()
          .then(result => {
            this.$message({ type: "success", message: "下一位成功" });
            if (e.target.nodeName === "SPAN") {
              e.target.parentNode.disabled = true;
              e.target.parentNode.style.backgroundColor = "#99a9bf";
              e.target.parentNode.style.borderColor = "#99a9bf";
            } else {
              e.target.disabled = true;
              e.target.style.backgroundColor = "#99a9bf ";
              e.target.style.borderColor = "#99a9bf ";
            }
            this.getList(e);
          })
          .catch(err => {});
      } else {
        this.$message({ type: "warning", message: "没有人排队" });
      }
    }
  }
};
</script>

<style lang='less'scoped>
.queue {
  width: 80%;
  margin: 10px auto;
  .content {
    margin: 10px 100px;
    position: relative;
  }
  .button {
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 1;
  }
}
</style>
