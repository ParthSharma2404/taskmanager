import React, { createContext, useState, useEffect } from "react";
import API from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const res = await API.get("/auth/user");
      setUser({ ...res.data, token });
    } catch (err) {
      console.error("Fetch user failed:", err.response?.data || err.message);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    API.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    await fetchUserData(res.data.token);
  };

  const register = async (fullName, email, password) => {
    const res = await API.post("/auth/register", { fullName, email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      API.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      await fetchUserData(res.data.token);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
