import React, { useState } from "react";
import ConfirmationPopup from "../forms/ConfirmationPopup";

const BlueSessionCard = (props) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  return (
    <div className="bg-purple-light mt-5 p-4 mx-8 rounded-xl">
      <ConfirmationPopup
        title="Join study session?"
        text="Input your available time:"
        onClick={() => console.log("text")}
        open={openConfirmation}
        setOpen={setOpenConfirmation}
      />
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          {/* title */}
          <div className="flex">
            <span className="text-purple-dark font-medium lg:text-2xl">
              {props.title}
            </span>
            <span className="pl-3 font-bold text-purple-dark lg:text-2xl">
              #{props.module}
            </span>
          </div>
          {/* Details */}
          <div className="flex flex-col items-start">
            <p className="text-purple-dark lg:text-md">
              Capacity: {props.participants_count}/{props.capacity}
            </p>
            <p className="text-purple-dark lg:text-md">Date: {props.date}</p>
            <p className="text-purple-dark lg:text-md">
              Current time range: {props.start}-{props.end}
            </p>
            <p className="text-purple-dark lg:text-md">
              Minimum hours: {props.minimum}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setOpenConfirmation(true);
          }}
          className="flex self-center mr-5 text-purple-dark hover:text-opacity-50 text-xl"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default BlueSessionCard;
