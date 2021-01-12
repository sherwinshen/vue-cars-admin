import Vue from "vue";
import VueAMap from "vue-amap";

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  // 高德key-官网申请
  key: "3312b315556a9313e7b5f3769f8f48ac",
  // 插件集合 （插件按需引入）
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.MarkerClusterer",
    "AMap.Geocoder"
  ],
  v: "1.4.4"
});
