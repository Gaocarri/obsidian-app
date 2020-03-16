<template>
  <ul class="tags-table">
    <li v-for="tag in tagList" :key="tag.id" class="tag-item">
      <Icon
        :name="tag.name"
        class="icon"
        :class="{'selected':tag.id===selectedId}"
        @click.native="selectIcon(tag.id)"
      />
      <span>{{tag.name}}</span>
    </li>
    <li class="tag-item">
      <Icon name="添加" class="icon" @click.native="add" />
      <span>添加</span>
    </li>
  </ul>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class TagsTable extends Vue {
  @Prop() tagList?: Tag[];
  @Prop() selectedId!: number;

  // 选中标签
  selectIcon(id: number) {
    this.$emit("selectIcon", id);
  }
  // 进入tags页面
  add() {
    this.$router.push("/tags");
  }
}
</script>

<style lang='scss' scoped>
.tags-table {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  font-size: 14px;
  .tag-item {
    width: 25vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      background: #ddd;
      color: #000;
      width: 60px;
      height: 60px;
      padding: 10px;
      border-radius: 50%;
      margin-bottom: 4px;
      &.selected {
        color: #fff;
        background: #000;
      }
    }
  }
}
</style>
