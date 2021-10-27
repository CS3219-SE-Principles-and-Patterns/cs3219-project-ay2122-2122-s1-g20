import React from "react";
import PropTypes from "prop-types";

const ChatBubble = ({ message, toggle }) => {
  return toggle == "left" ? (
    <div className="p-2">
      <img className="h-12 w-12 rounded-full" src={message.profilePic} alt="" />
      <div>
        <div className="mt-2 pl-2 text-xs text-left">
          {message.sender} says:
        </div>
        <div className="p-2 rounded-tr-bl-br w-3/5 text-left bg-purple-light">
          {message.content}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-row-reverse pt-2">
      <div className=" relative">
        <div className="absolute right-0">
          <img
            className="h-12 w-12 rounded-full"
            src={message.profilePic}
            alt=""
          />
        </div>
        <div className="flex flex-col pt-12">
          <div className="mt-2 text-xs text-right">{message.sender} says:</div>
          <div className="p-2 rounded-tr-bl-br text-left bg-purple-light w-full">
            {message.content}
          </div>
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
