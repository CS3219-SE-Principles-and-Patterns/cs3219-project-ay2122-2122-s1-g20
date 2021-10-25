import React, { useState } from "react";
import { sessionApi } from "../utils/api";

export const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
  const [mySessions, setMySessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  const getMySessions = async (username) => {
    try {
      const response = await sessionApi.get(`/my/${username}`);
      setMySessions(response.data.sessions);
    } catch (err) {
      console.log(err);
    }
  };

  const addMySession = async (session) => {
    try {
      const response = await sessionApi.post("/", session);
      if (response.status === 200) {
        setMySessions([...mySessions, response.data.session]);
        return "";
      } else {
        return response.data.message;
      }
    } catch (error) {
      return "Error in creating new session.";
    }
  };

  const updateMySessions = async (session) => {
    try {
      const response = await sessionApi.put(`/${session._id}`, session);
      if (response.status === 200) {
        const index = mySessions.findIndex((s) => s._id == session._id);
        setMySessions([
          ...mySessions.slice(0, index),
          session,
          ...mySessions.slice(index + 1),
        ]);
        return "";
      } else {
        return response.data.message;
      }
    } catch (error) {
      return "Error in updating session.";
    }
  };

  const deleteMySession = async (session) => {
    try {
      const response = await sessionApi.delete(`/${session._id}`);
      if (response.status === 200) {
        const updatedSessions = mySessions.filter((s) => s._id !== session._id);
        setMySessions(updatedSessions);
        return "";
      } else {
        return response.data.message;
      }
    } catch (error) {
      return "Error in deleting session.";
    }
  };

  const getPastSessions = async (username) => {
    try {
      const response = await sessionApi.get(`/past/${username}`);
      setPastSessions(response.data.sessions);
    } catch (err) {
      console.log(err);
    }
  };

  const getUpcomingSessions = async () => {
    try {
      const response = await sessionApi.get("/upcoming");
      setUpcomingSessions(response.data.sessions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        mySessions,
        setMySessions,
        getMySessions,
        pastSessions,
        setPastSessions,
        getPastSessions,
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
