import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import decode from "jwt-decode";

const authContext = createContext();

const BUFFER = 15000;

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth} displayName="Auth">
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [exp, setExp] = useState(null);

  const login = async (formData, register = false) => {
    try {
      const response = await fetch("/api/user/login", {
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
        setExp(exp);
        setToken(accessToken);
        setUser(data);
      }, 600);
      if (register)
        toast.info("Successfully created an account and logged in.");
      else toast.info("You have successfully logged in.");
      return true;
    } catch (err) {
      setUser(null);
    }
  };

  const register = async (formData) => {
    try {
      const response = await fetch("/api/user/register", {
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
      setExp(null);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/user/logout", { method: "DELETE" });
      setUser(null);
      localStorage.removeItem("x-access-token");
      toast.info("Successfully logged out.");
    } catch (err) {
      setExp(null);
      setUser(null);
      setToken(null);
    }
    setInitialLoad(true);
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("/api/user/refresh");
      const { accessToken } = await response.json();
      const { data, exp } = decode(accessToken);

      setExp(exp);
      setToken(accessToken);
      setUser(data);
      if (loading) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setUser(null);
    }
  };

  useEffect(() => {
    if (!user || !exp) return;

    const currentTime = new Date().getTime() / 1000;
    const INTERVAL = (exp - currentTime) * 1000 - BUFFER;

    const timeId = setInterval(async () => {
      await refreshToken();
    }, INTERVAL);

    return () => clearInterval(timeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
    hasSummoner: user ? Boolean(user.summoner) : false,
  };
};
