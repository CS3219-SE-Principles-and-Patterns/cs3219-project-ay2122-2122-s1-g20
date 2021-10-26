import React, { useContext, useEffect, useState } from "react";
import UserSessions from "../../components/studySessions/userSessions";
import UpcomingSessions from "../../components/studySessions/upcomingSessions";
import { SessionContext } from "../../context/SessionContext";
import { AccountContext } from "../../context/AccountContext";
import Loading from "../../components/Loading";

const StudySessionsHome = () => {
  const { getMySessions, getUpcomingSessions, getJoinedSessions } =
    useContext(SessionContext);
  const { username } = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      await getUpcomingSessions(username);
      await getMySessions(username);
      await getJoinedSessions(username);
    } catch (error) {
      console.log("error at study home", error.message);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="md:grid md:grid-cols-2 md:flex h-screen">
        <UpcomingSessions />
        <UserSessions />
      </div>
    );
  }
};

export default StudySessionsHome;
