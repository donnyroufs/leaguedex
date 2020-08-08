import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import decode from "jwt-decode";

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
  const [initialLoad, setInitialLoad] = useState(true);

  const login = async (formData, register = false) => {
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
      const { accessToken } = await response.json();
      const { data, exp } = decode(accessToken);
      setTimeout(() => {
        setToken(accessToken);
        setUser(data);
      }, 600);
      if (register)
        toast.info("Successfully created an account and logged in.");
      else toast.info("You have successfully logged in.");
      if (exp) {
        await autoRefreshAccessToken(exp);
      }
      return true;
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
      if (response.status === 201) {
        login(
          { username: formData.username, password: formData.password },
          true
        );
        return true;
      }
    } catch (err) {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await fetch("/user/logout", { method: "DELETE" });
      setUser(null);
      localStorage.removeItem("x-access-token");
      toast.info("Successfully logged out.");
    } catch (err) {
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("/user/refresh");
      const { accessToken } = await response.json();
      const { data, exp } = decode(accessToken);

      setToken(accessToken);
      setUser(data);
      if (loading) {
        setLoading(false);
      }
      if (exp) {
        autoRefreshAccessToken(exp);
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

  const setToken = (token) => {
    localStorage.setItem("x-access-token", token);
  };

  const getToken = () => {
    const token = localStorage.getItem("x-access-token");
    return `Bearer ${token}`;
  };

  const isAllowed = (requiredPermissions) =>
    user && user.permissions >= requiredPermissions;

  return {
    register,
    login,
    logout,
    refreshToken,
    loading,
    user,
    setUser,
    isAuthenticated: Boolean(user),
    getToken,
    initialLoad,
    setInitialLoad,
    isAllowed,
  };
};
