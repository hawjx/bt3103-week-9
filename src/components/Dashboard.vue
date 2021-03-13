<template>
  <div>
    <h2>Bar Chart</h2>
    <barchart></barchart>
    <h2>Line Chart</h2>
    <linechart></linechart>
  </div>
</template>

<script>
import BarChart from './charts/BarChart.vue';
import LineChart from './charts/LineChart.vue'

export default {
  components: {
    barchart: BarChart,
    linechart: LineChart
  }
}
</script>

<style scoped>
h2 {
  background-color:rgb(211, 215, 231);
  color:rgb(28, 38, 83);
  text-align: center;
  font-size: 30px;
  font-family: Verdana;
}
</style>