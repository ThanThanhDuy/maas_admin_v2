<template>
  <div>
    <div
      class="containerTabItem"
      @click="() => handleTabItem(itemChat.Code, index)"
    >
      <div>
        <a-avatar
          :size="52"
          style="color: #1c9440; background-color: #e1f7e8"
          >{{ userDiff?.Name[0].toUpperCase() }}</a-avatar
        >
      </div>
      <div class="containerTabItem__user">
        <p class="containerTabItem__user__name">{{ userDiff?.Name }}</p>
        <div
          style="margin-top: 8px; display: flex; justify-content: space-between"
        >
          <span
            class="containerTabItem__user__message"
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 70%;
            "
            >{{
              lastMessage.isYou
                ? `You: ${lastMessage.Content}`
                : lastMessage.Content
            }}</span
          >
          <span class="containerTabItem__user__time">{{ lastTime }}</span>
        </div>
      </div>
    </div>
    <a-divider v-if="index !== lengthListChat" />
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "TabItem",
  props: {
    itemChat: {
      type: Object,
      default: () => {},
    },
    lengthListChat: {
      type: Number,
    },
    index: {
      type: Number,
    },
    handleSelectedTabItem: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    handleTabItem(code, index) {
      this.handleSelectedTabItem(code, index);
    },
  },
  computed: {
    userDiff() {
      let user = {};
      if (this.itemChat) {
        let { Code } = JSON.parse(localStorage.getItem("USER")).User;
        user = this.itemChat?.Users.find(item => item.Code !== Code);
      }
      return user;
    },
    lastMessage() {
      let message = {};
      if (this.itemChat) {
        let { Code } = JSON.parse(localStorage.getItem("USER")).User;
        message = this.itemChat.Messages[this.itemChat?.Messages.length - 1];
        message = {
          ...message,
          isYou: message.UserCode === Code ? true : false,
        };
      }
      return message;
    },
    lastTime() {
      let result = "";
      let check = moment(
        moment(this.lastMessage?.Time, "DD-MM-YYYY HH:mm:ss")
      ).isSame(new Date(), "day");
      if (check) {
        result = moment(
          moment(this.lastMessage?.Time, "DD-MM-YYYY HH:mm:ss")
        ).format("hh:mm A");
      } else {
        result = moment(
          moment(this.lastMessage?.Time, "DD-MM-YYYY HH:mm:ss")
        ).format("DD MMM");
      }
      return result;
    },
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";
.containerTabItem {
  display: flex;
  align-items: center;
  cursor: pointer;
  &__user {
    margin-left: 10px;
    width: 80%;
    &__name {
      font-size: $large;
      font-weight: 500;
    }
    &__message {
      font-weight: 400;
      font-size: $medium;
      color: $black40;
    }
    &__time {
      font-weight: 400;
      font-size: $medium;
      color: $black50;
      opacity: 0.7;
    }
  }
}
</style>
