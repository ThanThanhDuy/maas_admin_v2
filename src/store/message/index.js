import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getMessage = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          Name: "",
          Code: "633bb70d-7ce5-4fc5-ac4b-5ee8f74454f8",
          Users: [
            {
              Code: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
              Name: "Admin Than Thanh Duy",
              LastSeenTime: "06-11-2022 21:18:01",
              AvatarUrl:
                "https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221106/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221106T142224Z&X-Amz-SignedHeaders=host&X-Amz-Signature=1ce0f4bbd53d0f260e448ec04a7f888fc69feb853889cc8dcf4f71d5fffdf6f3",
              AvatarCode: "d66967c9-d81e-43f6-ba50-f420df016c29",
              PhoneNumber: "+84376826328",
            },
            {
              Code: "567d0dbe-b616-419d-a403-63f6efb872f6",
              Name: "User Thanh Duy",
              LastSeenTime: "06-11-2022 21:22:18",
              AvatarUrl:
                "https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221106/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221106T142224Z&X-Amz-SignedHeaders=host&X-Amz-Signature=1ce0f4bbd53d0f260e448ec04a7f888fc69feb853889cc8dcf4f71d5fffdf6f3",
              AvatarCode: "737e7937-7284-4a65-9656-933dd9090a33",
              PhoneNumber: "+84376826328",
            },
          ],
          Messages: [
            {
              Content: "Admin ne",
              Time: "06-11-2022 21:22:11",
              Status: 1,
              StatusName: "Active",
              UserCode: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
            },
            {
              Content: "Hello Admin",
              Time: "06-11-2022 21:22:18",
              Status: 1,
              StatusName: "Active",
              UserCode: "567d0dbe-b616-419d-a403-63f6efb872f6",
            },
            {
              Content: "Hello bạn nhé! Bạn cần hỗ trợ gì ạ?",
              Time: "07-11-2022 22:22:11",
              Status: 1,
              StatusName: "Active",
              UserCode: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
            },
          ],
          Status: 1,
          StatusName: "Active",
          Type: 1,
          TypeName: "Conversation",
        },
        {
          Name: "",
          Code: "733bb70d-7ce5-4fc5-ac4b-5ee8f74454f8",
          Users: [
            {
              Code: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
              Name: "Admin Than Thanh Duy",
              LastSeenTime: "06-11-2022 21:18:01",
              AvatarUrl:
                "https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221106/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221106T142224Z&X-Amz-SignedHeaders=host&X-Amz-Signature=1ce0f4bbd53d0f260e448ec04a7f888fc69feb853889cc8dcf4f71d5fffdf6f3",
              AvatarCode: "d66967c9-d81e-43f6-ba50-f420df016c29",
              PhoneNumber: "+84376826328",
            },
            {
              Code: "567d0dbe-b616-419d-a403-63f6efb872f6",
              Name: "Thanh Duy User",
              LastSeenTime: "06-11-2022 21:22:18",
              AvatarUrl:
                "https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221106/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221106T142224Z&X-Amz-SignedHeaders=host&X-Amz-Signature=1ce0f4bbd53d0f260e448ec04a7f888fc69feb853889cc8dcf4f71d5fffdf6f3",
              AvatarCode: "737e7937-7284-4a65-9656-933dd9090a33",
              PhoneNumber: "+84376826328",
            },
          ],
          Messages: [
            {
              Content: "Admin ne 1",
              Time: "06-11-2022 21:22:11",
              Status: 1,
              StatusName: "Active",
              UserCode: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
            },
            {
              Content: "Hello Admin 1",
              Time: "06-11-2022 21:22:18",
              Status: 1,
              StatusName: "Active",
              UserCode: "567d0dbe-b616-419d-a403-63f6efb872f6",
            },
            {
              Content: "Hello bạn nhé! Bạn cần hỗ trợ gì ạ? 1",
              Time: "07-11-2022 22:22:11",
              Status: 1,
              StatusName: "Active",
              UserCode: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
            },
          ],
          Status: 1,
          StatusName: "Active",
          Type: 1,
          TypeName: "Conversation",
        },
      ]);
    }, 1500);
  });

