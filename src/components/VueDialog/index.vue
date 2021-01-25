<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    @close="close"
    @opened="opened"
    :close-on-click-modal="closeOnClickModal"
  >
    <slot></slot>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "VueDialog",
  props: {
    dialogFlag: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    },
    handleClose: {
      type: Function,
      default: () => {}
    },
    handleOpened: {
      type: Function,
      default: () => {}
    },
    submit: {
      type: Function,
      default: () => {}
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  watch: {
    dialogFlag: {
      handler(newValue) {
        this.dialogVisible = newValue;
      }
    }
  },
  methods: {
    close() {
      this.dialogVisible = false;
      this.$emit("update:dialogFlag", false);
      this.handleClose && this.handleClose();
    },
    opened() {
      this.handleOpened && this.handleOpened();
    }
  }
};
</script>

<style lang="scss" scoped></style>
