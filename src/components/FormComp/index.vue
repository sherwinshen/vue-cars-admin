<template>
  <el-form ref="form" :model="formData" :label-width="labelWidth">
    <!--表单项-->
    <el-form-item
      v-for="item in formItem"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rules"
    >
      <!--slot渲染-->
      <slot v-if="item.type === 'slot'" :name="item.slotName" />
      <!--input渲染-->
      <el-input
        v-else-if="item.type === 'input'"
        v-model.trim="formData[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        :disabled="item.disabled"
      >
      </el-input>
      <!--textarea渲染-->
      <el-input
        v-else-if="item.type === 'textarea'"
        type="textarea"
        :rows="item.rows || 5"
        v-model.trim="formData[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        :disabled="item.disabled"
      ></el-input>

      <!--inputNumber渲染-->
      <el-input-number
        v-else-if="item.type === 'inputNumber'"
        v-model="formData[item.prop]"
        :min="item.min || 0"
        :style="{ width: item.width }"
        :disabled="item.disabled"
      >
      </el-input-number>
      <!--radio渲染-->
      <el-radio-group
        v-else-if="item.type === 'radio'"
        v-model="formData[item.prop]"
      >
        <el-radio
          v-for="radio in item.options"
          :label="radio.value"
          :key="radio.value"
          >{{ radio.label }}
        </el-radio>
      </el-radio-group>
      <!--select渲染-->
      <el-select
        :filterable="item.filterable || false"
        v-else-if="item.type === 'select'"
        v-model="formData[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        :disabled="item.disabled"
      >
        <el-option
          v-for="selectItem in item.options"
          :key="selectItem[item.selectValue]"
          :value="selectItem[item.selectValue]"
          :label="selectItem[item.selectLabel]"
        ></el-option>
      </el-select>
      <!--图片上传-->
      <template v-else-if="item.type === 'upload'">
        <ImgUpload
          ref="imgUpload"
          :value.sync="formData[item.prop]"
        ></ImgUpload>
      </template>
      <!--富文本渲染-->
      <template v-else-if="item.type === 'editor'">
        <Editor ref="wangeditor" :content.sync="formData[item.prop]"></Editor>
      </template>
    </el-form-item>
    <!--表单按钮-->
    <el-form-item>
      <el-button
        v-for="item in formHandler"
        :key="item.key"
        :type="item.type"
        :size="item.size || 'small'"
        @click="item.handler && item.handler()"
      >
        {{ item.label }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Editor from "@/components/common/Editor";
import ImgUpload from "@/components/common/ImgUpload";

export default {
  name: "FormComp",
  components: { ImgUpload, Editor },
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    formItem: {
      type: Array,
      default: () => []
    },
    formHandler: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    isRestore: {
      type: Boolean,
      default: false
    },
    buttonLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      typeMsg: {
        input: "请输入",
        radio: "请选择",
        select: "请选择"
      }
    };
  },
  watch: {
    formItem: {
      handler() {
        this.initFormData();
      },
      immediate: true
    },
    isRestore: {
      handler(value) {
        // 为了恢复编辑器的数据
        if (value) {
          const items = this.formItem.filter(item => item.type === "editor");
          if (items.length > 0) {
            this.$refs.wangeditor[0].restore(this.formData[items[0].prop]);
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    // 初始化表格配置
    initFormData() {
      this.formItem.forEach(item => {
        // 主要为了格式化表单验证 rules 规则，required记为必须
        if (item.required) {
          this.rules(item);
        }
      });
    },
    rules(item) {
      const requiredRules = [
        {
          required: true,
          message:
            item.requiredMsg || `${this.typeMsg[item.type]}${item.label}`,
          trigger: "blur"
        }
      ];
      if (item.rules && item.rules.length > 0) {
        item.rules = requiredRules.concat(item.rules);
      } else {
        item.rules = requiredRules;
      }
    },
    reset() {
      this.$refs.form.resetFields();
      // 清除富文本内容
      if (this.$refs.wangeditor && this.$refs.wangeditor[0]) {
        this.$refs.wangeditor[0].reset();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
