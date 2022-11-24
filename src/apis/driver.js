import axiosClient from ".";

class DriverApi {
  constructor() {
    this.PREFIX = "admins/drivers/";
  }

  async getListDriver(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url, { params });
  }

  async getDriverByCode(code) {
    const url = `${this.PREFIX}${code}`;
    return await axiosClient.get(url);
  }
}

const driverApi = new DriverApi();
export default driverApi;
