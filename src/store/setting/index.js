import settingService from "@/services/setting";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    listSetting: [],
    isLoading: false,
  },
  getters: {
    listSetting(state) {
      return state.listSetting;
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_LIST_SETTING(state, listSetting) {
      state.listSetting = listSetting;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getSetting({ commit }) {
      commit("SET_IS_LOADING", true);
      try {
        const res = await settingService.getSetting();
        if (res && res.StatusCode === 200) {
          console.log(res.Data);
          commit("SET_LIST_SETTING", res.Data);
          commit("SET_IS_LOADING", false);
        }
      } catch (error) {
        commit("SET_IS_LOADING", false);
        console.log(
          "🚀 ~ file: index.js ~ line 41 ~ getSetting ~ error",
          error
        );
      }
    },
  },
};
