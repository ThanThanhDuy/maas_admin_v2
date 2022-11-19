import bannerApi from "@/apis/banner";

class BannerService {
  async getListBanner() {
    try {
      var response = await bannerApi.getListBanner();
    } catch (error) {
      return error;
    }
    return response;
  }
}

const bannerService = new BannerService();
export default bannerService;
