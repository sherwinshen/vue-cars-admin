<template>
  <div class="parking-list-wrap">
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
            <el-button type="primary" @click="getParkingList">搜索</el-button>
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
    <el-table
      ref="parkingTable"
      class="margin-top-10"
      :data="parkingData"
      border
      v-loading="table_loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="parkingName" label="停车场名称"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          {{ scope.row.type | getType }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="区域"></el-table-column>
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
      <el-table-column prop="lnglat" label="查看位置">
        <template slot-scope="scoped">
          <el-button
            type="success"
            size="small"
            plain
            @click="openMap(scoped.row)"
            >查看地图
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button
            type="primary"
            size="small"
            plain
            @click="goToEdit(scoped.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" plain @click="delConfirm(scoped.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <map-dialog :dialogVisible.sync="visible" :data="mapData"></map-dialog>
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
import { ParkingList, ParkingDelete } from "@/api/parking";
import CityArea from "@/components/common/CityArea";
import MapDialog from "@/components/dialog/MapDialog";

let _this;
export default {
  name: "ParkingList",
  components: {
    CityArea,
    MapDialog
  },
  filters: {
    getType(value) {
      const data = _this.parking_type.filter(item => item.value === value);
      if (data && data.length > 0) {
        return data[0].label;
      }
    }
  },
  data() {
    _this = this;
    return {
      table_loading: false,
      pageSize: 10,
      pageNumber: 1,
      total: 0,
      currentPage: 1,
      parking_status: this.$store.state.config.parking_status,
      parking_type: this.$store.state.config.parking_type,
      search_key: "",
      keyword: "",
      filterForm: {
        area: "",
        type: "",
        status: ""
      },
      parkingData: [],
      mapData: {},
      visible: false
    };
  },
  beforeMount() {
    this.getParkingList();
  },
  methods: {
    goToEdit(id) {
      this.$router.push({
        name: "ParkingAdd",
        query: {
          id
        }
      });
    },
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
      this.table_loading = true;
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
          this.table_loading = false;
        })
        .catch(error => {
          this.table_loading = false;
          console.error("error", error);
        });
    },
    /** 删除 */
    delConfirm(id) {
      this.$confirm("确定删除此信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ParkingDelete({ id }).then(response => {
            this.$message({
              type: "success",
              message: response.data.message
            });
            this.getParkingList();
          });
        })
        .catch(error => {
          console.error("error", error);
        });
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getParkingList();
    },
    clearFilterForm() {
      this.filterForm = {
        area: "",
        type: "",
        status: ""
      };
      this.search_key = "";
      this.keyword = "";
      this.$refs.cityArea.clear();
    },
    openMap(data) {
      this.visible = true;
      this.mapData = data;
    }
  }
};
</script>

<style lang="scss" scoped></style>
