import reportService from "@/services/report";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    report: [],
    isLoading: false,
    dataReport: {},
    isLoadingDataReport: false,
  },
  getters: {
    getterReport(state) {
      return state.report;
    },
    getterReportHandle(state) {
      const result = state.report?.Data?.Items.map(item => {
        return {
          ...item,
          UserName: item.User.Name,
          UserCode: item.User.Code,
          UserPhone: item.User.PhoneNumber,
          StatusReport: item.Status,
        };
      });
      return result;
    },
    getLoading(state) {
      return state.isLoading;
    },
    getterDataReport(state) {
      return state.dataReport;
    },
    getLoadingDataReport(state) {
      return state.isLoadingDataReport;
    },
  },
  mutations: {
    SET_REPORT(state, report) {
      state.report = report;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_DATA_REPORT(state, dataReport) {
      state.dataReport = dataReport;
    },
    SET_LOADING_DATA_REPORT(state, isLoadingDataReport) {
      state.isLoadingDataReport = isLoadingDataReport;
    },
  },
  actions: {
    async getReport({ commit }, params) {
      commit("SET_LOADING", true);
      try {
        const res = await reportService.getReport(
          params.page,
          params.pageSize,
          params.search
        );
        console.log(res);
        if (res && res.StatusCode === 200) {
          commit("SET_REPORT", res);
          commit("SET_LOADING", false);
        }
      } catch (error) {
        console.log(error);
        commit("SET_LOADING", false);
      }
    },
    async getDataReport({ commit }, code) {
      commit("SET_LOADING_DATA_REPORT", true);
      try {
        const res = await reportService.getDataReport(code);
        if (res && res.StatusCode === 200) {
          commit("SET_DATA_REPORT", res);
          commit("SET_LOADING_DATA_REPORT", false);
          return res;
        }
      } catch (error) {
        console.log(error);
        commit("SET_LOADING_DATA_REPORT", false);
      }
      return null;
    },
  },
};
