import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export const createJob = async (jobData) => {
  const response = await API.post("/company/jobs", jobData);
  return response.data;
};

export const getCompanyJobs = async () => {
  const response = await API.get("/company/jobs");
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await API.get(`/company/jobs/${jobId}`);
  return response.data;
};

export const updateJob = async (jobId, jobData) => {
  const response = await API.put(`/company/jobs/${jobId}`, jobData);
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await API.delete(`/company/jobs/${jobId}`);
  return response.data;
};
