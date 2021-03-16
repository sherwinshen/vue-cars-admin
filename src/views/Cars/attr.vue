<template>
  <div class="cars-attr-wrap">
    <el-row>
      <el-col :span="21" :gutter="20">
        <el-row>
          <el-col
            :span="3"
            v-for="(item, index) in cars_list_basis_item"
            :key="index"
          >
            <el-button
              :type="current_cars_type_id === item.id ? 'primary' : ''"
              :key="index"
              size="small"
              @click="selectedType(item)"
              class="margin-bottom-10 width-100"
            >
              {{ item.value }}
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-button
          type="success"
          @click="carsTypeAddDialog"
          size="small"
          class="pull-right margin-bottom-10 width-80"
        >
          新增
        </el-button>
      </el-col>
    </el-row>
    <el-divider />
    <TableComp ref="attrsTable" :tableConfig="tableConfig" />
    <DialogAttr
      :dialogVisible.sync="visible"
      :data="current_cars_type_data"
      @callback="callback"
    />
  </div>
</template>

<script>
import TableComp from "@/components/TableComp";
import DialogAttr from "@/components/dialog/DialogAttr";
import { GetCarsTypeBasis } from "@/api/cars";

export default {
  name: "CarsAttr",
  components: { TableComp, DialogAttr },
  beforeMount() {
    this.getCarsType();
  },
  data() {
    return {
      visible: false,
      tableConfig: {
        searchFlag: false,
        // formItem: [
        //   { label: "关键字", type: "keyword", options: ["key", "value"] }
        // ],
        // formConfig: {
        //   resetButton: true,
        //   addLinkType: true,
        //   addLinkConfig: {
        //     type: "success",
        //     label: "新增",
        //     handler: () => this.carsTypeAddDialog()
        //   }
        // },
        paginationFlag: false,
        url: "carsAttrList",
        isRequest: false,
        data: {
          pageSize: 10,
          pageNumber: 1
        },
        selectionFlag: false,
        tHead: [
          { label: "文本", prop: "value" },
          { label: "字段", prop: "key" }
        ]
      },
      cars_list_basis_item: [], // 车辆公用属性
      current_cars_type_id: "", // 当前车辆公用属性ID
      current_cars_type_data: {} // 当前公用属性数据
    };
  },
  methods: {
    // 公共回调
    callback(params) {
      if (params.funcName) {
        this[params.funcName](params.data);
      }
    },
    async getCarsType() {
      // 首先请求接口，获得公用属性
      const data = await this.getCarsTypeBasis();
      // 赋值
      this.current_cars_type_data = data[0];
      this.current_cars_type_id = data[0].id;
      // 然后请求接口，获取第一个公共属性的的自定义属性
      this.getCarsTypeList();
    },
    // 获取车辆公用属性
    getCarsTypeBasis() {
      return GetCarsTypeBasis().then(response => {
        const data = response.data.data.data;
        this.cars_list_basis_item = data;
        return data;
      });
    },
    // 获取自定义属性列表
    selectedType(data) {
      this.current_cars_type_id = data.id;
      this.current_cars_type_data = data;
      this.getCarsTypeList();
    },
    // 获取车辆自定义属性
    getCarsTypeList() {
      this.$refs.attrsTable.requestData({
        typeId: this.current_cars_type_data.id
      });
    },
    // 自定义属性弹窗
    carsTypeAddDialog() {
      if (!this.current_cars_type_data.id) {
        this.$message({
          message: "请选择车辆公共属性",
          type: "warning"
        });
        return false;
      }
      this.visible = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
