import dashboardService from "@/services/dashboard";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    dashboard: {},
    isLoading: false,
  },
  getters: {
    dashboard(state) {
      return state.dashboard;
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_DASHBOARD(state, dashboard) {
      state.dashboard = dashboard;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getDashboard({ commit }, date) {
      commit("SET_IS_LOADING", true);
      try {
        const res = await dashboardService.getDashboard(date.from, date.to);
        if (res && res.StatusCode === 200) {
          commit("SET_DASHBOARD", res.Data);
          commit("SET_IS_LOADING", false);
          return res.Data;
        }
      } catch (error) {
        commit("SET_IS_LOADING", false);
        console.log(
          "🚀 ~ file: index.js ~ line 42 ~ getSetting ~ error",
          error
        );
      }
    },
  },
};
