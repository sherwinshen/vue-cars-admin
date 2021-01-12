<template>
  <div class="parking-add-wrap">
    <el-form
      ref="parkingAddForm"
      :rules="rules"
      :model="form"
      label-width="100px"
    >
      <el-form-item label="停车场名称" prop="parkingName">
        <el-input v-model="form.parkingName"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="area">
        <CityArea
          ref="cityArea"
          :cityAreaValue.sync="form.area"
          :mapInteraction="true"
          @callback="callback"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="item in type" :label="item.value" :key="item.value"
            >{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可停放车辆" prop="carsNumber">
        <el-input v-model.number="form.carsNumber"></el-input>
      </el-form-item>
      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio v-for="item in status" :label="item.value" :key="item.value"
            >{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="位置">
        <div class="map">
          <Map ref="amap" @lnglat="updateLngLat" />
        </div>
      </el-form-item>
      <el-form-item label="经纬度" prop="lnglat">
        <el-input v-model="form.lnglat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="button_loading" @click="onSubmit()"
          >确定
        </el-button>
        <el-button @click="clearForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Map from "@/components/Map";
import CityArea from "@/components/common/CityArea";
import { ParkingAdd } from "@/api/parking";

export default {
  name: "ParkingAdd",
  components: {
    Map,
    CityArea
  },
  data() {
    return {
      button_loading: false,
      status: [
        { label: "禁用", value: 1 },
        { label: "启用", value: 2 }
      ],
      type: [
        { label: "室内", value: 1 },
        { label: "室外", value: 2 }
      ],
      form: {
        parkingName: "",
        area: "",
        type: "",
        carsNumber: "",
        status: "",
        lnglat: "",
        content: ""
      },
      rules: {
        parkingName: [
          { required: true, message: "请输入停车场名称", trigger: "change" }
        ],
        carsNumber: [
          { required: true, message: "数量不能为空", trigger: "change" },
          { type: "number", message: "请输入数字" }
        ],
        area: [{ required: true, message: "请选择省市区", trigger: "change" }],
        lnglat: [
          { required: true, message: "经纬度不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    callback(params) {
      if (params.funcName) {
        this[params.funcName](params.data);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    updateLngLat(value) {
      this.form.lnglat = value.value;
    },
    setMapCenter(value) {
      this.$refs.amap.setMapCenter(value.address);
    },
    onSubmit() {
      this.$refs["parkingAddForm"].validate(valid => {
        if (valid) {
          this.addParking();
        } else {
          return false;
        }
      });
    },
    addParking() {
      this.button_loading = true;
      ParkingAdd(this.form)
        .then(response => {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.button_loading = false;
          this.clearForm();
        })
        .catch(error => {
          console.error("error", error);
          this.button_loading = false;
        });
    },
    clearForm() {
      this.$refs["parkingAddForm"].resetFields();
      // 清除 cityArea 的值
      this.$refs.cityArea.clear();
      // 清除地图覆盖物
      this.$refs.amap.clearMarker();
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
