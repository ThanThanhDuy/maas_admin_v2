<template>
  <div>
    <HeaderPage
      :title="title"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
      :placeholder="placeholder"
      :searchValue="searchValue"
    />
    <div class="conatinerTab">
      <a-tabs default-active-key="2" @change="callback">
        <!-- <a-tab-pane key="1" tab="Driver Support Ticket">
          <TableVue
            :header="HEADER_PROBLEM"
            :data="getterReport"
            :isLoading="getLoading"
          />
        </a-tab-pane> -->
        <a-tab-pane key="2" tab="Report">
          <TableVue
            :header="HEADER_PROBLEM"
            :data="getReportHandle"
            :isLoading="getLoading"
            :rowSelect="rowSelect"
            :pagination="getPagination"
            :handleTableChange="handleTableChange"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import TableVue from "@/components/commons/Table";
import { HEADER_PROBLEM } from "@/constants/table/header";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "HelpCenter",
  components: {
    HeaderPage,
    TableVue,
  },
  computed: {
    ...mapGetters({
      getterReport: "report/getterReport",
      getReportHandle: "report/getterReportHandle",
      getLoading: "report/getLoading",
      getPagination: "report/getPagination",
    }),
  },
  data() {
    return {
      title: "Help Center",
      titleButton: "",
      iconHeader: "",
      placeholder: "Search report by name user",
      HEADER_PROBLEM,
      pageSize: 10,
      total: 0,
      pagi: {},
      valueSearch: "",
    };
  },
  methods: {
    ...mapActions({
      getReport: "report/getReport",
    }),
    ...mapMutations({
      setReport: "report/SET_REPORT",
    }),
    callback(key) {
      this.setReport([]);
      this.getReport(Number(key));
    },
    async searchValue(value) {
      this.valueSearch = value;
      const res = await this.getReport({
        search: value,
        page: 1,
        pageSize: this.pageSize,
      });
      this.pagi = {
        total: res.Data.TotalItemsCount,
        current: res.Data.Page,
        pageSize: res.Data.PageSize,
      };
    },
    rowSelect(record) {
      this.$router.push({
        name: "ReportDetail",
        params: { code: record.Code },
      });
    },
    handleTableChange(pagination) {
      this.pagi = pagination;
      this.getReport({
        search: this.valueSearch,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    },
  },
  async mounted() {
    this.setReport([]);
    const res = await this.getReport({
      search: this.valueSearch,
      page: 1,
      pageSize: this.pageSize,
    });
    this.pagi = {
      total: res?.Data.TotalItemsCount,
      current: res?.Data.Page,
      pageSize: res?.Data.PageSize,
    };
  },
};
</script>

<style></style>
