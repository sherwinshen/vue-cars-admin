<template>
  <div class="cars-add-wrap">
    <FormComp
      ref="carsAddForm"
      :formItem="formItem"
      :formHandler="formHandler"
      :formData="formData"
      :buttonLoading="button_loading"
      :isRestore="isRestore"
    >
      <template v-slot:maintain>
        <el-date-picker
          v-model="formData.maintainDate"
          prop="maintainDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <span style="display: inline-block; margin-left: 10px;"
          >下次保养日期：2020-12-12</span
        >
      </template>
      <template v-slot:energy>
        <el-radio-group
          v-model="formData.energyType"
          @change="changeEnergyType"
        >
          <el-radio
            v-for="item in energyType"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
        <div
          class="progress-bar-wrap"
          v-if="formData.energyType === 1 || formData.energyType === 3"
        >
          <span class="label-text">电量：</span>
          <el-slider
            class="energy-slider"
            v-model="formData.electric"
            show-input
          ></el-slider>
        </div>
        <div
          class="progress-bar-wrap"
          v-if="formData.energyType === 2 || formData.energyType === 3"
        >
          <span class="label-text">油量：</span>
          <el-slider
            class="energy-slider"
            v-model="formData.oil"
            show-input
          ></el-slider>
        </div>
      </template>
      <template v-slot:carsAttr>
        <CarAttr
          ref="carAttr"
          :oil="formData.oil"
          :initValue="formData.carsAttr"
          :value.sync="formData.carsAttr"
          :countKm.sync="formData.countKm"
        />
      </template>
      <template v-slot:leaseList>
        <el-row :gutter="20">
          <el-col
            :span="4"
            v-for="item in leaseListData"
            :key="item.carsLeaseTypeId"
          >
            <div>{{ item.carsLeaseTypeName }}</div>
            <el-input-number
              v-model="item.price"
              controls-position="right"
              :min="0"
              :max="10000"
              placeholder="请输入价格"
              style="width: 100%;"
            ></el-input-number>
          </el-col>
        </el-row>
      </template>
    </FormComp>
  </div>
</template>

<script>
import FormComp from "@/components/FormComp";
import CarAttr from "@/components/common/CarAttr";
import { GetBrand, GetParking } from "@/api/common";
import { CarsInfoAdd, CarsInfoDetailed, CarsInfoEdit } from "@/api/cars";
import { RentList } from "@/api/rent";

