import router from "@/router";
import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://vigo-application.herokuapp.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    if (error.response.data.StatusCode === 401) {
      router.push("/login");
    }
    throw error.response.data;
  }
);
export default axiosClient;
