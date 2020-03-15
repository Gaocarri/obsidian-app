<template>
  <div>
    <Layout>
      <Tab-bar class="tab-bar" />
      <Scroll class="content">
        <ul>
          <li>x</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>x</li>
        </ul>
      </Scroll>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Scroll from "@/components/common/Scroll.vue";
import TabBar from "@/components/common/TabBar.vue";

@Component({
  components: {
    Scroll,
    TabBar
  }
})
export default class Statistics extends Vue {}
</script>

<style lang='scss' scoped>
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.content {
  position: absolute;
  top: 50px;
  bottom: 54px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
