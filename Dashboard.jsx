
// src/pages/Dashboard.jsx
import React, { useState } from "react";
import ResultCard from "../components/ResultCard";
import { generateContent } from "../api/analyzeService"; // Import the actual API service

const Dashboard = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(null);     // New error state

  const handleAnalyze = async () => {
    if (input.trim() === "") {
      setError("Please enter a keyword or phrase.");
      return;
    }

    setLoading(true); // Start loading
    setError(null);   // Clear previous errors
    setResult(null);  // Clear previous results

    try {
      const apiResult = await generateContent(input); // Call the real API
      setResult(apiResult);
    } catch (err) {
      console.error("Error fetching analysis:", err);
      // Display a user-friendly error message
      setError(err.response?.data?.message || "Failed to generate content. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Enter a keyword or phrase</h2>
      <div className="flex flex-col items-center space-y-4 w-full max-w-xl">
        <textarea
          rows="3"
          className="w-full border p-4 rounded-md resize-none"
          placeholder="e.g. Sunset at the beach"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading} // Disable input while loading
        />
        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Generating..." : "Generate Description & Hashtags"}
        </button>

        {/* Display error message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Display ResultCard if result is available */}
        {result && <ResultCard description={result.description} hashtags={result.hashtags} />}
      </div>
    </div>
  );
};

export default Dashboard;