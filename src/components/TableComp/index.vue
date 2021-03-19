<template>
  <div class="table-wrap">
    <SearchForm
      v-if="tableConfig.searchFlag"
      :form-item="tableConfig.formItem"
      :form-config="tableConfig.formConfig"
      :form-handler="tableConfig.formHandler"
      @callback="callback"
    ></SearchForm>
    <el-table
      ref="table"
      :data="data"
      v-loading="table_loading"
      element-loading-text="加载中"
      border
    >
      <el-table-column
        v-if="config.selectionFlag"
        type="selection"
        width="55"
      ></el-table-column>
      <template v-for="item in config.tHead">
        <!--回调函数渲染-->
        <el-table-column
          v-if="item.type === 'function'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <span
              v-html="item.callback && item.callback(scope.row, item.prop)"
            ></span>
          </template>
        </el-table-column>
        <!--插槽渲染-->
        <el-table-column
          v-else-if="item.type === 'slot'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :slotProps="scope.row"></slot>
          </template>
        </el-table-column>
        <!--图片渲染-->
        <el-table-column
          v-else-if="item.type === 'image'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" :width="item.imgWidth || 50" alt="" />
          </template>
        </el-table-column>
        <!--操作渲染-->
        <el-table-column
          v-else-if="item.type === 'operation'"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
        >
          <template slot-scope="scope">
            <!--编辑-->
            <template v-if="item.buttonGroup && item.buttonGroup.length > 0">
              <template v-for="button in item.buttonGroup">
                <!-- 事件 -->
                <el-button
                  v-if="button.event === 'button'"
                  :type="button.type"
                  :key="button.id"
                  @click="button.handler && button.handler(scope.row)"
                  size="small"
                >
                  {{ button.label }}
                </el-button>
                <!-- 路由跳转 -->
                <router-link
                  v-else-if="button.event === 'link'"
                  :key="button.id"
                  :to="{
                    name: button.name,
                    query: { [button.key]: scope.row[button.value || 'id'] }
                  }"
                  class="mr-10"
                >
                  <el-button :type="button.type" size="small">{{
                    button.label
                  }}</el-button>
                </router-link>
              </template>
            </template>
            <!--编辑按钮-->
            <template v-if="item.default && item.default.editButton">
              <el-button
                type="primary"
                size="small"
                plain
                @click="
                  editItem(
                    scope.row[item.default.id || 'id'],
                    item.default.editLink
                  )
                "
                >编辑
              </el-button>
            </template>
            <!--删除按钮-->
            <template v-if="item.default && item.default.deleteButton">
              <el-button
                type="danger"
                size="small"
                plain
                @click="deleteItem(scope.row.id)"
                >删除
              </el-button>
            </template>
            <!--自定义按钮-->
            <template v-else>
              <slot :name="item.slotName" :slotProps="scope.row"></slot>
            </template>
          </template>
        </el-table-column>
        <!--纯文本渲染-->
        <el-table-column
          v-else
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </template>
    </el-table>
    <div class="w-e-clear-fix margin-top-20">
      <el-pagination
        v-if="config.paginationFlag"
        background
        layout="total, prev, pager, next"
        :total="total"
        :currentPage="currentPage"
        class="pull-right"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { GetTableData, DeleteTableData } from "@/api/common";
import SearchForm from "@/components/SearchForm";

export default {
  name: "TableComp",
  components: { SearchForm },
  props: {
    tableConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      table_loading: false,
      data: [],
      total: 0,
      currentPage: 1,
      config: {
        isRequest: true, // 初始化是否请求接口
        tHead: [],
        selectionFlag: true,
        paginationFlag: true,
        url: "", // 请求地址
        data: {} // 请求数据
      }
    };
  },
  watch: {
    tableConfig: {
      handler(newValue) {
        this.initConfig(newValue);
      },
      immediate: true
    }
  },
  methods: {
    // 公共 - 子组件回调
    callback(params) {
      if (params.funcName) {
        this[params.funcName] && this[params.funcName](params.data);
      }
    },
    // 初始化表单配置
    initConfig(tableConfig) {
      for (let key in tableConfig) {
        if (Object.keys(this.config).includes(key)) {
          this.config[key] = tableConfig[key];
        }
      }
      this.config.isRequest && this.loadData(); // 加载数据
    },
    // 内部调用-加载数据
    loadData() {
      const requestData = {
        url: this.config.url,
        data: this.config.data
      };
      this.table_loading = true;
      GetTableData(requestData)
        .then(response => {
          const data = response.data;
          // 判断数据是否存在
          if (data.data) {
            this.data = data.data.data;
            // 判断页码是否存在
            if (data.data.total) {
              this.total = data.data.total;
            } else {
              this.total = data.data.data.length;
            }
          }
          this.table_loading = false;
        })
        .catch(error => {
          this.table_loading = false;
          console.error("error", error);
        });
    },
    // 外部调用-加载数据
    requestData(params) {
      // 处理业务逻辑 - 如果外部有请求数据就用外部的
      if (params) {
        this.config.data = params;
      }
      this.loadData();
    },
    // 删除操作
    deleteItem(id) {
      this.$confirm("确定删除此信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let requestData = {
            url: this.tableConfig.url + "Delete",
            data: { id }
          };
          DeleteTableData(requestData)
            .then(response => {
              this.$message({
                type: "success",
                message: response.data.message
              });
              this.loadData();
            })
            .catch(error => {
              console.error("error", error);
            });
        })
        .catch(() => {});
    },
    // 编辑操作
    editItem(id, routerName) {
      this.$router.push({
        name: routerName,
        query: {
          id
        }
      });
    },
    // 页面切换
    handleCurrentChange(val) {
      this.config.data.pageNumber = val;
      this.loadData();
    },
    // 搜索
    search(data) {
      const searchData = data;
      searchData.pageNumber = 1;
      searchData.pageSize = 10;
      this.requestData(searchData);
    }
  }
};
</script>

<style lang="scss" scoped></style>
