<template>
  <div class="rent-list-wrap">
    <TableComp ref="rentTable" :tableConfig="tableConfig">
      <template v-slot:status="slotProps">
        <el-switch
          v-model="slotProps.slotProps.carsLeaseStatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="switchChange(slotProps.slotProps)"
        >
        </el-switch>
      </template>
    </TableComp>
    <DialogLease
      :title="dialogTitle"
      :dialogVisible.sync="visible"
      :data="current_lease_data"
      @callback="callback"
    />
  </div>
</template>

<script>
import TableComp from "@/components/TableComp";
import DialogLease from "@/components/dialog/DialogLease";
import { RentStatus } from "@/api/rent";

export default {
  name: "RentList",
  components: {
    TableComp,
    DialogLease
  },
  data() {
    return {
      dialogTitle: "新增租车类型",
      current_lease_data: {},
      visible: false,
      tableConfig: {
        checkbox: false,
        pagination: false,
        selectionFlag: false,
        tHead: [
          { label: "租车类型", prop: "carsLeaseTypeName" },
          {
            label: "禁启用",
            prop: "carsLeaseStatus",
            type: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            type: "operation",
            width: 500,
            buttonGroup: [
              {
                label: "编辑",
                type: "primary",
                event: "button",
                handler: data => this.edit(data)
              },
              {
                label: "删除",
                type: "danger",
                event: "button",
                handler: data => this.delete(data)
              }
            ]
          }
        ],
        url: "leaseList",
        searchFlag: true,
        formItem: [
          { label: "关键字", type: "keyword", options: ["carsLeaseTypeName"] }
        ],
        formConfig: {
          resetButton: true,
          addLinkType: true,
          addLinkConfig: {
            label: "新增",
            type: "success",
            handler: () => this.add()
          }
        }
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
    // 表格数据请求
    loadData() {
      this.current_lease_data = {};
      this.$refs.rentTable.requestData();
    },
    // 切换禁启用状态
    switchChange(data) {
      RentStatus({ id: data.carsLeaseTypeId, status: data.carsLeaseStatus })
        .then(response => {
          this.$message({
            message: response.data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.error("error", error);
          data.carsLeaseStatus = !data.carsLeaseStatus;
        });
    },
    // 删除
    delete() {
      this.$message({
        message: "暂不支持删除",
        type: "warning"
      });
    },
    // 编辑
    edit(data) {
      this.dialogTitle = "修改租车类型";
      this.visible = true;
      this.current_lease_data = Object.assign({}, data);
    },
    // 新增
    add() {
      this.dialogTitle = "新增租车类型";
      this.visible = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
