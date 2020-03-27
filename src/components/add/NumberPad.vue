<template>
  <div class="number-pad">
    <header>
      <label name="notes" class="notes">
        备注：
        <input type="text" name="notes" placeholder="写点备注吧~" v-model="notes" />
      </label>
      <div class="output">金额：{{output}}</div>
    </header>
    <div class="buttons">
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="remove">清空</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button class="ok" @click="ok">OK</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent">0</button>
      <button @click="back">
        <Icon name="delete" />
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NotePad extends Vue {
  notes: string = "";
  output: string = "0";
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement; // TS强制指定类型
    const input = button.textContent!;
    if (this.output.length === 16) return;
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      const temp = this.output.split("+");
      if (temp[temp.length - 1].indexOf(".") >= 0) {
        return;
      }
    }

    this.output += input;
  }
  back() {
    this.output = this.output.substring(0, this.output.length - 1);
    if (this.output.length === 0) {
      this.output = "0";
    }
  }
  remove() {
    this.output = "0";
  }
  ok() {
    const addArray = this.output.split("+");
    this.output = "0";
    for (let i = 0; i < addArray.length; i++) {
      if (addArray[i] === "") return;
      this.output = (
        parseFloat(this.output) + parseFloat(addArray[i])
      ).toString();
    }

    this.$emit("createRecord", this.output, this.notes);
    this.notes = "";
    this.output = "0";
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/reset.scss";

.number-pad {
  background: #fff;
  header {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    height: 40px;
    position: relative;
    .notes {
      flex: 1;
      border-top: 1px solid #eee;
      padding: 6px;
      white-space: nowrap;
      input {
        background: none;
        outline: none;
        border: 0px;
        width: 25vw;
        color: #bbb;
      }
    }
    .output {
      padding: 6px;
      border-top: 1px solid #eee;
      flex: 1;
      white-space: nowrap;
      overflow: auto;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
    }
    &::after {
      content: "";
      display: block;
      height: 40px;
      width: 40px;
      border-left: 1px solid #eee;
      position: absolute;
      left: 50%;
    }
  }
  .buttons {
    @extend %clearFix;
    font-size: 20px;
    button {
      float: left;
      width: 25%;
      height: 54px;
      background-color: transparent;
      border: none;
      &.ok {
        height: 54 * 2px;
        float: right;
      }
      &:nth-child(1),
      &:nth-child(5),
      &:nth-child(9),
      &:nth-child(13) {
        border: 1px solid #eee;
        border-left: none;
        border-bottom: none;
      }
      &:nth-child(2),
      &:nth-child(6),
      &:nth-child(10),
      &:nth-child(14) {
        border-top: 1px solid #eee;
      }
      &:nth-child(3),
      &:nth-child(7),
      &:nth-child(11),
      &:nth-child(15) {
        border: 1px solid #eee;
        border-bottom: none;
      }
      &:nth-child(4),
      &:nth-child(8),
      &:nth-child(12) {
        border-top: 1px solid #eee;
      }
      &.ok {
        background: #323232;
        color: #fbfbfb;
      }
    }
  }
}
</style>