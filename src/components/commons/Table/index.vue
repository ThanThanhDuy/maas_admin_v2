<template>
  <a-table
    :columns="header"
    :data-source="data"
    :loading="isLoading"
    :customRow="rowSelected"
    :rowKey="record => (record?.Code ? record?.Code : record?.code)"
  >
    <template slot="status" slot-scope="status">
      <span>
        <a-tag :color="status === 1 ? 'green' : 'volcano'">{{
          status === 1 ? "Active" : "Inactive"
        }}</a-tag>
      </span>
    </template>
    <template slot="StatusDriver" slot-scope="StatusDriver">
      <span>
        <a-tag :color="STATUS_DRIVER[StatusDriver].color">{{
          STATUS_DRIVER[StatusDriver].status
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
import { STATUS_DRIVER } from "@/constants/status";

export default {
  name: "TableVue",
  data() {
    return {
      STATUS_DRIVER,
    };
  },
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
    rowSelect: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    caculateDistance(distance) {
      return caculateDistance(distance);
    },
    handleSelect(record, selected, selectedRows) {
      this.$emit("handleSelect", record, selected, selectedRows);
    },
    rowSelected(record, index) {
      return {
        on: {
          click: () => {
            this.rowSelect(record, index);
          },
        },
      };
    },
  },
};
</script>

<style lang="scss">
.ant-table-tbody {
  .ant-table-row {
    cursor: pointer;
  }
}
</style>
