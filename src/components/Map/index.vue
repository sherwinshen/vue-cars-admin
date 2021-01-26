<template>
  <div :style="{ height: height }">
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
  name: "AMap",
  data() {
    return {
      map: null,
      zoom: 12,
      center: [116.404765, 39.918052]
    };
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: String,
      default: "100px"
    }
  },
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.mapCreate();
      this.map.on("click", e => {
        const lnglat = amapGetLngLat(e);
        this.$emit("lnglat", lnglat); // 子组件调父组件的方法
        this.setMarker(lnglat);
      });
    });
  },
  methods: {
    // 创建地图实例
    mapCreate() {
      // eslint-disable-next-line no-undef
      this.map = new AMap.Map("amapVue", {
        center: [116.404765, 39.918052],
        zoom: this.zoom
      });
      this.map.on("complete", () => {
        if (this.options.mapLoad) {
          this.$emit("callback", {
            funcName: "mapLoad"
          });
        }
      });
    },
    // 设置定位
    setMapCenter(value) {
      amapAddressSetMapCenter(value, this.map);
    },
    // 设置覆盖物
    setMarker(value) {
      amapSetMarker(value, this.map);
    },
    // 清除覆盖物
    clearMarker() {
      amapClearMarker(this.map);
    },
    // 销毁地图实例
    mapDestroy() {
      this.map && this.map.destroy();
    }
  }
};
</script>

<style lang="scss" scoped></style>
