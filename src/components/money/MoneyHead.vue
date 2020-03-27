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
      <span class="balance-money">300.00</span>
      <span class="des-money">3!月结余</span>
    </div>
    <div class="detail">
      <div>
        <span>0.00!</span>
        <span class="des-money">3!月支出</span>
      </div>
      <div>
        <span>0.00!</span>
        <span class="des-money">3!月收入</span>
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
  created() {}
  year = dayjs()
    .year()
    .toString();
  month = (dayjs().month() + 1).toString();
  months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  // 获取年份列表
  get years() {
    const endYear = dayjs().year();
    let y = 1970;
    const result: number[] = [];
    while (y <= endYear) {
      result.push(y);
      y++;
    }
    return result;
  }

  @Watch("year")
  logYear() {
    console.log(this.year);
  }
  @Watch("month")
  logMonth() {
    console.log(this.month);
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
  .title {
    margin-top: 10px;
    margin-bottom: 14px;
    text-align: center;
    .year {
      //清除select的边框样式
      border: none;
      //清除select聚焦时候的边框颜色
      outline: none;
      //将select的宽高等于div的宽高
      width: 60px;
      height: 40px;
      line-height: 40px;
      //隐藏select的下拉图标
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      option {
        border: 4px solid red;
      }
    }
    .month {
      //清除select的边框样式
      border: none;
      //清除select聚焦时候的边框颜色
      outline: none;
      //将select的宽高等于div的宽高
      width: 100%;
      height: 40px;
      line-height: 40px;
      //隐藏select的下拉图标
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      //通过padding-left的值让文字居中
      padding-left: 60px;
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
