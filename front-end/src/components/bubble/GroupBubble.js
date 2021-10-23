import React, { useState } from "react";
import PropTypes from "prop-types";
import { socket } from "../chat/Socket";

const GroupBubble = ({ group, setDisplayChat, userEmail, joined, token }) => {
  const name = group.name;
  const hashtag = group.hashtag;
  const id = group._id;
  const [join, setJoin] = useState(joined);

  const handlePreview = () => {
    setDisplayChat(group);
  };
  const handleJoinChat = () => {
    setJoin(true);

    const newGroupJoined = {
      email: userEmail,
      groupId: id,
    };

    try {
      //add group to user
      const res = fetch("http://localhost:8080/api/user/account/groups", {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(newGroupJoined),
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    try {
      //add user to group
      const res = fetch("http://localhost:9000/api/group/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newGroupJoined),
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    socket.emit("join-room", id); //same to be done when user clicks on name of joined chats
  };

  const handleLeaveChat = () => {
    setDisplayChat("");
    setJoin(false);
    const groupToLeave = {
      email: userEmail,
      groupId: id,
    };
    try {
      //remove group from user
      const res = fetch(
        "http://localhost:8080/api/user/account/groups/remove",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(groupToLeave),
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    try {
      //remove user from group
      const res = fetch("http://localhost:9000/api/group/users/remove", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(groupToLeave),
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex flex-row">
      <button
        onClick={handlePreview}
        className="text-xl flex flex-row mt-5 h-20 text-left appearance-none w-80 py-3 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark focus:border-purple-dark"
      >
        {name}
        <div className="pl-8">
          <div className="bg-purple-200 rounded-md">#{hashtag} </div>
        </div>
      </button>
      <button
        className="rounded bg-gray-100 h-20 w-20 mt-5 text-xl"
        onClick={!join ? handleJoinChat : handleLeaveChat}
      >
        {!join ? "Join" : "Leave"}
      </button>
    </div>
  );
};

GroupBubble.propTypes = {
  group: PropTypes.object,
  setDisplayChat: PropTypes.func,
  userEmail: PropTypes.string,
};

export default GroupBubble;
