<template>
  <div>
    <Layout>
      <money-head></money-head>
      <money-today></money-today>
      <money-content></money-content>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import MoneyHead from "@/components/money/MoneyHead.vue";
import MoneyToday from "@/components/money/MoneyToday.vue";
import MoneyContent from "@/components/money/MoneyContent.vue";

@Component({
  components: {
    MoneyHead,
    MoneyToday,
    MoneyContent
  }
})
export default class Money extends Vue {}
</script>

<style lang='scss' scoped>
</style>
