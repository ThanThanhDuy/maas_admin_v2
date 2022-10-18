<template>
  <div>
    <div class="containerTitleTab">
      <p class="tab__title">{{ title }}</p>
      <p class="tab__subtitle">{{ subtitle }}</p>
    </div>
    <a-divider />
  </div>
</template>

<script>
export default {
  name: "TitleUser",
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";
.containerTitleTab {
  .tab__title {
    font-size: 20px;
    font-weight: 400;
    color: $black50;
  }
  .tab__subtitle {
    font-size: 14px;
    font-weight: 400;
    color: $black50;
    opacity: 0.7;
  }
}
</style>
