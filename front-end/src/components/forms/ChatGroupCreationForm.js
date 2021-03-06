import React, { useState } from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import { VscChromeClose } from "react-icons/vsc";
import { api, chatApi } from "../../utils/api";

const ChatGroupCreationForm = ({
  setOpen,
  setLoad,
  open,
  load,
  userEmail,
  setNewGroup,
}) => {
  const [groupName, setGroupName] = useState("");
  const [chitchat, setChitchat] = useState(false);
  const [makan, setMakan] = useState(true);
  const [sports, setSports] = useState(false);
  const [error, setError] = useState(false);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const checkHashTag = async () => {
    if (sports) {
      return "sports";
    } else if (makan) {
      return "makan";
    } else if (chitchat) {
      return "chitchat";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    try {
      const value = await checkHashTag();
      const res = await chatApi.post(`/groups`, {
        hashtag: value,
        name: groupName,
        uid: [userEmail],
        lastModified: Date.now(),
        creator: userEmail,
        state: "available",
      });
      if (res.status === 400) {
        setError(true);
        return;
      }
      if (res.status === 200) {
        setNewGroup(res.data.group);
        //add group to user
        await api
          .post("/user/account", {
            email: userEmail,
            groupId: res.data.group._id,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        handleReset();
        setLoad(!load);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setChitchat(false);
    setMakan(true);
    setSports(false);
    setGroupName("");
  };

  const checkStates = (tag) => {
    if (tag == "chitchat") {
      if (makan || sports) {
        setSports(false);
        setMakan(false);
      }
      setChitchat(true);
    } else if (tag == "makan") {
      if (chitchat || sports) {
        setChitchat(false);
        setSports(false);
      }
      setMakan(true);
    } else if (tag == "sports") {
      if (chitchat || makan) {
        setChitchat(false);
        setMakan(false);
      }
      setSports(true);
    }
  };

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick={false}
      lockScroll={true}
      nested
      className="h-auto"
    >
      <div>
        <Popup open={error} nested>
          <span className="text-sm">
            Please choose another group name as this group already exists!
          </span>
        </Popup>
      </div>
      <form onSubmit={handleSubmit} action="#" method="POST">
        <div className="bg-blue-dark px-24 py-10 rounded-2xl">
          <button
            className="bg-purple-dark text-white mr-2 mt-2 absolute top-1 right-1 p-2 rounded-full"
            onClick={() => {
              handleReset();
              setOpen(false);
            }}
          >
            <VscChromeClose className="m-1" />
          </button>
          <div className="text-3xl font-semibold text-grey-whitetinge mb-6">
            Create a new chat
          </div>
          <div className="my-3">
            <label className="text-lg text-white"> Group name </label>
            <input
              onChange={handleGroupNameChange}
              type="text"
              placeholder="Enter name"
              value={groupName}
              id="groupName"
              name="groupName"
              required
              className={"p-3 rounded-2xl ml-4"}
            />
          </div>
          <label className="text-lg text-white mt-10">Hashtag Identifier</label>
          <div className="flex space-x-4 mx-6 my-3">
            <button
              className={
                "text-purple-dark p-4 w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-2xl shadow-sm font-medium hover:bg-opacity-75 mt-6 " +
                (chitchat ? "bg-purple-200" : "bg-purple-light")
              }
              onClick={() => {
                checkStates("chitchat");
              }}
              type="button"
            >
              #chitchat
            </button>
            <button
              className={
                "text-purple-dark w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-2xl shadow-sm font-medium hover:bg-opacity-75 mt-6 " +
                (makan ? "bg-purple-200" : "bg-purple-light")
              }
              onClick={() => {
                checkStates("makan");
              }}
              type="button"
            >
              #makan
            </button>
            <button
              className={
                "text-purple-dark w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-2xl shadow-sm font-medium hover:bg-opacity-75 mt-6 " +
                (sports ? "bg-purple-200" : "bg-purple-light")
              }
              onClick={() => {
                checkStates("sports");
              }}
              type="button"
            >
              #sports
            </button>
          </div>
          <div className="flex justify-center m-4">
            <button
              className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-2xl shadow-sm font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </Popup>
  );
};

ChatGroupCreationForm.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setLoad: PropTypes.func,
  load: PropTypes.bool,
};

export default ChatGroupCreationForm;
