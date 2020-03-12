<template>
  <header>
    <div class="date">!2020年3月11日</div>
    <div class="balance">
      <span class="balance-expend">支出:!100.00</span>
      <span>收入:!200.00</span>
    </div>
  </header>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class MoneyToday extends Vue {}
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
</style>
