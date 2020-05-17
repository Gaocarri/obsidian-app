<template>
  <header>
    <div class="back" @click="back">
      <Icon name="back" />
    </div>
    <span>详情</span>
  </header>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class editLabelTab extends Vue {
  back() {
    this.$router.go(-1);
  }
}
</script>

<style lang='scss' scoped>
header {
  background: #fff;
  font-size: 20px;
  text-align: center;
  display: flex;
  padding: 10px 10px 10px 20px;
  margin-bottom: 14px;
  height: 50px;
  .back {
    width: 18px;
    height: 18px;
    margin-right: 40px;
  }
}
</style>
