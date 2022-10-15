<template>
  <div class="containerHeader">
    <div class="containerHeader__left">
      <TitlePage :title="title" />
      <SearchInput
        :searchValue="searchValueHeader"
        :placeholder="placeholder"
      />
    </div>
    <div>
      <ButtonVue
        :iconHeader="iconHeader"
        :titleButton="titleButton"
        :handleClickButton="handleClickButtonHeader"
      />
    </div>
  </div>
</template>

<script>
import TitlePage from "@/components/commons/TitlePage";
import SearchInput from "@/components/commons/SearchInput";
import ButtonVue from "@/components/commons/Button";

export default {
  name: "headerPage",
  props: {
    title: {
      type: String,
      default: "",
    },
    searchValue: {
      type: Function,
      default: () => {},
    },
    placeholder: {
      type: String,
      default: "",
    },
    titleButton: {
      type: String,
      default: "",
    },
    onClickButton: {
      type: Function,
      default: () => {},
    },
    iconHeader: {
      type: String,
      default: "",
    },
  },
  methods: {
    searchValueHeader(value) {
      this.searchValue(value);
    },
    handleClickButtonHeader() {
      this.onClickButton();
    },
  },
  components: {
    TitlePage,
    SearchInput,
    ButtonVue,
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/commons/variable.scss";
.containerHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background-color: $white;
  &__left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>
