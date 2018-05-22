<template>
  <div class="chart-panel">
  </div>
</template>

<script>
import echarts from '../../../static/libs/echarts.min'
export default {
  name: "chart",
  props: {
    option: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      msg: "图表"
    };
  },
  mounted(){
    var myChart = echarts.init(this.$el);
    myChart.setOption(this.option);
  }
};
</script>

<style scoped lang="scss">
.chart-panel{
  width: 100%;
  height: 400px;
}
</style>
