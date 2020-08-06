import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (formData) => {
    try {
      const response = await fetch("/user/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUser(data.username ? data : null);
      if (data.username) {
        toast.info("You have successfully logged in.");
      }
      if (data.expirationDate) {
        await autoRefreshAccessToken(data.expirationDate);
      }

      return data.hasOwnProperty("username");
    } catch (err) {
      setUser(null);
    }
  };

  const register = async (formData) => {
    try {
      const response = await fetch("/user/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.username) {
        login({ username: formData.username, password: formData.password });
        toast.info("Account successfully created and logged in.");
      }
      return data.hasOwnProperty("username");
    } catch (err) {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await fetch("/user/logout", { method: "DELETE" });
      setUser(null);
      toast.info("Successfully logged out.");
    } catch (err) {
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("/user/refresh");
      const data = await response.json();
      setUser(data.username ? data : null);
      if (loading) {
        setLoading(false);
      }
      if (data.expirationDate) {
        autoRefreshAccessToken(data.expirationDate);
      }
    } catch (err) {
      setLoading(false);
      setUser(null);
    }
  };

  const autoRefreshAccessToken = async (expirationDate) => {
    const INTERVAL = 5000;
    const BUFFER = 20;

    const timeId = setTimeout(async () => {
      const currentTime = new Date().getTime() / 1000;
      if (expirationDate < currentTime + BUFFER) {
        await refreshToken();
        clearTimeout(timeId);
      } else {
        await autoRefreshAccessToken(expirationDate);
      }
    }, INTERVAL);
  };

  return {
    register,
    login,
    logout,
    refreshToken,
    loading,
    user,
    isAuthenticated: Boolean(user),
  };
};
