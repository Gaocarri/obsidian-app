<template>
  <nav>
    <router-link to="/money" class="item">
      <Icon name="money-selected" class="icon" v-show="moneyIsActive" />
      <Icon name="money" class="icon" v-show="!moneyIsActive" />
      <span>明细</span>
    </router-link>
    <router-link to="/add" class="item">
      <Icon name="add" class="add" />
    </router-link>
    <router-link to="/statistics" class="item">
      <Icon name="statistics-selected" class="icon" v-show="statisticsIsActive" />
      <Icon name="statistics" class="icon" v-show="!statisticsIsActive" />
      <span>统计</span>
    </router-link>
  </nav>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Nav extends Vue {
  get moneyIsActive() {
    return this.$route.path.indexOf("money") !== -1;
  }
  get statisticsIsActive() {
    return this.$route.path.indexOf("statistics") !== -1;
  }
}
</script>

<style lang='scss' scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 0.5px solid #bbb;
  padding: 6px 0;
  display: flex;
  font-size: 12px;
  > .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > .icon {
      width: 24px;
      height: 24px;
      padding-bottom: 2px;
      &.add {
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>
