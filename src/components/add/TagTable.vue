<template>
  <ul class="tags-table">
    <li v-for="(tag,index) in tagList" :key="index" class="tag-item">
      <Icon
        :name="tag.name"
        class="icon"
        :class="{'selected':tag.id===selectedId}"
        @click.native="selectIcon(tag.id)"
      />
      <span>{{tag.name}}</span>
    </li>
    <li class="tag-item" v-if="type=='-'">
      <Icon name="添加" class="icon" @click.native="add" />
      <span>添加</span>
    </li>
  </ul>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class TagTable extends Vue {
  @Prop() tagList?: Tag[];
  @Prop() selectedId!: number;
  @Prop({ default: "-" }) type?: string;

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
      width: 50px;
      height: 50px;
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
