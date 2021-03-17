<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <ul class="form-title">
        <li
          :class="[isLogin ? 'login-active' : 'register-active', 'active-tab']"
        ></li>
        <li @click="toggleLogin">登陆</li>
        <li @click="toggleRegister">注册</li>
      </ul>
      <el-form class="form-content" ref="form" :model="form" size="medium">
        <el-form-item prop="email" class="login-form-item" label="邮箱">
          <el-input
            id="email"
            type="email"
            v-model="form.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-form-item" label="密码">
          <el-input
            id="password"
            type="password"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="passwordRepeat"
          class="login-form-item"
          v-show="!isLogin"
          label="重复密码"
        >
          <el-input
            id="passwordRepeat"
            type="password"
            v-model="form.passwordRepeat"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="login-form-item" label="验证码">
          <el-row :gutter="10" style="display: inline-block; width: 100%;">
            <el-col :span="14" style="padding-left: 0;">
              <el-input
                id="code"
                type="text"
                v-model="form.code"
                autocomplete="off"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="10" style="padding-right: 0;">
              <el-button
                class="block"
                type="success"
                @click="getSms()"
                :disabled="codeButton.disabled"
                >{{ codeButton.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            class="block login-btn"
            type="danger"
            @click="submitForm('form')"
            :disabled="loginButton.disabled"
            >{{ isLogin ? "登录" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { GetCode, Register } from "@/api/login";
import { emailRule, passwordRule, codeRule } from "@/utils/validate";
import sha1 from "js-sha1";

export default {
  name: "Login",
  data() {
    return {
      timer: null,
      isLogin: true,
      form: {
        email: "sw1@qq.com",
        password: "sw1234",
        passwordRepeat: "",
        code: ""
      },
      loginButton: {
        disabled: true
      },
      codeButton: {
        text: "获取验证码",
        disabled: false
      },
      rules: {
        email: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("邮箱不能为空"));
              } else if (emailRule(value)) {
                return callback(new Error("邮箱格式有误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入密码"));
              } else if (passwordRule(value)) {
                return callback(new Error("密码为6至20位的数字和字母"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        passwordRepeat: [
          {
            validator: (rule, value, callback) => {
              // 如果模块值为login, 直接通过
              if (this.isLogin) {
                callback();
              }
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.form.password) {
                callback(new Error("与密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        code: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请输入验证码"));
              } else if (codeRule(value)) {
                return callback(new Error("验证码为6位的数字或字母"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 切换登录
    toggleLogin() {
      this.isLogin = true;
      this.clearCountDown(); // 清除倒计时
      this.resetFromData(); // 清除表单数据
    },
    // 切换注册
    toggleRegister() {
      this.isLogin = false;
      this.resetFromData(); // 清除表单数据
    },
    // 验证码按钮属性更新
    updateCodeBtn(params) {
      this.codeButton = params;
    },
    // 获取验证码
    getSms() {
      // 先验证邮箱是否填写和是否有效
      if (this.form.email === "") {
        this.$message.error("邮箱不能为空");
        return false;
      } else if (emailRule(this.form.email)) {
        this.$message.error("邮箱格式有误");
        return false;
      }
      //禁用按钮并显示发送中
      this.updateCodeBtn({
        text: "发送中",
        disabled: true
      });
      // 获取验证码
      let requestData = {
        username: this.form.email,
        module: this.isLogin ? "login" : "register"
      };
      GetCode(requestData)
        .then(response => {
          this.$message({
            message: response.data.message,
            type: "success"
          });
          // 启用登录按钮
          this.loginButton.disabled = false;
          // 倒计时60s
          this.countdown(60);
        })
        .catch(() => {
          this.$message.error("获取验证码失败");
        });
    },
    // 倒计时
    countdown(num) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      let i = num;
      this.timer = setInterval(() => {
        if (i > 0) {
          i--;
          this.codeButton.text = `倒计时${i}秒`;
        } else {
          clearInterval(this.timer);
          this.updateCodeBtn({
            disabled: false,
            text: "重新获取"
          });
        }
      }, 1000);
    },
    // 清除倒计时
    clearCountDown() {
      this.updateCodeBtn({
        status: false,
        text: "获取验证码"
      });
      clearInterval(this.timer);
    },
    // 清除表单数据
    resetFromData() {
      this.$refs.form.resetFields();
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLogin ? this.login() : this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 登录
    login() {
      let requestData = {
        username: this.form.email,
        password: sha1(this.form.password),
        code: this.form.code
      };
      this.$store
        .dispatch("login/login", requestData)
        .then(() => {
          // 页面跳转
          this.$router.push({ name: "Console" });
        })
        .catch(() => {
          console.log("登录失败");
        });
    },
    // 注册
    register() {
      let requestData = {
        username: this.form.email,
        password: sha1(this.form.password),
        code: this.form.code,
        module: "register"
      };
      Register(requestData)
        .then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success"
          });
          this.toggleLogin(); // 注册成功后自动跳转至登录栏
        })
        .catch(() => {
          console.log("注册失败");
        });
    }
  }
};
</script>

<style lang="scss">
.login-wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #344a5f;
}

.form-wrap {
  position: absolute;
  left: 50%;
  top: 100px;
  text-align: center;
  @include webkit(transform, translateX(-50%));
}

.form-title {
  display: inline-block;
  text-align: center;
  position: relative;
  margin-bottom: 30px;

  li {
    display: inline-block;
    height: 30px;
    width: 80px;
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    line-height: 30px;
  }

  .active-tab {
    @include webkit(transition, all 0.3s ease 0s);
  }

  .login-active {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    height: 30px;
    width: 80px;
    border-radius: 5px;
  }

  .register-active {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100px;
    background-color: rgba(0, 0, 0, 0.1);
    height: 30px;
    width: 80px;
    border-radius: 5px;
  }
}

.form-content {
  width: 360px;

  .login-form-item {
    margin-bottom: 12px;
  }

  .block {
    display: block;
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
  }

  .el-form-item__label {
    color: #fff;
  }

  input {
    display: inline-block;
    width: 100%;
  }

  .login-btn {
    margin-top: 20px;
  }
}
</style>
