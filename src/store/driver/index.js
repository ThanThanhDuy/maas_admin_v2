import driverService from "@/services/driver";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    driver: [],
    isLoading: false,
    isLoadingDetail: false,
    pagination: {},
    driverDetail: {},
  },
  getters: {
    getterDriver(state) {
      return state.driver.Items;
    },
    getterDriverDetail(state) {
      return state.driverDetail;
    },
    getLoading(state) {
      return state.isLoading;
    },
    getLoadingDetail(state) {
      return state.isLoadingDetail;
    },
    getPagination(state) {
      return state.pagination;
    },
  },
  mutations: {
    SET_DRIVER(state, driver) {
      state.driver = driver;
    },
    SET_DRIVER_DETAIL(state, driverDetail) {
      state.driverDetail = driverDetail;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_LOADING_DETAIL(state, isLoadingDetail) {
      state.isLoadingDetail = isLoadingDetail;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
  },
  actions: {
    async getDriver({ commit }, param) {
      commit("SET_LOADING", true);
      try {
        const res = await driverService.getListDriver(
          param.search,
          param.page,
          param.pageSize,
          param.status
        );
        console.log(res);
        if (res && res.StatusCode === 200) {
          commit("SET_DRIVER", res.Data);
          commit("SET_LOADING", false);
          commit("SET_PAGINATION", {
            total: res.Data.TotalItemsCount,
            current: res.Data.Page,
            pageSize: res.Data.PageSize,
          });
          return res.Data;
        } else {
          commit("SET_LOADING", false);
          return res;
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 103 ~ getDriver ~ error",
          error
        );
        commit("SET_LOADING", false);
      }
    },
    async getDriverByCode({ commit }, code) {
      try {
        commit("SET_LOADING_DETAIL", true);
        const res = await driverService.getDriverByCode(code);
        // console.log(res);
        if (res && res.StatusCode === 200) {
          commit("SET_DRIVER_DETAIL", res.Data);
          commit("SET_LOADING_DETAIL", false);
          return res;
        } else {
          commit("SET_LOADING_DETAIL", false);
          return res;
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 103 ~ getDriver ~ error",
          error
        );
        commit("SET_LOADING_DETAIL", false);
      }
    },
  },
};
