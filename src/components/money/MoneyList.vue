<template>
  <div>
    <div v-for="(data,index) in dataList" :key="index">
      <header>
        <div class="date">{{data.y}}年{{data.m}}月{{data.d}}日</div>
        <div class="balance">
          <span class="balance-expend">支出:{{getExpend(data)}}</span>
          <span>收入:{{getInclude(data)}}</span>
        </div>
      </header>
      <ul class="icons">
        <li v-for="(recordItem,index2) in data.record" :key="index2">
          <div class="left">
            <Icon class="icon" :name="recordItem.tag.name" />
            <span>{{recordItem.tag.name}}</span>
          </div>
          <span
            class="right"
          >{{recordItem.type==='+'?(recordItem.amount.toFixed(2)):('-'+recordItem.amount.toFixed(2))}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import dayjs from "dayjs";
import obj from "../common/toast";

type Data = {
  y: Number;
  m: Number;
  d: Number;
  record: RecordItem[];
};

@Component
export default class MoneyToday extends Vue {
  mounted() {
    console.log(this.dataList);
  }
  // 数据
  get dataList() {
    let dataList = [];
    console.log(this.$store.state.recordList);
    for (let i = 0; i < this.$store.state.recordList.length; i++) {
      const data = {
        y: 0,
        m: 0,
        d: 0,
        record: []
      } as Data;
      data.y = dayjs(this.$store.state.recordList[i].createdAt).year();
      data.m = dayjs(this.$store.state.recordList[i].createdAt).month() + 1;
      data.d = dayjs(this.$store.state.recordList[i].createdAt).date();

      // 判断日期是否为同一天
      if (i == 0) {
        // 存入recordItem
        data.record.push(this.$store.state.recordList[0]);
        dataList.push(data);
      } else if (
        // 日期不重复的情况
        data.y != dayjs(this.$store.state.recordList[i - 1].createdAt).year() ||
        data.m !=
          dayjs(this.$store.state.recordList[i - 1].createdAt).month() + 1 ||
        data.d != dayjs(this.$store.state.recordList[i - 1].createdAt).date()
      ) {
        // 存入recordItem
        data.record.push(this.$store.state.recordList[i]);
        dataList.push(data);
      } else {
        dataList[dataList.length - 1].record.push(
          this.$store.state.recordList[i]
        );
      }
    }
    return dataList;
  }
  // 获取当日支出
  getExpend(data: Data) {
    let expend = 0;
    for (let i = 0; i < data.record.length; i++) {
      if (data.record[i].type === "-") {
        expend += data.record[i].amount;
      }
    }
    return expend.toFixed(2);
  }
  // 获取当日收入
  getInclude(data: Data) {
    let include = 0;
    for (let i = 0; i < data.record.length; i++) {
      if (data.record[i].type === "+") {
        include += data.record[i].amount;
      }
    }
    return include.toFixed(2);
  }
}
</script>

<style lang='scss' scoped>
header {
  background: #eee;
  color: #999;
  font-size: 12px;
  padding: 6px 6px;
  display: flex;
  justify-content: space-between;

  .balance {
    &-expend {
      margin-right: 8px;
    }
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 10px;
  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .left {
      display: flex;
      align-items: center;
      .icon {
        border-radius: 50%;
        background: #000;
        color: #ddd;
        padding: 8px;
        width: 40px;
        height: 40px;
        margin-bottom: 10px;
        margin-right: 12px;
      }
      span {
        vertical-align: middle;
        font-size: 16px;
      }
    }
  }
}
</style>

