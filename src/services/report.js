import reportApi from "@/apis/report";

class ReportService {
  async getReport(page, pageSize, status = null) {
    const params = {
      Page: page,
      PageSize: pageSize,
      Status: status,
    };
    try {
      var response = await reportApi.getReport(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async getDataReport(code) {
    const params = {
      Code: code,
    };
    try {
      var response = await reportApi.getDataReport(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async updateReport(code, status) {
    const params = {
      Code: code,
      Status: status,
    };
    try {
      var response = await reportApi.updateReport(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const reportService = new ReportService();
export default reportService;
