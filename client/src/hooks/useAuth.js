import React, { createContext, useContext, useState } from "react";

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
      setUser(data.username ? { username: data.username } : null);
      if (data.expirationDate) {
        await autoRefreshAccessToken(data.expirationDate);
      }
    } catch (err) {
      setUser(null);
    }
  };

  const register = async ({
    username,
    email,
    password,
    password_confirmation,
  }) => {};

  const logout = async () => {
    try {
      await fetch("/user/logout", { method: "DELETE" });
      setUser(null);
    } catch (err) {
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("/user/refresh");
      const data = await response.json();
      setUser(data.username ? { username: data.username } : null);
      if (data.expirationDate) {
        autoRefreshAccessToken(data.expirationDate);
      }
    } catch (err) {
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
    user,
    isAuthenticated: Boolean(user),
  };
};
