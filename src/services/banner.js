import bannerApi from "@/apis/banner";

class BannerService {
  async getListBanner(search) {
    let params;
    if (search) {
      params = {
        Title: search,
      };
    } else {
      params = {};
    }
    try {
      var response = await bannerApi.getListBanner(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async createBanner(params) {
    try {
      var response = await bannerApi.createBanner(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async udpateBanner(params) {
    try {
      var response = await bannerApi.updateBanner(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async deleteBanner(id) {
    let params = {
      Ids: [id],
    };
    try {
      var response = await bannerApi.deleteBanner(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const bannerService = new BannerService();
export default bannerService;
