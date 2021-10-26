import React, { useState } from "react";
import ConfirmationPopup from "../forms/ConfirmationPopup";
import SessionCardTemplate from "./sessionCardTemplate";

const BlueSessionCard = ({ studySession }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  return (
    <div>
      <SessionCardTemplate studySession={studySession} theme="blue">
        <ConfirmationPopup
          title="Join study session?"
          text="Input your available time:"
          onClick={() => console.log("text")}
          open={openConfirmation}
          setOpen={setOpenConfirmation}
        />

        <button
          onClick={() => {
            setOpenConfirmation(true);
          }}
          className="flex self-center mr-5 text-purple-dark hover:text-opacity-50 text-xl"
        >
          Join
        </button>
      </SessionCardTemplate>
    </div>
  );
};

export default BlueSessionCard;
