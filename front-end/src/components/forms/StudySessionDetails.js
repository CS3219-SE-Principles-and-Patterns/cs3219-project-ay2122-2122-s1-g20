import { VscChromeClose } from "react-icons/vsc";
import Popup from "reactjs-popup";
import React from "react";
import PropTypes from "prop-types";
import YellowButton from "../YellowButton";

const StudySessionDetails = ({ setOpen, open, studySession }) => {
  const handleCloseDetails = () => {
    setOpen(false);
  };
  return (
    <div className="w-10">
      <Popup open={open} modal closeOnDocumentClick={false} lockScroll={false}>
        <div className="bg-blue-dark p-10 rounded-2xl">
          <button
            className="bg-purple-dark text-white mr-2 mt-2 absolute top-1 right-1 p-2 rounded-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            <VscChromeClose />
          </button>
          <p className="ml-8 text-3xl font-semibold text-grey-whitetinge">
            {studySession.title}
          </p>
          <div className="grid grid-cols-2 items-center gap-2 mt-3">
            <div className="grid grid-cols-2 items-center gap-x-2">
              <span className="text-lg font-medium text-white justify-self-end">
                Owner:
              </span>
              <span className="text-lg text-white ">{studySession.owner}</span>
            </div>

            <div className="grid grid-cols-2 items-center gap-x-2">
              <span className="text-lg font-medium text-white justify-self-end">
                Type:
              </span>
              <span className="text-lg text-white ">
                {studySession.isOnline}
              </span>
            </div>

            <div className="col-span-2 grid grid-cols-4 items-center gap-x-2">
              <span className="col-span-1 text-lg font-medium text-white justify-self-end">
                Capacity:
              </span>
              <span className="col-span-3 text-lg text-white ">
                {studySession.participants.length}/{studySession.capacity}
              </span>
            </div>

            <div className="grid grid-cols-2 items-center gap-x-2">
              <span className="text-lg font-medium text-white justify-self-end">
                Date:
              </span>
              <span className="text-lg text-white ">{studySession.date}</span>
            </div>

            <div className="col-span-2 grid grid-cols-4 items-center gap-x-2">
              <span className="col-span-1 text-lg font-medium text-white justify-self-end">
                Time:
              </span>
              <span className="col-span-3 text-lg text-white ">
                {studySession.time.start} - {studySession.time.end}{" "}
              </span>
            </div>

            <div className="col-span-2 grid grid-cols-4 items-center gap-x-2">
              <span className="col-span-1 text-lg font-medium text-white justify-self-end">
                Time Limit:
              </span>
              <span className="col-span-3 text-lg text-white ">
                {studySession.timeLimit} hrs
              </span>
            </div>

            <div className="col-span-2 grid grid-cols-4 items-center gap-x-2">
              <span className="col-span-1 text-lg font-medium text-white justify-self-end">
                Module:
              </span>
              <span className="col-span-3 text-lg text-white">
                {studySession.module}
              </span>
            </div>

            <div className="col-span-2 grid grid-cols-4 items-center gap-x-2">
              <span className="col-span-1 text-lg font-medium text-white justify-self-end">
                Members:
              </span>
              <span className="col-span-3 text-lg text-white">
                {studySession.participants.join(", ")}
              </span>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <YellowButton
              text="Close"
              onClick={handleCloseDetails}
              textSize="text-lg"
              px="px-8"
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};

StudySessionDetails.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setLoad: PropTypes.func,
  load: PropTypes.bool,
  studySession: PropTypes.object,
};

export default StudySessionDetails;
