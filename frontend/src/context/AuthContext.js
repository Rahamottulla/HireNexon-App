// frontend/src/context/AuthContext.js
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user and token from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && user !== "undefined" && token) {
      try {
        const parsedUser = JSON.parse(user);
        const decodedToken = jwtDecode(token);

        // Check if token expired
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        } else {
          setCurrentUser(parsedUser);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error loading user:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Helper: Save user and token
const saveUser = (user, token) => {
  const userWithRole = { ...user, role: user.role || 'user' };

  setCurrentUser(userWithRole);
  localStorage.setItem("user", JSON.stringify(userWithRole));
  localStorage.setItem("token", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};


  // LOGIN
  const login = async (credentials) => {
    try {
      const response = await api.post("/users/login", credentials);

      if (response.data?.user && response.data?.token) {
        saveUser(response.data.user, response.data.token);
        return response.data; // includes user.role
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // SIGNUP
  const signup = async (userData) => {
    try {
      const response = await api.post("/users/register", userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      throw new Error(message);
    }
  };

  // LOGOUT
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  // PASSWORD RESET
  const resetPassword = async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      console.error("Password reset error:", error);
      throw new Error(error.response?.data?.message || "Password reset failed");
    }
  };

  // PASSWORD UPDATE
  const updatePassword = async (token, newPassword) => {
    try {
      const response = await api.post("/auth/reset-password", { token, password: newPassword });
      return response.data;
    } catch (error) {
      console.error("Update password error:", error);
      throw new Error(error.response?.data?.message || "Password update failed");
    }
  };

  const value = useMemo(() => ({
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    isAuthenticated: !!currentUser,
  }), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="loading">Loading...</div> : children}
    </AuthContext.Provider>
  );
};
