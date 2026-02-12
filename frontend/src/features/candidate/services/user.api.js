// src/features/candidate/services/user.api.js
import api from "@/shared/api/axios";

export const userAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (profileData) =>
    api.put("/users/profile", profileData),
  uploadResume: (formData) =>
    api.post("/user/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
