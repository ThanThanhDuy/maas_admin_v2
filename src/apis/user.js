import axiosClient from ".";

class UserApi {
  constructor() {
    this.PREFIX = "users/logout";
  }

  async logout() {
    const url = `${this.PREFIX}`;
    return await axiosClient.post(url);
  }
}

const userApi = new UserApi();
export default userApi;
