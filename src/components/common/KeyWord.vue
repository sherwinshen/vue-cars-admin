<template>
  <el-row :gutter="10" class="width-260">
    <el-col :span="10">
      <el-select v-model="searchKey" placeholder="请选择" @change="inputEnter">
        <el-option
          v-for="item in searchOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="14">
      <el-input v-model="searchValue" v-on:input="inputEnter"></el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "KeyWord",
  data() {
    return {
      searchKey: "",
      searchValue: "",
      searchOptions: [],
      keywordOptions: this.$store.state.config.keyword_options
    };
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    options: {
      handler(newValue) {
        this.initOptions(newValue);
      },
      immediate: true
    }
  },
  methods: {
    // 初始化选项（存在统一Vuex配置）
    initOptions() {
      let optionsItem = [];
      this.options.forEach(item => {
        const data = this.keywordOptions.filter(elem => elem.value === item);
        optionsItem = optionsItem.concat(data);
      });
      this.searchOptions = optionsItem;
    },
    // 输入数据更新
    inputEnter() {
      let keyword = {};
      keyword.key = this.searchKey;
      keyword.value = this.searchValue;
      this.$emit("update:value", keyword);
    },
    // 清除数据
    clear() {
      this.searchKey = "";
      this.searchValue = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
