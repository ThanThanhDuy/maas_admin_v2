import routeApi from "@/apis/route";

class RouteService {
  async getAllRoute() {
    try {
      var response = await routeApi.getAllRoute();
    } catch (error) {
      return error;
    }
    return response;
  }

  async createRouteFromListStation(listStation) {
    try {
      var response = await routeApi.createRouteFromListStation(listStation);
    } catch (error) {
      return error;
    }
    return response;
  }

  async updateRouteFromListStation(routeCode, listStation) {
    try {
      var response = await routeApi.updateRouteFromListStation(
        routeCode,
        listStation
      );
    } catch (error) {
      return error;
    }
    return response;
  }
}

const routeService = new RouteService();
export default routeService;
