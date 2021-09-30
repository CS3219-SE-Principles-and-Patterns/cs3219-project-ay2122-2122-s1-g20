import React from "react";

const YellowButton = ({ px, textSize, text, onClick }) => {
  return (
    <button
      type="button"
      className={`text-xs sm:${textSize} font-medium rounded-2xl ${px} py-2 sm:py-3 bg-yellow-dark shadow-sm hover:bg-opacity-75`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default YellowButton;
