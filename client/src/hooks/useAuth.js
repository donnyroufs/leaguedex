import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import decode from "jwt-decode";
import { API } from "../api";

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
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [exp, setExp] = useState(null);

  const login = async (formData) => {
    try {
      const { accessToken, ...data } = await API.fetchLogin(formData);

      if (!accessToken) {
        setError(data.message);
        return;
      }

      setTimeout(() => {
        _setData(accessToken, data);
        setError(null);
      }, 600);

      toast.info("You have successfully logged in.");
      return !!accessToken;
    } catch (err) {
      setUser(null);
      setError(err);
    }
  };

  const register = async (formData) => {
    try {
      const success = await API.fetchRegister(formData);

      if (success) {
        toast.info(
          "Successfully created an account please verifiy your email."
        );
      }

      return success;
    } catch (err) {
      setExp(null);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await API.fetchLogout();
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

  const renewAuth = async () => {
    try {
      const { accessToken, ...userData } = await API.renew();

      _setData(accessToken, userData);
      if (loading) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setUser(null);
    }
  };

  const _setData = (accessToken, me) => {
    const { data, exp } = decode(accessToken);
    setExp(exp);
    setToken(accessToken);
    setUser({ ...data, ...me });
  };

  const refreshToken = async () => {
    try {
      const { accessToken } = await API.refresh();
      const { exp } = decode(accessToken);

      setExp(exp);
      setToken(accessToken);

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
    renewAuth,
    refreshToken,
    loading,
    error,
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
