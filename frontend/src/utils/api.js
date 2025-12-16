//frontend/src/utils/api.js
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://hirenexon-app.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const jobsAPI = {
  getAll: (filters = {}) => api.get('/jobs', { params: filters }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (jobData) => api.post('/jobs', jobData),
  update: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  delete: (id) => api.delete(`/jobs/${id}`),
};

export const authAPI = {
  login: (credentials, role = "candidate") => {
    // Adjust login route based on role
    if (role === "candidate") return api.post('/candidates/login', credentials);
    if (role === "organization") return api.post('/organization/login', credentials);
    if (role === "admin") return api.post('/admin/login', credentials);
  },

  register: (userData, role = "candidate") => {
    // Adjust register route based on role
    if (role === "candidate") return api.post('/candidate/register', userData);
    if (role === "organization") return api.post('/organization/register', userData);
    if (role === "admin") return api.post('/admin/register', userData);
  },

  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
  getProfile: () => api.get('/auth/profile'),
};


export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  uploadResume: (formData) => api.post('/user/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;

