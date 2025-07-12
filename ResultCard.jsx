
/* ResultCard.jsx */
import React from "react";

const ResultCard = ({ description, hashtags }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4 fade-in">
      <p className="text-lg font-medium">{description}</p>
      <p className="text-sm text-gray-600">{hashtags.join(" ")}</p>
    </div>
  );
};

export default ResultCard;