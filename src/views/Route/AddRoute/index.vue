<template>
  <div class="container">
    <div style="width: 50%">
      <HeaderBack />
      <FromVue
        :getStation="getStation"
        :handleSave="handleSave"
        :iconSave="iconSave"
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
import { mapActions, mapGetters } from "vuex";
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
    }),
  },
  methods: {
    ...mapActions({
      getAllStation: "station/getAllStation",
      createRouteFromListStation: "route/createRouteFromListStation",
    }),
    async handleSave(listStation) {
      this.iconSave = "loading";
      const data = listStation.map(item => item.code);
      const res = await this.createRouteFromListStation(data);
      console.log(res.StatusCode);
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
  },
  created() {
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
