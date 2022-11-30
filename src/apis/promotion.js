import axiosClient from ".";
import axiosClientFormData from "./indexFormData";

class PromotiontApi {
  constructor() {
    this.PREFIX = "admins/promotions/";
  }

  async getPromotion(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url, { params });
  }

  async createPromotion(params) {
    const url = `admins/promotion/`;
    return await axiosClientFormData.post(url, params);
  }

  async updatePromotion(params, id) {
    const url = `admins/promotions/${id}`;
    return await axiosClientFormData.put(url, params);
  }

  async deletePromotion(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.delete(url, { data: params });
  }
}

const promotiontApi = new PromotiontApi();
export default promotiontApi;
