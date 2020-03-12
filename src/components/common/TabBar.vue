<template>
  <div class="tab-bar">
    <div class="icon">
      <slot />
    </div>
    <span class="expend" :class="{'selected':type==='-'}" @click="selectExpend">支出</span>
    <span class="income" :class="{'selected':type==='+'}" @click="selectIncome">收入</span>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class extends Vue {
  type: string = "+";

  selectExpend() {
    this.type = "-";
  }
  selectIncome() {
    this.type = "+";
  }
}
</script>

<style lang='scss' scoped>
.tab-bar {
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
  padding: 0 20px;
  position: relative;
  span {
    padding: 10px;
  }
  .expend {
    margin-right: 10px;
  }

  .income {
    margin-left: 10px;
  }

  .selected {
    border-bottom: 2px solid #000;
  }
}
</style>
