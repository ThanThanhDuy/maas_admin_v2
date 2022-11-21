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
        <a-tab-pane
          v-for="setting in listSetting"
          :key="setting?.Type"
          :tab="setting?.TypeName.replace(/([A-Z])/g, ' $1').trim()"
        >
          <a-row v-if="!getLoading">
            <a-col v-for="item in setting.Settings" :key="item.Id" :span="12">
              <TabInput
                :key="item.Id"
                :item="item"
                :type="item.DataType"
                :unit="item.Unit"
            /></a-col>
          </a-row>
          <div
            v-else
            style="display: flex; justify-content: center; margin-top: 20px"
          >
            <a-spin />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import TabInput from "@/components/commons/TabInput";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SettingVue",
  components: {
    HeaderPage,
    TabInput,
  },
  data() {
    return {
      title: "Setting",
      isSearch: false,
      titleButton: "",
      iconHeader: "",
    };
  },
  computed: {
    ...mapGetters({
      listSetting: "setting/listSetting",
      getLoading: "setting/getLoading",
    }),
  },
  methods: {
    ...mapActions({
      getSetting: "setting/getSetting",
    }),
    callback(key) {
      console.log(key);
    },
  },
  mounted() {
    this.getSetting();
  },
};
</script>

<style></style>
