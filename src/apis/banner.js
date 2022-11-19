import axiosClient from ".";

class BannerApi {
  constructor() {
    this.PREFIX = "banners/";
  }

  async getListBanner() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }
}

const bannerApi = new BannerApi();
export default bannerApi;
