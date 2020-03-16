<template>
  <div class="number-pad">
    <header>
      <label name="notes" class="notes">
        备注：
        <input type="text" name="notes" placeholder="写点备注吧~" />
      </label>
      <div class="output">金额：???</div>
    </header>
    <div class="buttons">
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="increment">-</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="add">+</button>
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
import { Component } from "vue-property-decorator";

@Component
export default class NotePad extends Vue {
  inputContent() {}
  back() {}
  add() {}
  increment() {}
  ok() {}
}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/reset.scss";

.number-pad {
  background: #fff;
  header {
    display: flex;
    justify-content: space-between;
    .notes {
      flex: 1;
      border-top: 1px solid #eee;
      padding: 6px;
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
      border-left: 1px solid #eee;
      flex: 1;
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