import React, { useState } from "react";
import { sessionApi } from "../utils/api";

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

  const getUpcomingSessions = async () => {
    try {
      const response = await sessionApi.get("/upcoming");
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
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
