<template>
  <div class="map-wrap">
    <el-amap :vid="'amapVue'" :center="center" :zoom="zoom"></el-amap>
  </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from "vue-amap";

export default {
  name: "Map",
  data() {
    return {
      map: null,
      zoom: 13,
      center: [116.404765, 39.918052]
    };
  },
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      // eslint-disable-next-line no-undef
      this.map = new AMap.Map("amapVue", {
        center: [116.404765, 39.918052],
        zoom: this.zoom
      });
    });
  }
};
</script>

<style scoped lang="scss">
.map-wrap {
  width: 100%;
  height: 100%;
}
</style>
