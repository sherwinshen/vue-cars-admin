<template>
  <el-dialog
    :title="data.parkingName"
    :visible.sync="flagVisible"
    width="50%"
    @opened="handleOpened"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <div style="height: 500px">
      <a-map ref="aMap"></a-map>
    </div>
  </el-dialog>
</template>

<script>
import AMap from "@/components/Map";

export default {
  name: "MapDialog",
  components: {
    AMap
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      flagVisible: false
    };
  },
  watch: {
    dialogVisible: {
      handler(newValue) {
        this.flagVisible = newValue;
      }
    }
  },
  methods: {
    handleOpened() {
      this.$refs.aMap.mapCreate();
      // 调DOM元素的方法时，要确保DOM元素已被加载完成
      this.$nextTick(() => {
        // DOM元素渲染完成后执行
        const splitLnglat = this.data.lnglat.split(",");
        const lnglat = {
          lng: splitLnglat[0],
          lat: splitLnglat[1]
        };
        this.$refs.aMap.setMarker(lnglat);
      });
    },
    handleClose() {
      this.$refs.aMap.mapDestroy();
      this.$emit("update:dialogVisible", false);
    }
  }
};
</script>

<style lang="scss" scoped></style>
