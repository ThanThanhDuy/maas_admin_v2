<template>
  <div class="containerHeaderBack" @click="handleBack">
    <a-icon type="left" class="iconBack" />
    <span>Back</span>
  </div>
</template>

<script>
export default {
  name: "HeaderBack",
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.containerHeaderBack {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  width: fit-content;
  cursor: pointer;
  .iconBack {
    font-size: 24px;
  }
  span {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
