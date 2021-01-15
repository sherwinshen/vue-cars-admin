<template>
  <div class="parking-list-wrap">
    <el-row>
      <el-col :span="21">
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
          <el-form-item label="名称">
            <el-input v-model="filterForm.name" class="width-140"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <div class="pull-right">
          <router-link to="/parkingAdd">
            <el-button type="primary" size="small">新增停车场</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <el-table
      ref="parkingTable"
      class="margin-top-10"
      :data="parkingData"
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="parkingName" label="停车场名称"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="area" label="区域"> </el-table-column>
      <el-table-column prop="disabled" label="禁启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="查看位置"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" size="small" plain>编辑</el-button>
          <el-button type="danger" size="small" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="w-e-clear-fix margin-top-20">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :currentPage="currentPage"
        class="pull-right"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ParkingList } from "@/api/parking";
import CityArea from "@/components/common/CityArea";

export default {
  name: "ParkingList",
  components: {
    CityArea
  },
  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      total: 0,
      currentPage: 1,
      parking_status: this.$store.state.config.parking_status,
      parking_type: this.$store.state.config.parking_type,
      filterForm: {
        name: "",
        area: "",
        type: "",
        status: ""
      },
      parkingData: []
    };
  },
  beforeMount() {
    this.getParkingList();
  },
  methods: {
    callback(params) {
      if (params.funcName) {
        this[params.funcName](params.data);
      }
    },
    getParkingList() {
      const requestData = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      };
      ParkingList(requestData)
        .then(response => {
          const data = response.data;
          // 判断数据是否存在
          if (data.data) {
            this.parkingData = data.data.data;
            // 判断页码是否存在
            if (data.data.total) {
              this.total = data.data.total;
            }
          }
        })
        .catch(error => {
          console.error("error", error);
        });
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getParkingList();
    }
  }
};
</script>

<style lang="scss" scoped></style>
