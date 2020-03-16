<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Toast extends Vue {
  message: string = "";
  isShow: boolean = false;

  show(message: string, duration = 1500) {
    this.isShow = true;
    this.message = message;
    setTimeout(() => {
      this.isShow = false;
      this.message = "";
    }, duration);
  }
}
</script>

<style lang='scss' scoped>
.toast {
  white-space: nowrap;
  border-radius: 20%/100%;
  padding: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9999;
}
</style>
