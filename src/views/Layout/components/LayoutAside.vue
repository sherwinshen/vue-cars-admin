<template>
  <div class="layout-aside">
    <div class="logo">
      <img src="../../../assets/images/logo.png" alt="" />
    </div>
    <el-menu
      background-color="transparent"
      router
      :default-active="defaultActive"
      :unique-opened="true"
    >
      <template v-for="item in routers">
        <el-submenu v-if="!item.hidden" :key="item.path" :index="item.path">
          <template slot="title">
            <span slot="title">{{ item.meta.title }}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item
              v-if="!subItem.hidden"
              :key="subItem.path"
              :index="subItem.path"
              >{{ subItem.meta.title }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LayoutAside",
  data() {
    return {
      routers: [],
      defaultActive: ""
    };
  },
  beforeMount() {
    this.routers = this.$router.options.routes;
    this.defaultActive = this.$route.path;
  }
};
</script>

<style lang="scss">
.layout-aside {
  .logo {
    text-align: center;

    img {
      margin: 28px auto 25px;
      width: 92px;
      @include webkit(transition, all 0.5s ease 0s);
    }
  }
}

.el-menu {
  border-right: none;

  .el-submenu .el-submenu__title {
    color: white;

    i {
      color: white;
    }

    &:hover {
      background-color: $color-second !important;
    }
  }

  .el-menu-item {
    color: white;

    &.is-active {
      background-color: rgba(245, 100, 108, 0.2) !important;
      @include webkit(transition, all 0.2s ease 0s);
    }
  }

  .el-menu--inline {
    background-color: #2f4357 !important;

    .el-menu-item:hover {
      background-color: rgba(245, 100, 108, 0.2) !important;
    }
  }
}
</style>
