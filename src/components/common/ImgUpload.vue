<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :auto-upload="false"
    :show-file-list="false"
    :multiple="false"
    :on-change="upload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  name: "ImgUpload",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.restore(newValue);
      }
    }
  },
  data() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    // 上传图片
    upload(file) {
      // 判断类型和大小
      const imageType = file.raw.type;
      const isImg =
        imageType === "image/jpeg" ||
        imageType === "image/gif" ||
        imageType === "image/png" ||
        imageType === "image/bmp";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;
      if (!isImg) {
        this.$message.error("上传略缩图只能是图片格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传略缩大小不能超过 2MB!");
        return false;
      }

      // 转为base64
      const reader = new FileReader();
      reader.onload = event => {
        this.imageUrl = event.target.result;
        this.$emit("update:value", event.target.result);
      };
      reader.readAsDataURL(file.raw);
    },

    // 恢复图片
    restore(value) {
      if (value) {
        this.imageUrl = value;
      }
    }
  }
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
