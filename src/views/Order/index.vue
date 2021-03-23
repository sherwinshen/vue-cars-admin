<template>
  <div class="order-list-wrap">
    <TableComp ref="orderTable" :tableConfig="tableConfig" />
  </div>
</template>

<script>
import TableComp from "@/components/TableComp";
import {
  OrderWait,
  OrderOver,
  OrderCancel,
  OrderOvertime,
  OrderReturn
} from "@/api/order";

export default {
  name: "OrderList",
  components: { TableComp },
  data() {
    return {
      tableConfig: {
        url: "orderList",
        tHead: [
          { label: "订单号", prop: "order_no" },
          {
            label: "状态",
            prop: "order_status",
            type: "function",
            callback: row => {
              const orderStatus = this.$store.state.config.order_status;
              const status = orderStatus[row.order_status];
              return status ? status.zh : "";
            }
          },
          {
            label: "日期",
            prop: "create_date",
            type: "function",
            width: 110,
            callback: row => {
              // 空数据时
              if (!row.create_date) {
                return "";
              }
              // 分割日期
              const dateSplit = row.create_date.split(" ");
              return `${dateSplit[0]} </br> ${dateSplit[1]}`;
            }
          },
          {
            label: "金额",
            prop: "amount"
          },
          {
            label: "模拟",
            type: "operation",
            width: 380,
            buttonGroup: [
              {
                label: "待取车",
                type: "",
                event: "button",
                handler: data => this.orderWait(data)
              },
              {
                label: "超时",
                type: "",
                event: "button",
                handler: data => this.orderOvertime(data)
              },
              {
                label: "完成",
                type: "",
                event: "button",
                handler: data => this.orderOver(data)
              },
              {
                label: "取消",
                type: "",
                event: "button",
                handler: data => this.orderCancel(data)
              },
              {
                label: "待还车",
                type: "",
                event: "button",
                handler: data => this.orderReturn(data)
              }
            ]
          },
          {
            label: "操作",
            type: "operation",
            buttonGroup: [
              {
                label: "编辑",
                type: "primary",
                event: "button",
                handler: () => {}
              },
              {
                label: "删除",
                type: "danger",
                event: "button",
                handler: () => {}
              }
            ]
          }
        ],
        searchFlag: true,
        selectionFlag: false,
        data: {
          pageSize: 10,
          pageNumber: 1
        },
        formItem: [
          {
            type: "keyword",
            label: "关键字",
            options: ["order_no", "order_status"]
          }
        ],
        formConfig: {
          addButton: false,
          resetButton: true
        }
      }
    };
  },
  methods: {
    orderWait(data) {
      OrderWait({
        order_no: data.order_no,
        cars_id: data.cars_id
      }).then(response => {
        this.showMessage(response.data.message);
        this.loadData();
      });
    },
    orderOvertime(data) {
      OrderOvertime({
        order_no: data.order_no,
        cars_id: data.cars_id
      }).then(response => {
        this.showMessage(response.data.message);
        this.loadData();
      });
    },
    orderOver(data) {
      OrderOver({
        order_no: data.order_no,
        cars_id: data.cars_id
      }).then(response => {
        this.showMessage(response.data.message);
        this.loadData();
      });
    },

    orderCancel(data) {
      OrderCancel({
        order_no: data.order_no,
        cars_id: data.cars_id
      }).then(response => {
        this.showMessage(response.data.message);
        this.loadData();
      });
    },
    orderReturn(data) {
      OrderReturn({
        order_no: data.order_no,
        cars_id: data.cars_id
      }).then(response => {
        this.showMessage(response.data.message);
        this.loadData();
      });
    },
    showMessage(message) {
      this.$message({
        type: "success",
        message: message
      });
    },
    loadData() {
      this.$refs.orderTable.requestData();
    }
  }
};
</script>

<style lang="scss" scoped></style>
