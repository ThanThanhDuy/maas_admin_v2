import axiosClient from ".";

class RouteApi {
  constructor() {
    this.PREFIX = "routes/";
  }

  async getAllRoute() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }

  async createRouteFromListStation(StationCodes) {
    const url = `${this.PREFIX}`;
    return await axiosClient.post(url, { StationCodes });
  }
}

const routeApi = new RouteApi();
export default routeApi;
