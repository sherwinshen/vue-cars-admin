<template>
  <div class="layout-wrap">
    <el-container>
      <el-aside width="250px">
        <layout-aside></layout-aside>
      </el-aside>
      <el-container>
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main>
          <layout-main></layout-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LayoutAside from "@/views/Layout/components/LayoutAside";
import LayoutMain from "@/views/Layout/components/LayoutMain";
import LayoutHeader from "@/views/Layout/components/LayoutHeader";

export default {
  name: "Layout",
  components: {
    LayoutAside,
    LayoutMain,
    LayoutHeader
  }
};
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background: $color-main;
}

.el-header,
.el-main {
  padding: 0;
}

.el-header {
  height: 65px;
  background-color: white;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}

.el-main {
  height: calc(100vh - 80px);
  margin: 20px 20px 0 20px;
  background-color: white;
}

.el-container {
  background-color: #f7f7f7;
}
</style>
