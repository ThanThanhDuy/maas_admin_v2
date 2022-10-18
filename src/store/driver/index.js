import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getDriver = status =>
  new Promise(resolve => {
    setTimeout(() => {
      if (status === 0) {
        resolve([
          {
            Code: "123e4567-e89b-12d3-a456-426614174000",
            Name: "Thân Thanh Duy",
            Phone: "0376826328",
            Email: "duyttse140971@fpt.edu.vn",
            Birthdate: "11/11/1111",
            StatusDriver: 0,
          },
          {
            Code: "124e4567-e89b-12d3-a456-426614174000",
            Name: "Nguyễn Đăng Khoa",
            Phone: "0376826328",
            Email: "duyttse140971@fpt.edu.vn",
            Birthdate: "22/12/2222",
            StatusDriver: 0,
          },
        ]);
      } else if (status === 1) {
        resolve([
          {
            Code: "123e4567-e89b-12d3-a456-426614174000",
            Name: "Thân Thanh Duy",
            Phone: "0376826328",
            Email: "duyttse140971@fpt.edu.vn",
            Birthdate: "11/11/1111",
            StatusDriver: 1,
          },
          {
            Code: "124e4567-e89b-12d3-a456-426614174000",
            Name: "Nguyễn Đăng Khoa",
            Phone: "0376826328",
            Email: "duyttse140971@fpt.edu.vn",
            Birthdate: "22/12/2222",
            StatusDriver: 1,
          },
        ]);
      } else {
        resolve([
          {
            Code: "123e4567-e89b-12d3-a456-426614174000",
            Name: "Thân Thanh Duy",
            Phone: "0376826328",
            Email: "duyttse140971@fpt.edu.vn",
            Birthdate: "11/11/1111",
            StatusDriver: 2,
          },
          {
            Code: "124e4567-e89b-12d3-a456-426614174000",
            Name: "Nguyễn Đăng Khoa",
            Phone: "0376826328",
            Email: "duyttse140971@fpt.edu.vn",
            Birthdate: "22/12/2222",
            StatusDriver: 2,
          },
        ]);
      }
    }, 1500);
  });

export default {
  namespaced: true,
  state: {
    driver: [],
    isLoading: false,
  },
  getters: {
    getterDriver(state) {
      return state.driver;
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_DRIVER(state, driver) {
      state.driver = driver;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getDriver({ commit }, status) {
      commit("SET_LOADING", true);
      try {
        const res = await getDriver(status);
        if (res) {
          commit("SET_DRIVER", res);
          commit("SET_LOADING", false);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 103 ~ getDriver ~ error",
          error
        );
        commit("SET_LOADING", false);
      }
    },
  },
};
