<template>
  <a-input-search
    :placeholder="placeholder"
    class="searchInput__input"
    @search="onSearch"
  />
</template>

<script>
export default {
  name: "searchInput",
  props: {
    searchValue: {
      type: Function,
      default: () => {},
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    onSearch(value) {
      this.searchValue(value);
    },
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";
.searchInput__input {
  .ant-input {
    width: 400px;
    height: 40px;
    border-radius: 10px;
    &:focus {
      border-color: $green40;
      box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2);
    }
    &:hover {
      border-color: $green40;
      box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2);
    }
  }
}
.containerHeader__left
  .ant-input-affix-wrapper:hover
  .ant-input:not(.ant-input-disabled) {
  border-color: $green40 !important;
  box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2) !important;
}
</style>
