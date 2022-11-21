import axiosClient from ".";

class SettingApi {
  constructor() {
    this.PREFIX = "admins/settings/";
  }

  async getSetting() {
    const url = `${this.PREFIX}`;
    return await axiosClient.get(url);
  }

  async updateSetting(params) {
    const url = `${this.PREFIX}`;
    return await axiosClient.post(url, params);
  }
}

const settingApi = new SettingApi();
export default settingApi;
