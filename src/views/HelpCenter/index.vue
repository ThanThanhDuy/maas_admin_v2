<template>
  <div>
    <HeaderPage
      :title="title"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
      :placeholder="placeholder"
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
    }),
  },
  data() {
    return {
      title: "Help Center",
      titleButton: "",
      iconHeader: "",
      placeholder: "Search report by name user",
      HEADER_PROBLEM,
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
    rowSelect(record) {
      this.$router.push({
        name: "ReportDetail",
        params: { code: record.Code },
      });
    },
  },
  mounted() {
    this.setReport([]);
    this.getReport({
      page: 1,
      pageSize: 8,
      search: "",
    });
  },
};
</script>

<style></style>
