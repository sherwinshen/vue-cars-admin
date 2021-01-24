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
          <el-radio
            v-for="item in parking_type"
            :label="item.value"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可停放车辆" prop="carsNumber">
        <el-input v-model.number="form.carsNumber"></el-input>
      </el-form-item>
      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio
            v-for="item in parking_status"
            :label="item.value"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="位置">
        <div class="map">
          <Map
            ref="amap"
            :options="option_map"
            @lnglat="updateLngLat"
            @callback="callback"
          />
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
import { ParkingAdd, ParkingDetailed, ParkingEdit } from "@/api/parking";

export default {
  name: "ParkingAdd",
  components: {
    Map,
    CityArea
  },
  data() {
    return {
      id: this.$route.query.id,
      button_loading: false,
      parking_status: this.$store.state.config.parking_status,
      parking_type: this.$store.state.config.parking_type,
      option_map: {
        mapLoad: true
      },
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
    // 恢复数据的时候需要地图已经加载完毕，因此通过地图加载回调来恢复数据
    mapLoad() {
      this.getDetail();
    },
    getDetail() {
      if (!this.id) {
        return false;
      }
      ParkingDetailed({ id: this.id }).then(response => {
        const data = response.data.data;
        // 还原数据
        for (let key in data) {
          // 接口请求出来的
          if (Object.keys(this.form).includes(key)) {
            this.form[key] = data[key];
          }
        }
        // 设置覆盖物
        const splitLnglat = data.lnglat.split(",");
        const lnglat = {
          lng: splitLnglat[0],
          lat: splitLnglat[1]
        };
        this.$refs.amap.setMarker(lnglat);
        // 初始化省市区
        this.$refs.cityArea.initDefault(data.region);
      });
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
          this.id ? this.editParking() : this.addParking();
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
    editParking() {
      let requestData = JSON.parse(JSON.stringify(this.form));
      requestData.id = this.id;
      this.button_loading = true;
      ParkingEdit(requestData)
        .then(response => {
          this.$message({
            type: "success",
            message: response.message
          });
          this.button_loading = false;
          this.$router.push({
            name: "ParkingIndex"
          });
        })
        .catch(error => {
          this.button_loading = false;
          console.error(error);
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
