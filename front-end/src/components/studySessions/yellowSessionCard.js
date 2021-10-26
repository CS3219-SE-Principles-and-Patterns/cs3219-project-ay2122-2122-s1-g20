import React, { useState } from "react";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import ConfirmationPopup from "../forms/ConfirmationPopup";
import EditStudySession from "../forms/EditStudySession";
import StudySessionDetails from "../forms/StudySessionDetails";

const YellowSessionCard = (props) => {
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
  // mock data
  const studySession = {
    title: "test1",
    capacity: 5,
    // members usernames stored in array
    participants: ["sylviaokt", "andrea", "mabel", "haishan"],
    isOnline: "online",
    module: "CS3219",
    date: "saturday",
    time: {
      start: "14:00",
      end: "17:30",
    },
    timeLimit: 2,
  };

  return (
    <div className="bg-yellow-light mt-5 p-4 mx-8 rounded-xl relative">
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
      </div>
    </div>
  );
};

export default YellowSessionCard;
