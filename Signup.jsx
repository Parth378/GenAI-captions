

// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService"; // Import the real register function

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(null);     // New error state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading
    setError(null);   // Clear previous errors

    try {
      const response = await registerUser({ email, password }); // Call the real API
      // Assuming your backend sends a token upon successful registration
      localStorage.setItem("token", response.token); // Store the token
      // Optionally, store user info: localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
      // Display specific error from backend or a generic message
      setError(err.response?.data?.message || "Signup failed. Please try again with different credentials.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 fade-in">
      <form onSubmit={handleSignup} className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-600">Signup</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading} // Disable input while loading
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Signing Up..." : "Signup"}
        </button>
        {/* Display error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;