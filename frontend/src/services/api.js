import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",});

// Add token automatically if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// User APIs
export const registerUser = (formData) => API.post("/users/register", formData);
export const loginUser = (formData) => API.post("/users/login", formData);

// Job APIs
export const fetchJobs = () => API.get("/jobs");
export const createJob = (jobData) => API.post("/jobs", jobData);
export const updateJob = (id, jobData) => API.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
