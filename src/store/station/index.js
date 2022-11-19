import stationService from "@/services/station";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    listStation: [],
    isLoading: false,
  },
  getters: {
    listStation(state) {
      return state.listStation;
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_LIST_STATION(state, listStation) {
      state.listStation = listStation;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getAllStation({ commit }) {
      commit("SET_IS_LOADING", true);
      try {
        const res = await stationService.getAllStation();
        if (res && res.StatusCode === 200) {
          commit("SET_LIST_STATION", res.Data);
          commit("SET_IS_LOADING", false);
        }
      } catch (error) {
        commit("SET_IS_LOADING", false);
        console.log(
          "🚀 ~ file: index.js ~ line 41 ~ getAllStation ~ error",
          error
        );
      }
    },
  },
};
