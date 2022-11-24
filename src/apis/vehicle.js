import axiosClient from ".";

class VehicleApi {
  constructor() {
    this.PREFIX = "vehicles/types/";
  }

  async getAllVehicle() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }
}

const vehicleApi = new VehicleApi();
export default vehicleApi;
