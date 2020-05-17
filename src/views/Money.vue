<template>
  <div>
    <Layout>
      <div class="head">
        <money-head />
      </div>

      <Scroll class="content" ref="scroll">
        <money-list v-if="length>0" />
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

import dayjs from "dayjs";

@Component({
  components: {
    Scroll,
    MoneyHead,
    MoneyList,
    MoneyBlank
  }
})
export default class Money extends Vue {
  created() {
    this.$store.commit("fetchRecords");
    this.$store.commit("editYear", dayjs().year());
    this.$store.commit("editMonth", dayjs().month() + 1);
  }
  get length() {
    return this.$store.state.recordList.filter((item: RecordItem) => {
      return (
        dayjs(item.createdAt).year() == this.$store.state.currentYear &&
        dayjs(item.createdAt).month() + 1 == this.$store.state.currentMonth
      );
    }).length;
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
