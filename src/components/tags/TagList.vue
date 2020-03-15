<template>
  <div class="tag-list">
    <header>{{tagList[0].name}}</header>
    <ul class="icons">
      <li v-for="tag in tagList" :key="tag.id">
        <Icon class="icon" :name="tag.name" @click.native="selectTag(tag)" />
        <span>{{tag.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class TagList extends Vue {
  @Prop() readonly tagList!: Tag[];

  selectTag(tag: Tag) {
    this.$emit("selectTag", tag);
  }
}
</script>

<style lang='scss' scoped>
.tag-List {
  margin-bottom: 10px;
}

header {
  color: #bbb;
  font-size: 18px;
  width: 100vw;
  text-align: center;
  margin-bottom: 6px;
}

.icons {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 25%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      background: #ddd;
      color: #000;
      width: 50px;
      height: 50px;
      padding: 10px;
      border-radius: 50%;
      margin-bottom: 4px;
    }
    span {
      font-size: 14px;
    }
  }
}
</style>
