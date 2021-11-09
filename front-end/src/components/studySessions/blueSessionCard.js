import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import { SessionContext } from "../../context/SessionContext";
import ConfirmationPopup from "../forms/ConfirmationPopup";
import SessionCardTemplate from "./sessionCardTemplate";
import SessionAlerts from "../alerts/SessionAlerts";
import { api, chatApi } from "../../utils/api";

const BlueSessionCard = ({ studySession }) => {
  const { username, email } = useContext(AccountContext);
  const { joinSession } = useContext(SessionContext);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(studySession.time);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    return () => {
      setAlertMessage({});
      setIsError({});
      setShow({});
    };
  }, []);

  const joinChat = async (gid) => {
    try {
      // join chat group
      await chatApi.post("/groups/users", {
        groupId: gid,
        email,
      });
      //add chat group to user
      await api.post("/user/account", {
        email,
        groupId: gid,
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const handleJoin = async () => {
    try {
      const response = await joinSession(username, studySession, time);
      // after joining session, join the chat group
      console.log(response);
      await joinChat(response.session.gid);
      setOpenConfirmation(false);
      setShow(true);
      setAlertMessage(response.message);
      setIsError(false);
    } catch (err) {
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
        {studySession.participants.length === studySession.capacity ? (
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
