import routeService from "@/services/route";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    route: [],
    isLoading: false,
    routeByCode: {},
    listStationProps: [],
    listStationAdd: [
      {
        Code: "",
        Name: "",
      },
    ],
    pagination: {},
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
    getRouteByCode(state) {
      return state.routeByCode;
    },
    getListStationProps(state) {
      return state.listStationProps;
    },
    getListStationAdd(state) {
      return state.listStationAdd;
    },
    getPagination(state) {
      return state.pagination;
    },
  },
  mutations: {
    SET_ROUTE(state, route) {
      state.route = route;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ROUTE_BY_CODE(state, routeByCode) {
      state.routeByCode = routeByCode;
    },
    SET_LIST_STATION_PROPS(state, listStationProps) {
      state.listStationProps = listStationProps;
    },
    SET_LIST_STATION_ADD(state, listStationAdd) {
      state.listStationAdd = listStationAdd;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
  },
  actions: {
    async getAllRoute({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await routeService.getAllRoute();
        if (res && res.StatusCode === 200) {
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
    async createRouteFromListStation({ commit }, data) {
      try {
        const res = await routeService.createRouteFromListStation(
          data.listStation,
          data.routeName
        );
        return res;
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 94 ~ createRouteFromListStation ~ error",
          error
        );
      }
    },
    // eslint-disable-next-line
    async updateRouteFromListStation({ commit }, data) {
      try {
        const res = await routeService.updateRouteFromListStation(
          data.routeCode,
          data.listStation,
          data.nameRoute
        );
        return res;
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js ~ line 105 ~ updateRouteFromListStation ~ error",
          error
        );
      }
    },
    async getRouteByCode({ commit }, code) {
      commit("SET_LOADING", true);
      try {
        const res = await routeService.getAllRoute();
        if (res && res.StatusCode === 200) {
          const route = res.Data.find(item => item.Code === code);
          // console.log(route);
          if (route) {
            commit("SET_LIST_STATION_PROPS", route.Stations);
            commit("SET_ROUTE_BY_CODE", route);
            commit("SET_LOADING", false);
            return route;
          }
        }
      } catch (error) {
        commit("SET_LOADING", false);
        console.log(
          "🚀 ~ file: index.js ~ line 125 ~ getAllRoute ~ error",
          error
        );
      }
    },
    async getRoutePaging({ commit }, params) {
      commit("SET_LOADING", true);
      try {
        const res = await routeService.getRoutePaging(
          params.search,
          params.page,
          params.pageSize
        );
        console.log("hi", res);
        if (res && res.StatusCode === 200) {
          commit("SET_ROUTE", res.Data?.Items);
          commit("SET_PAGINATION", {
            total: res.Data.TotalItemsCount,
            current: res.Data.Page,
            pageSize: res.Data.PageSize,
          });
          commit("SET_LOADING", false);
          return res;
        } else {
          commit("SET_LOADING", false);
          return res;
        }
      } catch (error) {
        commit("SET_LOADING", false);
        console.log(
          "🚀 ~ file: index.js ~ line 153 ~ getRoutePaging ~ error",
          error
        );
      }
    },
  },
};
