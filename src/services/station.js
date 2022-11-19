import stationApi from "@/apis/station";

class StationService {
  async getAllStation() {
    try {
      var response = await stationApi.getAllStation();
    } catch (error) {
      return error;
    }
    return response;
  }

  async createStation(params) {
    try {
      var response = await stationApi.createStation([params]);
    } catch (error) {
      return error;
    }
    return response;
  }

  async updateStation(params) {
    try {
      var response = await stationApi.updateStation(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async deleteStation(code) {
    try {
      var response = await stationApi.deleteStation(code);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const stationService = new StationService();
export default stationService;
