<template>
  <div>
    <Layout>
      <div class="head">
        <money-head />
      </div>

      <Scroll class="content">
        <money-list v-if="recordLength>0" />
        <money-blank v-else />
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
import MoneyBlank from "@/components/money/MoneyBlank.vue";

@Component({
  components: {
    Scroll,
    MoneyHead,
    MoneyList,
    MoneyBlank
  }
})
export default class Money extends Vue {
  get recordLength() {
    return this.$store.state.recordList.length;
  }
}
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
  top: 170px;
  bottom: 54px;
}
</style>
