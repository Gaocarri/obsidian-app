<template>
  <header>
    <div class="back" @click="back">
      <Icon name="back" />
    </div>
    <span>添加支出类别</span>
    <span class="complete" :class="{'complete-clicked':clicked}" @click="complete">完成</span>
  </header>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class tagsNav extends Vue {
  clicked: boolean = false;
  back() {
    this.$router.push("/add");
  }
  complete() {
    this.clicked = !this.clicked;
  }
}
</script>

<style lang='scss' scoped>
header {
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bbb;
  padding: 10px;
  margin-bottom: 10px;
  .back {
    vertical-align: center;
    width: 18px;
    height: 18px;
  }
  .complete {
    font-size: 16px;
    margin: auto 0;
    &-clicked {
      color: #ccc;
    }
  }
}
</style>
