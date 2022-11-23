<template>
  <div>
    <HeaderPage
      :title="title"
      :searchValue="searchValue"
      :placeholder="placeholder"
      :onClickButton="onClickButton"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
    />
    <div style="margin-top: 40px">
      <TableVue
        :header="HEADER_ROUTE"
        :data="getRoute"
        :isLoading="getLoading"
        :rowSelect="rowSelect"
        :pagination="getPagination"
        :handleTableChange="handleTableChange"
      />
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import TableVue from "@/components/commons/Table";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { HEADER_ROUTE } from "@/constants/table/header";

export default {
  name: "RouteVue",
  components: {
    HeaderPage,
    TableVue,
  },
  data() {
    return {
      title: "Route",
      placeholder: "Search route",
      titleButton: "Create route",
      HEADER_ROUTE,
      iconHeader: "plus",
      pageSize: 10,
      total: 0,
      pagi: {},
      valueSearch: "",
    };
  },
  computed: {
    ...mapGetters({
      getRoute: "route/getRoute",
      getLoading: "route/getLoading",
      getPagination: "route/getPagination",
    }),
  },
  methods: {
    ...mapActions({
      getAllRoute: "route/getAllRoute",
      getRoutePaging: "route/getRoutePaging",
    }),
    ...mapMutations({
      SET_ROUTE: "route/SET_ROUTE",
    }),
    async searchValue(value) {
      this.valueSearch = value;
      const res = await this.getRoutePaging({
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
    onClickButton() {
      this.$router.push({ name: "AddRoute" });
    },
    rowSelect(record) {
      this.$router.push({
        name: "RouteDetail",
        params: { code: record.code },
      });
    },
    handleTableChange(pagination) {
      this.pagi = pagination;
      this.getRoutePaging({
        search: this.valueSearch,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    },
  },
  async mounted() {
    this.SET_ROUTE([]);
    // this.getAllRoute();
    const res = await this.getRoutePaging({
      search: this.valueSearch,
      page: 1,
      pageSize: this.pageSize,
    });
    this.pagi = {
      total: res.Data.TotalItemsCount,
      current: res.Data.Page,
      pageSize: res.Data.PageSize,
    };
  },
};
</script>

<style></style>
