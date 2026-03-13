// src/features/auth/context/AuthContext.jsx
import {
  createContext, useContext, useState, useEffect,
  useMemo, useCallback,
} from "react";
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

const normalizeUser = (user) => ({
  ...user,
  name: user.fullName || user.name || user.username,
  role: mapRole(user.role),
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading]         = useState(true);

  // ── LOGOUT ────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;

    // Broadcast logout to all other tabs
    localStorage.setItem("auth_event", JSON.stringify({
      type: "LOGOUT",
      timestamp: Date.now(),
    }));

    navigate("/login");
  }, [navigate]);

  // ── FETCH FRESH USER FROM SERVER ──────────────────────────────
  const fetchCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      const { data } = await api.get("/auth/me");
      const normalized = normalizeUser(data.user);
      setCurrentUser(normalized);
      localStorage.setItem("user", JSON.stringify(normalized));
      return normalized;
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  // ── RESTORE SESSION ON PAGE LOAD ──────────────────────────────
  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem("token");

      if (!token) { setLoading(false); return; }

      try {
        const decoded = jwtDecode(token);
        if (!decoded?.exp || decoded.exp * 1000 < Date.now()) {
          logout(); return;
        }

        await fetchCurrentUser();
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    restore();
  }, [logout, fetchCurrentUser]);

  // ── CROSS-TAB SYNC ────────────────────────────────────────────
  // When another tab logs in/out, this tab reacts immediately.
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key !== "auth_event" || !e.newValue) return;

      try {
        const event = JSON.parse(e.newValue);

        if (event?.type === "LOGIN") {
          // Another tab logged in — re-fetch to get that tab's user
          fetchCurrentUser();
        }

        if (event?.type === "LOGOUT") {
          // Another tab logged out — clear this tab too
          setCurrentUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          delete api.defaults.headers.common.Authorization;
          navigate("/login");
        }
      } catch {
        // Ignore malformed events
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fetchCurrentUser, navigate]);

  // ── SAVE USER (after login) ───────────────────────────────────
  const saveUser = useCallback((user, token) => {
    const normalized = normalizeUser(user);

    setCurrentUser(normalized);
    localStorage.setItem("user", JSON.stringify(normalized));
    localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    // Broadcast login to all other tabs
    localStorage.setItem("auth_event", JSON.stringify({
      type: "LOGIN",
      timestamp: Date.now(),
    }));
  }, []);

  // ── UPDATE USER (profile edits) ───────────────────────────────
  const updateCurrentUser = useCallback((updatedUser) => {
    const normalized = normalizeUser(updatedUser);
    setCurrentUser(normalized);
    localStorage.setItem("user", JSON.stringify(normalized));
  }, []);

  // ── LOGIN ─────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    try {
      const res = await authAPI.login(credentials);

      if (res?.data?.user && res?.data?.token) {
        saveUser(res.data.user, res.data.token);
        return res.data;
      }

      throw new Error("Invalid server response");
    } catch (error) {
      const backendMessage  = error.response?.data?.message  || "Login failed";
      const backendAllowResend = error.response?.data?.allowResend || false;

      const customError = new Error(backendMessage);
      customError.allowResend = backendAllowResend;
      throw customError;
    }
  }, [saveUser]);

  // ── SIGNUP ────────────────────────────────────────────────────
  const signup = useCallback(async (userData) => {
    const res = await authAPI.register(userData);
    return res.data;
  }, []);

  // ── PASSWORD RESET ────────────────────────────────────────────
  const resetPassword = useCallback(async (email) => {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  }, []);

  const updatePassword = useCallback(async (token, newPassword) => {
    const res = await api.post("/auth/reset-password", { token, password: newPassword });
    return res.data;
  }, []);

  // ── CONTEXT VALUE ─────────────────────────────────────────────
  const value = useMemo(() => ({
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
  }), [
    currentUser, loading,
    login, signup, logout,
    resetPassword, updatePassword,
    updateCurrentUser, saveUser,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {loading ? <PageLoader /> : children}
    </AuthContext.Provider>
  );
};
