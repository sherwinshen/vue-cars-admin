<template>
  <div id="editorDom" style="text-align:left;"></div>
</template>

<script>
import Editor from "wangeditor";

export default {
  name: "Editor",
  data() {
    return {
      editor: null
    };
  },
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.createEditor();
  },
  methods: {
    createEditor() {
      this.editor = new Editor(`#editorDom`);
      // 配置 onchange 回调函数，将数据同步到 vue 中
      this.editor.config.onchange = newHtml => {
        this.$emit("update:content", newHtml);
      };
      this.editor.create(); // 创建富文本实例
    },
    // 恢复数据
    restore(value) {
      console.log(1111)
      this.editor.txt.html(value);
    },
    // 重置数据
    reset() {
      this.editor.txt.clear();
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  }
};
</script>

<style lang="scss" scoped></style>
