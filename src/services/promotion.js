import promotionApi from "@/apis/promotion";

class PromotionService {
  async getPromotion(search) {
    let params;
    if (search) {
      params = {
        SearchValue: search,
      };
    }
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

  async deletePromotion(id) {
    let params = {
      Ids: [id],
    };
    try {
      var response = await promotionApi.deletePromotion(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const promotionService = new PromotionService();
export default promotionService;
