// src/features/candidate/services/jobs.api.js
import api from "@/shared/api/axios";

export const jobsAPI = {
  getAll: (filters = {}) => api.get("/jobs", { params: filters }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (jobData) => api.post("/jobs", jobData),
  update: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  delete: (id) => api.delete(`/jobs/${id}`),
};
