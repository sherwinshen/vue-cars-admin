<template>
  <div class="brand-add-wrap">
    <el-dialog
      title="新增车辆品牌"
      :visible.sync="dialogVisible"
      width="50%"
      @close="handleClose"
      @opened="handleOpened"
      :close-on-click-modal="false"
    >
      <FormComp
        ref="brandAddForm"
        :formItem="formItem"
        :formData="formData"
        label-width="100px"
      >
        <template v-slot:imgUrl>
          <div class="upload-img-wrap">
            <div class="upload-img">
              <img v-show="logo_current" :src="logo_current" alt="" />
            </div>
            <ul class="img-list">
              <li
                v-for="item in logoList"
                :key="item.id"
                @click="logo_current = item.img"
              >
                <img :src="item.img" :alt="item.name" />
              </li>
            </ul>
          </div>
        </template>
      </FormComp>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { BrandLogo, BrandAdd, BrandEdit } from "@/api/brand";
import FormComp from "@/components/FormComp";

export default {
  name: "BrandAdd",
  components: { FormComp },
  props: {
    dialogFlag: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      radio_disabled: this.$store.state.config.radio_disabled,
      logoList: [],
      logo_current: "",
      formItem: [
        {
          type: "input",
          label: "品牌中文",
          prop: "nameCh",
          placeholder: "请输入品牌中文",
          required: true
        },
        {
          type: "input",
          label: "品牌英文",
          prop: "nameEn",
          placeholder: "请输入品牌英文",
          required: true
        },
        {
          type: "slot",
          label: "LOGO",
          prop: "imgUrl",
          slotName: "imgUrl",
          required: true
        },
        {
          type: "radio",
          label: "禁启用",
          prop: "status",
          options: this.$store.state.config.radio_disabled,
          required: true
        }
      ],
      formData: {
        nameCh: "",
        nameEn: "",
        status: "",
        imgUrl: ""
      }
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
    // 打开时的操作
    handleOpened() {
      this.getLogoList();
      this.getDetail();
    },
    // 关闭时的操作
    handleClose() {
      this.dialogVisible = false;
      this.$emit("update:dialogFlag", false);
      this.clearForm();
    },
    // 获取logoList
    getLogoList() {
      if (this.logoList.length !== 0) {
        return false;
      }
      BrandLogo()
        .then(response => {
          const data = response.data.data;
          if (data) {
            this.logoList = data;
          }
        })
        .catch(error => {
          console.error("error", error);
        });
    },
    // 显示数据
    getDetail() {
      if (this.data) {
        this.formData = this.data;
        this.logo_current = this.data.imgUrl;
        this.formData.imgUrl = this.data.imgUrl;
      }
    },
    // 清除表单
    clearForm() {
      this.$refs.brandAddForm.reset();
      this.logo_current = "";
    },
    // 提交
    submit() {
      this.data.id ? this.editBrandList() : this.addBrandList();
    },
    // 添加brand
    addBrandList() {
      this.formData.imgUrl = this.logo_current;
      BrandAdd(this.formData)
        .then(response => {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.handleClose();
          this.$emit("updateData");
        })
        .catch(error => {
          console.error("error", error);
        });
    },
    // 编辑brand
    editBrandList() {
      this.formData.imgUrl = this.logo_current;
      BrandEdit(this.formData).then(response => {
        this.$message({
          type: "success",
          message: response.data.message
        });
        this.handleClose();
        this.$emit("updateData");
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
