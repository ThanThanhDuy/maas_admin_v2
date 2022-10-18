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
    };
  },
  computed: {
    ...mapGetters({
      getRoute: "route/getRoute",
      getLoading: "route/getLoading",
    }),
  },
  methods: {
    ...mapActions({
      getAllRoute: "route/getAllRoute",
    }),
    ...mapMutations({
      SET_ROUTE: "route/SET_ROUTE",
    }),
    searchValue(value) {
      console.log("Route", value);
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
  },
  mounted() {
    this.SET_ROUTE([]);
    this.getAllRoute();
  },
};
</script>

<style></style>
