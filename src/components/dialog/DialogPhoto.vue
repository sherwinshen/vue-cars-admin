<template>
  <el-dialog
    :title="title"
    :visible.sync="flagVisible"
    width="30%"
    @opened="handleOpened"
    :before-close="handleClose"
  >
    <!-- 认证通过 -->
    <div class="margin-bottom-20">
      <span>认证情况：</span>
      <el-switch
        v-model="check"
        active-text="通过"
        inactive-text="未通过"
        @change="switchChange()"
      />
    </div>
    <template v-if="dataPhoto.length > 0">
      <img
        v-for="item in dataPhoto"
        :key="item"
        :src="item"
        alt=""
        class="img-list"
      />
    </template>
    <template v-else>
      暂无图片
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogPhoto",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    },
    checkFlag: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      flagVisible: false,
      dataPhoto: [],
      check: true,
      title: ""
    };
  },
  watch: {
    dialogVisible: {
      handler(newValue) {
        this.flagVisible = newValue;
      }
    },
    data: {
      handler(newValue) {
        const imgArr = [];
        for (let key in newValue) {
          if (newValue[key]) {
            imgArr.push(newValue[key]);
          }
        }
        this.dataPhoto = imgArr;
      }
    },
    checkFlag: {
      handler(newValue) {
        this.check = newValue;
      }
    },
    type: {
      handler(newValue) {
        this.title = newValue === "drive" ? "驾驶证" : "实名认证";
      }
    }
  },
  methods: {
    handleOpened() {},
    handleClose() {
      this.dataPhoto = [];
      this.flagVisible = false;
      this.$emit("update:dialogVisible", false);
    },
    switchChange() {
      this.$emit("callback", {
        funcName: "updateCheck"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.img-list {
  width: 100%;
  margin-bottom: 20px;
}
</style>
