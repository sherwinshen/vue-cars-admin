<template>
  <div class="layout-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "LayoutMain"
};
</script>

<style lang="scss" scoped>
.layout-main {
  @include webkit(box-sizing, border-box);
  position: relative;
  padding: 30px;
  height: 100%;
}
</style>
