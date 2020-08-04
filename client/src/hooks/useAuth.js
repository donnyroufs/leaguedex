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
    // Send request to /user/login
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
    } catch (err) {
      setUser(null);
    }
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
    try {
      await fetch("/user/logout", { method: "DELETE" });
      setUser(null);
    } catch (err) {
      setUser(null);
    }
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
    isAuthenticated: Boolean(user),
  };
};
