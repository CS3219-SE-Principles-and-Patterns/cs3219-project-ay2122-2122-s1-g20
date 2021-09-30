import React, { useState } from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import { VscChromeClose } from "react-icons/vsc";

const ChatGroupCreationForm = ({ setOpen, open }) => {
  const [groupName, setGroupName] = useState("");
  const [chitchat, setChitchat] = useState(false);
  const [makan, setMakan] = useState(true);
  const [sports, setSports] = useState(false);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
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
    <div className="w-1">
      <Popup open={open} modal closeOnDocumentClick={false} lockScroll={true}>
        <form method="POST">
          <div className="bg-blue-dark p-20">
            <button
              className="bg-white absolute top-1 right-1 p-0.5 rounded-full"
              onClick={() => {
                handleReset();
                setOpen(false);
              }}
            >
              <VscChromeClose />
            </button>
            <div className="text-3xl text-grey-whitetinge py-5">
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
                className={"p-2 mx-10 rounded-md"}
              />
            </div>
            <label className="text-lg text-white"> Hashtag Identifier </label>
            <div className="flex space-x-4 mx-6">
              <button
                className={
                  "text-purple-dark w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium hover:bg-opacity-75 mt-6 " +
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
                  "text-purple-dark w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium hover:bg-opacity-75 mt-6 " +
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
                  "text-purple-dark w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium hover:bg-opacity-75 mt-6 " +
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
                className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
                type="submit"
                onSubmit={() => {
                  handleReset();
                  setOpen(false);
                }}
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </Popup>
    </div>
  );
};

ChatGroupCreationForm.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default ChatGroupCreationForm;
