import axiosClient from ".";

class DashboardApi {
  constructor() {
    this.PREFIX = "admins/dashboard/";
  }

  async getDashboard(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url, { params });
  }
}

const dashboardApi = new DashboardApi();
export default dashboardApi;
