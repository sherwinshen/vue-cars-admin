<template>
  <div class="layout-header">
    <div class="pull-right">
      <div class="pull-left user-info">
        <img src="../../../assets/images/face.png" alt="" />
        {{ username }}
      </div>
      <div class="pull-left header-icon" @click="emit">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutHeader",
  data() {
    return {
      username: ""
    };
  },
  beforeMount() {
    this.username = this.$store.state.login.username;
  },
  methods: {
    emit() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("login/exit").then(() => {
            this.$router.push({ name: "Login" });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.layout-header {
  .user-info {
    line-height: 65px;
    padding: 0 32px;
    border-right: 1px solid #ededed;

    img {
      display: inline-block;
      width: 39px;
      height: 39px;
      margin-bottom: -12px;
      margin-right: 15px;
      border-radius: 100px;
      object-fit: cover;
    }
  }

  .header-icon {
    line-height: 65px;
    font-size: 20px;
    cursor: pointer;
    padding: 0 32px;
  }
}
</style>
