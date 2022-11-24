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

  async getRoutePaging(search, page, pageSize) {
    let params = {};
    if (search) {
      params = {
        SearchValue: search,
        "Paging.Page": page,
        "Paging.PageSize": pageSize,
      };
    } else {
      params = {
        "Paging.Page": page,
        "Paging.PageSize": pageSize,
      };
    }
    try {
      var response = await routeApi.getRoutePaging(params);
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
