// src/features/auth/services/auth.api.js
import api from "@/shared/api/axios";

export const authAPI = {
  login: (credentials) => api.post("/users/login", credentials),
  register: (userData) => api.post("/users/register", userData),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh"),
  getProfile: () => api.get("/users/profile"),
};
