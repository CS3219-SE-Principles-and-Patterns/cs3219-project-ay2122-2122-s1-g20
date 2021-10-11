import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const YellowButton = ({ px, textSize, text, onClick, isLoading }) => {
  const override = `
    display: block;
    margin: 0 auto;
  `;

  return (
    <button
      type="button"
      className={`text-xs sm:${textSize} font-medium rounded-2xl ${
        isLoading
          ? "px-7 bg-opacity-50 disable-link"
          : px + " hover:bg-opacity-75"
      } py-2 sm:py-3 bg-yellow-dark 
      shadow-sm `}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <ClipLoader loading={isLoading} size={20} css={override} />
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};

export default YellowButton;
