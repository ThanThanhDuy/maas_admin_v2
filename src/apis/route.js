import axiosClient from ".";

class RouteApi {
  constructor() {
    this.PREFIX = "routes/";
  }

  async getAllRoute() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }

  async getRoutePaging(params) {
    const url = "admins/routes";
    return await axiosClient.get(url, { params });
  }

  async createRouteFromListStation(StationCodes, RouteName) {
    const url = `${this.PREFIX}`;
    return await axiosClient.post(url, { StationCodes, RouteName });
  }

  async updateRouteFromListStation(RouteCode, StationCodes, RouteName) {
    const url = `${this.PREFIX}`;
    return await axiosClient.put(url, { RouteCode, StationCodes, RouteName });
  }

  async deleteRouteByCode(code) {
    const url = `${this.PREFIX}${code}`;
    return await axiosClient.delete(url);
  }
}

const routeApi = new RouteApi();
export default routeApi;
