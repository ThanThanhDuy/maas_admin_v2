import userApi from "@/apis/user";

class UserService {
  async logout() {
    try {
      var response = await userApi.logout();
    } catch (error) {
      return error;
    }
    return response;
  }
}

const userService = new UserService();
export default userService;
