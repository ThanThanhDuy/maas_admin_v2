<template>
  <div class="container">
    <div style="width: 50%">
      <HeaderBack />
      <FromVue
        :getStation="getStation"
        :handleSave="handleSave"
        :iconSave="iconSave"
        :listStationProps="getListStationProps"
        :handleChangeName="handleChangeName"
        :handleChangeCode="handleChangeCode"
        :handleChangeValueAuto="handleChangeValueAuto"
      />
    </div>
    <div style="width: 50%">
      <GmapMap
        :center="{ lat: 10.84057839865839, lng: 106.8099978721756 }"
        :zoom="16"
        style="width: 100%; height: calc(100vh - 64px - 32px)"
      ></GmapMap>
    </div>
  </div>
</template>

<script>
import HeaderBack from "@/components/commons/HeaderBack";
import { notification } from "@/utils/notification";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FromVue from "../AddRoute/Form";
export default {
  name: "AddRoute",
  data() {
    return {
      iconSave: "save",
    };
  },
  components: {
    HeaderBack,
    FromVue,
  },
  computed: {
    ...mapGetters({
      getStation: "station/listStation",
      getRouteByCode: "route/getRouteByCode",
      getListStationProps: "route/getListStationProps",
    }),
  },
  methods: {
    ...mapActions({
      getAllStation: "station/getAllStation",
      funcGetRouteByCode: "route/getRouteByCode",
    }),
    ...mapMutations({
      setListStationProps: "route/SET_LIST_STATION_PROPS",
    }),
    async handleSave(listStation) {
      this.iconSave = "loading";
      // check empty data
      let checkEmptyData = true;
      for (const item of this.getListStationProps) {
        if (item.Code === "" || item.Name === "") {
          checkEmptyData = false;
          break;
        }
      }
      if (!checkEmptyData) {
        setTimeout(() => {
          this.iconSave = "save";
          notification(this, "error", "Code or Name station can't empty", "");
        }, 1000);
        return;
      }
      // eslint-disable-next-line
      const data = listStation.map(item => item.Code);
    },
    // eslint-disable-next-line
    handleChangeName(value, index) {
      // let listStationTmp = [...this.getListStationProps];
      // listStationTmp[index].Code = this.getStation.find(
      //   station => station.Name === value
      // ).Code;
      // listStationTmp[index].Name = this.getStation.find(
      //   station => station.Name === value
      // ).Name;
      // this.setListStationProps(listStationTmp);
    },
    handleChangeCode(index) {
      let listStationTmp = [...this.getListStationProps];
      if (listStationTmp[index].Code) {
        const station = this.getStation.find(
          station => station.Code === listStationTmp[index].Code
        );
        if (station) {
          listStationTmp[index].Name = station.Name;
        } else {
          listStationTmp[index].Name = "";
        }
      }
      this.setListStationProps(listStationTmp);
    },
    handleChangeValueAuto(value, index) {
      let listStationTmp = [...this.getListStationProps];
      const station = this.getStation.find(station => station.Name === value);
      if (station) {
        listStationTmp[index].Code = station.Code;
      } else {
        listStationTmp[index].Code = "";
      }
      this.setListStationProps(listStationTmp);
    },
  },
  mounted() {
    this.setListStationProps([]);
    this.getAllStation();
    this.funcGetRouteByCode(this.$route.params.code);
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: calc(100vh - 64px - 32px);
}
</style>
