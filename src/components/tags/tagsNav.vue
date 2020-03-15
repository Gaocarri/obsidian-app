<template>
  <header>
    <div class="back">
      <Icon name="back" />
    </div>
    <span>添加支出类别</span>
    <span>完成</span>
  </header>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class tagsNav extends Vue {}
</script>

<style lang='scss' scoped>
header {
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  margin: 10px;
  .back {
    vertical-align: center;
    width: 18px;
    height: 18px;
  }
}
</style>
