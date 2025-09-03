import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } else {
        await register(formData.fullName, formData.email, formData.password);
        setIsLogin(true);
        setFormData({ fullName: '', email: '', password: '' });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#0c0c0f] p-8 rounded-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-white mb-4">Welcome to TaskFlow</h1>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 text-lg font-medium rounded-md transition-colors ${
            isLogin ? 'bg-[#7d40de] text-white' : 'bg-[#1a1a1e] text-[#a2a2ab]'
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 text-lg font-medium rounded-md transition-colors ${
            !isLogin ? 'bg-[#7d40de] text-white' : 'bg-[#1a1a1e] text-[#a2a2ab]'
          }`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <div className="w-full">
          <div>
            <h1 className="text-xl font-semibold text-white mb-2">Login</h1>
            <div className="text-[#a2a2ab] mb-4">Enter your credentials to access your tasks</div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="flex flex-col">
              <label className="text-[#a2a2ab] font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="p-2 bg-[#1a1a1e] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7d40de]"
                required
              />
            </p>
            <p className="flex flex-col">
              <label className="text-[#a2a2ab] font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="p-2 bg-[#1a1a1e] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7d40de]"
                required
              />
            </p>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7d40de] text-white rounded-md hover:bg-[#6b35c2] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full">
          <div>
            <h1 className="text-xl font-semibold text-white mb-2">Create Account</h1>
            <div className="text-[#a2a2ab] mb-4">Create a new account to get started</div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="flex flex-col">
              <label className="text-[#a2a2ab] font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="p-2 bg-[#1a1a1e] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7d40de]"
                required
              />
            </p>
            <p className="flex flex-col">
              <label className="text-[#a2a2ab] font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="p-2 bg-[#1a1a1e] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7d40de]"
                required
              />
            </p>
            <p className="flex flex-col">
              <label className="text-[#a2a2ab] font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="p-2 bg-[#1a1a1e] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7d40de]"
                required
              />
            </p>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7d40de] text-white rounded-md hover:bg-[#6b35c2] transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;