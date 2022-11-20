<template>
  <div>
    <div class="address_line">
      <div class="icon_pickup">
        <a-icon class="icon" type="caret-up" />
      </div>
      <div class="boxAddress_infor">
        <p class="title">{{ startStation?.Name }}</p>
        <p class="des">{{ startStation?.Address }}</p>
      </div>
    </div>
    <div
      style="
        width: calc(100% - 55px);
        height: 2px;
        background-color: #ccc;
        margin-left: 55px;
        border-radius: 5px;
      "
    ></div>
    <div class="address_line">
      <div class="icon_dropoff">
        <a-icon class="icon" type="environment" />
      </div>
      <div class="boxAddress_infor">
        <p class="title">{{ endStation?.Name }}</p>
        <p class="des">{{ endStation?.Address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxAdress",
  props: {
    startStation: {
      type: Object,
      default: () => {},
    },
    endStation: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";
.address_line {
  display: flex;
  align-items: center;
  padding: 10px;
  .icon_pickup {
    padding: 5px;
    background-color: $green50;
    border-radius: 100%;
    .icon {
      color: $white;
    }
  }
  .icon_dropoff {
    padding: 5px;
    background-color: $orange50;
    border-radius: 100%;
    .icon {
      color: $white;
      font-size: 16px;
    }
  }
  .boxAddress_infor {
    margin-left: 20px;
    .title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
      line-height: 1.25;
    }
    .des {
      font-size: 14px;
      line-height: 1.25;
    }
  }
}
</style>
