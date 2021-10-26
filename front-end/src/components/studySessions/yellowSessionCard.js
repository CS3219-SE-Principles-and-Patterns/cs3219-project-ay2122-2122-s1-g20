import React, { useState } from "react";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import ConfirmationPopup from "../forms/ConfirmationPopup";
import EditStudySession from "../forms/EditStudySession";
import StudySessionDetails from "../forms/StudySessionDetails";
import SessionCardTemplate from "./sessionCardTemplate";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { AccountContext } from "../../context/AccountContext";

const YellowSessionCard = ({ studySession, isCreatedSessions }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteMySession, leaveSession } = useContext(SessionContext);
  const { username } = useContext(AccountContext);

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
  };
  const handleView = () => {
    setOpenDetails(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteMySession(studySession);
      setOpenDeleteModal(false);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  const handleLeave = async () => {
    try {
      const response = await leaveSession(username, studySession);
      setOpenLeaveModal(false);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
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
              <button onClick={handleEdit}>
                <FaPen color="#8488A3" />
              </button>
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
    </div>
  );
};

export default YellowSessionCard;
