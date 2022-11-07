<template>
  <div class="containerMessage">
    <div class="containerMessage__listchat">
      <HeaderPage
        :title="title"
        :isSearch="isSearch"
        :titleButton="titleButton"
        :iconHeader="iconHeader"
      />
      <div style="margin-top: 20px">
        <SearchVue :placeholder="placeholder" />
      </div>
      <div style="margin-top: 20px">
        <div
          v-if="getLoadingListChat"
          style="display: flex; justify-content: center"
        >
          <a-spin />
        </div>
        <TabItem
          v-else
          v-for="(itemChat, index) in getterListChat"
          :key="itemChat.Code"
          :itemChat="itemChat"
          :lengthListChat="getterListChat.length - 1"
          :index="index"
          :handleSelectedTabItem="handleSelectedTabItem"
        />
      </div>
    </div>
    <div class="containerMessage__message">
      <div class="containerMessage__message__header">
        <div v-if="!getLoadingListChat" class="shadow">
          <!-- <a-avatar
            v-if="userDiff !== null"
            :size="52"
            style="color: #1c9440; background-color: #e1f7e8"
            >{{ userDiff?.Name[0].toUpperCase() }}</a-avatar
          > -->
          <img
            src="https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221107/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221107T091048Z&X-Amz-SignedHeaders=host&X-Amz-Signature=5f95d41921e28d2813c5b295408e593da9382f3ddacc10cc4fcb3ea67f23c500"
            alt=""
            style="width: 50px; padding: 10px"
          />
        </div>
        <div style="margin-left: 10px" v-if="!getLoadingListChat">
          <span class="containerMessage__message__header__name">{{
            userDiff?.Name
          }}</span>
        </div>
      </div>
      <a-divider style="margin-bottom: 0" />
      <div class="containerMessage__message__box">
        <div
          v-if="getLoadingListMessage"
          style="
            display: flex;
            justify-content: center;
            height: calc(100vh - 64px - 16px - 52px - 72px - 42px);
          "
        >
          <a-spin />
        </div>
        <div v-else v-for="(item, index) in listMessage" :key="index">
          <a-tooltip placement="right">
            <template #title>
              <span>{{ getTime(item.Time) }}</span>
            </template>
            <div
              v-if="!item.isAdmin"
              class="containerMessage__message__box__messageUser"
            >
              {{ item.Content }}
            </div>
          </a-tooltip>

          <div v-if="item.isAdmin" class="containerMessage__message__box__me">
            <a-tooltip placement="left">
              <template #title>
                <span>{{ getTime(item.Time) }}</span>
              </template>
              <div class="containerMessage__message__box__me__messageMe">
                {{ item.Content }}
              </div>
            </a-tooltip>
          </div>
        </div>
      </div>
      <div class="containerMessage__message__send">
        <a-input-search
          class="containerMessage__message__send__box"
          placeholder="Aa..."
          @search="onSend"
          v-model="searchValue"
        >
          <a-button slot="enterButton" type="primary">
            Send
          </a-button></a-input-search
        >
      </div>
    </div>
    <div class="containerMessage__more"></div>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import SearchVue from "@/components/commons/SearchInput";
