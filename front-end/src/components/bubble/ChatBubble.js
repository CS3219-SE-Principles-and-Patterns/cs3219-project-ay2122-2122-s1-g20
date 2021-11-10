import React from "react";
import PropTypes from "prop-types";

const ChatBubble = ({ message, toggle }) => {
  return toggle === "left" ? (
    <div>
      <div className="p-2 flex">
        <img
          className="h-12 w-12 rounded-full"
          src={message.profilePic}
          alt=""
        />
        <div className="mt-4 pl-2 text-xs text-left">
          {message.sender} says:
        </div>
      </div>
      <div className="p-2 w-4/6 -mt-6 rounded-b-2xl rounded-tr-2xl ml-16 mb-2 rounded-tr-bl-br text-left bg-purple-light">
        <div className="object-contain bg-purple-light text-sm p-3">
          {message.content}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="absolute mt-5 flex relative flex-row-reverse right-0">
        <img
          className="h-12 w-12 rounded-full"
          src={message.profilePic}
          alt=""
        />
        <div className="mt-2 text-xs pr-2 mt-4 text-right">
          {message.sender} says:
        </div>
      </div>
      <div className="flex flex-row-reverse pt-2">
        <div className="relative">
          <div className="flex flex-col pt-1 mr-12">
            <div className="p-2 rounded-b-2xl mr-2 -mt-6 rounded-tl-2xl text-white text-left bg-purple-dark">
              <div className="text-sm p-3">{message.content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="flex flex-row-reverse pt-2">
    //     <img
    //       className="h-12 w-12 rounded-full"
    //       src={message.profilePic}
    //       alt=""
    //     />
    //     <div className="mt-4 pr-2 text-xs text-right">
    //       {message.sender} says:
    //     </div>
    //   </div>
    //   <div className="p-2 rounded-b-2xl rounded-tl-2xl mr-16 flex w-3/5 text-left bg-purple-light">
    //     {message.content}
    //   </div>
    // </div>
  );
};

ChatBubble.propTypes = {
  sender: PropTypes.string,
  content: PropTypes.string,
};

export default ChatBubble;
