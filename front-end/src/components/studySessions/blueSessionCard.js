import React, { useContext, useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import { SessionContext } from "../../context/SessionContext";
import ConfirmationPopup from "../forms/ConfirmationPopup";
import SessionCardTemplate from "./sessionCardTemplate";

const BlueSessionCard = ({ studySession }) => {
  const { username } = useContext(AccountContext);
  const { joinSession } = useContext(SessionContext);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(studySession.time);

  const handleJoin = async () => {
    try {
      const response = await joinSession(username, studySession, time);
      setOpenConfirmation(false);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <SessionCardTemplate studySession={studySession} theme="blue">
        <ConfirmationPopup
          title="Join study session?"
          text="Input your available time:"
          onClick={() => {
            setIsLoading(true);
            handleJoin();
          }}
          open={openConfirmation}
          setOpen={setOpenConfirmation}
          isLoading={isLoading}
          time={time}
          setTime={setTime}
          timeRange={studySession.time}
        />
        {studySession.participants.length + 1 === studySession.capacity ? (
          <p className="flex self-center mr-5 text-purple-dark font-bold text-xl">
            FULL
          </p>
        ) : (
          <button
            onClick={() => {
              setOpenConfirmation(true);
            }}
            className="flex self-center mr-5 text-purple-dark hover:text-opacity-50 text-xl"
          >
            Join
          </button>
        )}
      </SessionCardTemplate>
    </div>
  );
};

export default BlueSessionCard;
