<template>
  <div class="parking-add-wrap">
    <FormComp
      ref="parkingAddForm"
      :formItem="formItem"
      :formHandler="formHandler"
      :formData="formData"
      :buttonLoading="button_loading"
    >
      <template v-slot:area>
        <CityArea
          ref="cityArea"
          :cityAreaValue.sync="formData.area"
          :mapInteraction="true"
          @callback="callback"
        />
      </template>
      <template v-slot:amap>
        <AMap
          ref="amap"
          :options="mapOptions"
          @lnglat="updateLngLat"
          @callback="callback"
          :height="'400px'"
        />
      </template>
    </FormComp>
  </div>
</template>

<script>
import FormComp from "@/components/FormComp";
import CityArea from "@/components/common/CityArea";
import AMap from "@/components/Map";
import { ParkingAdd, ParkingDetailed, ParkingEdit } from "@/api/parking";

export default {
  name: "ParkingAdd",
  components: { FormComp, CityArea, AMap },
  data() {
    return {
      id: this.$route.query.id,
      // 表单配置
      formItem: [
        {
          type: "input",
          label: "停车场名称",
          prop: "parkingName",
          placeholder: "请输入停车场名称",
          required: true
        },
        {
          type: "slot",
          label: "区域",
          prop: "area",
          slotName: "area",
          required: true
        },
        {
          type: "radio",
          label: "类型",
          prop: "type",
          options: this.$store.state.config.parking_type,
          required: true
        },
        {
          type: "inputNumber",
          label: "可停放车辆",
          placeholder: "请输入数字类型",
          prop: "carsNumber",
          required: true
        },
        {
          type: "radio",
          label: "禁启用",
          prop: "status",
          options: this.$store.state.config.radio_disabled,
          required: true
        },
        { type: "slot", slotName: "amap", label: "位置" },
        {
          type: "input",
          label: "经纬度",
          placeholder: "请在位置处点击",
          prop: "lnglat",
          disabled: true,
          required: true
        }
      ],
      // 表单操作
      formHandler: [
        {
          label: "确定",
          key: "submit",
          type: "primary",
          handler: () => this.submit()
        },
        {
          label: "重置",
          key: "reset",
          handler: () => this.reset()
        }
      ],
      // 表单数据
      formData: {
        parkingName: "",
        area: "",
        type: "",
        carsNumber: "",
        status: "",
        lnglat: "",
        content: ""
      },
      // 提交按钮loading
      button_loading: false,
      // 地图配置
      mapOptions: {
        mapLoad: true
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
    // 恢复数据的时候需要地图已经加载完毕，因此通过地图加载回调来恢复数据
    mapLoad() {
      this.getDetail();
    },
    // 更新经纬度
    updateLngLat(value) {
      this.formData.lnglat = value.value;
    },
    // 设置覆盖物
    setMapCenter(value) {
      this.$refs.amap.setMapCenter(value.address);
    },
    // 恢复数据
    getDetail() {
      if (!this.id) {
        return false;
      }
      ParkingDetailed({ id: this.id }).then(response => {
        const data = response.data.data;
        // 还原数据
        for (let key in data) {
          // 接口请求出来的
          if (Object.keys(this.formData).includes(key)) {
            this.formData[key] = data[key];
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
    // 重置数据
    reset() {
      this.$refs.parkingAddForm.reset();
      // 清除 cityArea 的值
      this.$refs.cityArea.clear();
      // 清除地图覆盖物
      this.$refs.amap.clearMarker();
    },
    // 提交数据
    submit() {
      this.$refs["parkingAddForm"].$refs.form.validate(valid => {
        if (valid) {
          this.id ? this.editParking() : this.addParking();
        } else {
          return false;
        }
      });
    },
    // 新增数据
    addParking() {
      this.button_loading = true;
      ParkingAdd(this.formData)
        .then(response => {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.button_loading = false;
          this.reset();
        })
        .catch(error => {
          this.button_loading = false;
          console.error("error", error);
        });
    },
    // 编辑数据
    editParking() {
      let requestData = JSON.parse(JSON.stringify(this.formData));
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
