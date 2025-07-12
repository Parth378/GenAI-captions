
// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      // If a token exists, set the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Return the modified config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor for global error handling (e.g., token expiry)
API.interceptors.response.use(
  (response) => response, // Just pass through successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      // If a 401 Unauthorized response is received, it might mean the token is expired or invalid
      console.warn('Unauthorized request. Token might be expired or invalid.');
      localStorage.removeItem('token'); // Clear the invalid token
      // You might want to redirect to the login page here
      // Example: window.location.href = '/login';
    }
    return Promise.reject(error); // Re-throw the error for component-specific handling
  }
);

export default API;