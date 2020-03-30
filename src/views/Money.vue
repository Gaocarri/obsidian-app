<template>
  <div>
    <Layout>
      <div class="head">
        <money-head />
        <money-list />
      </div>

      <Scroll class="content">
        <money-content />
      </Scroll>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Scroll from "@/components/common/Scroll.vue";

import MoneyHead from "@/components/money/MoneyHead.vue";
import MoneyList from "@/components/money/MoneyList.vue";
import MoneyContent from "@/components/money/MoneyContent.vue";

@Component({
  components: {
    Scroll,
    MoneyHead,
    MoneyList,
    MoneyContent
  }
})
export default class Money extends Vue {}
</script>

<style lang='scss' scoped>
.head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.content {
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 210px;
  bottom: 54px;
}
</style>