import TabItem from "@/components/commons/TabItem";
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "MessagesVue",
  components: {
    HeaderPage,
    SearchVue,
    TabItem,
  },
  data() {
    return {
      title: "Messages",
      isSearch: false,
      titleButton: "",
      iconHeader: "",
      placeholder: "Search",
      userDiff: null,
      listMessage: [],
      moment,
      searchValue: "",
    };
  },
  computed: {
    ...mapGetters({
      getterListChat: "message/getterListChat",
      getLoadingListChat: "message/getLoadingListChat",
      getterItemChatSelectedCode: "message/getterItemChatSelectedCode",
      getterMessageRoom: "message/getterMessageRoom",
      getLoadingListMessage: "message/getLoadingListMessage",
    }),
    ...mapGetters(["getReceiveMessage"]),
  },
  methods: {
    ...mapActions({
      getListChat: "message/getListChat",
      getMessageByCode: "message/getMessageByCode",
    }),
    ...mapMutations({
      setListChat: "message/SET_LIST_CHAT",
      setItemChatSelectedCode: "message/SET_ITEM_CHAT_SELECTED_CODE",
    }),
    async handleSelectedTabItem(code, index) {
      this.setItemChatSelectedCode(code);
      let { Code } = JSON.parse(localStorage.getItem("USER")).User;
      let user = this.getterListChat[index].Users.find(
        item => item.Code !== Code
      );
      this.userDiff = { ...user };
      this.listMessage = this.getterListChat[index].Messages.map(item => {
        return {
          ...item,
          isAdmin: item.UserCode === Code ? true : false,
        };
      });
    },
    getTime(time) {
      let result = "";
      let check = moment(moment(time, "DD-MM-YYYY HH:mm:ss")).isSame(
        new Date(),
        "day"
      );
      if (check) {
        result = moment(moment(time, "DD-MM-YYYY HH:mm:ss")).format("hh:mm A");
      } else {
        result = moment(moment(time, "DD-MM-YYYY HH:mm:ss")).format("DD MMM");
      }
      return result;
    },
    onSend(value) {
      let { Code } = JSON.parse(localStorage.getItem("USER")).User;
      let data = {
        Content: value,
        Time: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
        Status: 1,
        StatusName: "Active",
        UserCode: Code,
        isAdmin: true,
      };
      this.listMessage.push(data);
      setTimeout(() => {
        var objDiv = document.getElementsByClassName(
          "containerMessage__message__box"
        );
        objDiv[0].scrollTop = objDiv[0].scrollHeight;
      }, 0);
      this.searchValue = "";
    },
  },
  watch: {
    async getReceiveMessage() {
      //get list chat left when receive message
      const res = await this.getListChat(false);
      let { Code } = JSON.parse(localStorage.getItem("USER")).User;
      if (res) {
        let user = res[0]?.Users.find(item => item.Code !== Code);
        this.userDiff = { ...user };
      }
      // get message when receive message
      const resMes = await this.getMessageByCode({
        code: this.getterItemChatSelectedCode,
        isLoading: false,
      });
      this.listMessage = resMes.Messages.map(item => {
        return {
          ...item,
          isAdmin: item.UserCode === Code ? true : false,
        };
      });
    },
  },
  async mounted() {
    this.setListChat([]);
    const res = await this.getListChat();
    let { Code } = JSON.parse(localStorage.getItem("USER")).User;
    if (res) {
      let user = res[0]?.Users.find(item => item.Code !== Code);
      this.userDiff = { ...user };
    }
    this.setItemChatSelectedCode(res[0].Code);
    this.listMessage = res[0].Messages.map(item => {
      return {
        ...item,
        isAdmin: item.UserCode === Code ? true : false,
      };
    });
    setTimeout(() => {
      var objDiv = document.getElementsByClassName(
        "containerMessage__message__box"
      );
      objDiv[0].scrollTop = objDiv[0].scrollHeight;
    }, 0);
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";

.containerMessage {
  height: calc(100vh - 64px - 16px);
  display: flex;
  &__listchat {
    width: 25%;
    height: 100%;
    padding-right: 16px;
  }
  &__message {
    width: 50%;
    height: 100%;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    &__header {
      display: flex;
      align-items: center;
      padding: 0 32px;
      min-height: 52px;
      &__name {
        font-size: $h3;
        font-weight: 500;
      }
    }
    &__box {
      height: calc(100vh - 64px - 16px - 52px - 72px - 42px);
      margin-top: 10px;
      overflow-y: auto;
      padding: 10px 32px;
      &__messageUser {
        width: 48%;
        padding: 10px 15px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        border-radius: 10px 10px 10px 0;
        margin-bottom: 20px;
      }
      &__me {
        display: flex;
        justify-content: flex-end;
        &__messageMe {
          width: 48%;
          padding: 10px 15px;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
            rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
          border-radius: 10px 10px 0px 10px;
          margin-bottom: 20px;
        }
      }
    }
    &__send {
      padding: 0px 32px;
      height: 72px;
      margin-bottom: 100px;
      display: flex;
      align-items: center;
      &__box {
        .ant-input {
          height: 40px;
        }
        .ant-btn {
          height: 40px;
        }
      }
    }
  }
  &__more {
    width: 25%;
    height: 100%;
  }
}
.shadow {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 100%;
}
</style>
