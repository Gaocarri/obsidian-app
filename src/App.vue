<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // 初始化六个标签
    if (window.localStorage.getItem("tagList") == null) {
      this.$store.commit("createTag", { name: "餐饮", id: 1 });
      this.$store.commit("createTag", { name: "购物", id: 7 });
      this.$store.commit("createTag", { name: "交通", id: 14 });
      this.$store.commit("createTag", { name: "居住", id: 21 });
      this.$store.commit("createTag", { name: "娱乐", id: 25 });
      this.$store.commit("createTag", { name: "医疗", id: 30 });
    }
  }
};
</script>>

<style lang="scss">
@import "~@/assets/style/reset.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  font-family: $font-hei;
  font-size: 16px;
}
</style>


