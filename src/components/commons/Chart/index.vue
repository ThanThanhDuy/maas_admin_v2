<template>
  <Bar :chart-data="chartData" :chart-options="options" />
</template>

<script>
import { Bar } from "vue-chartjs";

import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    options() {
      return {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: this.chartData.datasets[0].label,
          },
        },
        // eslint-disable-next-line
        onClick: (event, activeElements) => {
          if (activeElements.length > 0) {
            console.log(activeElements[0]);
          }
        },
      };
    },
  },
  data() {
    return {};
  },
};
</script>
