// src/shared/api/axios.js
import axios from "axios";
import { API_TIMEOUT } from "./config";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",

  timeout: API_TIMEOUT,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
