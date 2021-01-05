<template>
  <el-dialog
    title="新增车辆品牌"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "AddBrands",
  props: {
    dialogFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose() {
      console.log(111)
      this.dialogVisible = false;
      this.$emit("update:dialogFlag", false);
    }
  },
  watch: {
    dialogFlag: {
      handler(newValue) {
        this.dialogVisible = newValue;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
