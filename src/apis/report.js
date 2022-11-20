import axiosClient from ".";

class ReportApi {
  constructor() {
    this.PREFIX = "admins/reports/";
  }

  async getReport(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url, { params });
  }

  async getDataReport(params) {
    const url = `admins/report/data`;
    return await axiosClient.get(url, { params });
  }

  async updateReport(params) {
    const url = `admins/report`;
    return await axiosClient.put(url, params);
  }
}

const reportApi = new ReportApi();
export default reportApi;
