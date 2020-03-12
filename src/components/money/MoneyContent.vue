<template>
  <div>
    <div class="icon-wrapper">
      <Icon name="nodata" class="nodata" />
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class MoneyContent extends Vue {}
</script>

<style lang='scss' scoped>
.icon-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 16vh;
  .nodata {
    width: 40px;
    height: 40px;
    color: #ccc;
    margin-bottom: 4px;
  }

  span {
    color: #999;
  }
}
</style>
