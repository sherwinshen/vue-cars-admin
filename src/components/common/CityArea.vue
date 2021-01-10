<template>
  <el-cascader :props="options" @change="changeData"></el-cascader>
</template>

<script>
import { GetCity } from "@/api/common";

export default {
  name: "CityArea",
  props: {
    cityAreaValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
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
              // 返回节点数据
              resolve(data);
            })
            .catch(error => {
              console.log("error", error);
            });
        }
      }
    };
  },
  methods: {
    changeData(values) {
      this.$emit("update:cityAreaValue", values.join());
    }
  }
};
</script>

<style lang="scss" scoped></style>
