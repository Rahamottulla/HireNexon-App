// frontend/src/context/AuthContext.js
import { createContext, useContext, useState, useEffect, useMemo, useCallback,} from "react";
import api, { authAPI } from "../utils/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGOUT
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  }, []);

  // LOAD USER FROM STORAGE
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      try {
        const parsedUser = JSON.parse(user);
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          const normalizedUser = {
  ...parsedUser,
  name: parsedUser.name || parsedUser.username,
};
setCurrentUser(normalizedUser);

          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
        }
      } catch (err) {
        console.error("Auth restore failed:", err);
        logout();
      }
    }

    setLoading(false);
  }, [logout]);

  // SAVE USER
  const saveUser = useCallback((user, token) => {
    const normalizedUser = {
    ...user,
    name: user.name || user.username,
  };
  setCurrentUser(normalizedUser);
  localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);
  }, []);

  //update user
 const updateCurrentUser = useCallback((updatedUser) => {
  const normalizedUser = {
    ...updatedUser,
    name: updatedUser.name || updatedUser.username,
  };

  setCurrentUser(normalizedUser);
  localStorage.setItem("user", JSON.stringify(normalizedUser));
}, []);

  // LOGIN
  const login = useCallback(
    async (credentials, role = "candidate") => {
      try {
        const res = await authAPI.login(credentials, role);

        if (res.data?.user && res.data?.token) {
          saveUser(res.data.user, res.data.token);
          return res.data;
        }

        throw new Error("Invalid server response");
      } catch (err) {
        console.error("Login error:", err);
        throw new Error(err.response?.data?.message || "Login failed");
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
      login,
      signup,
      logout,
      resetPassword,
      updatePassword,
      updateCurrentUser,
      isAuthenticated: !!currentUser,
    }),
    [currentUser, loading, login, signup, logout, resetPassword, updatePassword]
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
