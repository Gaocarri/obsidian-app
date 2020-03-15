<template>
  <div>
    <Tags-nav />
    <Tag-selected :selectedTag="selectedTag"></Tag-selected>
    <ul class="icons">
      <li v-for="tag in foodList" :key="tag.id">
        <Icon class="icon" :name="tag.name" @click.native="selectTag(tag)" />
        <span>{{tag.name}}</span>
      </li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
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


<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { foodList } from "@/constants/tagList";

import TagsNav from "@/components/tags/tagsNav.vue";
import TagSelected from "@/components/tags/TagSelected.vue";

@Component({
  components: {
    TagsNav,
    TagSelected
  }
})
export default class Tags extends Vue {
  selectedTag: Tag = {
    name: "餐饮",
    id: 1
  };

  foodList = foodList;

  selectTag(tag: Tag) {
    this.selectedTag.name = tag.name;
    this.selectedTag.id = tag.id;
  }
}
</script>

