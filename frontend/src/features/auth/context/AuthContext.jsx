// src/features/auth/context/AuthContext.jsx
import {createContext, useContext, useState, useEffect, useMemo, useCallback,} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "@/shared/api/axios";
import { authAPI } from "@/features/auth/services/auth.api";
import PageLoader from "@/shared/components/common/PageLoader";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const mapRole = (role) => {
  if (!role) return null;
  return role.toLowerCase();
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGOUT
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    navigate("/login");
  }, [navigate]);

// RESTORE SESSION — always verify against server to prevent cross-tab data leak
useEffect(() => {
  const restore = async () => {
    const token = localStorage.getItem("token");

    if (!token) { setLoading(false); return; }

    try {
      const decoded = jwtDecode(token);
      if (!decoded?.exp || decoded.exp * 1000 < Date.now()) {
        logout(); return;
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const { data } = await api.get("/auth/me");

      const normalizedUser = {
        ...data.user,
        name: data.user.fullName || data.user.username,
        role: mapRole(data.user.role),
      };

      setCurrentUser(normalizedUser);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  restore();
}, [logout]);

  //SAVE USER
  const saveUser = useCallback((user, token) => {
    const normalizedUser = {
      ...user,
      name: user.fullName || user.name || user.username,
      role: mapRole(user.role),
    };

    setCurrentUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, []);

  // UPDATE USER
  const updateCurrentUser = useCallback((updatedUser) => {
    const normalizedUser = {
      ...updatedUser,
      name: updatedUser.name || updatedUser.username,
      role: mapRole(updatedUser.role),
    };

    setCurrentUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
  }, []);

  // LOGIN
  const login = useCallback(
  async (credentials) => {
    try {
      const res = await authAPI.login(credentials);

      if (res?.data?.user && res?.data?.token) {
        saveUser(res.data.user, res.data.token);
        return res.data;
      }

      throw new Error("Invalid server response");
    } catch (error) {
      console.error("Login error:", error);

      const backendMessage =
        error.response?.data?.message || "Login failed";

      const backendAllowResend =
        error.response?.data?.allowResend || false;

      const customError = new Error(backendMessage);
      customError.allowResend = backendAllowResend;

      throw customError;
    }
  },
  [saveUser]
);

  // SIGNUP
  const signup = useCallback(async (userData) => {
    const res = await authAPI.register(userData);
    return res.data;
  }, []);

  // PASSWORD RESET
  const resetPassword = useCallback(async (email) => {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  }, []);

  const updatePassword = useCallback(async (token, newPassword) => {
    const res = await api.post("/auth/reset-password", {
      token,
      password: newPassword,
    });
    return res.data;
  }, []);

  // CONTEXT VALUE
  const value = useMemo(
    () => ({
      currentUser,
      loading,
      isAuthenticated: Boolean(currentUser),
      login,
      signup,
      logout,
      resetPassword,
      updatePassword,
      updateCurrentUser,
      saveUser,
    }),
    [
      currentUser,
      loading,
      login,
      signup,
      logout,
      resetPassword,
      updatePassword,
      updateCurrentUser,
      saveUser,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? <PageLoader /> : children}
    </AuthContext.Provider>
  );
};
