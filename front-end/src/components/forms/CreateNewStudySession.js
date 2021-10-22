import { VscChromeClose } from "react-icons/vsc";
import Popup from "reactjs-popup";
import React from "react";
import PropTypes from "prop-types";

const CreateNewStudySession = ({ setOpen, open }) => {
  return (
    <div className="w-10">
      <Popup open={open} modal closeOnDocumentClick={false} lockScroll={true}>
        <form
          className="bg-blue-dark pl-44 pb-36 pr-44 pt-36 rounded-xl"
          action="#"
          method="POST"
        >
          <button
            className="bg-purple-dark text-white mr-2 mt-2 absolute top-1 right-1 p-2 rounded-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            <VscChromeClose />
          </button>
          <p className="text-3xl font-semibold text-grey-whitetinge">
            Create a new study session
          </p>
          <div className="mt-5 flex">
            <label className="text-lg text-white mt-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              id="groupName"
              name="groupName"
              required
              className={"p-3 ml-3 rounded-md w-full"}
            />
          </div>
          <div className="mt-5 flex">
            <label className="text-lg text-white mt-2">Modules</label>
            <input
              type="text"
              placeholder="Enter name"
              id="groupName"
              name="groupName"
              required
              className={"p-3 ml-3 rounded-md w-full"}
            />
          </div>
          <div className="flex justify-center m-4">
            <button
              className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </Popup>
    </div>
  );
};

CreateNewStudySession.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setLoad: PropTypes.func,
  load: PropTypes.bool,
};

export default CreateNewStudySession;
