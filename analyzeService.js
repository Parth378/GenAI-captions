
// src/api/analyzeService.js
import API from './api'; // Import your Axios instance

export const generateContent = async (inputText) => {
  try {
    const response = await API.post('/api/analyze', {
      input: inputText
    });
    return response.data; // Expected: { description: "...", hashtags: [...] }
  } catch (error) {
    console.error('Content generation error:', error.response?.data || error.message);
    throw error; // Re-throw for component to handle specific error messages
  }
};