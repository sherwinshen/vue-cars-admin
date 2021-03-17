<template>
  <div class="cars-attr-wrap">
    <el-row>
      <!--基础类型-->
      <el-col :span="21" :gutter="20">
        <CarAttrList @callback="callback" :isInit="true" />
      </el-col>
      <!--新增按钮-->
      <el-col :span="3">
        <el-button
          type="success"
          size="small"
          class="pull-right margin-bottom-10 width-80"
          @click="onClickAdd"
        >
          新增
        </el-button>
      </el-col>
    </el-row>
    <el-divider />
    <!--表格-->
    <TableComp ref="attrsTable" :tableConfig="tableConfig" />
    <!--弹窗-->
    <DialogAttr
      :dialogVisible.sync="visible"
      :data="current_cars_type_data"
      @callback="callback"
    />
  </div>
</template>

<script>
import TableComp from "@/components/TableComp";
import CarAttrList from "@/components/common/CarAttrList";
import DialogAttr from "@/components/dialog/DialogAttr";

export default {
  name: "CarsAttr",
  components: { TableComp, CarAttrList, DialogAttr },
  data() {
    return {
      visible: false,
      current_cars_type_data: {},
      tableConfig: {
        searchFlag: false,
        paginationFlag: false,
        url: "carsAttrList",
        isRequest: false,
        selectionFlag: false,
        data: {
          pageSize: 10,
          pageNumber: 1
        },
        tHead: [
          { label: "文本", prop: "value" },
          { label: "字段", prop: "key" }
        ]
      }
    };
  },
  methods: {
    // 公共回调
    callback(params) {
      if (params.funcName) {
        this[params.funcName](params.data);
      }
    },
    // 初始化页面
    initBasicType(data) {
      this.current_cars_type_data = data[0];
      this.getCarsAttrList();
    },
    // 点击基础类型
    onClickBasicType(data) {
      this.current_cars_type_data = data;
      this.getCarsAttrList();
    },
    // 点击新增按钮
    onClickAdd() {
      if (!this.current_cars_type_data.id) {
        this.$message({
          message: "请选择车辆公共属性",
          type: "warning"
        });
        return false;
      }
      this.visible = true;
    },
    // 获取车辆自定义属性
    getCarsAttrList() {
      this.$refs.attrsTable.requestData({
        typeId: this.current_cars_type_data.id
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
