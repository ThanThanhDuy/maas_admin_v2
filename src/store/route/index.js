import routeService from "@/services/route";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    route: [],
    isLoading: false,
  },
  getters: {
    getRoute(state) {
      let route = [];
      let data = state.route;
      for (let item of data) {
        route.push({
          code: item?.Code,
          from: item?.Stations[0]?.Name,
          to: item?.Stations[item?.Stations.length - 1]?.Name,
          station: item?.Stations.length,
          status: item?.Status,
          distance: item?.Distance,
        });
      }
      return route;
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_ROUTE(state, route) {
      state.route = route;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getAllRoute({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await routeService.getAllRoute();
        if (res && res.StatusCode === 200) {
          console.log(res.Data);
          commit("SET_ROUTE", res.Data);
          commit("SET_LOADING", false);
        }
      } catch (error) {
        commit("SET_LOADING", false);
        console.log(
          "🚀 ~ file: index.js ~ line 43 ~ getAllRoute ~ error",
          error
        );
      }
    },
    // eslint-disable-next-line
    async createRouteFromListStation({ commit }, listStation) {
      try {
        const res = await routeService.createRouteFromListStation(listStation);
        return res;
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 64 ~ createRouteFromListStation ~ error",
          error
        );
      }
    },
  },
};
