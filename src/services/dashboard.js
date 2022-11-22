import dashboardApi from "@/apis/dashboard";

class DashboardService {
  async getDashboard(from, to) {
    const params = {
      FromMonth: from,
      ToMonth: to,
    };
    try {
      var response = await dashboardApi.getDashboard(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const dashboardService = new DashboardService();
export default dashboardService;
