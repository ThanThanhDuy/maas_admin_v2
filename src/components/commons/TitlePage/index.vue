<template>
  <div>
    <span class="titlePage__title">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  name: "titlePage",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/commons/variable.scss";
.titlePage__title {
  font-size: $h2;
  font-weight: 500;
  color: $black50;
}
</style>
