# Vue2.0项目-在线租车_管理系统

> 本项目为后台管理系统部分，客户端部分详见 👉 [vue-cars](https://github.com/MrEnvision/vue-cars)

教程官网：http://www.web-jshtml.cn/#/   视频地址：https://www.bilibili.com/video/BV1Gz411z75G

**学习内容**：头脑风暴分析项目，项目功能延伸思维，程序逻辑分析；高德地图基础级API学习；Vue+Vuex+Router+ElementUi+Webpack全家桶，ElementUI组件，VUE各项指令，component、props、propsData、computed，watch，组件化开发，生命周期，路由权限，Sass，Axios拦截器，缓存，项目部署，Nginx，域名，服务器，GIT，原型，接口联调，性能，缓存，检测toKen等；

**学习成效**：掌握对项目的扩展延伸思维，项目在业务上的关联性。完全自主搭建后台管理系统，高德地图API应用；



## 第1-11课时

主要为项目开发流程介绍，包含需求文档、功能分析、原型绘制、测试用例等内容。

## 第12课时

### 12.1 高德地图组件

>[vue-amap](https://elemefe.github.io/vue-amap)是基于 Vue 2.x 与[高德地图](https://lbs.amap.com/api/javascript-api/example/map/click-to-get-lnglat)的组件。

```shell
npm install vue-amap --save
```

引入vue-amap

```js
// main.js
import Vue from 'vue';
import VueAMap from 'vue-amap';
import App from './App.vue';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'your amap key', // 官网申请
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'], // 插件（按需引入）
  v: '1.4.4' // 高德 sdk 版本
});

new Vue({
  el: '#app',
  render: h => h(App)
})
```

使用vue-amap

```vue
// APP.vue
<template>
  <div id="app">
    <h3 class="title">{{ msg }}</h3>
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'vue-amap向你问好！'
    }
  }
}
</script>

<style>
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>
```

## 第13课时

### 13.1 兼容高德地图SDK

在定制化程度较高的项目中，开发者可能只想通过 vue-amap 引入高德地图，而部分实例化的操作直接基于高德地图的 sdk 完成。这个时候就需要 `lazyAMapApiLoaderInstance`。

```vue
<template>
  <div class="amap-wrapper">
    <el-amap :vid="'amapVue'" :center="center" :zoom="zoom"></el-amap>
  </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from "vue-amap";

export default {
  name: "Index",
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
        center: this.center,
        zoom: this.zoom
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.amap-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
```

## 第14课时

### 14.1 SCSS清除浮动

```scss
@mixin clearfix {
  &:after {
    clear: both;
    content: '.';
    display: block;
    height: 0;
    line-height: 0;
    overflow: hidden;
  }
  *height: 1%; // 貌似兼容IE7的意思？
}
```

```scss
.wrap {
  @include clearfix; // 使用方法
}
```

### 14.2 SCSS生成通用CSS

<img src="./noteImg/14.2.png" style="zoom:50%;" />

如上图所示的需求，会显示一格电至十格电，这个时候就可以设置一些的通用的css样式，例如active-1代表前1个格子为蓝色，active-4代表前4个格子为蓝色，这时候我们就需要利用SCSS利用代码的思维来生成10个active-i，而不是我们自己手动重复写10个css样式。

**css选择器小知识**：

> 尤其要注意:nth-child(-n+length)代表前length个元素！！！

```
:nth-child() 代表选择某个的一个或多个特定的子元素
1、:nth-child(number);/*参数是具体数字*/ 
2、:nth-child(n);/*参数是n,n从0开始计算*/ 
3、:nth-child(n*length)/*n的倍数选择，n从0开始算*/ 
4、:nth-child(n+length);/*选择大于length后面的元素*/ 
5、:nth-child(-n+length)/*选择小于length前面的元素*/ 
6、:nth-child(n*length+1);/*表示隔几选一*/ 
```

需求实现代码：

```scss
@for $i from 1 through 10 {
  .active-li-#{$i} {
    li:nth-child(-n + #{$i}) {
      // ...
    }      
  }
}
```

## 第15课时

### 15.1 swiper滑动功能

[Swiper](https://swiperjs.com/vue/)是纯javascript打造的滑动特效插件，swiper6.0目前仅支持vue3.0，Vue2.0可以结合[vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)。

```
npm install swiper vue-awesome-swiper --save
```

具体使用详见官方文档API

## 第16课时

略。

## 第17课时

### 17.1 弹窗鼠标点击事件

需求描述：点击user icon则右侧滑动出现，点击其他区域则右侧滑动消失。

<img src="./noteImg/会员中心.jpg" style="zoom:80%;" />

实现方案：在页面挂载一个mouseup监听函数，当右侧栏显示的时候，点击鼠标时判断鼠标点击的位置是否是右侧栏的区域（通过document.getElementById等方法获取），如果不是则更新使右侧滑动消失，反之，则不处理。

```js
mounted() {
  document.addEventListener("mouseup", e => {
    const sider = document.getElementById("sider-wrap");
    if (sider && sider.contains(e.target)) {
      this.$router.push({ name: "Home" });
    }
  });
}
```

## 第18课时

### 18.1 全局组件

> 全局注册后即可直接使用，`<MyComponent></MyComponent>`

```js
import MyComponent from '@/components/MyComponent.vue'
Vue.component("MyComponent", MyComponent); // 全局自定义组件
```

## 第19课时

完成后台管理系统登录/注册功能，注意跨域访问、请求拦截器、路由守卫、验证码流程等相关内容可详见[vue3.0后台管理系统项目实战](https://github.com/MrEnvision/vue-admin)，本项目仅简单实现。