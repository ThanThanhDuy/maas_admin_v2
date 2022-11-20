<template>
  <div class="containerBoxUser shadow">
    <div style="text-align: center">
      <img
        class="containerBoxUser__avatar"
        src="https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221120/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221120T022023Z&X-Amz-SignedHeaders=host&X-Amz-Signature=369c3ead75fc96a80cd1b18b991cab582f30749b976298c6e1273675c493fcae"
        alt=""
      />
      <p style="padding-top: 10px">{{ isDriver ? "Driver" : "Booker" }}</p>
    </div>
    <div>
      <div class="containerBoxUser__info">
        <span style="color: #ccc">{{ user?.Code }}</span>
        <span style="font-weight: 500; font-size: 20px">{{ user?.Name }}</span>
        <span v-if="user?.Gender">{{
          user?.Gender === 1 ? "Male" : "Female"
        }}</span>
        <div v-if="isDriver" style="display: flex; align-items: center">
          <img style="width: 30px" :src="vehicle[user?.Vehicle?.Type]" alt="" />
          <a-divider type="vertical" />
          <span>{{ user?.Vehicle?.Type }}</span>
          <a-divider type="vertical" />
          <span>{{ user?.Vehicle?.Name }}</span>
          <a-divider type="vertical" />
          <span>{{ user?.Vehicle?.LicensePlate }}</span>
        </div>
      </div>
    </div>
    <div class="containerBoxUser__contact">
      <a-popover v-model="visible" trigger="click">
        <span slot="content">{{ user?.PhoneNumber }}</span>
        <a-button type="primary" icon="phone" size="large" />
      </a-popover>
      <!-- <a-button type="primary" icon="message" size="large" /> -->
    </div>
  </div>
</template>

<script>
import { vehicle } from "@/constants/vehicle";

export default {
  name: "BoxUser",
  props: {
    isDriver: {
      type: Boolean,
    },
    user: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {
      vehicle,
      visible: false,
    };
  },
};
</script>

<style lang="scss">
.containerBoxUser {
  width: 100%;
  border-radius: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  &__avatar {
    width: 100px;
    height: 100px;
  }
  &__contact {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .boxFlex {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .ant-skeleton-header .ant-skeleton-avatar-lg.ant-skeleton-avatar-circle {
    width: 100px;
    height: 100px;
  }
}
</style>
