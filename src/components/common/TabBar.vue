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
  background: #fff;
  text-align: center;
  font-size: 20px;
  padding: 10px;
  min-height: 40px;
  position: relative;
  .icon {
    position: absolute;
    left: 10px;
    width: 18px;
    height: 18px;
    top: 50%;
    margin-top: -9px;
  }
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
