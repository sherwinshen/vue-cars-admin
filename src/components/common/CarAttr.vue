<template>
  <div class="car-attr-wrap">
    <!--基础类型list-->
    <CarAttrList @callback="callback" />
    <!--基础类型对应的属性-->
    <el-row :gutter="15">
      <el-col :span="4" v-for="item in current_attr_data" :key="item.key">
        <span>{{ item.value }}</span>
        <el-input v-model="attr_list[current_basic_type.key][item.key]" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CarAttrList from "@/components/common/CarAttrList";
import { GetCarsTypeList } from "@/api/cars";

export default {
  name: "CarAttr",
  components: { CarAttrList },
  props: {
    initValue: {
      type: String,
      default: ""
    },
    oil: {
      type: Number,
      default: 0
    }
  },
  watch: {
    initValue: {
      handler(newValue) {
        if (newValue) {
          this.attr_list = JSON.parse(newValue);
        }
      },
      immediate: true
    },
    countKm: {
      handler(newValue) {
        // 返回值
        this.$emit("update:countKm", newValue);
      }
    }
  },
  computed: {
    // 计算公里
    countKm: function() {
      if (
        !this.attr_list.basics ||
        !this.attr_list.basics.oil_consume ||
        !this.attr_list.carsBody ||
        !this.attr_list.carsBody.tank_volume
      ) {
        return "";
      }
      // 剩余油量
      const surplusOil = (this.oil * this.attr_list.carsBody.tank_volume) / 100;
      // 计算公里
      const km = (surplusOil / this.attr_list.basics.oil_consume) * 100;
      return km.toFixed(0);
    }
  },
  data() {
    return {
      current_basic_type: {}, // 当前公用属性 attr_basis_data
      current_attr_data: [], // 当前公用属性下面的自定义属性 attr_data
      attr_list: {} // 数据集合
    };
  },
  methods: {
    // 公共回调
    callback(params) {
      if (params.funcName) {
        this[params.funcName](params.data);
      }
    },
    // 重置
    reset() {
      this.current_attr_data = [];
      this.attr_list = {};
    },
    // CarAttrList加载后初始化
    initBasicType() {},
    // CarAttrList的点击事件
    onClickBasicType(data) {
      GetCarsTypeList({ typeId: data.id }).then(response => {
        this.current_basic_type = data;
        this.current_attr_data = response.data.data.data;
        this.attrFormat();
      });
    },
    // 数据格式化
    attrFormat() {
      // 自定义属性为空时，不执行
      if (this.current_attr_data.length === 0) {
        return false;
      }
      // 公用属性的 key
      const basicTypeKey = this.current_basic_type.key;
      // 判断属性集合是否存在 公用属性的key，存在则不处理
      if (this.attr_list[basicTypeKey]) {
        return false;
      }
      // 处理自定义属性
      const attrJson = {};
      this.current_attr_data.forEach(item => {
        attrJson[item.key] = "";
      });
      // 更新属性集合
      this.$set(this.attr_list, basicTypeKey, attrJson);
    },
    // 用于更新父组件
    updateCarsAttr() {
      this.$emit("update:value", JSON.stringify(this.attr_list)); // JSON.parse()
    }
  }
};
</script>

<style lang="scss" scoped></style>
