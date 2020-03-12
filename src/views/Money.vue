<template>
  <div>
    <Layout>
      <money-head></money-head>
      <money-today></money-today>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import MoneyHead from "@/components/money/MoneyHead.vue";
import MoneyToday from "@/components/money/MoneyToday.vue";

@Component({
  components: {
    MoneyHead,
    MoneyToday
  }
})
export default class Money extends Vue {}
</script>

<style lang='scss' scoped>
</style>
