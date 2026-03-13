import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Analytics ────────────────────────────────────────────────────────────────

export const getDashboardAnalytics = async () => {
  const response = await API.get("/company/analytics/dashboard");
  return response.data;
};

export const getJobAnalytics = async (jobId) => {
  const response = await API.get(`/company/analytics/jobs/${jobId}`);
  return response.data;
};

export const getHiringFunnelStats = async () => {
  const response = await API.get("/company/analytics/hiring-funnel");
  return response.data;
};
