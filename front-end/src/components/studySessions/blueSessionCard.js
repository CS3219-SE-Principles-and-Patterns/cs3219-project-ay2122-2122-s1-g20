import React, { useContext, useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import { SessionContext } from "../../context/SessionContext";
import ConfirmationPopup from "../forms/ConfirmationPopup";
import SessionCardTemplate from "./sessionCardTemplate";
import SessionAlerts from "../alerts/SessionAlerts";

const BlueSessionCard = ({ studySession }) => {
  const { username } = useContext(AccountContext);
  const { joinSession } = useContext(SessionContext);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(studySession.time);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);

  const handleJoin = async () => {
    try {
      const response = await joinSession(username, studySession, time);
      console.log("IN blue" + response);
      setOpenConfirmation(false);
      setShow(true);
      setAlertMessage("You have joined this study session!");
      setIsError(false);
      console.log(alertMessage);
      console.log(isError);
      console.log(show);
    } catch (err) {
      console.log(err.message);
      setShow(true);
      setAlertMessage(err.message);
      setIsError(true);
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
      {show ? (
        <SessionAlerts
          show={show}
          setShow={setShow}
          isError={isError}
          message={alertMessage}
        />
      ) : undefined}
    </div>
  );
};

export default BlueSessionCard;
