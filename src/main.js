import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 路由守卫
import "@/router/guard";
// 地图插件
import "./utils/amap";
// element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
