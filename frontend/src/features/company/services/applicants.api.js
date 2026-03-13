import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Applicants ───────────────────────────────────────────────────────────────

export const getApplicantsByJob = async (jobId) => {
  const response = await API.get(`/company/jobs/${jobId}/applicants`);
  return response.data;
};

export const updateApplicantStatus = async (jobId, applicantId, status) => {
  const response = await API.patch(`/company/jobs/${jobId}/applicants/${applicantId}`, { status });
  return response.data;
};

export const getApplicantProfile = async (applicantId) => {
  const response = await API.get(`/company/applicants/${applicantId}`);
  return response.data;
};
