<template>
  <div class="layout-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav class="nav" />
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Nav from "@/components/common/Nav.vue";

@Component({
  components: {
    Nav
  }
})
export default class Layout extends Vue {}
</script>

<style lang='scss' scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
  > .content {
    overflow: auto;
    flex: 1;
  }
}
</style>
