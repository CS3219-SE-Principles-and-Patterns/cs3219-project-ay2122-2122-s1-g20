import React, { useState } from "react";
import ConfirmationPopup from "../forms/ConfirmationPopup";

const BlueSessionCard = () => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  return (
    <div className="bg-purple-light p-4 mx-8 rounded-xl">
      <ConfirmationPopup
        title="Join study session?"
        text=""
        onClick={() => console.log("text")}
        open={openConfirmation}
        setOpen={setOpenConfirmation}
      />
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          {/* title */}
          <div className="flex">
            <span className="text-purple-dark font-medium lg:text-2xl">
              CHIONG CS3219 OTOT TASKS
            </span>
            <span className="pl-3 font-bold text-purple-dark lg:text-2xl">
              #CS3219
            </span>
          </div>
          {/* Details */}
          <div className="flex flex-col items-start">
            <p className="text-purple-dark lg:text-md">Capacity: 3/5</p>
            <p className="text-purple-dark lg:text-md">
              Date: 23/10/2021, Sunday
            </p>
            <p className="text-purple-dark lg:text-md">Time: 3-5pm</p>
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
