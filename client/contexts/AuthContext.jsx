import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          // Verify token with backend
          const response = await axios.get("/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.user) {
            setUser(response.data.user);
          }
        }
      } catch (error) {
        // Token is invalid, remove it
        localStorage.removeItem("auth_token");
        console.log("Token verification failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const { token, user: userData } = response.data;

      localStorage.setItem("auth_token", token);
      setUser(userData);

      // Set default authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const hasPermission = (permission) => {
    if (!user) return false;

    // Admin has all permissions
    if (user.role === "admin") return true;

    // Check specific permissions based on role
    const rolePermissions = {
      counselor: [
        "view_students",
        "edit_students",
        "view_universities",
        "view_applications",
      ],
      employee: ["view_students", "view_universities", "view_applications"],
    };

    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
