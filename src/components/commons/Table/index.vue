<template>
  <a-table :columns="header" :data-source="data" :loading="isLoading">
    <template slot="status" slot-scope="status">
      <span>
        <a-tag :color="status === 1 ? 'green' : 'volcano'">{{
          status === 1 ? "Active" : "Inactive"
        }}</a-tag>
      </span>
    </template>
    <template slot="distance" slot-scope="distance">
      <span>{{ caculateDistance(distance) }}</span>
    </template>
  </a-table>
</template>

<script>
import { caculateDistance } from "@/utils/caculateDistance";

// const data = [
//   {
//     key: "1",
//     code: "8ab0dd61-eeb4-4713-8d0e-6665ffd8b142",
//     from: "AI InnovationHub",
//     to: "Inverter ups Sài Gòn",
//     status: 1,
//     distance: 1230,
//   },
//   {
//     key: "2",
//     code: "8ab0dd61-eeb4-4713-8d0e-6665ffd8b142",
//     from: "AI InnovationHub",
//     to: "Inverter ups Sài Gòn",
//     status: 0,
//     distance: 352,
//   },
// ];

export default {
  name: "TableVue",
  props: {
    data: {
      type: Array,
      default: null,
    },
    header: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    caculateDistance(distance) {
      return caculateDistance(distance);
    },
  },
};
</script>

<style></style>
