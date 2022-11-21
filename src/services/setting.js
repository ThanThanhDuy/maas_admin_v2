import settingApi from "@/apis/setting";

class SettingService {
  async getSetting() {
    try {
      var response = await settingApi.getSetting();
    } catch (error) {
      return error;
    }
    return response;
  }

  async updateSetting(id, value) {
    const params = {
      Settings: {
        [id]: value,
      },
    };
    console.log(params);
    try {
      var response = await settingApi.updateSetting(params);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const settingService = new SettingService();
export default settingService;
