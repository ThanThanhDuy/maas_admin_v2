import authService from "@/services/auth";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    USER: {},
  },
  getters: {
    GET_USER(state) {
      return state.USER;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.USER = user;
    },
  },
  actions: {
    // eslint-disable-next-line
    async login({ commit }, params) {
      try {
        const res = await authService.login(params);
        return res;
      } catch (error) {
        return error;
      }
    },
  },
};
