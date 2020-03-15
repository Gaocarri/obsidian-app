<template>
  <div class="selected-tag">
    <div class="chosed-tag">
      <span>已选标签：</span>
      <Icon class="selected-icon" :name="selectedTag" />
    </div>
    <span>{{selectedTag}}</span>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class TagSelected extends Vue {
  @Prop({ default: "餐饮", type: String }) selectedTag?: string;
}
</script>

<style lang='scss' scoped>
.selected-tag {
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  .chosed-tag {
    display: flex;
    align-items: center;
    .selected-icon {
      margin-left: 10px;
      padding: 10px;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background: #ddd;
      color: #000;
    }
  }
}
</style>
