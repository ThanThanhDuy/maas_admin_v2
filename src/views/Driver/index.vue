<template>
  <div>
    <HeaderPage
      :title="title"
      :searchValue="searchValue"
      :placeholder="placeholder"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
    />
    <div class="conatinerTab">
      <a-tabs :default-active-key="defaultStatus" @change="callback">
        <a-tab-pane key="2" tab="Pending">
          <TableVue
            :header="HEADER_DRIVER"
            :data="getterDriver"
            :isLoading="getLoading"
            :rowSelect="rowSelect"
            :pagination="getPagination"
            :handleTableChange="handleTableChange"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Reject">
          <TableVue
            :header="HEADER_DRIVER"
            :data="getterDriver"
            :isLoading="getLoading"
            :rowSelect="rowSelect"
            :pagination="getPagination"
            :handleTableChange="handleTableChange"
          />
        </a-tab-pane>
        <a-tab-pane key="1" tab="Working">
          <TableVue
            :header="HEADER_DRIVER"
            :data="getterDriver"
            :isLoading="getLoading"
            :rowSelect="rowSelect"
            :pagination="getPagination"
            :handleTableChange="handleTableChange"
          />
        </a-tab-pane>
        <a-tab-pane key="0" tab="Blocked"
          ><TableVue
            :header="HEADER_DRIVER"
            :data="getterDriver"
            :isLoading="getLoading"
            :rowSelect="rowSelect"
            :pagination="getPagination"
            :handleTableChange="handleTableChange"
        /></a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import { HEADER_DRIVER } from "@/constants/table/header";
import TableVue from "@/components/commons/Table";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { STATUS_DRIVER } from "@/constants/status";

export default {
  name: "DriverVue",
  components: {
    HeaderPage,
    TableVue,
  },
  data() {
    return {
      title: "Driver",
      placeholder: "Search Driver by phone",
      titleButton: "",
      iconHeader: "",
      HEADER_DRIVER,
      STATUS_DRIVER,
      pagi: {},
      PAGE_SIZE: 11,
      search: "",
      statusChange: 2,
      defaultStatus: STATUS_DRIVER["Pending"].toString(),
    };
  },
  computed: {
    ...mapGetters({
      getterDriver: "driver/getterDriver",
      getLoading: "driver/getLoading",
      getPagination: "driver/getPagination",
    }),
  },
  methods: {
    ...mapActions({
      getDriver: "driver/getDriver",
    }),
    ...mapMutations({
      setDriver: "driver/SET_DRIVER",
    }),
    async callback(key) {
      this.statusChange = Number(key);
      this.setDriver([]);
      await this.getDriver({
        search: this.search,
        page: 1,
        pageSize: this.PAGE_SIZE,
        status: Number(key),
      });
    },
    async searchValue(value) {
      this.search = value;
      const res = await this.getDriver({
        search: value,
        page: 1,
        pageSize: this.PAGE_SIZE,
        status: this.statusChange,
      });
      this.pagi = {
        total: res.Data?.TotalItemsCount,
        current: res.Data?.Page,
        pageSize: res.Data?.PageSize,
      };
    },
    rowSelect(record, index) {
      console.log("record", record);
      console.log("index", index);
      this.$router.push({
        name: "DriverDetail",
        params: {
          code: record.Code,
        },
      });
    },
    handleTableChange(pagination) {
      this.pagi = pagination;
      this.getDriver({
        search: this.search,
        page: pagination.current,
        pageSize: pagination.pageSize,
        status: this.statusChange,
      });
    },
  },
  async mounted() {
    this.setDriver([]);
    const res = await this.getDriver({
      search: this.search,
      page: 1,
      pageSize: this.PAGE_SIZE,
      status: this.defaultStatus,
    });
    this.pagi = {
      total: res.Data?.TotalItemsCount,
      current: res.Data?.Page,
      pageSize: res.Data?.PageSize,
    };
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";
.conatinerTab {
  .ant-tabs-nav .ant-tabs-tab-active {
    color: $green50;
  }
  .ant-tabs-ink-bar {
    background-color: $green50;
  }
  .ant-tabs-nav .ant-tabs-tab:hover {
    color: $green50;
  }
}
</style>
