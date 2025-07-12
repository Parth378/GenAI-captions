
// src/api/authService.js
import API from './api'; // Import your Axios instance

export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/api/auth/login', credentials);
    return response.data; // Expecting data like { token: "...", user: { ... } }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error; // Re-throw for component to handle specific error messages
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await API.post('/api/auth/register', userData);
    return response.data; // Expecting data like { token: "...", user: { ... } }
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// You might also want a logout function
export const logoutUser = () => {
  localStorage.removeItem("token");
  // Optionally, if you have user data in localStorage/sessionStorage
  // localStorage.removeItem("user");
};