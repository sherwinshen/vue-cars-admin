<template>
  <el-dialog
    title="车辆自定义属性添加"
    :visible.sync="flagVisible"
    width="30%"
    @opened="handleOpened"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <FormComp
      ref="attrForm"
      :formData="formData"
      :formItem="formItem"
      :formHandler="formHandler"
      :labelWidth="labelWidth"
    />
  </el-dialog>
</template>

<script>
import FormComp from "@/components/FormComp";
import { CarsTypeAdd } from "@/api/cars";

export default {
  name: "DialogAttr",
  components: { FormComp },
  props: {
    dialogVisible: {
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
      labelWidth: "75px",
      formItem: [
        { type: "input", label: "当前属性", prop: "typeValue", disabled: true },
        { type: "input", label: "字段", prop: "key", required: true },
        { type: "input", label: "文本", prop: "value", required: true }
      ],
      formData: {
        key: "",
        value: "",
        typeValue: ""
      },
      formHandler: [
        {
          label: "确定",
          key: "submit",
          type: "primary",
          handler: () => this.submit()
        },
        {
          label: "取消",
          key: "submit",
          handler: () => this.handleClose()
        }
      ]
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
        this.formData.typeValue = newValue.value;
      }
    }
  },
  methods: {
    handleOpened() {},
    handleClose() {
      this.dialogVisible = false;
      this.reset();
      this.$emit("update:dialogVisible", false);
    },
    // 重置表单
    reset() {
      this.$refs.attrForm.reset();
    },
    // 提交
    submit() {
      this.$refs.attrForm.$refs.form.validate(valid => {
        if (valid) {
          // 不涉及编辑，直接就添加
          this.addAttr();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加自定义属性
    addAttr() {
      const requestData = {
        typeId: this.data.id,
        key: this.formData.key,
        value: this.formData.value
      };
      CarsTypeAdd(requestData).then(response => {
        this.$message({
          message: response.data.message,
          type: "success"
        });
        this.$emit("callback", {
          funcName: "getCarsTypeList"
        });
        this.reset();
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
