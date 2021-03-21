<template>
  <div class="member-edit-wrap">
    <span class="back" @click="back">
      <i class="el-icon-back"></i>
      返回
    </span>
    <el-divider class="margin-top-20 margin-bottom-20" />
    <FormComp
      ref="memberForm"
      :formData="formData"
      :formItem="formItem"
      :formHandler="formHandler"
      labelWidth="120px"
    ></FormComp>
  </div>
</template>

<script>
import FormComp from "@/components/FormComp";
import { MemberDetailed, MemberEdit } from "@/api/member";
import { formatRequestData } from "@/utils/format";

export default {
  name: "MemberEdit",
  components: { FormComp },
  data() {
    return {
      id: this.$route.query.id,
      formData: {
        // 指定对象里面的所有 key
        username: "",
        truename: "",
        cardId: "",
        gender: "",
        illegalAmount: "",
        cardPhotoFace: "",
        cardPhotoBack: "",
        cardPhotoBareheaded: "",
        carsPhotoFace: "",
        carsPhotoBack: "",
        blacklist: ""
      },
      formItem: [
        {
          type: "input",
          label: "用户名",
          placeholder: "请输入用户名",
          prop: "username",
          required: true,
          width: "200px"
        },
        {
          type: "input",
          label: "真实姓名",
          placeholder: "请输入真实姓名",
          prop: "truename",
          required: true,
          width: "200px"
        },
        {
          type: "input",
          label: "身份证",
          placeholder: "请输入身份证",
          prop: "cardId",
          required: true,
          width: "400px"
        },
        {
          type: "radio",
          label: "性别",
          prop: "gender",
          options: this.$store.state.config.gender,
          required: true
        },
        {
          type: "inputNumber",
          label: "违章预存金",
          prop: "illegalAmount",
          required: true
        },
        {
          type: "upload",
          label: "身份证（正面）",
          prop: "cardPhotoFace"
        },
        {
          type: "upload",
          label: "身份证（反面）",
          prop: "cardPhotoBack"
        },
        {
          type: "upload",
          label: "身份证（免冠）",
          prop: "cardPhotoBareheaded"
        },
        {
          type: "upload",
          label: "驾驶证（正面）",
          prop: "carsPhotoFace"
        },
        {
          type: "upload",
          label: "驾驶证（反面）",
          prop: "carsPhotoBack"
        },
        {
          type: "radio",
          label: "黑名单",
          prop: "blacklist",
          options: this.$store.state.config.blacklist,
          required: true
        }
      ],
      formHandler: [
        {
          label: "确定",
          key: "submit",
          type: "primary",
          handler: () => this.formValidate()
        },
        { label: "重置", key: "reset", handler: () => this.reset() }
      ]
    };
  },
  beforeMount() {
    this.id && this.detailed();
  },
  methods: {
    // 获取信息
    detailed() {
      MemberDetailed({ id: this.id }).then(response => {
        this.formData = formatRequestData(this.formData, response.data.data);
      });
    },
    // 验证表单
    formValidate() {
      this.$refs.memberForm.$refs.form.validate(valid => {
        if (valid) {
          this.id && this.edit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑信息
    edit() {
      MemberEdit({ ...this.formData, id: this.id }).then(response => {
        this.$message({
          type: "success",
          message: response.data.message
        });
      });
    },
    // 表单重置
    reset() {
      this.$refs.memberForm.reset();
    },
    // 返回上一页
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.back {
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  color: #409eff;
}
</style>
