import driverApi from "@/apis/driver";

class DriverService {
  async getListDriver(search, page, pageSize, status) {
    let params;
    if (search) {
      params = {
        SearchValue: search,
        "Paging.Page": page,
        "Paging.PageSize": pageSize,
        Status: status,
      };
    } else {
      params = {
        "Paging.Page": page,
        "Paging.PageSize": pageSize,
        Status: status,
      };
    }
    try {
      var response = await driverApi.getListDriver(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async getDriverByCode(code) {
    try {
      var response = await driverApi.getDriverByCode(code);
    } catch (error) {
      return error;
    }
    return response;
  }

  async updateDriverByCode(code, params) {
    try {
      var response = await driverApi.updateDriverByCode(code, params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const driverService = new DriverService();
export default driverService;
