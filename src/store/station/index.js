import stationService from "@/services/station";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    listStation: [],
    isLoading: false,
    pagination: {},
  },
  getters: {
    listStation(state) {
      return state.listStation;
    },
    getLoading(state) {
      return state.isLoading;
    },
    getPagination(state) {
      return state.pagination;
    },
  },
  mutations: {
    SET_LIST_STATION(state, listStation) {
      state.listStation = listStation;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
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
    async getStationPaging({ commit }, params) {
      params.loading && commit("SET_IS_LOADING", true);
      try {
        const res = await stationService.getStationPaging(
          params.search,
          params.page,
          params.pageSize
        );
        console.log(res);
        if (res && res.StatusCode === 200) {
          commit("SET_LIST_STATION", res.Data?.Items);
          commit("SET_PAGINATION", {
            total: res.Data.TotalItemsCount,
            current: res.Data.Page,
            pageSize: res.Data.PageSize,
          });
          params.loading && commit("SET_IS_LOADING", false);
          return res;
        }
      } catch (error) {
        params.loading && commit("SET_IS_LOADING", false);
        console.log(
          "🚀 ~ file: index.js ~ line 46 ~ getStationPaging ~ error",
          error
        );
      }
    },
  },
};
