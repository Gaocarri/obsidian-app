<template>
  <div class="add">
    <tab-bar class="tab-bar" @selectType="selectType">
      <template v-slot:icon>
        <Icon name="back" @click.native="back" />
      </template>
      <template v-slot:delete>
        <span @click="deleteTag" :class="{'button-selected':buttonSelected}" v-if="type==='-'">删除标签</span>
      </template>
    </tab-bar>

    <Scroll class="content">
      <Tag-table :tagList="tagList" :selectedId="selectedId" :type="type" @selectIcon="selectIcon" />
    </Scroll>

    <div class="number-pad">
      <NumberPad :type="type" @createRecord="createRecord" />
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
import TagTable from "@/components/add/TagTable.vue";

@Component({
  components: {
    Scroll,
    TabBar,
    NumberPad,
    TagTable
  }
})
export default class Add extends Vue {
  selectedId: number = 0;
  type: string = "-";
  buttonSelected: boolean = false;
  record: RecordItem = {
    tag: {},
    notes: "",
    type: "-",
    amount: 0,
    numberId: "0"
  };

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
    if (this.$store.state.tagList.length == 0) return;
    this.buttonSelected = !this.buttonSelected;
    window.setTimeout(() => {
      this.buttonSelected = !this.buttonSelected;
    }, 200);
    this.$store.commit("deleteTag", this.selectedId);
    this.$toast.show(this.$store.state.toastMessage);
  }

  // 选中标签
  selectIcon(id: number) {
    this.selectedId = id;
  }

  // 存储数据
  createRecord(value1: string, value2: string) {
    if (value1 === "0") {
      this.$toast.show(`金额不能为0`);
      return;
    }
    this.record.amount = parseFloat(value1);
    this.record.notes = value2;
    this.record.type = this.type;
    this.record.tag = this.tagList.filter((item: Tag) => {
      return item.id === this.selectedId;
    })[0];
    const typeString = this.type === "-" ? "支出" : "收入";
    this.$toast.show(`已添加${typeString}${value1}元`);
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang='scss' scoped>
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  .button-selected {
    color: #ccc;
  }
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
