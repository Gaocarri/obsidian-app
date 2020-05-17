<template>
  <div>
    <div v-for="(data,index) in dataList" :key="index">
      <header>
        <div class="date">{{data.y}}年{{data.m}}月{{data.d}}日</div>
        <div class="balance">
          <span class="balance-expend">支出:{{data.expend.toFixed(2)}}</span>
          <span>收入:{{data.include.toFixed(2)}}</span>
        </div>
      </header>
      <ul class="icons">
        <li v-for="(tag,index2) in data.tag" :key="index2">
          <div class="left">
            <Icon class="icon" :name="tag.name" />
            <span>{{tag.name}}</span>
          </div>
          <span class="right">{{parseFloat(data.money[index2]).toFixed(2)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import dayjs from "dayjs";
import obj from "../common/toast";

@Component
export default class MoneyToday extends Vue {
  mounted() {
    console.log(this.dataList);
  }

  // 数据
  get dataList() {
    let dataList = [];
    console.log(this.$store.state.recordList);
    for (let i = 0; i < this.$store.state.recordList.length; i++) {
      const data = {
        y: 0,
        m: 0,
        d: 0,
        include: 0,
        expend: 0,
        tag: [] as Tag[],
        money: [] as String[]
      };
      data.y = dayjs(this.$store.state.recordList[i].createdAt).year();
      data.m = dayjs(this.$store.state.recordList[i].createdAt).month() + 1;
      data.d = dayjs(this.$store.state.recordList[i].createdAt).date();

      // 判断日期是否为同一天
      if (i == 0) {
        // 存入tag
        data.tag.push(this.$store.state.recordList[i].tag);
        // 存入每个tag的花销
        if (this.$store.state.recordList[i].type === "+") {
          data.money.push("+" + this.$store.state.recordList[i].amount);
        } else if (this.$store.state.recordList[i].type === "-") {
          data.money.push("-" + this.$store.state.recordList[i].amount);
        }
        // 计算收入和支出
        if (this.$store.state.recordList[i].type === "+") {
          data.include = this.$store.state.recordList[i].amount;
        } else if (this.$store.state.recordList[i].type === "-") {
          data.expend = this.$store.state.recordList[i].amount;
        }
        dataList.push(data);
      } else if (
        // 日期不重复的情况
        data.y != dayjs(this.$store.state.recordList[i - 1].createdAt).year() ||
        data.m !=
          dayjs(this.$store.state.recordList[i - 1].createdAt).month() + 1 ||
        data.d != dayjs(this.$store.state.recordList[i - 1].createdAt).date()
      ) {
        // 存入tag
        data.tag.push(this.$store.state.recordList[i].tag);
        // 存入每个tag的花销
        if (this.$store.state.recordList[i].type === "+") {
          data.money.push("+" + this.$store.state.recordList[i].amount);
        } else if (this.$store.state.recordList[i].type === "-") {
          data.money.push("-" + this.$store.state.recordList[i].amount);
        }
        // 计算收入和支出
        if (this.$store.state.recordList[i].type === "+") {
          data.include = this.$store.state.recordList[i].amount;
        } else if (this.$store.state.recordList[i].type === "-") {
          data.expend = this.$store.state.recordList[i].amount;
        }
        dataList.push(data);
      } else {
        // 日期重复的情况
        const temp = dataList.pop();
        // 计算收入和支出
        data.include = temp!.include;
        data.expend = temp!.expend;
        // 存入相同日期的tag
        for (let i = 0; i < temp!.tag.length; i++) {
          data.tag.push(temp!.tag[i]);
        }
        for (let i = 0; i < temp!.money.length; i++) {
          data.money.push(temp!.money[i]);
        }
        // 存入当前tag
        data.tag.push(this.$store.state.recordList[i].tag);
        // 存入当前每个tag的花销
        if (this.$store.state.recordList[i].type === "+") {
          data.money.push("+" + this.$store.state.recordList[i].amount);
        } else if (this.$store.state.recordList[i].type === "-") {
          data.money.push("-" + this.$store.state.recordList[i].amount);
        }
        if (this.$store.state.recordList[i].type === "+") {
          data.include += this.$store.state.recordList[i].amount;
        } else if (this.$store.state.recordList[i].type === "-") {
          data.expend += this.$store.state.recordList[i].amount;
        }
        dataList.push(data);
      }
    }
    return dataList;
  }
}
</script>

<style lang='scss' scoped>
header {
  background: #eee;
  color: #999;
  font-size: 12px;
  padding: 6px 6px;
  display: flex;
  justify-content: space-between;

  .balance {
    &-expend {
      margin-right: 8px;
    }
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 10px;
  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .left {
      display: flex;
      align-items: center;
      .icon {
        border-radius: 50%;
        background: #000;
        color: #ddd;
        padding: 8px;
        width: 40px;
        height: 40px;
        margin-bottom: 10px;
        margin-right: 12px;
      }
      span {
        vertical-align: middle;
        font-size: 16px;
      }
    }
  }
}
</style>

