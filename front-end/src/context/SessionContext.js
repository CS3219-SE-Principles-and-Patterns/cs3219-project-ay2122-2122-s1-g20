import React, { useState } from "react";
import { sessionApi } from "../utils/api";
import moment from "moment";

export const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
  const [mySessions, setMySessions] = useState([]);
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  const getMySessions = async (username) => {
    try {
      const response = await sessionApi.get(`/my/${username}`);
      setMySessions(response.data.sessions);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const addMySession = async (session) => {
    try {
      const response = await sessionApi.post("/", session);
      setMySessions([...mySessions, response.data.session]);
      return "";
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const joinSession = async (username, session, time) => {
    try {
      let start_time = moment(time.start, "HH:mm");
      let end_time = moment(time.end, "HH:mm");
      let difference = moment.duration(end_time.diff(start_time));
      let minutes_difference = parseInt(difference.asMinutes());
      if (minutes_difference < session.timeLimit * 60) {
        return new Error(
          "Your indicated time range is less than the time limit set by the creator of this study session!"
        );
      }
      const newParticipants = [...session.participants, username];
      const response = await sessionApi.put(`/${session._id}`, {
        participants: newParticipants,
        time,
      });
      const index = upcomingSessions.findIndex((s) => s._id == session._id);
      setJoinedSessions([...joinedSessions, response.data.session]);
      setUpcomingSessions([
        ...upcomingSessions.slice(0, index),
        ...upcomingSessions.slice(index + 1),
      ]);
      return "";
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const leaveSession = async (username, session) => {
    try {
      // update to remove from chat db as well
      const newParticipants = session.participants.filter(
        (p) => p !== username
      );
      await sessionApi.put(`/${session._id}`, {
        participants: newParticipants,
      });
      const index = joinedSessions.findIndex((s) => s._id == session._id);
      setJoinedSessions([
        ...joinedSessions.slice(0, index),
        ...joinedSessions.slice(index + 1),
      ]);
      return "";
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const updateMySessions = async (session) => {
    try {
      const response = await sessionApi.put(`/${session._id}`, session);
      const index = mySessions.findIndex((s) => s._id == session._id);
      setMySessions([
        ...mySessions.slice(0, index),
        response.data.session,
        ...mySessions.slice(index + 1),
      ]);
      return "";
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const deleteMySession = async (session) => {
    try {
      await sessionApi.delete(`/${session._id}`);
      const updatedSessions = mySessions.filter((s) => s._id !== session._id);
      setMySessions(updatedSessions);
      return "";
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const getJoinedSessions = async (username) => {
    try {
      const response = await sessionApi.get(`/joined/${username}`);
      setJoinedSessions(response.data.sessions);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const getUpcomingSessions = async (username) => {
    try {
      const response = await sessionApi.get(`/upcoming/${username}`);
      setUpcomingSessions(response.data.sessions);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        mySessions,
        setMySessions,
        getMySessions,
        joinedSessions,
        setJoinedSessions,
        getJoinedSessions,
        upcomingSessions,
        setUpcomingSessions,
        getUpcomingSessions,
        updateMySessions,
        addMySession,
        deleteMySession,
        joinSession,
        leaveSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
