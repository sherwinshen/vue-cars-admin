<template>
  <div class="member-list-wrap">
    <TableComp ref="memberTable" :tableConfig="tableConfig">
      <template v-slot:realName="slotProps">
        <el-button
          size="small"
          plain
          @click="showPhoto(slotProps.slotProps, 'realName')"
          >查看认证</el-button
        >
      </template>
      <template v-slot:checkCars="slotProps">
        <el-button
          size="small"
          plain
          @click="showPhoto(slotProps.slotProps, 'checkCars')"
          >查看认证</el-button
        >
      </template>
    </TableComp>
    <DialogPhoto
      :dialogVisible.sync="visible"
      :type="type"
      :data="dataPhoto"
      :checkFlag="checkFlag"
      @callback="callback"
    />
  </div>
</template>

<script>
import TableComp from "@/components/TableComp";
import DialogPhoto from "@/components/dialog/DialogPhoto";
import { Blacklist, Photo, UpdateRealName, AmountClear } from "@/api/member";

export default {
  name: "MemberList",
  components: {
    TableComp,
    DialogPhoto
  },
  data() {
    return {
      tableConfig: {
        checkbox: false,
        paginationFlag: true,
        selectionFlag: false,
        searchFlag: true,
        tHead: [
          {
            label: "用户名",
            prop: "username",
            width: 110
          },
          {
            label: "真实姓名",
            prop: "truename"
          },
          {
            label: "租车订单",
            prop: "order"
          },
          {
            label: "违章预存金",
            prop: "illegalAmount"
          },
          {
            label: "押金",
            prop: "gilding"
          },
          {
            label: "余额",
            prop: "amount"
          },
          {
            label: "实名认证",
            prop: "check_real_name",
            type: "slot",
            slotName: "realName",
            width: 115
          },
          {
            label: "驾驶证",
            prop: "check_cars",
            type: "slot",
            slotName: "checkCars",
            width: 115
          },
          {
            label: "黑名单",
            prop: "blacklist",
            type: "switch",
            handler: (status, data) => this.updateBlacklist(status, data)
          },
          {
            label: "操作",
            type: "operation",
            width: 300,
            buttonGroup: [
              {
                label: "详情",
                type: "success",
                event: "link",
                name: "MemberDetail",
                key: "id",
                value: "memberId"
              },
              {
                label: "编辑",
                type: "primary",
                event: "link",
                name: "MemberEdit",
                key: "id",
                value: "memberId"
              },
              {
                event: "button",
                label: "清空金额",
                type: "",
                handler: data => this.amountClear(data)
              }
            ],
            default: {
              deleteButton: true,
              deleteId: "memberId"
            },
            slotName: "operation"
          }
        ],
        url: "memberList",
        data: {
          pageSize: 10,
          pageNumber: 1
        },
        formItem: [
          {
            label: "关键字",
            type: "keyword",
            options: ["username", "truename", "card_id"]
          }
        ],
        formConfig: {
          resetButton: true
        }
      },
      visible: false,
      type: "",
      dataPhoto: {},
      checkFlag: true,
      curId: ""
    };
  },
  methods: {
    // 公共回调
    callback(params) {
      if (params.funcName) {
        this[params.funcName](params.data);
      }
    },
    // 黑名单更新
    updateBlacklist(status, data) {
      Blacklist({
        status,
        id: data.memberId
      }).then(response => {
        this.$message({
          message: response.data.message,
          type: "success"
        });
      });
    },
    // 显示证件
    showPhoto(data, type) {
      this.title = type === "checkCars" ? "驾驶证" : "实名认证";
      const requestData = {
        id: data.memberId,
        type: type === "checkCars" ? "drive" : "identity"
      };
      Photo(requestData).then(response => {
        const curData = response.data.data;
        if (curData) {
          this.checkFlag =
            type === "checkCars" ? data.check_cars : data.check_real_name;
          this.type = type === "checkCars" ? "drive" : "identity";
          this.curId = data.memberId;
          this.dataPhoto = curData;
          this.visible = true;
        }
      });
    },
    // 清空金额
    amountClear(data) {
      AmountClear({ member_id: data.memberId }).then(response => {
        this.$refs.memberTable.requestData();
        this.$message({
          type: "success",
          message: response.data.message
        });
      });
    },
    // 更新认证
    updateCheck() {
      const requestData = {
        status: !this.checkFlag,
        id: this.curId,
        type: this.type
      };
      UpdateRealName(requestData).then(response => {
        this.$message({
          message: response.data.message,
          type: "success"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
