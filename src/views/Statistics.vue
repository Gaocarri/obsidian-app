<template>
  <div>
    <Layout>
      <Tab-bar class="tab-bar" @selectType="selectType" />
      <statistics-date @selectYmw="selectYmw" />
      <Scroll class="content">
        <statistics-chart :type="type" :ymw="ymw" />
      </Scroll>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Scroll from "@/components/common/Scroll.vue";
import TabBar from "@/components/common/TabBar.vue";

import StatisticsDate from "@/components/statistics/StatisticsDate.vue";
import StatisticsChart from "@/components/statistics/StatisticsChart.vue";

@Component({
  components: {
    Scroll,
    TabBar,
    StatisticsDate,
    StatisticsChart
  }
})
export default class Statistics extends Vue {
  type: string = "-";
  ymw: string = "week";
  // 选择支出和收入
  selectType(type: string) {
    this.type = type;
  }
  // 选择年月日
  selectYmw(ymw: string) {
    this.ymw = ymw;
  }
}
</script>

<style lang='scss' scoped>
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.content {
  position: absolute;
  top: 85px;
  bottom: 54px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
