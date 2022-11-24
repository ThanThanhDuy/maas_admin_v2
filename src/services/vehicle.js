import vehicleApi from "@/apis/vehicle";

class VehicleService {
  async getAllVehicle() {
    try {
      var response = await vehicleApi.getAllVehicle();
    } catch (error) {
      return error;
    }
    return response;
  }
}

const vehicleService = new VehicleService();
export default vehicleService;
