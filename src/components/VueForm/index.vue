<template>
  <div class="form-wrap">
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
          v-if="item.type === 'radio'"
          v-model="formData[item.prop]"
        >
          <el-radio
            v-for="radio in item.options"
            :label="radio.value"
            :key="radio.value"
            >{{ radio.label }}</el-radio
          >
        </el-radio-group>
        <!--select渲染-->
        <el-select
          :filterable="item.filterable || false"
          v-if="item.type === 'select'"
          v-model="formData[item.prop]"
          :placeholder="item.placeholder"
          :style="{ width: item.width }"
          :disabled="item.disabled"
        >
          <el-option
            v-for="selectItem in item.options"
            :key="selectItem.selectValue"
            :value="selectItem.selectValue"
            :label="selectItem.selectLabel"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--表单按钮-->
      <el-form-item>
        <el-button
          v-for="item in formHandler"
          :key="item.key"
          :type="item.type"
          @click="item.handler && item.handler()"
        >
          {{ item.label }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "VueForm",
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
    buttonLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    reset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="scss">
.form-wrap {
  .el-form {
    padding-bottom: 20px;
  }
}
</style>
