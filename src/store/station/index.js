import stationService from "@/services/station";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    listStation: [],
  },
  getters: {
    listStation(state) {
      return state.listStation;
    },
  },
  mutations: {
    SET_LIST_STATION(state, listStation) {
      state.listStation = listStation;
    },
  },
  actions: {
    async getAllStation({ commit }) {
      try {
        const res = await stationService.getAllStation();
        if (res && res.StatusCode === 200) {
          commit("SET_LIST_STATION", res.Data);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 32 ~ getAllStation ~ error",
          error
        );
      }
    },
  },
};
