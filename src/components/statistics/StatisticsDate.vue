<template>
  <ul>
    <li @click="selectYmw('week')" :class="{'selected':ymw=='week'}">周</li>
    <li class="middle-li" @click="selectYmw('month')" :class="{'selected':ymw=='month'}">月</li>
    <li @click="selectYmw('year')" :class="{'selected':ymw=='year'}">年</li>
  </ul>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class StatisticsDate extends Vue {
  ymw: string = "week";
  selectYmw(ymw: string) {
    if (this.ymw !== ymw) {
      this.ymw = ymw;
      this.$emit("selectYmw", ymw);
    }
  }
}
</script>

<style lang='scss' scoped>
ul {
  border: 2px solid #000;
  border-radius: 8px;
  position: fixed;
  top: 55px;
  left: 15vw;
  right: 15vw;
  height: 30px;
  line-height: 30px;
  display: flex;
  width: 70vw;
  > li {
    flex: 1;
    text-align: center;
  }
  > .selected {
    color: #fff;
    background-color: #000;
  }
  > .middle-li {
    border-left: 2px solid #000;
    border-right: 2px solid #000;
  }
}
</style>
