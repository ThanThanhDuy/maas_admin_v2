import bannerService from "@/services/banner";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    listBanner: [],
    isLoading: false,
  },
  getters: {
    getListBanner(state) {
      return state.listBanner;
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_LIST_BANNER(state, listBanner) {
      state.listBanner = listBanner;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getListBanner({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await bannerService.getListBanner();
        if (res && res.StatusCode === 200) {
          commit("SET_LIST_BANNER", res.Data);
          commit("SET_LOADING", false);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 29 ~ getListBanner ~ error",
          error
        );
        commit("SET_LOADING", false);
      }
    },
  },
};
