<template>
  <header>
    <div class="title">2020年3月</div>
    <div class="balance">
      <span class="balance-money">300.00</span>
      <span class="des-money">3月结余</span>
    </div>
    <div class="detail">
      <div class="income">
        <span>0.00</span>
        <span class="des-money">3月收入</span>
      </div>
      <div class="expend">
        <span>0.00</span>
        <span class="des-money">3月支出</span>
      </div>
    </div>
  </header>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class MoneyHead extends Vue {}
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
      @extend %clearFix;
      content: "";
      display: block;
      width: 50vw;
      height: 30px;
      border-right: 1px solid white;
      position: absolute;
      top: 50%;
      margin-top: -15px;
    }
    .income {
      display: flex;
      flex-direction: column;
      min-width: 50vw;
    }

    .expend {
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
