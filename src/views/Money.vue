<template>
  <div>
    <Layout>
      <money-head></money-head>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import MoneyHead from "@/components/money/MoneyHead.vue";

@Component({
  components: {
    MoneyHead
  }
})
export default class Money extends Vue {}
</script>

<style lang='scss' scoped>
</style>
