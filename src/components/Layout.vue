<template>
  <div class="layout-wrapper">
    <div class="content">
      <slot />
    </div>
    <Nav class="nav" />
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Nav from "@/components/Nav.vue";

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
  min-height: 100vh;
  > .content {
    overflow: auto;
    flex: 1;
  }
}
</style>
