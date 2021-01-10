<template>
  <div class="parking-add-wrap">
    <el-form ref="parkingAddForm" :model="form" label-width="100px">
      <el-form-item label="停车场名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="area">
        <CityArea :cityAreaValue.sync="form.area" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="室内"></el-radio>
          <el-radio label="室外"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可停放车辆" prop="number">
        <el-input v-model.number="form.number"></el-input>
      </el-form-item>
      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="禁用"></el-radio>
          <el-radio label="启用"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="位置">
        <div class="map">
          <Map />
        </div>
      </el-form-item>
      <el-form-item label="经纬度" prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确定</el-button>
        <el-button @click="resetForm('parkingAddForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Map from "@/components/common/Map";
import CityArea from "@/components/common/CityArea";

export default {
  name: "ParkingAdd",
  components: {
    Map,
    CityArea
  },
  data() {
    return {
      form: {
        name: "",
        area: "",
        type: "",
        number: 0,
        status: 0,
        address: "",
        desc: ""
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.parking-add-wrap {
  .el-input__inner {
    width: 400px;
    min-width: 200px;
  }
  .map {
    height: 400px;
  }
}
</style>
