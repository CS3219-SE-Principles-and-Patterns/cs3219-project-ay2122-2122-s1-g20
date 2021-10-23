import React from "react";
import PropTypes from "prop-types";

const ChatBubble = ({ message, toggle }) => {
  return toggle == "left" ? (
    <div className="p-2">
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
  ) : (
    <div className="p-2 flex flex-row-reverse">
      <div className=" relative">
        <div className="absolute right-0">
          <div className="rounded-full h-16 w-16 bg-grey flex items-center justify-center">
            profile
          </div>
        </div>
        <div className="flex flex-col pt-16">
          <div className="mt-2 pl-2 text-s text-right">
            {message.sender} says:
          </div>
          <div className="p-2 rounded-tr-bl-br text-left bg-purple-light">
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
