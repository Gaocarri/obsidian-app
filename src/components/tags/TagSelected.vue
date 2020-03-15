<template>
  <div class="selected-tag">
    <div class="chosed-tag">
      <span>已选标签：</span>
      <Icon class="selected-icon" :name="selectedTag.name" />
    </div>
    <span>{{selectedTag.name}}</span>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class TagSelected extends Vue {
  @Prop({ default: { name: "餐饮", id: 1 }, type: Object }) selectedTag?: Tag;
}
</script>

<style lang='scss' scoped>
.selected-tag {
  background: #fff;
  width: 100vw;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #bbb;
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
