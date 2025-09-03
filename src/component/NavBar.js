import logo from '../images/logo.svg';
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    logout(); // Clear user state and token
    navigate('/'); // Redirect to Home page
  };

  return (
    <nav className="bg-[#101121] p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <h1 className="text-3xl font-bold text-[#7a3cde] ml-2">TaskFlow</h1>
      </div>
      <div className="flex items-center space-x-4">
        {user && user.fullName ? (
          <span className="text-white text-lg">Welcome, {user.fullName}</span>
        ) : (
          <span className="text-gray-400 text-lg">Loading...</span>
        )}
        <button
          onClick={handleLogout} // Use the new handler
          className="px-4 py-2 bg-[#7d40de] text-white rounded-md hover:bg-[#6b35c2] transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;