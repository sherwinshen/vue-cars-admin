<template>
  <el-row>
    <el-col
      :span="3"
      v-for="(item, index) in cars_basic_type_list"
      :key="index"
    >
      <el-button
        :type="current_cars_type_id === item.id ? 'primary' : ''"
        :key="index"
        size="small"
        @click="onClick(item)"
        class="margin-bottom-10 width-100"
      >
        {{ item.value }}
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
import { GetCarsTypeBasis } from "@/api/cars";

export default {
  name: "CarAttrList",
  props: {
    isInit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cars_basic_type_list: [],
      current_cars_type_id: ""
    };
  },
  beforeMount() {
    this.getCarsBasicType();
  },
  methods: {
    // 获取基本属性
    getCarsBasicType() {
      GetCarsTypeBasis().then(response => {
        const data = response.data.data.data;
        this.cars_basic_type_list = data;
        if (this.isInit) {
          this.current_cars_type_id = data[0].id;
          this.$emit("callback", {
            funcName: "initBasicType",
            data
          });
        }
      });
    },
    // 按钮点击
    onClick(data) {
      this.current_cars_type_id = data.id;
      this.$emit("callback", {
        funcName: "onClickBasicType",
        data
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
