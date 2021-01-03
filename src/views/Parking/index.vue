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
          <el-form-item label="停车场名称">
            <el-input
              v-model="filterForm.name"
              placeholder="请输入停车场名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-select v-model="filterForm.area" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="filterForm.type" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
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
    <el-table ref="parkingTable" :data="parkingData" border>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="停车场名称"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="area" label="区域"> </el-table-column>
      <el-table-column prop="disabled" label="禁启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.disabled"
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
  </div>
</template>

<script>
export default {
  name: "ParkingList",
  data() {
    return {
      parkingData: [
        {
          name: "南山停车场",
          type: "室外",
          area: "广东省 深圳市 南山区",
          disabled: 0,
          address: "45632121,54541"
        }
      ],
      filterForm: {
        name: "",
        area: "",
        type: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
