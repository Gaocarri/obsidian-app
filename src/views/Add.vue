<template>
  <div>
    <tab-bar>
      <Icon name="back" @click.native="back" />
    </tab-bar>
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
export default class Add extends Vue {
  back() {
    this.$router.push("/money");
  }
}
</script>

<style lang='scss' scoped>
</style>
