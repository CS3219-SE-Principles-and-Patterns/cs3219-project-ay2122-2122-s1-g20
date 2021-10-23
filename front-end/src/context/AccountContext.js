import React, { useState } from "react";
import { setTokenHeader, setSaltHeader } from "../utils/api";

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [modules, setModules] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [jwtSalt, setJwtSalt] = useState("");

  const setUser = (user, token) => {
    setToken(token);
    setJwtSalt(user.jwtSalt);
    setTokenHeader(token);
    setSaltHeader(user.jwtSalt);
    setUsername(user.username);
    setEmail(user.email);
    if (user.modules) {
      setModules(user.modules);
    }
    if (user.profilePic) {
      setProfilePic(user.profilePic);
    }
  };
  const handleUpdateUsername = (newUsername) => {
    setUsername(newUsername); // comment this line out after api integration is done
    // await api call to update username in backend, change to async function
  };

  const handleUpdateEmail = (newEmail) => {
    setEmail(newEmail); // comment this line out after api integration is done
    // await api call to update username in backend, change to async function
  };

  const handleAddModules = (newModule) => {
    if (
      newModule !== "" &&
      !modules.find((mod) => mod.moduleCode === newModule.moduleCode)
    ) {
      setModules([...modules, newModule]);
    }
  };

  const handleDeleteModule = (modCode) => {
    setModules(modules.filter((mod) => mod.moduleCode !== modCode));
  };

  const handleUpdateSalt = (salt) => {
    setJwtSalt(salt);
    setSaltHeader(salt);
  };

  return (
    <AccountContext.Provider
      value={{
        setUser,
        token,
        username,
        setUsername,
        email,
        setEmail,
        modules,
        setModules,
        profilePic,
        setProfilePic,
        jwtSalt,
        setJwtSalt,
        handleUpdateSalt,
        handleAddModules,
        handleDeleteModule,
        handleUpdateUsername,
        handleUpdateEmail,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
