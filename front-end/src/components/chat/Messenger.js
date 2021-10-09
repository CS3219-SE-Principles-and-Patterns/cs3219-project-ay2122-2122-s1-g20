import React, { useState, useEffect } from "react";
import StudyHeader from "../header/StudyHeader";
import ChatBubble from "../bubble/ChatBubble";
import { socket } from "./Socket";

const Messenger = ({ displayChat }) => {
  //todo: fix positions so that there is no overlap in the UI
  const [message, setMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const room = displayChat._id;
  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("receive-message", (message) => {
    const newMessage = {
      room_id: displayChat._id,
      sender: "jay",
      timestamp: Date.now(),
      content: message,
    };
    const originalMessages = oldMessages;
    setOldMessages(originalMessages.concat(newMessage));
    console.log(oldMessages);
  });

  const handleSendMessage = async () => {
    //to be done, sending message
    //todo: sender name based on account context
    socket.emit("send-message", message, room);
    const originalMessages = oldMessages;
    const newMessage = {
      room_id: displayChat._id,
      sender: "jay",
      timestamp: Date.now(),
      content: message,
    };
    setOldMessages(originalMessages.concat(newMessage));

    const res = await fetch("http://localhost:9000/api/messages", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });
    console.log(res);
  };

  useEffect(() => {
    const getOldMessages = async () => {
      const res = await fetch(
        `http://localhost:9000/api/messages/${displayChat._id}`
      );
      const data = await res.json();
      console.log(data.messages);
      setOldMessages(data.messages);
    };
    getOldMessages();
    console.log(oldMessages);
  }, [displayChat]);

  const setMessageChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <div className="flex flex-col h-screen relative md:w-auto">
      <StudyHeader group={displayChat} />
      <div className="pr-10 pl-2 overflow-y-auto">
        {oldMessages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
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
