<template>
  <div class="wrapper">
    <ul class="content">
      <li class="first-li">
        <div>
          <Icon class="icon" :name="recordItem.tag.name" />
          <span>{{recordItem.tag.name}}</span>
        </div>
        <div>
          <input type="text" v-model.number.trim="recordItem.amount" />
        </div>
      </li>
      <li class="second-li">
        <span>收支类型</span>
        <span>{{revenue}}</span>
      </li>
      <li class="third-li">
        <span>日期</span>
        <span>{{date}}</span>
      </li>
      <li class="fouth-li">
        <span>备注</span>
        <div>
          <input type="text" v-model="recordItem.notes" />
        </div>
      </li>
    </ul>
    <div class="bottom">
      <span @click="editRecord()" class="bottom-left">编辑完成</span>
      <span @click="deleteRecord()" class="bottom-right">删除记录</span>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

import dayjs from "dayjs";

@Component
export default class editLabelContent extends Vue {
  recordItem?: RecordItem;
  get revenue() {
    return this.recordItem!.type == "+" ? "收入" : "支出";
  }
  get date() {
    const createdAt = dayjs(this.recordItem?.createdAt);
    return (
      createdAt.year() +
      "年" +
      (createdAt.month() + 1) +
      "月" +
      createdAt.date() +
      "日"
    );
  }
  created() {
    this.$store.commit("fetchRecords");
    this.recordItem = this.$store.state.recordList.filter(
      (item: RecordItem) => {
        return item.numberId == this.$route.params.number;
      }
    )[0];
  }
  editRecord() {
    if (this.recordItem!.amount > 0) {
      this.$store.commit("editRecord", this.recordItem);
      this.$store.commit("updateToastMessage", "编辑已完成");
      this.$toast.show(this.$store.state.toastMessage);
    } else {
      this.$store.commit("updateToastMessage", "请输入大于0的数");
      this.$toast.show(this.$store.state.toastMessage);
    }
  }
  deleteRecord() {
    this.$store.commit("deleteRecord", this.$route.params.number);
    this.$store.commit("updateToastMessage", "记录已删除");
    this.$toast.show(this.$store.state.toastMessage);
    this.$router.push("/money");
  }
}
</script>

<style lang='scss' scoped>
input {
  text-align: right;
  background: none;
  outline: none;
  border: 0px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 140px);
  background-color: #eee;
  .content {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .first-li {
      border-bottom: 1px solid #ccc;
      line-height: 100%;
      padding-bottom: 10px;
      align-items: center;
      .icon {
        width: 40px;
        height: 40px;
        padding: 10px;
        background-color: #000;
        color: white;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 14px;
      }
    }
    .second-li,
    .third-li,
    .fouth-li {
      padding: 10px;
    }
  }
  .bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    padding: 10px 0;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    &-left {
      width: 50%;
      border-right: 0.5px solid #eee;
    }
    &-right {
      width: 50%;
      border-left: 0.5px solid #eee;
    }
  }
}
</style>
