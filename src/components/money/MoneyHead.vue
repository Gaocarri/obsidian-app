<template>
  <header>
    <div class="title">
      <select name="year" v-model="year" class="year">
        <option v-for="y in years" :value="y" :key="y">{{y}}年</option>
      </select>
      <select name="month" v-model="month" class="month">
        <option v-for="m in months" :value="m" :key="m">{{m}}月</option>
      </select>
    </div>
    <div class="balance">
      <span class="balance-money">{{monthBalance}}</span>
      <span class="des-money">{{month}}月结余</span>
    </div>
    <div class="detail">
      <div>
        <span>{{monthExpend}}</span>
        <span class="des-money">{{month}}月支出</span>
      </div>
      <div>
        <span>{{MonthInclude}}</span>
        <span class="des-money">{{month}}月收入</span>
      </div>
    </div>
  </header>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

import dayjs from "dayjs";

@Component
export default class MoneyHead extends Vue {
  year = dayjs()
    .year()
    .toString();
  month = (dayjs().month() + 1).toString();
  months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  // 获取年份列表
  get years() {
    const endYear = dayjs().year();
    let y = 1970;
    const result: string[] = [];
    while (y <= endYear) {
      result.push(y.toString());
      y++;
    }
    return result;
  }
  // 获取账单表
  get recordList() {
    return this.$store.state.recordList;
  }
  // 获取当月结余
  get monthBalance() {
    // 支出
    const expendRecordList = this.recordList.filter((i: RecordItem) => {
      return (
        dayjs(i.createdAt)
          .year()
          .toString() === this.year &&
        (dayjs(i.createdAt).month() + 1).toString() === this.month &&
        i.type === "-"
      );
    });
    // 收入
    const includeRecordList = this.recordList.filter((i: RecordItem) => {
      return (
        dayjs(i.createdAt)
          .year()
          .toString() === this.year &&
        (dayjs(i.createdAt).month() + 1).toString() === this.month &&
        i.type === "+"
      );
    });
    let balance = 0;
    for (let i = 0; i < expendRecordList.length; i++) {
      balance -= expendRecordList[i].amount;
    }
    for (let i = 0; i < includeRecordList.length; i++) {
      balance += includeRecordList[i].amount;
    }
    // 保留两位小数
    return balance.toFixed(2);
  }
  // 获取当月支出
  get monthExpend() {
    const expendRecordList = this.recordList.filter((i: RecordItem) => {
      return (
        dayjs(i.createdAt)
          .year()
          .toString() === this.year &&
        (dayjs(i.createdAt).month() + 1).toString() === this.month &&
        i.type === "-"
      );
    });
    let expend = 0;
    for (let i = 0; i < expendRecordList.length; i++) {
      expend += parseFloat(expendRecordList[i].amount);
    }
    return expend.toFixed(2);
  }
  // 获取当月收入
  get MonthInclude() {
    const includeRecordList = this.recordList.filter((i: RecordItem) => {
      return (
        dayjs(i.createdAt)
          .year()
          .toString() === this.year &&
        (dayjs(i.createdAt).month() + 1).toString() === this.month &&
        i.type === "+"
      );
    });
    let include = 0;
    for (let i = 0; i < includeRecordList.length; i++) {
      include += parseFloat(includeRecordList[i].amount);
    }
    return include.toFixed(2);
  }

  @Watch("year")
  editYear() {
    this.$store.commit("editYear", this.year);
  }
  @Watch("month")
  editMonth() {
    this.$store.commit("editMonth", this.month);
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/reset.scss";

header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #212121;
  color: #fff;
  font-weight: 500;
  text-align: center;
  font-size: 18px;
  height: 170px;
  .title {
    margin-top: 10px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    .year {
      font-size: 18px;
      background: #212121;
      color: #fff;
      border: none;
      outline: none;
      height: 30px;
      line-height: 30px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      option {
        background: #fff;
        color: #000;
      }
    }
    .month {
      font-size: 18px;
      text-align: center;
      background: #212121;
      color: #fff;
      border: none;
      outline: none;
      height: 30px;
      line-height: 30px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      option {
        background: #fff;
        color: #000;
      }
    }
  }

  .balance {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    .balance-money {
      font-size: 28px;
    }
  }

  .detail {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 10px;
    position: relative;

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 50vw;
      height: 30px;
      border-right: 1px solid white;
      top: 50%;
      margin-top: -15px;
    }

    > div {
      display: flex;
      flex-direction: column;
      min-width: 50vw;
    }
  }
}

.des-money {
  font-size: 10px;
}
</style>
