<template>
  <div class="member-list-wrap">
    <TableComp ref="memberTable" :tableConfig="tableConfig"></TableComp>
  </div>
</template>

<script>
import TableComp from "@/components/TableComp";

export default {
  name: "MemberList",
  components: {
    TableComp
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
            width: 150
          },
          {
            label: "真实姓名",
            prop: "truename",
            width: 150
          },
          {
            label: "租车订单",
            prop: "order",
            width: 150
          },
          {
            label: "违章预存金",
            prop: "illegalAmount",
            width: 200
          },
          {
            label: "实名认证",
            prop: "check_real_name",
            type: "function",
            callback: row => {
              return row.check_real_name ? "已认证" : "-";
            }
          },
          {
            label: "驾驶证",
            prop: "check_cars",
            type: "function",
            callback: row => {
              return row.check_cars ? "已认证" : "-";
            }
          },
          {
            label: "黑名单",
            prop: "blacklist",
            type: "function",
            callback: row => {
              return row.blacklist ? "是" : "-";
            }
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
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
