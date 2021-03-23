<template>
  <div class="cars-list-wrap">
    <TableComp ref="carsTable" class="margin-top-10" :tableConfig="tableConfig">
      <template v-slot:status="slotProps">
        <el-switch
          v-model="slotProps.slotProps.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="switchChange(slotProps.slotProps)"
        >
        </el-switch>
      </template>
    </TableComp>
  </div>
</template>

<script>
import TableComp from "@/components/TableComp";
import { yearCheckType, energyType } from "@/utils/format";
import { CarsStatus, CarsLock } from "@/api/cars";

export default {
  name: "CarsList",
  components: { TableComp },
  data() {
    return {
      switchDisabled: "",
      // 表格配置
      tableConfig: {
        // 表单配置
        tHead: [
          { label: "车辆型号", prop: "carsMode" },
          { label: "车辆品牌", prop: "nameCh" },
          {
            label: "车辆LOGO",
            prop: "imgUrl",
            type: "image"
          },
          {
            label: "年检",
            prop: "yearCheck",
            type: "function",
            callback: (row, prop) => yearCheckType(row[prop])
          },
          {
            label: "能源类型",
            prop: "energyType",
            type: "function",
            callback: (row, prop) => energyType(row[prop])
          },
          {
            label: "禁启用",
            prop: "status",
            type: "slot",
            slotName: "status"
          },
          {
            label: "车辆状态",
            prop: "cars_status",
            type: "function",
            callback: row => {
              const carsStatus = this.$store.state.config.cars_status;
              const status = carsStatus[row.carsStatus];
              return status ? status.zh : "-";
            }
          },
          { label: "停车场", prop: "parkingName" },
          {
            label: "区域",
            prop: "address",
            type: "function",
            callback: row => row["address"].split(",")[0]
          },
          {
            label: "操作",
            type: "operation",
            width: 150,
            default: {
              deleteButton: true,
              editButton: true,
              editLink: "CarsAdd"
            }
            // buttonGroup: [
            //   {
            //     label: "车辆释放",
            //     type: "",
            //     event: "button",
            //     handler: data => this.lock(data)
            //   }
            // ]
          }
        ],
        // 表单请求地址
        url: "carsList",
        // 表单请求数据
        data: {
          pageSize: 10,
          pageNumber: 1
        },
        searchFlag: true,
        formItem: [
          { type: "region", label: "区域", prop: "area" },
          {
            type: "select",
            prop: "type",
            label: "类型",
            class: "width-100",
            options: this.$store.state.config.parking_type,
            selectValue: "value",
            selectLabel: "label"
          },
          {
            type: "select",
            prop: "status",
            label: "禁启用",
            class: "width-100",
            options: this.$store.state.config.radio_disabled,
            selectValue: "value",
            selectLabel: "label"
          },
          {
            type: "keyword",
            label: "关键字",
            options: ["parkingName", "carsNumber", "address"]
          }
        ],
        formConfig: {
          addButton: true,
          addLink: "/carsAdd",
          addLabel: "新增",
          resetButton: true
        }
      }
    };
  },
  methods: {
    // 禁启用切换
    switchChange(data) {
      const requestData = {
        id: data.id,
        status: data.status
      };
      this.switchDisabled = data.id;
      CarsStatus(requestData)
        .then(response => {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.switchDisabled = "";
        })
        .catch(error => {
          this.switchDisabled = "";
          console.error("error", error);
        });
    },
    // 车辆释放
    lock(data) {
      CarsLock({ id: data.id }).then(response => {
        this.$message({
          type: "success",
          message: response.data.message
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
