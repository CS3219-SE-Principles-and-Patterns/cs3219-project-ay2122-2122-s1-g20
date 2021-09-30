import React, { useState } from "react";
import StudyHeader from "../header/StudyHeader";
import ChatBubble from "../bubble/ChatBubble";

const Messenger = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    //to be done, sending message
  };

  const setMessageChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <div className="flex flex-col h-screen relative md:w-auto">
      <StudyHeader />
      <div className="pr-10 pl-2">
        <ChatBubble />
        <ChatBubble />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-row">
        <input
          onChange={setMessageChange}
          value={message}
          placeholder="Write a message"
          className="w-full placeholder-white bg-purple border-black border-2 "
        ></input>
        <button className="pl-2 pr-2" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Messenger;
