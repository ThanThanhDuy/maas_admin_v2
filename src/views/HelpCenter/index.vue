<template>
  <div>
    <HeaderPage
      :title="title"
      :isSearch="isSearch"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
    />
    <div class="conatinerTab">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Driver Support Ticket">
          <TableVue
            :header="HEADER_PROBLEM"
            :data="getterReport"
            :isLoading="getLoading"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="User Support Ticket">
          <TableVue
            :header="HEADER_PROBLEM"
            :data="getterReport"
            :isLoading="getLoading"
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
      getLoading: "report/getLoading",
    }),
  },
  data() {
    return {
      title: "Help Center",
      isSearch: false,
      titleButton: "",
      iconHeader: "",
      HEADER_PROBLEM,
    };
  },
  methods: {
    ...mapActions({
      getReport: "report/getReport",
    }),
    ...mapMutations({
      setDriver: "report/SET_REPORT",
    }),
    callback(key) {
      this.setDriver([]);
      this.getReport(Number(key));
    },
  },
  mounted() {
    this.setDriver([]);
    this.getReport(1);
  },
};
</script>

<style></style>
