<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import BScroll from "better-scroll";

@Component
export default class Scroll extends Vue {
  scroll: any;
  mounted() {
    {
      // 创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper as any, {
        click: true
      });
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
