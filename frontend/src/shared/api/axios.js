// src/shared/api/axios.js
import axios from "axios";
import { API_TIMEOUT } from "./config";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: API_TIMEOUT,
  withCredentials: true, // sends cookies automatically
});

// ── Silent token refresh state ────────────────────────────────────
let isRefreshing = false;
let failedQueue  = [];  // requests that arrived while refreshing

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
  failedQueue = [];
};

// ── Response interceptor ──────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config;
    const is401 = error.response?.status === 401;
    const notRetrying = !original._retry;
    const notRefreshCall = !original.url?.includes("/auth/refresh");
    const notLoginCall = !original.url?.includes("/auth/login");

    // ── Attempt silent refresh on 401 ────────────────────────────
    if (is401 && notRetrying && notRefreshCall && notLoginCall) {

      if (isRefreshing) {
        // Queue this request — will retry once refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        }).catch((err) => Promise.reject(err));
      }
      original._retry = true;
      isRefreshing    = true;

      try {
        const { data } = await api.post("/auth/refresh");
        const newToken = data.token;

        // Update token everywhere
        localStorage.setItem("token", newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        original.headers.Authorization            = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return api(original); // retry original request

      } catch (refreshError) {
        // Refresh failed — session truly expired, force logout
        processQueue(refreshError, null);
        const wasLoggedIn = localStorage.getItem("token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete api.defaults.headers.common.Authorization;
        if (wasLoggedIn && window.location.pathname !== "/login") {
        window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
