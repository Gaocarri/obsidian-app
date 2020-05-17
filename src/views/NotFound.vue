<template>
  <div class="content">
    <div class="not-found">当前页面不存在，请检查网址是否正确</div>
    <div class="return">
      <router-link to="/">返回黑曜石记账</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

export default class NotFound extends Vue {}
</script>

<style lang="scss" scoped>
.content {
  margin: 240px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .not-found {
    margin-bottom: 20px;
    font-size: 20px;
  }
  .return {
    border: 1px solid #ccc;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 18px;
    padding: 5px;
    border-radius: 8%;
  }
}
</style>