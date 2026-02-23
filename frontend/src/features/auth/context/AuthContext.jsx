// src/features/auth/context/AuthContext.jsx
import {createContext, useContext, useState, useEffect, useMemo, useCallback,} from "react";
import { jwtDecode } from "jwt-decode";
import api from "@/shared/api/axios";
import { authAPI } from "@/features/auth/services/auth.api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const mapRole = (role) => {
  if (!role) return null;
  return role.toLowerCase();
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGOUT
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    window.location.href = "/login";
  }, []);

  // RESTORE SESSION
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          const normalizedUser = {
            ...parsedUser,
            name: parsedUser.name || parsedUser.username,
          };

          setCurrentUser(normalizedUser);
          api.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Auth restore failed:", error);
        logout();
      }
    }

    setLoading(false);
  }, [logout]);

  //SAVE USER
  const saveUser = useCallback((user, token) => {
    const normalizedUser = {
      ...user,
      name: user.name || user.username,
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
      role: mapRole(parsedUser.role),
    };

    setCurrentUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
  }, []);

  // LOGIN
  const login = useCallback(
    async (credentials, role = "candidate") => {
      try {
        const res = await authAPI.login(credentials, role);

        if (res?.data?.user && res?.data?.token) {
          saveUser(res.data.user, res.data.token);
          return res.data;
        }

        throw new Error("Invalid server response");
      } catch (error) {
        console.error("Login error:", error);
        throw new Error(
          error.response?.data?.message || "Login failed"
        );
      }
    },
    [saveUser]
  );

  // SIGNUP
  const signup = useCallback(async (userData, role = "candidate") => {
    const res = await authAPI.register(userData, role);
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
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
