<template>
  <el-row>
    <el-col :span="22">
      <el-form ref="form" inline :model="formData" size="small">
        <!--表单项-->
        <el-form-item
          v-for="item in formItem"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :rules="item.rules"
        >
          <!--input渲染-->
          <el-input
            v-if="item.type === 'input'"
            v-model.trim="formData[item.prop]"
            :placeholder="item.placeholder"
            :style="{ width: item.width }"
            :disabled="item.disabled"
          >
          </el-input>
          <!--select渲染-->
          <el-select
            :filterable="item.filterable || false"
            v-if="item.type === 'select'"
            v-model="formData[item.prop]"
            :placeholder="item.placeholder"
            :style="{ width: item.width }"
            :disabled="item.disabled"
            :class="item.class"
          >
            <el-option
              v-for="(selectItem, index) in item.options"
              :key="selectItem[item.selectValue] || index"
              :value="selectItem[item.selectValue]"
              :label="selectItem[item.selectLabel]"
            ></el-option>
          </el-select>
          <!--区域组件-->
          <CityArea
            v-if="item.type === 'region'"
            ref="cityArea"
            :cityAreaValue.sync="formData.area"
          ></CityArea>
          <!--关键词组件-->
          <template v-if="item.type === 'keyword'">
            <KeyWord
              ref="keyword"
              :options="item.options"
              :value.sync="keyword"
            ></KeyWord>
          </template>
        </el-form-item>
        <!--表单按钮-->
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset" v-if="formConfig.resetButton"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="2">
      <div class="pull-right" v-if="formConfig.addButton">
        <router-link :to="formConfig.addLink">
          <el-button type="primary" size="small"
            >{{ formConfig.addLabel }}
          </el-button>
        </router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CityArea from "@/components/common/CityArea";
import KeyWord from "@/components/common/KeyWord";

export default {
  name: "SearchForm",
  components: { KeyWord, CityArea },
  props: {
    formItem: {
      type: Array,
      default: () => []
    },
    // 按钮
    formHandler: {
      type: Array,
      default: () => []
    },
    formConfig: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.initFormFiled();
  },
  data() {
    return {
      formData: {},
      keyword: {}
    };
  },
  methods: {
    // 字段初始化
    initFormFiled() {
      const filed = {};
      this.formItem.forEach(item => {
        if (item.prop) {
          filed[item.prop] = "";
        }
      });
      this.formData = filed;
    },
    search() {
      const searchData = {};
      // 过滤空数据
      for (let key in this.formData) {
        if (this.formData[key] !== "") {
          searchData[key] = this.formData[key];
        }
      }
      // keyword组件处理
      if (this.$refs.keyword && this.keyword.key && this.keyword.value) {
        searchData[this.keyword.key] = this.keyword.value;
      }
      this.$emit("callback", {
        funcName: "search",
        data: searchData
      });
    },
    // 重置
    reset() {
      this.$refs.form.resetFields();
      if (this.$refs.cityArea[0]) {
        this.$refs.cityArea[0].clear();
      }
      if (this.$refs.keyword[0]) {
        this.$refs.keyword[0].clear();
        this.keyword = {};
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
