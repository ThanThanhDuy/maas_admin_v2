import axiosClient from ".";
import axiosClientFormData from "./indexFormData";

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

  async updateDriverByCode(code, params) {
    const url = `${this.PREFIX}${code}`;
    return await axiosClientFormData.put(url, params);
  }
}

const driverApi = new DriverApi();
export default driverApi;
