import React from "react";
import PropTypes from "prop-types";

const ChatBubble = ({ message }) => {
  return (
    <div className="mt-5">
      <div className="rounded-full h-16 w-16 flex items-center justify-center bg-grey">
        profile
      </div>
      <div>
        <div className="mt-2 pl-2 text-s text-left">{message.sender} says:</div>
        <div className="p-2 rounded-tr-bl-br w-3/5 text-left bg-purple-light">
          {message.content}
        </div>
      </div>
    </div>
  );
};

ChatBubble.propTypes = {
  sender: PropTypes.string,
  content: PropTypes.string,
};

export default ChatBubble;
