import authApi from "@/apis/auth";

class AuthService {
  async login(idToken) {
    try {
      var response = await authApi.login(idToken);
    } catch (error) {
      return error;
    }
    return response;
  }
}

const authService = new AuthService();
export default authService;
