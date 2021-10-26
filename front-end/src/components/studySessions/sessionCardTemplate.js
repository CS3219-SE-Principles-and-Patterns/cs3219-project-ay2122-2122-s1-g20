import React from "react";

const SessionCardTemplate = ({ studySession, theme, children }) => {
  const convertDate = (dateString) => {
    const dateArr = dateString.split("-");
    const date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    return date.toDateString();
  };

  return (
    <div
      className={`${
        theme === "yellow" ? "bg-yellow-light" : "bg-purple-light"
      } p-4 mx-8 rounded-xl relative`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          <div className="flex">
            <span className=" text-purple-dark text-left font-medium lg:text-2xl">
              {studySession.title}
              <span className="pl-3 font-bold">#{studySession.module}</span>
            </span>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-purple-dark lg:text-md">
              Capacity: {studySession.participants.length + 1}/
              {studySession.capacity}
            </p>
            <p className="text-purple-dark lg:text-md">
              Date: {convertDate(studySession.date)}
            </p>
            <p className="text-purple-dark lg:text-md">
              Time: {studySession.time.start} - {studySession.time.end}
            </p>
            <p className="text-purple-dark lg:text-md">
              Time Limit: {studySession.timeLimit} hrs
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SessionCardTemplate;
