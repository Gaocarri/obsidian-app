<template>
  <div>
    <Tags-nav />
    <Tag-selected :selectedTag="selectedTag"></Tag-selected>
    <Tag-list :tagList="foodList" @selectTag="selectTag" :selectedTag="selectedTag"></Tag-list>
  </div>
</template>

<style lang='scss' scoped>
</style>


<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { foodList } from "@/constants/tagList";

import TagsNav from "@/components/tags/tagsNav.vue";
import TagSelected from "@/components/tags/TagSelected.vue";
import TagList from "@/components/tags/TagList.vue";

@Component({
  components: {
    TagsNav,
    TagSelected,
    TagList
  }
})
export default class Tags extends Vue {
  foodList = foodList;

  selectedTag: Tag = {
    name: "餐饮",
    id: 1
  };

  selectTag(tag: Tag) {
    this.selectedTag.name = tag.name;
    this.selectedTag.id = tag.id;
  }
}
</script>

