<template>
  <div>
    <div class="chart-title">{{chartTitle}}</div>
    <div id="myEcharts" style="width:100vw ;height:30vh;"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import "echarts/lib/chart/bar";

import dayjs from "dayjs";

@Component
export default class StatisticsChart extends Vue {
  @Prop({ default: "-" }) type?: string;
  @Prop({ default: "week" }) ymw?: string;

  created() {
    this.$store.commit("fetchRecords");
  }
  mounted() {
    this.getTotal();
    this.getXName();
    this.draw();
    console.log(dayjs().month());
  }

  x: any[] = [];
  y: any[] = [];
  get chartTitle() {
    switch (this.ymw) {
      case "year":
        return "本年";
        break;
      case "month":
        return "本月";
        break;
      case "week":
        return "本周";
        break;
      default:
        return "本周";
    }
    return [];
  }

  // 获取横坐标名称
  getXName() {
    // 获取当前月份天数
    const day = dayjs().daysInMonth();
    let dayArray = [];
    for (let i = 1; i <= day; i++) {
      dayArray.push(i);
    }
    let data: string[] = [];
    switch (this.ymw) {
      case "week":
        data = ["周日", "周二", "周三", "周四", "周五", "周六", "周一"];
        break;
      case "month":
        data = dayArray.map(i => i + "日");
        break;
      case "year":
        data = [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ];
        break;
      default:
        data = ["周日", "周二", "周三", "周四", "周五", "周六", "周一"];
    }
    this.x = data;
  }
  // 获取纵坐标数值
  getTotal() {
    let data: any[] = [];
    const recordList = this.$store.state.recordList;

    if (this.ymw == "week") {
      // 当前选择为周
      data = [0, 0, 0, 0, 0, 0, 0];
      const startDay = dayjs().startOf("week");
      const record = recordList.filter((item: RecordItem) => {
        return dayjs(item.createdAt) >= startDay && this.type == item.type;
      });
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < record.length; j++) {
          if (i == dayjs(record[j].createdAt).day()) {
            data[i] += record[j].amount;
          }
        }
      }
    } else if (this.ymw == "month") {
      // 获取当前月
      const day = dayjs().daysInMonth();
      for (let i = 0; i < day; i++) {
        data.push(0);
      }
      const record = recordList.filter((item: RecordItem) => {
        return (
          dayjs().month() == dayjs(item.createdAt).month() &&
          this.type == item.type
        );
      });
      for (let i = 0; i < day; i++) {
        for (let j = 0; j < record.length; j++) {
          if (i == dayjs(record[j].createdAt).date()) {
            data[i] += record[j].amount;
          }
        }
      }
    } else if (this.ymw == "year") {
      // 当前的选择是年
      const year = dayjs().year();
      for (let i = 0; i < 12; i++) {
        data.push(0);
      }
      const record = recordList.filter((item: RecordItem) => {
        return (
          dayjs().year() == dayjs(item.createdAt).year() &&
          this.type == item.type
        );
      });
      console.log(record);
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < record.length; j++) {
          if (i == dayjs(record[j].createdAt).month() + 1) {
            data[i] += record[j].amount;
          }
        }
      }
    }
    this.y = data;
  }

  // 刷新图表
  draw() {
    const ele = document.getElementById("myEcharts");
    const chart: any = this.$echarts.init(ele);
    chart.setOption(this.options, true, false);
  }

  // echarts选项
  $echarts: any;
  get options() {
    return {
      xAxis: {
        boundaryGap: false, // 两端间隔
        splitLine: {
          show: false // 每个端点的折线
        },
        type: "category", // 类目轴
        axisTick: {
          show: false
        },
        data: this.x // 横轴刻度名称
      },
      yAxis: {
        show: false,
        type: "value"
      },
      series: [
        {
          data: this.y, //这里我的数据对应月份的数据,请自行修改
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: "top"
              }
            }
          },
          type: "line",
          stack: "总量",
          // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
          color: "#212943"
        }
      ]
    };
  }

  @Watch("ymw")
  changeX() {
    this.getXName();
    this.getTotal();
    this.draw();
  }

  @Watch("type")
  changeY() {
    this.getTotal();
    this.draw();
  }
}
</script>

<style lang="scss" scoped>
.chart-title {
  margin-top: 10px;
  padding: 6px 10px;
  width: 100vw;
  background-color: #eee;
}
</style>