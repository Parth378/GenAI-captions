// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Effect to check login status when component mounts or localStorage changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setIsLoggedIn(false); // Update state
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">GenAI Captions</Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          // If logged in, show Dashboard and Logout
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-600 bg-transparent border-none cursor-pointer p-0 font-sans text-base" // Style as a link
            >
              Logout
            </button>
          </>
        ) : (
          // If not logged in, show Login and Signup
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link to="/signup" className="text-gray-700 hover:text-blue-600">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;