const getMessagesByCode = code =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(
        [
          {
            Name: "",
            Code: "633bb70d-7ce5-4fc5-ac4b-5ee8f74454f8",
            Users: [
              {
                Code: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
                Name: "Admin Than Thanh Duy",
                LastSeenTime: "06-11-2022 21:18:01",
                AvatarUrl:
                  "https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221106/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221106T142224Z&X-Amz-SignedHeaders=host&X-Amz-Signature=1ce0f4bbd53d0f260e448ec04a7f888fc69feb853889cc8dcf4f71d5fffdf6f3",
                AvatarCode: "d66967c9-d81e-43f6-ba50-f420df016c29",
                PhoneNumber: "+84376826328",
              },
              {
                Code: "567d0dbe-b616-419d-a403-63f6efb872f6",
                Name: "User Thanh Duy",
                LastSeenTime: "06-11-2022 21:22:18",
                AvatarUrl:
                  "https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221106/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221106T142224Z&X-Amz-SignedHeaders=host&X-Amz-Signature=1ce0f4bbd53d0f260e448ec04a7f888fc69feb853889cc8dcf4f71d5fffdf6f3",
                AvatarCode: "737e7937-7284-4a65-9656-933dd9090a33",
                PhoneNumber: "+84376826328",
              },
            ],
            Messages: [
              {
                Content: "Admin ne",
                Time: "06-11-2022 21:22:11",
                Status: 1,
                StatusName: "Active",
                UserCode: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
              },
              {
                Content: "Hello Admin",
                Time: "06-11-2022 21:22:18",
                Status: 1,
                StatusName: "Active",
                UserCode: "567d0dbe-b616-419d-a403-63f6efb872f6",
              },
              {
                Content: "Hello bạn nhé! Bạn cần hỗ trợ gì ạ?",
                Time: "07-11-2022 22:22:11",
                Status: 1,
                StatusName: "Active",
                UserCode: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
              },
            ],
            Status: 1,
            StatusName: "Active",
            Type: 1,
            TypeName: "Conversation",
          },
          {
            Name: "",
            Code: "733bb70d-7ce5-4fc5-ac4b-5ee8f74454f8",
            Users: [
              {
                Code: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
                Name: "Admin Than Thanh Duy",
                LastSeenTime: "06-11-2022 21:18:01",
                AvatarUrl:
                  "https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221106/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221106T142224Z&X-Amz-SignedHeaders=host&X-Amz-Signature=1ce0f4bbd53d0f260e448ec04a7f888fc69feb853889cc8dcf4f71d5fffdf6f3",
                AvatarCode: "d66967c9-d81e-43f6-ba50-f420df016c29",
                PhoneNumber: "+84376826328",
              },
              {
                Code: "567d0dbe-b616-419d-a403-63f6efb872f6",
                Name: "Thanh Duy User",
                LastSeenTime: "06-11-2022 21:22:18",
                AvatarUrl:
                  "https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/default-user-avatar.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221106/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221106T142224Z&X-Amz-SignedHeaders=host&X-Amz-Signature=1ce0f4bbd53d0f260e448ec04a7f888fc69feb853889cc8dcf4f71d5fffdf6f3",
                AvatarCode: "737e7937-7284-4a65-9656-933dd9090a33",
                PhoneNumber: "+84376826328",
              },
            ],
            Messages: [
              {
                Content: "Admin ne 1",
                Time: "06-11-2022 21:22:11",
                Status: 1,
                StatusName: "Active",
                UserCode: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
              },
              {
                Content: "Hello Admin 1",
                Time: "06-11-2022 21:22:18",
                Status: 1,
                StatusName: "Active",
                UserCode: "567d0dbe-b616-419d-a403-63f6efb872f6",
              },
              {
                Content: "Hello bạn nhé! Bạn cần hỗ trợ gì ạ? 1",
                Time: "07-11-2022 22:22:11",
                Status: 1,
                StatusName: "Active",
                UserCode: "60bdce85-1e96-4ff0-87f5-d23cfbd43c8b",
              },
            ],
            Status: 1,
            StatusName: "Active",
            Type: 1,
            TypeName: "Conversation",
          },
        ].find(item => item.Code === code)
      );
    }, 1500);
  });

export default {
  namespaced: true,
  state: {
    listChat: [],
    isLoadingListChat: false,
    isLoadingListMessage: false,
    itemChatSelectedCode: "",
    messageRoom: {},
  },
  getters: {
    getterListChat(state) {
      return state.listChat;
    },
    getterMessageRoom(state) {
      return state.messageRoom;
    },
    getterItemChatSelectedCode(state) {
      return state.itemChatSelectedCode;
    },
    getLoadingListChat(state) {
      return state.isLoadingListChat;
    },
    getLoadingListMessage(state) {
      return state.isLoadingListMessage;
    },
  },
  mutations: {
    SET_LIST_CHAT(state, listChat) {
      state.listChat = listChat;
    },
    SET_MESSAGE_ROOM(state, messageRoom) {
      state.messageRoom = messageRoom;
    },
    SET_LOADING_LIST_CHAT(state, isLoadingListChat) {
      state.isLoadingListChat = isLoadingListChat;
    },
    SET_LOADING_LIST_MESSAGE(state, isLoadingListMessage) {
      state.isLoadingListMessage = isLoadingListMessage;
    },
    SET_ITEM_CHAT_SELECTED_CODE(state, itemChatSelectedCode) {
      state.itemChatSelectedCode = itemChatSelectedCode;
    },
  },
  actions: {
    async getListChat({ commit }, isLoading = true) {
      isLoading && commit("SET_LOADING_LIST_CHAT", true);
      try {
        const res = await getMessage();
        if (res) {
          commit("SET_LIST_CHAT", res);
          isLoading && commit("SET_LOADING_LIST_CHAT", false);
          return res;
        }
      } catch (error) {
        console.log(error);
        isLoading && commit("SET_LOADING_LIST_CHAT", false);
      }
    },
    async getMessageByCode({ commit }, data) {
      data.isLoading && commit("SET_LOADING_LIST_MESSAGE", true);
      try {
        const res = await getMessagesByCode(data.code);
        if (res) {
          commit("SET_MESSAGE_ROOM", res);
          data.isLoading && commit("SET_LOADING_LIST_MESSAGE", false);
          return res;
        }
      } catch (error) {
        console.log(error);
        data.isLoading && commit("SET_LOADING_LIST_MESSAGE", false);
      }
    },
    // eslint-disable-next-line
    async sendMessageByCode({ commit }, data) {
      try {
        const res = await getMessagesByCode(data.code);
        if (res) {
          // commit("SET_MESSAGE_ROOM", res);
          return res;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
