import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import route from "./route";
import station from "./station";
import driver from "./driver";
import report from "./report";
import message from "./message";
import banner from "./banner";
import setting from "./setting";
import dashboard from "./dashboard";
import promotion from "./promotion";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemSelectedSideBar: "1",
    receiveMessage: {},
  },
  getters: {
    getItemSelectedSideBar(state) {
      return state.itemSelectedSideBar;
    },
    getReceiveMessage(state) {
      return state.receiveMessage;
    },
  },
  mutations: {
    SET_ITEM_SELECTED_SIDE_BAR(state, itemSelectedSideBar) {
      state.itemSelectedSideBar = itemSelectedSideBar;
    },
    SET_RECEIVE_MESSAGE(state, receiveMessage) {
      state.receiveMessage = receiveMessage;
    },
  },
  actions: {},
  modules: {
    auth,
    route,
    station,
    driver,
    report,
    message,
    banner,
    setting,
    dashboard,
    promotion,
  },
});
