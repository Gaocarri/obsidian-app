<template>
  <div class="tags">
    <Tags-nav />
    <Tag-selected :selectedTag="selectedTag"></Tag-selected>
    <!-- 餐饮 -->
    <Tag-list :tagList="foodList" @selectTag="selectTag" :selectedTag="selectedTag" />
    <!-- 购物 -->
    <Tag-list :tagList="shopList" @selectTag="selectTag" :selectedTag="selectedTag" />
    <!-- 交通 -->
    <Tag-list :tagList="trafficList" @selectTag="selectTag" :selectedTag="selectedTag" />
    <!-- 居住 -->
    <Tag-list :tagList="resideList" @selectTag="selectTag" :selectedTag="selectedTag" />
    <!-- 娱乐 -->
    <Tag-list :tagList="entertainmentList" @selectTag="selectTag" :selectedTag="selectedTag" />
    <!-- 医疗 -->
    <Tag-list :tagList="medicalList" @selectTag="selectTag" :selectedTag="selectedTag" />
  </div>
</template>

<style lang='scss' scoped>
</style>


<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import {
  foodList,
  shopList,
  trafficList,
  resideList,
  entertainmentList,
  medicalList
} from "@/constants/tagList";

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
  shopList = shopList;
  trafficList = trafficList;
  resideList = resideList;
  medicalList = medicalList;
  entertainmentList = entertainmentList;
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

