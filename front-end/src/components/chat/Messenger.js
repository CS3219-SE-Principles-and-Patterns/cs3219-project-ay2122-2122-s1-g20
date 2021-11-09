import React, { useState, useEffect, useRef } from "react";
import StudyHeader from "../header/StudyHeader";
import ChatBubble from "../bubble/ChatBubble";
import { socket } from "./Socket";

const Messenger = ({ account, displayChat, enable, disabled }) => {
  const [message, setMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const [toggle, setToggle] = useState(false); //update receiving of message whenever someone else send
  const [anon, setAnon] = useState(false);

  const username = account.username;
  const profilePic = account.profilePic;
  const group = displayChat._id;
  console.log(disabled);

  /*
  socket.once("connect", () => {
    console.log(socket.id);
  });
  */
  useEffect(() => {
    socket.on("receive-message", (messageFromSocket) => {
      console.log("receive by client");
      console.log(messageFromSocket);
      const newMessage = {
        group_id: group,
        sender: messageFromSocket.sender,
        profilePic: messageFromSocket.profilePic,
        timestamp: Date.now(),
        content: messageFromSocket.content,
        email: messageFromSocket.email,
      };
      setOldMessages((prevState) => prevState.concat(newMessage));
    });
    socket.io.on("reconnect", () => {
      console.log("reconnected");
      socket.emit("join-room", group);
    });
    return () => {
      socket.removeAllListeners("receive-message");
      socket.removeAllListeners("join-room");
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const pic = anon
      ? "https://res.cloudinary.com/studybuddy3219/image/upload/v1636382220/ydmcemc8sqsdttfvv5xe.png"
      : profilePic;
    const sdr = anon ? "anon" : username;

    if (message.trim().length != 0) {
      const messageForSocket = {
        sender: sdr,
        profilePic: pic,
        content: message,
        email: account.email,
      };
      socket.emit("send-message", messageForSocket, group);
      const newMessage = {
        group_id: group,
        sender: sdr,
        timestamp: Date.now(),
        profilePic: pic,
        content: message,
        email: messageForSocket.email,
      };
      setMessage("");
      setOldMessages(oldMessages.concat(newMessage));

      const res = await fetch(
        "https://39t21kptu5.execute-api.ap-southeast-1.amazonaws.com/v1/api/messages",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );
      console.log(res);

      //update last modified
      try {
        const res = await fetch(
          `https://39t21kptu5.execute-api.ap-southeast-1.amazonaws.com/v1/api/groups/${group}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newMessage),
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [oldMessages]);

  useEffect(() => {
    const getOldMessages = async () => {
      const res = await fetch(
        `https://39t21kptu5.execute-api.ap-southeast-1.amazonaws.com/v1/api/messages/${group}`
      );
      const data = await res.json();
      console.log(data.messages);
      setOldMessages(data.messages);
    };
    getOldMessages();
    setToggle(!toggle);
  }, [displayChat]);

  const setMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const checkSender = (sdr) => {
    if (sdr == account.email) {
      return "right";
    } else {
      return "left";
    }
  };
  return (
    <div>
      {disabled ? (
        <div className="place-content-center text-center m-8">
          This chat has been disabled by the owner and will be deleted in 2
          days!
        </div>
      ) : (
        <div>
          {displayChat.length == 0 ? (
            " "
          ) : (
            <div className="flex flex-col h-screen relative pb-16  md:w-auto">
              <StudyHeader group={displayChat} />
              <div className="pr-2 md:pr-10 pl-2 overflow-y-auto">
                {oldMessages.map((message, index) => (
                  <ChatBubble
                    key={index}
                    message={message}
                    pic={message.profilePic}
                    toggle={checkSender(message.email)}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
              {enable ? (
                <div className="flex flex-row">
                  <button
                    className="absolute inset-x-0 bottom-0 mb-14 nt-1 w-16 text-black border-2 rounded-full border-black bg-yellow-dark"
                    onClick={() => setAnon(!anon)}
                  >
                    {anon ? "anon" : "public"}
                  </button>
                  <form
                    onSubmit={handleSendMessage}
                    action="#"
                    method="POST"
                    className="absolute inset-x-0 pt-4 bottom-0 flex flex-row h-16"
                  >
                    <input
                      onChange={setMessageChange}
                      value={message}
                      placeholder="Write a message"
                      className="w-full pl-3 placeholder-white bg-purple border-black border-1 text-md"
                    ></input>
                    <button
                      className="pl-3 pr-3 text-white bg-purple-dark"
                      onClick={handleSendMessage}
                    >
                      Send
                    </button>
                  </form>
                </div>
              ) : (
                <div className="absolute text-white inset-x-0 bottom-0 flex flex-row h-16 pt-4 bg-purple justify-center">
                  Join the group to start chatting!
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messenger;
