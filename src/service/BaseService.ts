import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    const tokenExpire = localStorage.getItem("tokenExpire");

    if (token && tokenExpire) {
      const now = new Date().getTime();
      const expire = parseInt(tokenExpire, 10);

      if (expire < now) {
        // Token telah kedaluwarsa, hapus token dan arahkan ke halaman login
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpire");
        window.location.href = "/login";
      } else {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/home";
    }

    return Promise.reject(error);
  }
);

export default api;
