import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://192.168.8.124:5000",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Function to refresh the token
const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      const response = await axiosInstance.post("/refresh", {
        token: refreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      console.log("hhoo");
      return accessToken;
    } catch (error) {
      console.error("Failed to refresh token", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // useNavigate()("/login");
    }
  }
  return null;
};

// Check token expiration
const isTokenExpired = (token: string | null) => {
  if (!token) {
    return true; // Consider the token expired if it doesn't exist
  }
  const { exp } = jwtDecode<{ exp: number }>(token);
  return Date.now() >= exp * 1000;
};

// Token refresh queue to prevent multiple refresh requests
let isRefreshing = false;
let refreshSubscribers: any[] = [];

const onRrefreshed = (token: any) => {
  refreshSubscribers.map((cb) => cb(token));
};

const addRefreshSubscriber = (cb: (token: any) => void) => {
  refreshSubscribers.push(cb);
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isTokenExpired(localStorage.getItem("accessToken"))) {
        if (!isRefreshing) {
          isRefreshing = true;
          const newToken = await refreshAuthToken();
          isRefreshing = false;
          if (newToken) {
            onRrefreshed(newToken);
          } else {
            return Promise.reject(error);
          }
        }

        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
