import React from "react";
import UserSessions from "../../components/studySessions/userSessions";
import UpcomingSessions from "../../components/studySessions/upcomingSessions";

const StudySessionsHome = () => {
  return (
    <div className="md:grid md:grid-cols-2 md:flex h-screen">
      <UpcomingSessions />
      <UserSessions />
    </div>
  );
};

export default StudySessionsHome;
