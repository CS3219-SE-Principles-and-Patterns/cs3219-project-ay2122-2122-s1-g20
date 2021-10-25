import React, { useState } from "react";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import ConfirmationPopup from "../forms/ConfirmationPopup";
import EditStudySession from "../forms/EditStudySession";
import StudySessionDetails from "../forms/StudySessionDetails";
import SessionCardTemplate from "./sessionCardTemplate";

const YellowSessionCard = ({ studySession }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const handleDelete = () => {
    setOpenDeleteModal(true);
  };
  const handleEdit = () => {
    setOpenEdit(true);
  };
  const handleChat = () => {
    // route to chat group
  };
  const handleView = () => {
    setOpenDetails(true);
    // open up details of study session
  };

  return (
    <div>
      <SessionCardTemplate studySession={studySession} theme="yellow">
        <div className="absolute right-4 bottom-2">
          <button onClick={handleView} className="mr-2">
            <FaEye color="#8488A3" />
          </button>
          <button onClick={handleChat} className="mr-2">
            <BsChatDotsFill color="#8488A3" />
          </button>
          <button onClick={handleEdit} className="mr-2">
            <FaPen color="#8488A3" />
          </button>
          <button onClick={handleDelete}>
            <FaTrash color="#8488A3" />
          </button>
        </div>
        <ConfirmationPopup
          title="Are you sure?"
          text="Deleting study session is an irreversible action."
          onClick={() => console.log("text")}
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
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
