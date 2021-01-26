<template>
  <div class="parking-list-wrap">
    <!--搜索部分-->
    <el-row>
      <el-col :span="22">
        <el-form
          :inline="true"
          :model="filterForm"
          class="filter-form"
          size="small"
        >
          <el-form-item label="区域">
            <CityArea
              ref="cityArea"
              :cityAreaValue.sync="filterForm.area"
            ></CityArea>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="filterForm.type" class="width-100">
              <el-option
                v-for="item in parking_type"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="禁启用" prop="status">
            <el-select v-model="filterForm.status" class="width-100">
              <el-option
                v-for="item in parking_status"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键词" prop="status">
            <el-select v-model="search_key" class="width-100">
              <el-option label="停车场名称" value="parkingName"></el-option>
              <el-option label="详细区域" value="address"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="keyword" class="width-140"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData">搜索</el-button>
            <el-button type="primary" @click="clearFilterForm">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">
        <div class="pull-right">
          <router-link to="/parkingAdd">
            <el-button type="primary" size="small">新增停车场</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <!--表格部分-->
    <TableComp
      ref="parkingTable"
      class="margin-top-10"
      :tableConfig="tableConfig"
    >
      <template v-slot:status="slotProps">
        <el-switch
          v-model="slotProps.slotProps.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="switchChange(slotProps.slotProps)"
        >
        </el-switch>
      </template>
      <template v-slot:lnglat="slotProps">
        <el-button
          type="success"
          size="small"
          plain
          @click="openMap(slotProps.slotProps)"
          >查看地图
        </el-button>
      </template>
      <template v-slot:operation="slotProps">
        <el-button
          type="primary"
          size="small"
          plain
          @click="editParkingList(slotProps.slotProps.id)"
          >编辑
        </el-button>
        <el-button
          type="danger"
          size="small"
          plain
          @click="deleteParkingList(slotProps.slotProps.id)"
          >删除
        </el-button>
      </template>
    </TableComp>
    <!--地图弹框部分-->
    <DialogMap :dialogVisible.sync="visible" :data="mapData"></DialogMap>
  </div>
</template>

<script>
import TableComp from "@/components/TableComp";
import CityArea from "@/components/common/CityArea";
import DialogMap from "@/components/dialog/DialogMap";
import { ParkingDelete, ParkingStatus } from "@/api/parking";

export default {
  name: "ParkingList",
  components: { TableComp, CityArea, DialogMap },
  data() {
    return {
      // 表格配置
      tableConfig: {
        tHead: [
          { label: "停车场名称", prop: "parkingName" },
          {
            label: "类型",
            prop: "type",
            type: "function",
            callback: (row, prop) => {
              const data = this.$store.state.config.parking_type_json[
                row[prop]
              ];
              if (data) {
                return data.label;
              }
            }
          },
          {
            label: "区域",
            prop: "address",
            type: "function",
            callback: (row, prop) => {
              const address = row[prop];
              if (address) {
                return address.split(",")[0];
              }
            }
          },
          {
            label: "禁启用",
            prop: "status",
            type: "slot",
            slotName: "status"
          },
          {
            label: "查看位置",
            prop: "lnglat",
            type: "slot",
            slotName: "lnglat"
          },
          {
            label: "操作",
            type: "slot",
            slotName: "operation"
          }
        ],
        url: "parkingList",
        data: {
          pageSize: 10,
          pageNumber: 1
        }
      },
      // 地图弹框显示
      visible: false,
      // 地图弹框数据
      mapData: {},
      // 防止switch连续触发
      switchFlag: false,

      parking_status: this.$store.state.config.radio_disabled,
      parking_type: this.$store.state.config.parking_type,
      search_key: "",
      keyword: "",
      filterForm: {
        area: "",
        type: "",
        status: ""
      }
    };
  },
  methods: {
    // 公共 - 子组件回调
    callback(params) {
      if (params.funcName) {
        this[params.funcName] && this[params.funcName](params.data);
      }
    },
    // 编辑停车场
    editParkingList(id) {
      this.$router.push({
        name: "ParkingAdd",
        query: {
          id
        }
      });
    },
    // 删除停车场
    deleteParkingList(id) {
      this.$confirm("确定删除此信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ParkingDelete({ id })
          .then(response => {
            this.$message({
              type: "success",
              message: response.data.message
            });
            // 调用table组件方法重新加载数据
            this.$refs.parkingTable.requestData();
          })
          .catch(error => {
            console.log("error", error);
          });
      });
    },
    // 禁启用更改
    switchChange(data) {
      if (this.switchFlag) {
        return false;
      }
      const requestData = {
        id: data.id,
        status: data.status
      };
      this.switchFlag = true;
      ParkingStatus(requestData)
        .then(response => {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.switchFlag = false;
        })
        .catch(error => {
          console.error("error", error);
          this.switchFlag = false;
        });
    },
    // 地图弹框显示
    openMap(data) {
      this.visible = true;
      this.mapData = data;
    },
    // 搜索数据
    searchData() {
      const requestData = {
        pageSize: 10,
        pageNumber: 1
      };
      // 过滤筛选
      const filterData = JSON.parse(JSON.stringify(this.filterForm));
      for (let key in filterData) {
        if (filterData[key]) {
          requestData[key] = filterData[key];
        }
      }
      if (this.search_key && this.keyword) {
        requestData[this.search_key] = this.keyword;
      }
      this.$refs.parkingTable.requestData(requestData);
    },
    // 清空搜索表单
    clearFilterForm() {
      this.filterForm = {
        area: "",
        type: "",
        status: ""
      };
      this.search_key = "";
      this.keyword = "";
      this.$refs.cityArea.clear();
    }
  }
};
</script>

<style lang="scss" scoped></style>
