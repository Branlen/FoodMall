<template>
  <div class="app-container">
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">订单总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value"
                  >100</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value">{{
                  baseInfo.shopNumber
                }}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{
                  baseInfo.orderNumber
                }}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{
                  baseInfo.totalPrice
                }}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">商品数</el-col>
                <el-col :span="6" class="overview-item-title">店铺数</el-col>
                <el-col :span="6" class="overview-item-title">订单量</el-col>
                <el-col :span="6" class="overview-item-title">总金额</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{
                  baseInfo.userNumber - 50
                }}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{
                  baseInfo.userNumber - 52
                }}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{
                  baseInfo.userNumber - 20
                }}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{
                  baseInfo.userNumber
                }}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="statistics-layout">
      <div class="layout-title">订单统计</div>
      <el-row>
        <el-col :span="24">
          <div style="padding: 10px; border-left: 1px solid #dcdfe6">
            <el-date-picker
              style="float: right; z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="true"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"
              ></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getDataInfo, getBaseData } from "@/api/admin/DA";
import { str2Date, datetimeFormat } from "@/utils/date";

import VeLine from "v-charts/lib/line.common";
export default {
  name: "home",
  components: { VeLine },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一月",
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      orderCountDate: "",
      chartSettings: {
        xAxisType: "time",
        area: true,
        axisSite: { right: ["orderAmount"] },
        labelMap: { orderCount: "订单数量", orderAmount: "订单金额" },
      },
      chartData: {
        columns: [],
        rows: [],
      },
      loading: false,
      dataEmpty: false,
      baseInfo: {},
    };
  },
  created() {
    this.initOrderCountDate();
    this.getData();
    getBaseData()
      .then((result) => {
        this.baseInfo = result.data;
      })
      .catch((err) => {});
  },
  methods: {
    handleDateChange() {
      this.getData();
    },
    initOrderCountDate() {
      let start = new Date();
      start.setFullYear(2020);
      start.setMonth(3);
      start.setDate(8);
      const end = new Date();
      end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7);
      this.orderCountDate = [start, end];
    },

    getData() {
      var data = null;
      getDataInfo({
        startTime: datetimeFormat(this.orderCountDate[0]),
        endTime: datetimeFormat(this.orderCountDate[1]),
      })
        .then((result) => {
          data = result.data;
        })
        .catch((err) => {});
      setTimeout(() => {
        this.chartData = {
          columns: ["date", "orderCount", "orderAmount"],
          rows: [],
        };
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let currDate = str2Date(item.date);
          let start = this.orderCountDate[0];
          let end = this.orderCountDate[1];
          if (
            currDate.getTime() >= start.getTime() &&
            currDate.getTime() <= end.getTime()
          ) {
            this.chartData.rows.push(item);
          }
        }
        this.dataEmpty = false;
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.appcontainer {
  width: 90%;
  margin-bottom: 10px;
}
.app-container {
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 40px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #dcdfe6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409eff;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}

.overview-layout {
  margin-bottom: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #dcdfe6;
}

.statistics-layout {
  width: 100%;
  border: 1px solid #dcdfe6;
}
.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}
.address-content {
  padding: 20px;
  font-size: 18px;
}
</style>
