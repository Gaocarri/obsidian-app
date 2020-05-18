<template>
  <div class="tab-bar">
    <div class="icon">
      <slot name="icon" />
    </div>
    <span class="expend" :class="{'selected':type==='-'}" @click="selectType('-')">支出</span>
    <span class="income" :class="{'selected':type==='+'}" @click="selectType('+')">收入</span>
    <div class="delete">
      <slot name="delete" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class extends Vue {
  type: string = "-";

  selectType(type: string) {
    if (this.type !== type) {
      this.type = type;
      this.$emit("selectType", type);
    }
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
    width: 20px;
    height: 20px;
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

  .delete {
    height: 20px;
    line-height: 20px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-10px);
    font-size: 14px;
  }
}
</style>
