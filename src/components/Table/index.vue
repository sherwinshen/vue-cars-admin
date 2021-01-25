<template>
  <div class="table-wrap">
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
import { TableData } from "@/api/common";

export default {
  name: "Table",
  props: {
    tableConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 表格加载
      table_loading: false,
      data: [],
      total: 0,
      currentPage: 1,
      config: {
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
    // 初始化表单配置
    initConfig(tableConfig) {
      for (let key in tableConfig) {
        if (Object.keys(this.config).includes(key)) {
          this.config[key] = tableConfig[key];
        }
      }
      this.loadData(); // 加载数据
    },
    // 加载数据
    loadData() {
      const requestData = {
        url: this.config.url,
        data: this.config.data
      };
      this.table_loading = true;
      TableData(requestData)
        .then(response => {
          const data = response.data;
          // 判断数据是否存在
          if (data.data) {
            this.data = data.data.data;
            // 判断页码是否存在
            if (data.data.total) {
              this.total = data.data.total;
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
      // 处理业务逻辑
      if (params) {
        this.config.data = params;
      }
      this.loadData();
    },
    // 页面切换
    handleCurrentChange(val) {
      this.config.data.pageNumber = val;
      this.loadData();
    }
  }
};
</script>

<style lang="scss" scoped></style>
