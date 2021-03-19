<template>
  <el-dialog
    :title="title"
    :visible.sync="flagVisible"
    width="40%"
    @opened="handleOpened"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <FormComp
      ref="leaseForm"
      :labelWidth="labelWidth"
      :formData="formData"
      :formItem="formItem"
      :formHandler="formHandler"
    />
  </el-dialog>
</template>

<script>
import FormComp from "@/components/FormComp";
import { RentAdd, RentEdit } from "@/api/rent";

export default {
  name: "DialogLease",
  components: { FormComp },
  props: {
    title: {
      type: String,
      default: ""
    },
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
      labelWidth: "80px",
      formData: {
        carsLeaseTypeName: "",
        carsLeaseStatus: "",
        carsLeaseDesc: ""
      },
      formItem: [
        {
          type: "input",
          label: "租车类型",
          prop: "carsLeaseTypeName",
          required: true
        },
        {
          type: "radio",
          label: "禁/启用",
          prop: "carsLeaseStatus",
          options: this.$store.state.config.radio_disabled,
          required: true
        },
        { type: "textarea", label: "描述", prop: "carsLeaseDesc" }
      ],
      formHandler: [
        {
          label: "确定",
          key: "submit",
          type: "primary",
          handler: () => this.handleSubmit()
        },
        {
          label: "取消",
          key: "cancel",
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
        this.formData = newValue;
      }
    }
  },
  methods: {
    handleOpened() {},
    handleClose() {
      this.flagVisible = false;
      this.reset();
      this.formData = {
        carsLeaseTypeName: "",
        carsLeaseStatus: "",
        carsLeaseDesc: ""
      };
      this.$emit("update:dialogVisible", false);
    },
    handleSubmit() {
      this.$refs.leaseForm.$refs.form.validate(valid => {
        if (valid) {
          this.formData.carsLeaseTypeId ? this.editLease() : this.addLease();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加租车类型
    addLease() {
      RentAdd({ ...this.formData }).then(response => {
        this.$message({
          message: response.data.message,
          type: "success"
        });
        this.$emit("callback", {
          funcName: "loadData"
        });
        this.reset();
      });
    },
    // 修改租车类型
    editLease() {
      RentEdit({ ...this.formData }).then(response => {
        this.$message({
          message: response.data.message,
          type: "success"
        });
        this.$emit("callback", {
          funcName: "loadData"
        });
        this.handleClose();
      });
    },
    // 重置表单
    reset() {
      this.$refs.leaseForm.reset();
    }
  }
};
</script>

<style lang="scss" scoped></style>
