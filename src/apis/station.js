import axiosClient from ".";

class StationApi {
  constructor() {
    this.PREFIX = "stations/";
  }

  async getAllStation() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }

  async createStation(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.post(url, params);
  }

  async updateStation(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.put(url, params);
  }

  async deleteStation(code) {
    const url = `${this.PREFIX}${code}`;
    return await axiosClient.delete(url);
  }
}

const stationApi = new StationApi();
export default stationApi;
