import axiosClient from ".";
import axiosClientFormData from "./indexFormData";

class BannerApi {
  constructor() {
    this.PREFIX = "admins/banners";
  }

  async getListBanner(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url, { params });
  }

  async createBanner(params) {
    const url = `${this.PREFIX}`;
    return await axiosClientFormData.post(url, params);
  }

  async updateBanner(params) {
    const url = `${this.PREFIX}`;
    return await axiosClientFormData.put(url, params);
  }

  async deleteBanner(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.delete(url, params);
  }
}

const bannerApi = new BannerApi();
export default bannerApi;
