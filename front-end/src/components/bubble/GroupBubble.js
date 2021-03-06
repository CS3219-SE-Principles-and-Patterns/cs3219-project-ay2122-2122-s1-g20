import React, { useState } from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import { socket } from "../chat/Socket";
import { api, chatApi } from "../../utils/api";

const GroupBubble = ({
  group,
  setDisplayChat,
  setEnable,
  userEmail,
  joined,
  setDisabled,
  leave,
  setLeave,
  status,
  setStatus,
}) => {
  const name = group.name;
  const hashtag = group.hashtag;
  const id = group._id;
  const isCreator = group.creator == userEmail ? true : false;
  const state = group.state;
  const [join, setJoin] = useState(joined);
  const [open, setOpen] = useState(false); //popout of leaving confirmation
  const [openDisable, setOpenDisable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(
    state == "disabled" ? true : false
  );

  const handlePreview = () => {
    if (!isDisabled) {
      setDisabled(false);
      setDisplayChat(group);
      setEnable(join);
      socket.emit("join-room", id);
    } else {
      setDisabled(true);
    }
  };
  const handleJoinChat = async () => {
    setJoin(true);
    setEnable(true);

    const newGroupJoined = {
      email: userEmail,
      groupId: id,
    };

    //add group to user
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await api
      .post("/user/account", JSON.stringify(newGroupJoined), {
        headers: headers,
      })
      .catch((err) => console.log(err));

    console.log(res);

    try {
      //add user to group
      const res = await chatApi.post(`/groups/users`, newGroupJoined);
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    //socket.emit("join-room", id); //same to be done when user clicks on name of joined chats
  };

  const handleDisableChat = async () => {
    console.log("disable");
    setIsDisabled(true);
    setDisabled(true);
    setOpenDisable(false);
    setStatus(!status);
    const res = await chatApi.post(`/groups/users/update`, { groupId: id });
    console.log(res);
  };

  const handleLeaveChat = async () => {
    setDisplayChat("");
    setOpen(false);
    setJoin(false);
    setEnable(false);
    setLeave(!leave);

    const groupToLeave = {
      email: userEmail,
      groupId: id,
    };

    //remove group from user
    const headers = {
      "Content-Type": "application/json",
    };
    await api
      .post("/user/account/remove", JSON.stringify(groupToLeave), {
        headers: headers,
      })
      .catch((err) => console.log(err));

    try {
      //remove user from group
      const res = await chatApi.post(`/groups/users/remove`, groupToLeave);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-purple-light mb-1 py-2 md:px-10 md:py-5 block lg:grid lg:grid-cols-7 mt-3 pb-5 ml-10 mr-10 rounded-xl">
      <button
        onClick={handlePreview}
        className="lg:col-span-6  md:w-auto w-full text-lg text-purple-dark flex md:flex-row flex-col-reverse text-left appearance-none w-80 sm:w-96 border-none block focus:outline-none"
      >
        {name}
        <div className="md:pl-2 md:pr-4">
          <div className="bg-purple-bubble md:text-sm text-xs text-white p-1 md:p-2 rounded-2xl">
            #{hashtag}{" "}
          </div>
        </div>
      </button>

      {isDisabled ? (
        <div className=" text-red-500 pt-1 pr-3 text-lg"> Disabled! </div>
      ) : (
        <div className="justify-center flex flex-col md:pt-0  pt-2 md:p-0 object-contain w-full">
          {isCreator ? (
            <button
              className="text-red-500 hover:text-opacity-50 pt-2 text-lg"
              onClick={() => setOpenDisable(true)}
            >
              Disable
            </button>
          ) : (
            ""
          )}

          <Popup
            open={openDisable}
            modal
            closeOnDocumentClick={false}
            lockScroll={true}
          >
            <div className="flex flex-col bg-blue-dark rounded-2xl p-10">
              <p className="font-semibold text-xl text-grey-whitetinge">
                Confirm to disable? Chat will be deleted after 2 days! {open}
              </p>
              <button
                className="rounded-2xl shadow-sm p-3 font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
                onClick={() => handleDisableChat()}
              >
                Yes
              </button>
              <button
                className="rounded-2xl shadow-sm p-3 font-medium text-black bg-purple-light hover:bg-opacity-75 mt-6"
                onClick={() => setOpenDisable(false)}
              >
                No
              </button>
            </div>
          </Popup>

          <button
            className="text-black pt-2 lg:pt-0 hover:text-opacity-50 text-lg"
            onClick={() => (!join ? handleJoinChat() : setOpen(true))}
          >
            {!join ? "Join" : "Leave"}
          </button>

          <Popup
            open={open}
            modal
            closeOnDocumentClick={false}
            lockScroll={true}
          >
            <div className="flex flex-col rounded-2xl bg-blue-dark p-10">
              <p className="font-semibold text-xl text-grey-whitetinge">
                Confirm to leave? {open}
              </p>
              <button
                className="rounded-2xl shadow-sm p-3 font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
                onClick={() => handleLeaveChat()}
              >
                Yes
              </button>
              <button
                className="rounded-2xl p-3 shadow-sm font-medium text-black bg-purple-light hover:bg-opacity-75 mt-6"
                onClick={() => setOpen(false)}
              >
                No
              </button>
            </div>
          </Popup>
        </div>
      )}
    </div>
  );
};

GroupBubble.propTypes = {
  group: PropTypes.object,
  setDisplayChat: PropTypes.func,
  userEmail: PropTypes.string,
};

export default GroupBubble;
