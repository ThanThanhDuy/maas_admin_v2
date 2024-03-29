<template>
  <a-table
    :columns="header"
    :data-source="data"
    :loading="isLoading"
    :customRow="rowSelected"
    :rowKey="
      record =>
        (record?.Code ? record?.Code : record?.code)
          ? record?.Code
            ? record?.Code
            : record?.code
          : record?.Priority
    "
    :pagination="pagination"
    @change="handleTableChangeTable"
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
    <template slot="StatusReport" slot-scope="StatusReport">
      <span>
        <a-tag :color="STATUS_REPORT[StatusReport].color">{{
          STATUS_REPORT[StatusReport].status
        }}</a-tag>
      </span>
    </template>
    <template slot="distance" slot-scope="distance">
      <span>{{ caculateDistance(distance) }}</span>
    </template>
    <template slot="Content" slot-scope="Content">
      <span class="content_table">{{ Content }}</span>
    </template>
    <template slot="StatusPromotion" slot-scope="StatusPromotion">
      <span>
        <a-tag :color="STATUS_PROMOTION[StatusPromotion].color">{{
          STATUS_PROMOTION[StatusPromotion].status
        }}</a-tag>
      </span>
    </template>
    <template slot="Type" slot-scope="Type">
      <span>
        <a-tag :color="TYPE_PROMOTION[Type].color">{{
          TYPE_PROMOTION[Type].status
        }}</a-tag>
      </span>
    </template>
    <template slot="DiscountPercentage" slot-scope="DiscountPercentage">
      <span> {{ DiscountPercentage * 100 }}% </span>
    </template>
    <template slot="DateOfBirth" slot-scope="DateOfBirth">
      <span>
        {{ DateOfBirth ? moment(DateOfBirth).format("DD-MM-YYYY") : "" }}
      </span>
    </template>
    <template slot="DateTime" slot-scope="DateTime">
      <span>
        {{ DateTime ? moment(DateTime).format("DD-MM-YYYY") : "" }}
      </span>
    </template>
    <template slot="Active" slot-scope="Active">
      <span>
        <a-tag :color="STATUS_BANNER[Active].color">{{
          STATUS_BANNER[Active].status
        }}</a-tag>
      </span>
    </template>
    <template slot="Status" slot-scope="Status">
      <span>
        <a-tag :color="Status === 1 ? 'green' : 'volcano'">{{
          Status === 1 ? "Active" : "Inactive"
        }}</a-tag>
      </span>
    </template>
    <template slot="MaxDecrease" slot-scope="MaxDecrease">
      <span>{{ numberWithCommas(MaxDecrease) }}</span>
    </template>
  </a-table>
</template>

<script>
import { caculateDistance } from "@/utils/caculateDistance";
import {
  STATUS_DRIVER,
  STATUS_PROMOTION,
  STATUS_REPORT,
  STATUS_BANNER,
} from "@/constants/status";
import { TYPE_PROMOTION } from "@/constants/promotion";
import moment from "moment";

export default {
  name: "TableVue",
  data() {
    return {
      STATUS_DRIVER,
      STATUS_REPORT,
      STATUS_PROMOTION,
      TYPE_PROMOTION,
      moment,
      STATUS_BANNER,
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
    pagination: {
      type: Object,
      default: () => {},
    },
    handleTableChange: {
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
    handleTableChangeTable(pg) {
      this.handleTableChange(pg);
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
.content_table {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}
</style>
