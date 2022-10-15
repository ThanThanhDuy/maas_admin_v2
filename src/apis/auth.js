import axiosClient from ".";

class AuthApi {
  constructor() {
    this.PREFIX = "admins/";
  }

  async login(params) {
    const url = `${this.PREFIX}gmail/login`;
    return await axiosClient.post(url, { IdToken: params });
  }
}

const authApi = new AuthApi();
export default authApi;
