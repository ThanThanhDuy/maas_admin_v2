import promotionApi from "@/apis/promotion";

class PromotionService {
  async getPromotion(search) {
    const params = {
      SearchValue: search,
    };
    try {
      var response = await promotionApi.getPromotion(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async createPromotion(params) {
    try {
      var response = await promotionApi.createPromotion(params);
    } catch (error) {
      return error;
    }
    return response;
  }

  async updatePromotion(params, id) {
    try {
      var response = await promotionApi.updatePromotion(params, id);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const promotionService = new PromotionService();
export default promotionService;
