import axiosClient from ".";

class StationApi {
  constructor() {
    this.PREFIX = "stations/";
  }

  async getAllStation() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }
}

const stationApi = new StationApi();
export default stationApi;
