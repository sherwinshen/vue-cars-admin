<template>
  <div class="brand-list-wrap">
    <!--搜索部分-->
    <el-row>
      <el-col :span="21">
        <el-form :inline="true" :model="searchForm" size="small">
          <el-form-item label="品牌名称">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入车辆品牌名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <div class="pull-right">
          <el-button type="primary" size="small" @click="showAddDialog"
            >新增车辆品牌
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!--表格部分-->
    <TableComp
      ref="brandTable"
      class="margin-top-10"
      :tableConfig="tableConfig"
    >
      <template v-slot:status="slotProps">
        <el-switch
          v-model="slotProps.slotProps.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="switchChange(slotProps.slotProps)"
        >
        </el-switch>
      </template>
      <template v-slot:operation="slotProps">
        <el-button
          type="primary"
          size="small"
          plain
          @click="editBrandList(slotProps.slotProps)"
          >编辑
        </el-button>
        <el-button
          type="danger"
          size="small"
          plain
          @click="deleteBrandList(slotProps.slotProps.id)"
          >删除
        </el-button>
      </template>
    </TableComp>
    <!--新增弹窗部分-->
    <BrandAdd
      :dialogFlag.sync="dialogFlag"
      :data="brandData"
      @updateData="updateTable"
    ></BrandAdd>
  </div>
</template>

<script>
import TableComp from "@/components/TableComp";
import BrandAdd from "@/views/Brand/add";
import { BrandDelete, BrandStatus } from "@/api/brand";

export default {
  name: "BrandList",
  components: { TableComp, BrandAdd },
  data() {
    return {
      // 表格配置
      tableConfig: {
        tHead: [
          {
            label: "LOGO",
            prop: "imgUrl",
            type: "image",
            width: 150
          },
          {
            label: "车辆品牌",
            prop: "name",
            type: "function",
            callback: row => `${row.nameCh}/${row.nameEn}`
          },
          {
            label: "禁启用",
            prop: "status",
            type: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            type: "slot",
            width: 200,
            slotName: "operation"
          }
        ],
        url: "brandList",
        data: {
          pageSize: 10,
          pageNumber: 1
        }
      },
      // switch防连续处罚
      switchFlag: false,
      // 搜索表单
      searchForm: {
        name: ""
      },
      // 弹窗显示
      dialogFlag: false,
      // 编辑时弹窗传递数据
      brandData: {}
    };
  },
  methods: {
    // 新增弹框显示
    showAddDialog() {
      this.brandData = {};
      this.dialogFlag = true;
    },
    // 编辑
    editBrandList(value) {
      this.brandData = JSON.parse(JSON.stringify(value));
      this.dialogFlag = true;
    },
    // 删除
    deleteBrandList(id) {
      this.$confirm("确定删除此信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          BrandDelete({ id })
            .then(response => {
              this.$message({
                type: "success",
                message: response.data.message
              });
              this.updateTable();
            })
            .catch(error => {
              console.error("error", error);
            });
        })
        .catch(error => {
          console.error("error", error);
        });
    },
    // 禁启用切换
    switchChange(data) {
      if (this.switchFlag) {
        return false;
      }
      const requestData = {
        id: data.id,
        status: data.status
      };
      this.switchFlag = true;
      BrandStatus(requestData)
        .then(response => {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.switchFlag = false;
        })
        .catch(error => {
          console.error("error", error);
          this.switchFlag = false;
        });
    },
    // 更新表格
    updateTable() {
      // 调用子组件的方法
      this.$refs.brandTable.requestData();
    },
    // 搜索内容
    search() {
      const requestData = {
        pageSize: 10,
        pageNumber: 1
      };
      if (this.searchForm.name) {
        requestData.brand = this.searchForm.name;
      }
      // 调用子组件的方法
      this.$refs.brandTable.requestData(requestData);
    }
  }
};
</script>

<style lang="scss" scoped></style>
