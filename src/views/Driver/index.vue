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
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Working">
          <TableVue
            :header="HEADER_DRIVER"
            :data="getterDriver"
            :isLoading="getLoading"
            :rowSelect="rowSelect"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Pendding">
          <TableVue
            :header="HEADER_DRIVER"
            :data="getterDriver"
            :isLoading="getLoading"
            :rowSelect="rowSelect"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Blocked"
          ><TableVue
            :header="HEADER_DRIVER"
            :data="getterDriver"
            :isLoading="getLoading"
            :rowSelect="rowSelect"
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

export default {
  name: "DriverVue",
  components: {
    HeaderPage,
    TableVue,
  },
  data() {
    return {
      title: "Driver",
      placeholder: "Search Driver",
      titleButton: "",
      iconHeader: "",
      HEADER_DRIVER,
    };
  },
  computed: {
    ...mapGetters({
      getterDriver: "driver/getterDriver",
      getLoading: "driver/getLoading",
    }),
  },
  methods: {
    ...mapActions({
      getDriver: "driver/getDriver",
    }),
    ...mapMutations({
      setDriver: "driver/SET_DRIVER",
    }),
    callback(key) {
      this.setDriver([]);
      this.getDriver(key === "3" ? 0 : Number(key));
    },
    searchValue(value) {
      console.log("driver", value);
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
  },
  mounted() {
    this.setDriver([]);
    this.getDriver(1);
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
