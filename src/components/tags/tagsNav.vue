<template>
  <header>
    <div class="back" @click="back">
      <Icon name="back" />
    </div>
    <span>添加支出类别</span>
    <span class="complete" :class="{'complete-clicked':clicked}" @click="complete">完成</span>
  </header>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class tagsNav extends Vue {
  @Prop() selectedTag!: Tag;
  clicked: boolean = false;
  back() {
    this.$router.push("/add");
  }
  complete() {
    this.clicked = !this.clicked;
    this.$store.commit("createTag", this.selectedTag);
  }
}
</script>

<style lang='scss' scoped>
header {
  background: #fff;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  .back {
    width: 18px;
    height: 18px;
  }
  .complete {
    font-size: 16px;
    margin: auto 0;
    &-clicked {
      color: #ccc;
    }
  }
}
</style>
