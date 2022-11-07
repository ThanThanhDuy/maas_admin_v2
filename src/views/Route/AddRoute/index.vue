<template>
  <div class="container">
    <div style="width: 50%">
      <HeaderBack />
      <FromVue
        :getStation="getStation"
        :handleSave="handleSave"
        :iconSave="iconSave"
        :listStationProps="getListStationAdd"
        :handleChangeName="handleChangeName"
        :handleChangeCode="handleChangeCode"
        :handleAddMore="handleAddMore"
        :handlechangePosition="handlechangePosition"
        :handleInsertAbove="handleInsertAbove"
        :handleInsertBelow="handleInsertBelow"
        :handleDeleteStation="handleDeleteStation"
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
import FromVue from "./Form";
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
      getListStationAdd: "route/getListStationAdd",
    }),
  },
  methods: {
    ...mapActions({
      getAllStation: "station/getAllStation",
      createRouteFromListStation: "route/createRouteFromListStation",
    }),
    ...mapMutations({
      setListStationAdd: "route/SET_LIST_STATION_ADD",
    }),
    async handleSave() {
      this.iconSave = "loading";
      // check empty data
      let checkEmptyData = true;
      for (const item of this.getListStationAdd) {
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
      // add route
      const data = this.getListStationAdd.map(item => item.Code);
      const checkDuplicate = new Set(data).size === data.length;
      if (!checkDuplicate) {
        setTimeout(() => {
          this.iconSave = "save";
          notification(this, "error", "Station already exists on route", "");
        }, 1000);
        return;
      }
      const res = await this.createRouteFromListStation(data);
      if (res && res.StatusCode === 200) {
        setTimeout(() => {
          this.iconSave = "save";
          notification(this, "success", "Create route successfully", "");
          this.$router.push({ name: "Route" });
        }, 1000);
      } else {
        setTimeout(() => {
          this.iconSave = "save";
          notification(this, "error", "Create route failed", "");
        }, 1000);
      }
    },
    handleChangeName(value, index) {
      let listStationTmp = [...this.getListStationAdd];
      listStationTmp[index].Code = this.getStation.find(
        station => station.Name === value
      ).Code;
      listStationTmp[index].Name = value;
      this.setListStationAdd(listStationTmp);
    },
    handleChangeCode(index) {
      let listStationTmp = [...this.getListStationAdd];
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
      this.setListStationAdd(listStationTmp);
    },
    handleAddMore() {
      let listStationTmp = [...this.getListStationAdd];
      listStationTmp.push({
        Code: "",
        Name: "",
      });
      this.setListStationAdd(listStationTmp);
      setTimeout(() => {
        var objDiv = document.getElementsByClassName("containerFormRoute");
        objDiv[0].scrollTop = objDiv[0].scrollHeight;
      }, 0);
    },
    handlechangePosition(oldIndex, newIndex) {
      let listStationTmp = [...this.getListStationAdd];
      const item = listStationTmp[oldIndex];
      listStationTmp.splice(oldIndex, 1);
      listStationTmp.splice(newIndex, 0, item);
      this.setListStationAdd(listStationTmp);
    },
    handleInsertAbove(index) {
      let listStationTmp = [...this.getListStationAdd];
      listStationTmp.splice(index, 0, {
        Code: "",
        Name: "",
      });
      this.setListStationAdd(listStationTmp);
    },
    handleInsertBelow(index) {
      let listStationTmp = [...this.getListStationAdd];
      listStationTmp.splice(index + 1, 0, {
        Code: "",
        Name: "",
      });
      this.setListStationAdd(listStationTmp);
    },
    handleDeleteStation(index) {
      let listStationTmp = [...this.getListStationAdd];
      listStationTmp.splice(index, 1);
      this.setListStationAdd(listStationTmp);
    },
  },
  mounted() {
    this.getAllStation();
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
