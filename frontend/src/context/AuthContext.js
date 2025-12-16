// frontend/src/context/AuthContext.js
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================
  // LOGOUT
  // ======================
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    window.location.href = "/login"; // redirect after logout
  }, []);

  // ======================
  // LOAD USER FROM STORAGE
  // ======================
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && user !== "undefined" && token) {
      try {
        const parsedUser = JSON.parse(user);
        const decodedToken = jwtDecode(token);

        // Token expired
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        } else {
          setCurrentUser({
            ...parsedUser,
            role: parsedUser.role || "user",
          });

          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error loading user:", error);
        logout();
      }
    }

    setLoading(false);
  }, [logout]);

  // ======================
  // SAVE USER
  // ======================
  const saveUser = useCallback((user, token) => {
    const userWithRole = { ...user, role: user.role || "user" };
    setCurrentUser(userWithRole);
    localStorage.setItem("user", JSON.stringify(userWithRole));
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  // ======================
  // LOGIN (FIXED API URL)
  // ======================
  const login = useCallback(
    async (credentials) => {
      try {
        const response = await api.post("/api/users/login", credentials);

        if (response.data?.user && response.data?.token) {
          saveUser(response.data.user, response.data.token);
          return response.data;
        }

        throw new Error("Invalid response from server");
      } catch (error) {
        console.error("Login error:", error);
        throw new Error(error.response?.data?.message || "Login failed");
      }
    },
    [saveUser]
  );

  // ======================
  // SIGNUP
  // ======================
  const signup = useCallback(async (userData) => {
    try {
      const response = await api.post("/api/users/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  }, []);

  // ======================
  // PASSWORD RESET
  // ======================
  const resetPassword = useCallback(async (email) => {
    try {
      const response = await api.post("/api/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Password reset failed");
    }
  }, []);

  const updatePassword = useCallback(async (token, newPassword) => {
    try {
      const response = await api.post("/api/auth/reset-password", {
        token,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Password update failed");
    }
  }, []);

  // ======================
  // CONTEXT VALUE
  // ======================
  const value = useMemo(
    () => ({
      currentUser,
      loading,
      login,
      signup,
      logout,
      resetPassword,
      updatePassword,
      isAuthenticated: !!currentUser,
    }),
    [currentUser, loading, login, signup, logout, resetPassword, updatePassword]
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="loading">Loading...</div> : children}
    </AuthContext.Provider>
  );
};
