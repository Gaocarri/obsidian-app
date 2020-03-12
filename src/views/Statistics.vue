<template>
  <div>
    <Layout>
      <Tab-bar />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import TabBar from "@/components/common/TabBar.vue";

@Component({
  components: {
    TabBar
  }
})
export default class Statistics extends Vue {}
</script>

<style lang='scss' scoped>
</style>
