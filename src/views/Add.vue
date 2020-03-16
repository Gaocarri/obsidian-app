<template>
  <div class="add">
    <tab-bar class="tab-bar">
      <Icon name="back" @click.native="back" />
    </tab-bar>
    <Scroll class="content">
      <ul class="tag-list">
        <li v-for="tag in tagList" :key="tag.id" class="tag-item">
          <Icon :name="tag.name" class="icon" />
          <span>{{tag.name}}</span>
        </li>
        <li class="tag-item">
          <Icon name="添加" class="icon" @click.native="add" />
          <span>添加</span>
        </li>
      </ul>
    </Scroll>
    <div class="number-pad">
      <NumberPad />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Scroll from "@/components/common/Scroll.vue";
import TabBar from "@/components/common/TabBar.vue";
import NumberPad from "@/components/add/NumberPad.vue";

@Component({
  components: {
    Scroll,
    TabBar,
    NumberPad
  }
})
export default class Add extends Vue {
  tagList: Tag[] = [];

  back() {
    this.$router.push("/money");
  }
  created() {
    this.$store.commit("fetchTags");
    this.tagList = this.$store.state.tagList;
    console.log(this.tagList);
  }
  // 进入tags页面
  add() {
    this.$router.push("/tags");
  }
}
</script>

<style lang='scss' scoped>
.tag-list {
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

.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 270px;
  overflow: hidden;
}

.number-pad {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
