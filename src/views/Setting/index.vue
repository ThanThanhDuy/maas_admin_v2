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
        <a-tab-pane key="1" tab=""> </a-tab-pane>
        <a-tab-pane key="2" tab=""> </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
export default {
  name: "SettingVue",
  components: {
    HeaderPage,
  },
  data() {
    return {
      title: "Help Center",
      isSearch: false,
      titleButton: "",
      iconHeader: "",
    };
  },
};
</script>

<style></style>
