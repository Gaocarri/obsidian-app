<template>
  <div class="tags">
    <div class="head">
      <Tags-nav :selectedTag="selectedTag" />
      <Tag-selected :selectedTag="selectedTag" />
    </div>

    <!-- 餐饮 -->
    <Scroll class="content">
      <Tag-list
        :tagList="foodList"
        @selectTag="selectTag"
        :selectedTag="selectedTag"
        class="first-list"
      />
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
    </Scroll>
  </div>
</template>

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

import Scroll from "@/components/common/Scroll.vue";

import TagsNav from "@/components/tags/TagsNav.vue";
import TagSelected from "@/components/tags/TagSelected.vue";
import TagList from "@/components/tags/TagList.vue";

@Component({
  components: {
    Scroll,
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

  created() {
    this.$store.commit("fetchTags");
  }
  // 选择标签
  selectTag(tag: Tag) {
    this.selectedTag = tag;
  }
}
</script>

<style lang='scss' scoped>
.tags {
  .head {
    position: fixed;
    left: auto;
    margin: auto;
    top: 0;
  }
  .content {
    position: absolute;
    top: 120px;
    bottom: 0;
    overflow: hidden;
  }
  .first-list ::v-deep header {
    padding-top: 20px;
  }
}
</style>