<template>
  <div class="console-wrap">
    欢迎使用在线租车后台管理系统
  </div>
</template>

<script>
export default {
  name: "Console"
};
</script>

<style lang="scss" scoped>
.console-wrap {
  color: $color-main;
  font-size: 35px;
  position: absolute;
  left: 50%;
  @include webkit(transform, translateX(-50%));
  margin-top: 200px;
}
</style>
