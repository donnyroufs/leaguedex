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

  const login = ({ username, password }) => {
    // Send request to /user/login
  };

  const register = async ({
    username,
    email,
    password,
    password_confirmation,
  }) => {
    // Send request to /user/register
  };

  const logout = async () => {
    return fetch("/user/logout", { method: "DELETE" });
  };

  const refresh = async () => {
    // Send request to /user/refresh
  };

  return {
    register,
    login,
    logout,
    refresh,
    user,
  };
};
