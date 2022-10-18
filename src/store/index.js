import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import route from "./route";
import station from "./station";
import driver from "./driver";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemSelectedSideBar: "1",
  },
  getters: {
    getItemSelectedSideBar(state) {
      return state.itemSelectedSideBar;
    },
  },
  mutations: {
    SET_ITEM_SELECTED_SIDE_BAR(state, itemSelectedSideBar) {
      state.itemSelectedSideBar = itemSelectedSideBar;
    },
  },
  actions: {},
  modules: { auth, route, station, driver },
});
