import React from "react";
import PropTypes from "prop-types";

const ChatBubble = (props) => {
  return (
    <div className="mt-5">
      <div className="rounded-full h-20 w-20 flex items-center justify-center bg-grey">
        profile
      </div>
      <div>
        <div className="mt-2 pl-2 text-s text-left">
          {props.name}TempName says:
        </div>
        <div className="pt-2 pb-2 pl-5 rounded-tr-bl-br text-left bg-purple-light">
          {props.message}I wonder if there is a way this can be learned quickly
        </div>
      </div>
    </div>
  );
};

ChatBubble.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
};

export default ChatBubble;
