<template>
  <div class="brand-list-wrap">
    <el-row>
      <el-col :span="21">
        <el-form :inline="true" :model="searchForm" size="small">
          <el-form-item label="品牌名称">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入车辆品牌名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <div class="pull-right">
          <el-button type="primary" size="small" @click="addBrands"
            >新增车辆品牌</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="imgUrl" label="Logo"></el-table-column>
      <el-table-column prop="name" label="车辆品牌"></el-table-column>
      <el-table-column prop="status" label="禁启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.disabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" size="small" plain>编辑</el-button>
          <el-button type="danger" size="small" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-brands :dialogFlag.sync="dialogFlag"></add-brands>
  </div>
</template>

<script>
import AddBrands from "@/components/AddBrands";

export default {
  name: "BrandList",
  components: {
    AddBrands
  },
  data() {
    return {
      dialogFlag: false,
      searchForm: {
        name: ""
      },
      tableData: [
        {
          imgUrl: "test",
          name: "奔驰",
          disabled: true
        }
      ]
    };
  },
  methods: {
    addBrands() {
      this.dialogFlag = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
