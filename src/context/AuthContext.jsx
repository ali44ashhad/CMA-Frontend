import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL_AUTH } from "../api";

// Unique keys so other apps on same origin (e.g. localhost:5173) don't share auth
const STORAGE_KEYS = {
  user: "cma_user",
  accessToken: "cma_accessToken",
  refreshToken: "cma_refreshToken",
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, restore session from localStorage and try to refresh tokens
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    const storedAccess = localStorage.getItem(STORAGE_KEYS.accessToken);
    const storedRefresh = localStorage.getItem(STORAGE_KEYS.refreshToken);

    // Restore user and accessToken from localStorage so user stays "logged in"
    // even if refresh fails (e.g. backend down, network error)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.user);
      }
    }
    if (storedAccess) {
      setAccessToken(storedAccess);
    }

    if (!storedRefresh) {
      setLoading(false);
      return;
    }

    const restoreSession = async () => {
      try {
        const res = await fetch(`${BASE_URL_AUTH}/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: storedRefresh }),
        });

        const data = await res.json();

        if (data?.success) {
          const { accessToken: newAccess, refreshToken: newRefresh } = data.data;
          setAccessToken(newAccess);
          localStorage.setItem(STORAGE_KEYS.accessToken, newAccess);
          localStorage.setItem(STORAGE_KEYS.refreshToken, newRefresh);
        } else {
          // Refresh token invalid or expired (401 / success: false) – only then clear
          const isTokenInvalid = res.status === 401 || !data?.success;
          if (isTokenInvalid) {
            localStorage.removeItem(STORAGE_KEYS.accessToken);
            localStorage.removeItem(STORAGE_KEYS.refreshToken);
            localStorage.removeItem(STORAGE_KEYS.user);
            setUser(null);
            setAccessToken(null);
          }
          // On other errors (e.g. 500) keep user + stored tokens, they stay logged in
        }
      } catch (err) {
        // Network error or backend down – do NOT clear; keep user logged in with stored token
        console.error("Error restoring session", err);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const handleAuthSuccess = (payload) => {
    const { user: userData, accessToken: access, refreshToken: refresh } = payload;
    setUser(userData);
    setAccessToken(access);

    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
    localStorage.setItem(STORAGE_KEYS.accessToken, access);
    localStorage.setItem(STORAGE_KEYS.refreshToken, refresh);
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      const merged = { ...(prev || {}), ...updates };
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(merged));
      return merged;
    });
  };

  const register = async (form) => {
    const res = await fetch(`${BASE_URL_AUTH}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data?.error || data?.message || "Registration failed");
    }
    handleAuthSuccess(data.data);
    return data;
  };

  const login = async (credentials) => {
    const res = await fetch(`${BASE_URL_AUTH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data?.error || data?.message || "Login failed");
    }
    handleAuthSuccess(data.data);
    return data;
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);
    try {
      if (refreshToken && accessToken) {
        await fetch(`${BASE_URL_AUTH}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem(STORAGE_KEYS.user);
      localStorage.removeItem(STORAGE_KEYS.accessToken);
      localStorage.removeItem(STORAGE_KEYS.refreshToken);
      setUser(null);
      setAccessToken(null);
    }
  };

  const changePassword = async ({ currentPassword, newPassword }) => {
    if (!accessToken) {
      throw new Error("Not authenticated");
    }
    const res = await fetch(`${BASE_URL_AUTH}/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data?.error || data?.message || "Password change failed");
    }
    return data;
  };

  const value = {
    user,
    accessToken,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateUser,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

