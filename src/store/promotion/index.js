import promotionService from "@/services/promotion";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    listPromotion: [],
    isLoading: false,
  },
  getters: {
    getListPromotion(state) {
      return state?.listPromotion.map(item => {
        return {
          ...item,
          StatusPromotion: item.Status,
        };
      });
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_LIST_PROMOTION(state, listPromotion) {
      state.listPromotion = listPromotion;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getPromotion({ commit }, search) {
      commit("SET_LOADING", true);
      try {
        const res = await promotionService.getPromotion(search);
        if (res && res.StatusCode === 200) {
          commit("SET_LIST_PROMOTION", res.Data);
          commit("SET_LOADING", false);
        } else {
          commit("SET_LOADING", false);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 40 ~ getPromotion ~ error",
          error
        );
        commit("SET_LOADING", false);
      }
    },
  },
};
