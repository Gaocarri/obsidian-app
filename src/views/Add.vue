<template>
  <div class="add">
    <tab-bar class="tab-bar">
      <template v-slot:icon>
        <Icon name="back" @click.native="back" />
      </template>
      <template v-slot:delete>
        <span @click="deleteTag">删除标签</span>
      </template>
    </tab-bar>
    <Scroll class="content">
      <Tags-table :tagList="tagList" :selectedId.sync="selectedId" @selectIcon="selectIcon" />
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
import TagsTable from "@/components/add/TagsTable.vue";

@Component({
  components: {
    Scroll,
    TabBar,
    NumberPad,
    TagsTable
  }
})
export default class Add extends Vue {
  tagList: Tag[] = [];
  selectedId: number = 0;

  back() {
    this.$router.push("/money");
  }
  created() {
    this.$store.commit("fetchTags");
    this.tagList = this.$store.state.tagList;
    this.selectedId = this.tagList[0].id || 0;
  }
  mounted() {}
  // 删除标签
  deleteTag() {
    this.$store.commit("deleteTag", this.selectedId);
    this.tagList = this.$store.state.tagList;
    this.selectedId = this.tagList[0].id || 0;
  }

  // 选中标签
  selectIcon(id: number) {
    this.selectedId = id;
  }
}
</script>

<style lang='scss' scoped>
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
