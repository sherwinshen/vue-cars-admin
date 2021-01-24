<template>
  <el-cascader
    ref="cascade"
    v-model="value"
    :props="options"
    :class="{ 'cascader-input': initValueFlag }"
    :placeholder="initValue"
    @change="changeData"
  ></el-cascader>
</template>

<script>
import { GetCity } from "@/api/common";

export default {
  name: "CityArea",
  props: {
    cityAreaValue: {
      type: String,
      default: ""
    },
    mapInteraction: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const _this = this;
    return {
      address: [],
      addressData: {},
      value: "",
      options: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          const requestData = {}; // 请求参数
          const config = {
            0: {
              type: "province"
            },
            1: {
              type: "city",
              code: "province"
            },
            2: {
              type: "area",
              code: "city"
            }
          };
          requestData.type = config[level].type;
          if (config[level].code) {
            requestData[`${config[level].code}_code`] = node.value;
          }
          GetCity(requestData)
            .then(response => {
              const data = response.data.data.data;
              data.forEach(item => {
                item.value = item[`${config[level].type.toUpperCase()}_CODE`];
                item.label = item[`${config[level].type.toUpperCase()}_NAME`];
                item.leaf = level >= 2;
              });
              _this.addressData[config[level].type] = data;
              // 返回节点数据
              resolve(data);
            })
            .catch(error => {
              console.log("error", error);
            });
          if (node.level !== 0) {
            _this.getAddress(node);
          }
        }
      },
      initValue: "请选择省市区",
      initValueFlag: false
    };
  },
  methods: {
    /** 初始化默认值  */
    initDefault(value) {
      if (value) {
        this.initValueFlag = true;
        this.initValue = value.split(",").join(" / ");
      }
    },
    changeData(values) {
      this.$emit("update:cityAreaValue", values.join());
      // 匹配最后区县项
      const lastCode = values[values.length - 1];
      const area = this.addressData.area.filter(
        item => item.value === lastCode
      )[0];
      this.address[2] = area.label;
      this.getAddress();
    },
    getAddress(node) {
      if (node) {
        this.address[node.level - 1] = node.label;
      }
      // 为 true 时，执行地图交互
      if (this.mapInteraction) {
        this.$emit("callback", {
          funcName: "setMapCenter",
          data: {
            address: this.address.join("")
          }
        });
      }
    },
    clear() {
      this.$refs["cascade"].handleClear();
    }
  }
};
</script>

<style lang="scss" scoped></style>
