import React, { createContext, useState, useEffect } from 'react';
  import axios from 'axios';

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fetchUserData();
      } else {
        setLoading(false);
      }
    }, []);

    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const res = await axios.get('http://localhost:5000/api/auth/user');
        console.log('User data fetched:', res.data);
        setUser({ ...res.data, token: localStorage.getItem('token') });
      } catch (err) {
        console.error('Failed to fetch user data:', err.response?.data?.error || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const login = async (email, password) => {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      await fetchUserData();
    };

    const register = async (fullName, email, password) => {
      const res = await axios.post('http://localhost:5000/api/auth/register', { fullName, email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        await fetchUserData();
      }
      console.log('Register response:', res.data);
    };

    const logout = () => {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{ user, loading, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };