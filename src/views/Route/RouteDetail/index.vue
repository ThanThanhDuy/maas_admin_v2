<template>
  <div class="container">
    <div style="width: 50%; position: relative">
      <HeaderBack />
      <div
        v-if="getListStationProps.length > 0"
        style="position: absolute; top: 60px; width: 100%"
      >
        <a-row style="margin-left: 44px">
          <a-col :span="24"
            ><a-input
              style="width: calc(100% - 84px); height: 35px"
              placeholder="Name route"
              v-model="nameRoute"
            ></a-input
          ></a-col>
        </a-row>
      </div>
      <FromVue
        :getStation="getStation"
        :handleSave="handleSave"
        :iconSave="iconSave"
        :listStationProps="getListStationProps"
        :handleChangeName="handleChangeName"
        :handleChangeCode="handleChangeCode"
        :handleChangeValueAuto="handleChangeValueAuto"
        :handleAddMore="handleAddMore"
        :handlechangePosition="handlechangePosition"
        :handleInsertAbove="handleInsertAbove"
        :handleInsertBelow="handleInsertBelow"
        :handleDeleteStation="handleDeleteStation"
        :handleDeleteRoute="handleDeleteRoute"
      />
    </div>
    <div style="width: 50%">
      <GmapMap
        ref="gmap"
        :center="center"
        :zoom="13"
        style="width: 100%; height: calc(100vh - 64px - 32px)"
        :options="{
          zoomControl: true,
        }"
        :fitBounds="true"
      >
        <GmapMarker
          :key="index"
          v-for="(station, index) in getListStationProps"
          :position="{ lat: station.Latitude, lng: station.Longitude }"
          :fitBounds="true"
          @click="center = { lat: station.Latitude, lng: station.Longitude }"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import HeaderBack from "@/components/commons/HeaderBack";
import { notification } from "@/utils/notification";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FromVue from "../AddRoute/Form";
import { gmapApi } from "vue2-google-maps";
import routeService from "@/services/route";

export default {
  name: "AddRoute",
  data() {
    return {
      iconSave: "save",
      center: { lat: 10.84057839865839, lng: 106.8099978721756 },
      nameRoute: "",
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
    google: gmapApi,
  },
  methods: {
    ...mapActions({
      getAllStation: "station/getAllStation",
      funcGetRouteByCode: "route/getRouteByCode",
      updateRouteFromListStation: "route/updateRouteFromListStation",
    }),
    ...mapMutations({
      setListStationProps: "route/SET_LIST_STATION_PROPS",
    }),
    async handleSave() {
      // this.iconSave = "loading";
      // check empty data
      let checkEmptyData = true;
      for (const item of this.getListStationProps) {
        if (item.Code === "" || item.Name === "") {
          checkEmptyData = false;
          break;
        }
      }
      if (!this.nameRoute) {
        setTimeout(() => {
          // this.iconSave = "save";
          notification(this, "error", "Name route not empty", "");
        }, 1000);
        return;
      }
      if (!checkEmptyData) {
        setTimeout(() => {
          // this.iconSave = "save";
          notification(this, "error", "Code or Name station can't empty", "");
        }, 1000);
        return;
      }
      const data = this.getListStationProps.map(item => item.Code);
      const checkDuplicate = new Set(data).size === data.length;
      if (!checkDuplicate) {
        setTimeout(() => {
          // this.iconSave = "save";
          notification(this, "error", "Station already exists on route", "");
        }, 1000);
        return;
      }
      this.$confirm({
        title: `Are you sure you want to save this route?`,
        content: ``,
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          // this.iconSave = "save";
          const res = await this.updateRouteFromListStation({
            routeCode: this.$route.params.code,
            listStation: data,
            nameRoute: this.nameRoute,
          });
          if (res && res.StatusCode === 200) {
            setTimeout(() => {
              // this.iconSave = "save";
              notification(this, "success", "Update route successfully", "");
            }, 1000);
          } else {
            setTimeout(() => {
              // this.iconSave = "save";
              notification(this, "error", "Update route failed", "");
            }, 1000);
          }
        },
        onCancel() {},
      });
    },
    // eslint-disable-next-line
    handleChangeName(value, index) {
      let listStationTmp = [...this.getListStationProps];
      listStationTmp[index].Code = this.getStation.find(
        station => station.Name === value
      ).Code;
      listStationTmp[index].Name = this.getStation.find(
        station => station.Name === value
      ).Name;
      this.setListStationProps(listStationTmp);
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
    handleAddMore() {
      let listStationTmp = [...this.getListStationProps];
      listStationTmp.push({
        Code: "",
        Name: "",
      });
      this.setListStationProps(listStationTmp);
      setTimeout(() => {
        var objDiv = document.getElementsByClassName("containerFormRoute");
        objDiv[0].scrollTop = objDiv[0].scrollHeight;
      }, 0);
    },
    handlechangePosition(oldIndex, newIndex) {
      let listStationTmp = [...this.getListStationProps];
      const item = listStationTmp[oldIndex];
      listStationTmp.splice(oldIndex, 1);
      listStationTmp.splice(newIndex, 0, item);
      this.setListStationProps(listStationTmp);
    },
    handleInsertAbove(index) {
      let listStationTmp = [...this.getListStationProps];
      listStationTmp.splice(index, 0, {
        Code: "",
        Name: "",
      });
      this.setListStationProps(listStationTmp);
    },
    handleInsertBelow(index) {
      let listStationTmp = [...this.getListStationProps];
      listStationTmp.splice(index + 1, 0, {
        Code: "",
        Name: "",
      });
      this.setListStationProps(listStationTmp);
    },
    handleDeleteStation(index) {
      let listStationTmp = [...this.getListStationProps];
      listStationTmp.splice(index, 1);
      this.setListStationProps(listStationTmp);
    },
    handleDeleteRoute() {
      this.$confirm({
        title: `Are you sure you want to delete this route?`,
        content: ``,
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          const res = await routeService.deleteRouteByCode(
            this.$route.params.code
          );
          if (res && res.StatusCode === 200) {
            setTimeout(() => {
              notification(this, "success", "Delete route successfully", "");
            }, 1000);
            this.$router.push("/route");
          } else {
            setTimeout(() => {
              notification(this, "error", "Delete route failed", "");
            }, 1000);
          }
        },
        onCancel() {},
      });
    },
  },
  async mounted() {
    this.setListStationProps([]);
    this.getAllStation();
    const res = await this.funcGetRouteByCode(this.$route.params.code);
    this.nameRoute = res.Name;
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
