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
import { CarsStatus } from "@/api/cars";

export default {
  name: "CarsList",
  components: { TableComp },
  data() {
    return {
      switchDisabled: "",
      // 表格配置
      tableConfig: {
        tHead: [
          { label: "车牌号", prop: "carsMode" },
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
            width: "150px",
            default: {
              deleteButton: true,
              editButton: true,
              editLink: "CarsAdd"
            }
          }
        ],
        url: "carsList",
        data: {
          pageSize: 10,
          pageNumber: 1
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
