import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Workspace ───────────────────────────────────────────────────────────────

/**
 * Create a company workspace.
 * @param {Object} data - Form fields (companyName, orgType, industry, etc.)
 * @param {File|null} logoFile - Optional logo file
 */
export const createWorkspace = async (data, logoFile = null) => {
  const formData = new FormData();

  // Append all text fields
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  // Append logo if provided
  if (logoFile) {
    formData.append("logo", logoFile);
  }

  const response = await API.post("/company/workspace", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

/**
 * Get the current user's company profile.
 */
export const getCompanyProfile = async () => {
  const response = await API.get("/company/me");
  return response.data;
};
