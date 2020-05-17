<template>
  <div class="edit-label">
    <main>
      <div class="tab">
        <edit-label-tab />
      </div>
      <div class="content">
        <edit-label-content />
      </div>
    </main>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import EditLabelTab from "@/components/editLabel/EditLabelTab.vue";
import EditLabelContent from "@/components/editLabel/EditLabelContent.vue";

@Component({
  components: {
    EditLabelTab,
    EditLabelContent
  }
})
export default class EditLabel extends Vue {}
</script>

<style lang='scss' scoped>
.edit-label {
  display: flex;
  flex-direction: column;
  overflow: auto;
  background: #eee;
  .content {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
  }
}
</style>
