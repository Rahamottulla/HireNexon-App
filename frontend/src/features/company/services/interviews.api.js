import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Interviews ───────────────────────────────────────────────────────────────

export const scheduleInterview = async (interviewData) => {
  const response = await API.post("/company/interviews", interviewData);
  return response.data;
};

export const getCompanyInterviews = async () => {
  const response = await API.get("/company/interviews");
  return response.data;
};

export const updateInterview = async (interviewId, data) => {
  const response = await API.put(`/company/interviews/${interviewId}`, data);
  return response.data;
};

export const cancelInterview = async (interviewId) => {
  const response = await API.delete(`/company/interviews/${interviewId}`);
  return response.data;
};
