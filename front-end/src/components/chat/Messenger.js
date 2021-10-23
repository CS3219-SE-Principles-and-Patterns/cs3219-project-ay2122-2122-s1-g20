import React, { useState, useEffect, useRef } from "react";
import StudyHeader from "../header/StudyHeader";
import ChatBubble from "../bubble/ChatBubble";
import { socket } from "./Socket";
//handle left right positioning
const Messenger = ({ account, displayChat }) => {
  const [message, setMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const [toggle, setToggle] = useState(false); //update receiving of message whenever someone else send

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
    setToggle(!toggle);

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
    setMessage("");
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

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [oldMessages]);

  useEffect(() => {
    const getOldMessages = async () => {
      const res = await fetch(`http://localhost:9000/api/messages/${group}`);
      const data = await res.json();
      console.log(data.messages);
      setOldMessages(data.messages);
    };
    getOldMessages();
    console.log(oldMessages);
  }, [displayChat, toggle]);

  const setMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const checkSender = (sdr) => {
    if (sdr == username) {
      return "right";
    } else {
      return "left";
    }
  };
  return (
    <div>
      {displayChat.length == 0 ? (
        " "
      ) : (
        <div className="flex flex-col h-screen relative pb-16  md:w-auto">
          <StudyHeader group={displayChat} />
          <div className="pr-10 pl-2 overflow-y-auto">
            {oldMessages.map((message, index) => (
              <ChatBubble
                key={index}
                message={message}
                toggle={checkSender(message.sender)}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-row h-16">
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
