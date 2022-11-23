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

  async createRouteFromListStation(StationCodes) {
    const url = `${this.PREFIX}`;
    return await axiosClient.post(url, { StationCodes });
  }

  async updateRouteFromListStation(RouteCode, StationCodes) {
    const url = `${this.PREFIX}`;
    return await axiosClient.put(url, { RouteCode, StationCodes });
  }
}

const routeApi = new RouteApi();
export default routeApi;