export default {
  name: "CarsAdd",
  components: { FormComp, CarAttr },
  data() {
    return {
      id: this.$route.query.id,
      energyType: this.$store.state.config.energyType,
      leaseListData: [],
      formItem: [
        {
          type: "select",
          label: "车辆品牌",
          placeholder: "请选择车辆品牌",
          prop: "carsBrandId",
          selectValue: "id", // 自有的私有属性
          selectLabel: "nameCh",
          options: [],
          required: true
        },
        {
          type: "select",
          label: "停车场",
          placeholder: "请选择停车场",
          selectValue: "id", // 自有的私有属性
          selectLabel: "parkingName",
          prop: "parkingId",
          options: [],
          required: true
        },
        {
          type: "radio",
          label: "禁启用",
          prop: "status",
          options: this.$store.state.config.radio_disabled,
          required: true
        },
        // {
        //   type: "upload",
        //   prop: "carsImg_true",
        //   label: "略缩图"
        // },
        {
          type: "input",
          prop: "carsImg",
          label: "略缩图",
          placeholder: "为测试方便，缩略图直接采用图片地址的形式"
        },
        {
          type: "input",
          label: "车辆型号",
          placeholder: "请输入车辆型号",
          prop: "carsMode",
          required: true
        },
        {
          type: "input",
          label: "车牌号",
          placeholder: "请输入车牌号",
          prop: "carsNumber",
          required: true
        },
        {
          type: "input",
          label: "车架号",
          placeholder: "请输入车架号",
          prop: "carsFrameNumber",
          required: true
        },
        {
          type: "input",
          label: "发动机号",
          placeholder: "请输入发动机号",
          prop: "engineNumber",
          required: true
        },
        {
          type: "radio",
          label: "年检",
          placeholder: "请选择年检",
          prop: "yearCheck",
          options: this.$store.state.config.year_check,
          required: true
        },
        {
          type: "slot",
          slotName: "maintain",
          prop: "maintainDate",
          label: "保养日期"
        },
        {
          type: "radio",
          label: "档位",
          placeholder: "请选择档位",
          prop: "gear",
          options: this.$store.state.config.gear,
          required: true
        },
        {
          type: "slot",
          slotName: "energy",
          prop: "energyType",
          label: "能源类型",
          required: true,
          requiredMsg: "请先选择能源类型"
        },
        {
          type: "input",
          label: "可行驶公里",
          prop: "countKm"
        },
        {
          type: "slot",
          slotName: "carsAttr",
          prop: "carsAttr",
          label: "车辆属性"
        },
        {
          type: "slot",
          slotName: "leaseList",
          prop: "lease",
          label: "租赁价格"
        },
        {
          type: "editor",
          prop: "content",
          label: "车辆描述"
        }
      ],
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
      formData: {
        parkingId: "",
        carsBrandId: "",
        carsMode: "",
        carsNumber: "",
        carsFrameNumber: "",
        engineNumber: "",
        yearCheck: null,
        gear: null,
        energyType: null,
        electric: 0,
        oil: 0,
        carsAttr: "",
        content: "",
        maintainDate: "",
        status: null,
        carsImg: "",
        countKm: 0
      },
      isRestore: false, // 是否为恢复数据
      button_loading: false
    };
  },
  beforeMount() {
    this.getBrandList();
    this.getParkingList();
    this.getLeaseList();
    this.getDetail();
  },
  methods: {
    // 恢复数据
    getDetail() {
      if (!this.id) {
        return false;
      }
      CarsInfoDetailed({ id: this.id })
        .then(response => {
          const data = response.data.data;
          if (!data) {
            return false;
          }
          for (let key in data) {
            if (Object.keys(this.formData).includes(key)) {
              this.formData[key] = data[key];
            }
          }
          this.leaseListData = data.leasePrice;
          this.isRestore = true;
        })
        .catch(error => {
          console.error("error", error);
        });
    },
    // 获取品牌列表
    getBrandList() {
      GetBrand().then(response => {
        const data = response.data.data.data;
        if (data) {
          const carsBrand = this.formItem.filter(
            item => item.prop === "carsBrandId"
          );
          if (carsBrand.length > 0) {
            carsBrand[0].options = data;
          }
        }
      });
    },
    // 获取租车列表
    getLeaseList() {
      // id 存在则不请求
      if (this.id) {
        return false;
      }
      RentList().then(response => {
        const data = response.data.data.data;
        if (data) {
          this.leaseListData = data;
        }
      });
    },
    // 获取停车场列表
    getParkingList() {
      GetParking().then(response => {
        const data = response.data.data.data;
        if (data) {
          const parking = this.formItem.filter(
            item => item.prop === "parkingId"
          );
          if (parking.length > 0) {
            parking[0].options = data;
          }
        }
      });
    },
    // 切换能源类型
    changeEnergyType() {
      this.formData.oil = 0;
      this.formData.electric = 0;
    },
    // 提交数据
    submit() {
      // 首先初始化carsAttr
      this.$refs.carAttr.updateCarsAttr();
      this.$refs.carsAddForm.$refs.form.validate(valid => {
        if (valid) {
          this.id ? this.edit() : this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增数据
    add() {
      this.button_loading = true;
      CarsInfoAdd({ ...this.formData, leasePrice: this.leaseListData })
        .then(response => {
          this.$message({
            message: response.data.message,
            type: "success"
          });
          this.button_loading = false;
          this.reset();
        })
        .catch(error => {
          this.button_loading = true;
          console.error("error", error);
        });
    },
    // 编辑数据
    edit() {
      CarsInfoEdit({
        ...this.formData,
        id: this.id,
        leasePrice: this.leaseListData
      })
        .then(response => {
          this.$message({
            message: response.data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.error("error", error);
        });
    },
    // 重置数据
    reset() {
      this.$refs.carsAddForm.reset();
      this.$refs.carAttr.reset();
      this.leaseListData.forEach(item => {
        item.price = 0;
      });
    }
  }
};
</script>

<style lang="scss">
.progress-bar-wrap {
  display: flex;
  flex-direction: row;
  .label-text {
    margin-right: 10px;
  }
  .energy-slider {
    flex: 1;
    max-width: 600px;
  }
}
</style>
