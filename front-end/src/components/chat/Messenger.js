import React, { useState, useEffect } from "react";
import StudyHeader from "../header/StudyHeader";
import ChatBubble from "../bubble/ChatBubble";
import { socket } from "./Socket";

const Messenger = ({ account, displayChat }) => {
  //todo: fix positions so that there is no overlap in the UI
  const [message, setMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const username = account.username;
  //const profilePic = account.profilePic;
  const group = displayChat._id;
  console.log(displayChat._id);

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("receive-message", (message) => {
    const newMessage = {
      group_id: group,
      sender: username,
      timestamp: Date.now(),
      content: message,
    };
    const originalMessages = oldMessages;
    setOldMessages(originalMessages.concat(newMessage));
    console.log(oldMessages);
  });

  const handleSendMessage = async () => {
    socket.emit("send-message", message, group);
    console.log(message);
    const originalMessages = oldMessages;
    const newMessage = {
      group_id: group,
      sender: username,
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
      const res = await fetch(`http://localhost:9000/api/messages/${group}`);
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
    <div>
      {displayChat.length == 0 ? (
        " "
      ) : (
        <div className="flex flex-col h-screen relative md:w-auto">
          <StudyHeader group={displayChat} />
          <div className="pr-10 pl-2 overflow-y-auto">
            {oldMessages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-row h-14">
            <input
              onChange={setMessageChange}
              value={message}
              placeholder="Write a message"
              className="w-full placeholder-white bg-purple border-black border-2 pl-2 text-lg"
            ></input>
            <button className="pl-2 pr-2 bg-grey" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messenger;
