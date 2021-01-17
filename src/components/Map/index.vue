<template>
  <div class="map-wrap">
    <el-amap :vid="'amapVue'" :center="center" :zoom="zoom"></el-amap>
  </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from "vue-amap";
import {
  amapGetLngLat,
  amapAddressSetMapCenter,
  amapSetMarker,
  amapClearMarker
} from "@/components/Map/map";

export default {
  name: "Map",
  data() {
    return {
      map: null,
      zoom: 10,
      center: [116.404765, 39.918052]
    };
  },
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.mapCreate();
    });
  },
  methods: {
    mapCreate() {
      // eslint-disable-next-line no-undef
      this.map = new AMap.Map("amapVue", {
        center: [116.404765, 39.918052],
        zoom: this.zoom
      });
      this.map.on("click", e => {
        const lnglat = amapGetLngLat(e);
        this.$emit("lnglat", lnglat); // 子组件调父组件的方法
        this.setMarker(lnglat);
      });
    },
    setMapCenter(value) {
      amapAddressSetMapCenter(value, this.map);
    },
    setMarker(value) {
      amapSetMarker(value, this.map);
    },
    clearMarker() {
      amapClearMarker(this.map);
    },
    mapDestroy() {
      this.map && this.map.destroy();
    }
  }
};
</script>

<style scoped lang="scss">
.map-wrap {
  width: 100%;
  height: 100%;
}
</style>
