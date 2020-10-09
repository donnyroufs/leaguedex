import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import decode from "jwt-decode";
import makeRequest from "../helpers/makeRequest";

async function fetchLogin(formData) {
  const response = await makeRequest(`/api/user/login`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  return response.json();
}

async function fetchRegister(formData) {
  const response = await makeRequest(`/api/user/register`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  return response.status === 201;
}

async function fetchLogout() {
  return makeRequest(`/api/user/logout`, {
    method: "DELETE",
  });
}

async function refresh() {
  const response = await makeRequest(`/api/user/refresh`);
  return response.json();
}
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
      const { accessToken } = await fetchLogin(formData);
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
      const success = await fetchRegister(formData);
      if (success) {
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
      await fetchLogout();
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
      const { accessToken } = await refresh();
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
    isAdmin: user ? user.permissions >= 10 : false,
  };
};
