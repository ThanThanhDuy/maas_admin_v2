import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getReports = tab =>
  new Promise(resolve => {
    setTimeout(() => {
      if (tab === 1) {
        resolve([
          {
            CodeReport: "123e4567-e89b-12d3-a456-426614174000",
            TitleReport: "The customer doesn't arrive at the pick-up point",
            UserCode: "124e4567-e89b-12d3-a456-426614174000",
            UserName: "Quách Đại Lợi",
            DateReport: "07-11-2022",
            StatusReport: 0,
          },
          {
            CodeReport: "124e4567-e89b-12d3-a456-426614174000",
            TitleReport: "Unable to contact customer",
            UserCode: "124e4567-e89b-12d3-a456-426614174000",
            UserName: "Thân Thanh Duy",
            DateReport: "07-11-2022",
            StatusReport: 0,
          },
          {
            CodeReport: "124e4567-e89b-12d3-a456-426614174000",
            TitleReport: "The driver's vehicle has a problem",
            UserCode: "124e4567-e89b-12d3-a456-426614174000",
            UserName: "Huỳnh Anh Vũ",
            DateReport: "07-11-2022",
            StatusReport: 0,
          },
        ]);
      } else if (tab === 2) {
        resolve([
          {
            CodeReport: "123e4567-e89b-12d3-a456-426614174000",
            TitleReport: "The driver doesn't come to the pick-up point",
            UserCode: "124e4567-e89b-12d3-a456-426614174000",
            UserName: "Nguyễn Đăng Khoa",
            DateReport: "07-11-2022",
            StatusReport: 0,
          },
          {
            CodeReport: "124e4567-e89b-12d3-a456-426614174000",
            TitleReport: "Unable to contact the driver",
            UserCode: "124e4567-e89b-12d3-a456-426614174000",
            UserName: "Đỗ Trọng Đạt",
            DateReport: "07-11-2022",
            StatusReport: 0,
          },
        ]);
      }
    }, 1500);
  });

export default {
  namespaced: true,
  state: {
    report: [],
    isLoading: false,
  },
  getters: {
    getterReport(state) {
      return state.report;
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_REPORT(state, report) {
      state.report = report;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getReport({ commit }, tab) {
      commit("SET_LOADING", true);
      try {
        const res = await getReports(tab);
        if (res) {
          commit("SET_REPORT", res);
          commit("SET_LOADING", false);
        }
      } catch (error) {
        console.log(error);
        commit("SET_LOADING", false);
      }
    },
  },
};
