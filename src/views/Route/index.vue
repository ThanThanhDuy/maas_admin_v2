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
      />
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import TableVue from "@/components/commons/Table";
import { mapActions, mapGetters } from "vuex";
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
    searchValue(value) {
      console.log("Route", value);
    },
    onClickButton() {
      this.$router.push({ name: "AddRoute" });
    },
  },
  mounted() {
    this.getAllRoute();
  },
};
</script>

<style></style>
