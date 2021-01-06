<template>
  <div class="cars-add-wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="车辆品牌">
        <el-select v-model="form.carsBrandId"> </el-select>
      </el-form-item>
      <el-form-item label="停车场">
        <el-select v-model="form.parkingId"></el-select>
      </el-form-item>
      <el-form-item label="车辆型号">
        <el-input v-model="form.carsMode"></el-input>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input v-model="form.carsNumber"></el-input>
      </el-form-item>
      <el-form-item label="车架号">
        <el-input v-model="form.carsFrameNumber"></el-input>
      </el-form-item>
      <el-form-item label="发动机号">
        <el-input v-model="form.engineNumber"></el-input>
      </el-form-item>
      <el-form-item label="年检">
        <el-radio v-model="form.yearCheck" label="1">未年检</el-radio>
        <el-radio v-model="form.yearCheck" label="2">已年检</el-radio>
      </el-form-item>
      <el-form-item label="保养日期">
        <el-date-picker
          v-model="form.maintain"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <span style="display: inline-block; margin-left: 10px;"
          >下次保养日期：2020-12-12</span
        >
      </el-form-item>
      <el-form-item label="禁启用">
        <el-radio v-model="form.status" label="1">启用</el-radio>
        <el-radio v-model="form.status" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="车辆描述">
        <div id="editorDom" style="text-align:left;"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确定</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "wangeditor";

export default {
  name: "CarsAdd",
  data() {
    return {
      editor: null,
      // 富文本内容
      editorData: "",
      form: {
        parkingId: "",
        carsBrandId: "",
        carsMode: "",
        carsNumber: "",
        carsFrameNumber: "",
        engineNumber: "",
        carsImg: "",
        countKm: "",
        yearCheck: true,
        gear: 1,
        energyType: 2,
        electric: 100,
        oil: 100,
        carsAttr: "",
        content: "",
        maintainDate: "",
        status: true,
        maintain: ""
      }
    };
  },
  methods: {
    createEditor() {
      this.editor = new Editor(`#editorDom`);
      // 配置 onchange 回调函数，将数据同步到 vue 中
      this.editor.config.onchange = newHtml => {
        this.editorData = newHtml;
      };
      this.editor.create(); // 创建富文本实例
    }
  },
  mounted() {
    this.createEditor();
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  }
};
</script>

<style lang="scss" scoped></style>
