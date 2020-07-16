<template>
  <div id="app">
    <div id="qrcode" v-if="showQrCode">
      <img src="./assets/qrcode-money.png" />
      <div>请打开手机浏览器扫描二维码或打开调试模式模拟手机并刷新，以保证浏览效果</div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showQrCode: false
    };
  },
  mounted() {
    if (document.documentElement.clientWidth > 500) {
      this.showQrCode = true;
    }
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

#qrcode {
  z-index: 10;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 30px;
}
</style>


