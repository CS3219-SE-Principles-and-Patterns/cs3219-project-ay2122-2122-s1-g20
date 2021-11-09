import React, { useState, useContext, useEffect } from "react";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { useHistory } from "react-router-dom";

import ConfirmationPopup from "../forms/ConfirmationPopup";
import EditStudySession from "../forms/EditStudySession";
import StudySessionDetails from "../forms/StudySessionDetails";
import SessionCardTemplate from "./sessionCardTemplate";
import { SessionContext } from "../../context/SessionContext";
import { AccountContext } from "../../context/AccountContext";
import SessionAlerts from "../alerts/SessionAlerts";
import { api } from "../../utils/api";

const YellowSessionCard = ({ studySession, isCreatedSessions }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteMySession, leaveSession } = useContext(SessionContext);
  const { username, email } = useContext(AccountContext);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    return () => {
      setAlertMessage({});
      setIsError({});
      setShow({});
    };
  }, []);

  const handleDeletePopup = () => {
    setOpenDeleteModal(true);
  };

  const handleLeavePopup = () => {
    setOpenLeaveModal(true);
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };
  const handleChat = () => {
    // route to chat group
    history.push(`/chat/${studySession.gid}`);
  };

  const handleView = () => {
    setOpenDetails(true);
  };

  const disableChat = async (gid) => {
    try {
      // disable chat group
      await api.post(`/groups/users/update`, { groupId: gid });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteMySession(studySession);
      await disableChat(studySession.gid);
      setOpenDeleteModal(false);
      setShow(true);
      setAlertMessage(response);
      setIsError(false);
    } catch (err) {
      setAlertMessage(err.message);
      setIsError(true);
    }
    setIsLoading(false);
  };

  const leaveChat = async (gid) => {
    try {
      // leave chat group
      await api.post("/groups/users/remove", {
        groupId: gid,
        email,
      });
      //remove chat group from user
      await api.post("/user/account/remove", {
        email,
        groupId: gid,
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const handleLeave = async () => {
    try {
      const response = await leaveSession(username, studySession);
      await leaveChat(studySession.gid);
      setOpenLeaveModal(false);
      setShow(true);
      setAlertMessage(response);
      setIsError(false);
    } catch (err) {
      setShow(true);
      setAlertMessage(err.message);
      setIsError(true);
      console.log(err.message);
    }
    setIsLoading(false);
  };

  const isPastSession = () => {
    const dateArr = studySession.date.split("-");
    const studySessionDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    return studySessionDate < new Date();
  };

  return (
    <div>
      <SessionCardTemplate studySession={studySession} theme="yellow">
        <div className="absolute right-4 bottom-4 flex gap-x-2">
          <button onClick={handleView}>
            <FaEye color="#8488A3" />
          </button>
          <button onClick={handleChat}>
            <BsChatDotsFill color="#8488A3" />
          </button>
          {isCreatedSessions ? (
            <>
              {!isPastSession() ? (
                <button onClick={handleEdit}>
                  <FaPen color="#8488A3" />
                </button>
              ) : null}
              <button onClick={handleDeletePopup}>
                <FaTrash color="#8488A3" />
              </button>
            </>
          ) : (
            <button onClick={handleLeavePopup} className="pt-0.5">
              <ImExit color="#8488A3" />
            </button>
          )}
        </div>
        <ConfirmationPopup
          title="Are you sure?"
          text="Deleting study session is an irreversible action."
          onClick={() => {
            setIsLoading(true);
            handleDelete();
          }}
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          isLoading={isLoading}
        />
        <ConfirmationPopup
          title="Are you sure?"
          text="Leaving this study session will kick you out of the corresponding chat group."
          onClick={() => {
            setIsLoading(true);
            handleLeave();
          }}
          open={openLeaveModal}
          setOpen={setOpenLeaveModal}
          isLoading={isLoading}
        />
        <EditStudySession
          setOpen={setOpenEdit}
          open={openEdit}
          studySession={studySession}
        />
        <StudySessionDetails
          setOpen={setOpenDetails}
          open={openDetails}
          studySession={studySession}
        />
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

export default YellowSessionCard;
