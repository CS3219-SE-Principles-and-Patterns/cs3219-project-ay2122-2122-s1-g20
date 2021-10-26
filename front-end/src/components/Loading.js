import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  const override = `
    display: block;
    margin: 0 auto;
  `;

  return <ClipLoader loading={true} size={20} css={override} />;
};

export default Loading;
