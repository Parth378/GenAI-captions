
/* Home.jsx */
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 fade-in">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">Welcome to GenAI Captions</h1>
      <p className="text-lg text-gray-700 max-w-xl mb-8">
        Enter a keyword or sentence and get a powerful social media description with hashtags instantly.
      </p>
      <Link to="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Get Started
      </Link>
    </section>
  );
};

export default Home;
