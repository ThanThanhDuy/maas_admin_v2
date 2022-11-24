<template>
  <div class="containerButton_custom">
    <a-button
      :html-type="typeHtml"
      type="primary"
      :icon="iconHeader"
      @click="handleButton"
      :class="iconHeader === 'delete' ? 'antd__button__delete' : ''"
      :disabled="isDisabled"
      >{{ titleButton }}</a-button
    >
  </div>
</template>

<script>
export default {
  name: "buttonVue",
  props: {
    titleButton: {
      type: String,
      default: "",
    },
    handleClickButton: {
      type: Function,
      default: () => {},
    },
    iconHeader: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    typeHtml: {
      type: String,
      default: "button",
    },
  },
  methods: {
    handleButton() {
      this.handleClickButton();
    },
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";
.containerButton_custom {
  .ant-btn {
    height: 40px;
    border-radius: 10px;
    font-size: $medium;
    font-weight: 400;
    // background-color: $green40;
    // border-color: $black50;
    display: flex;
    align-items: center;
    // border-width: 2px;
    border: none;
    &:hover {
      background-color: $green50;
      border: none;
    }
    &:focus {
      background-color: $green50;
      border: none;
    }
  }
  .antd__button__delete {
    background-color: $red40;
    &:hover {
      background-color: $red50;
      border: none;
    }
    &:focus {
      background-color: $red50;
      border: none;
    }
  }
}
</style>
