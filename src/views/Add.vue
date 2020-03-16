<template>
  <div class="add">
    <tab-bar class="tab-bar" @selectType="selectType">
      <template v-slot:icon>
        <Icon name="back" @click.native="back" />
      </template>
      <template v-slot:delete>
        <span @click="deleteTag" v-if="type==='-'">删除标签</span>
      </template>
    </tab-bar>

    <Scroll class="content">
      <Income-list
        :tagList="tagList"
        :selectedId="selectedId"
        :type="type"
        @selectIcon="selectIcon"
      />
    </Scroll>

    <div class="number-pad">
      <NumberPad />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { expendList } from "@/constants/tagList";

import Scroll from "@/components/common/Scroll.vue";
import TabBar from "@/components/common/TabBar.vue";
import NumberPad from "@/components/add/NumberPad.vue";
import IncomeList from "@/components/add/IncomeList.vue";

@Component({
  components: {
    Scroll,
    TabBar,
    NumberPad,
    IncomeList
  }
})
export default class Add extends Vue {
  selectedId: number = 0;
  type: string = "-";

  get tagList() {
    if (this.type === "-") {
      return this.$store.state.tagList;
    } else if (this.type === "+") {
      return expendList;
    }
  }

  @Watch("tagList")
  onTagListChanged(newVal: Tag) {
    this.selectedId = this.tagList[0] ? this.tagList[0].id : 0;
  }

  back() {
    this.$router.push("/money");
  }
  created() {
    this.$store.commit("fetchTags");
  }

  //选择收入或者支出
  selectType(type: string) {
    this.type = type;
  }
  // 删除标签
  deleteTag() {
    this.$store.commit("deleteTag", this.selectedId);
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
