import React, { useState } from "react";
import { setTokenHeader } from "../utils/api";

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [modules, setModules] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  const setUser = (user, token) => {
    setToken(token);
    setUsername(user.username);
    setEmail(user.email);
    if (user.modules) {
      setModules(user.modules);
    }
    if (user.profilePic) {
      setProfilePic(user.profilePic);
    }
    setTokenHeader(token);
  };
  const handleUpdateUsername = (newUsername) => {
    setUsername(newUsername); // comment this line out after api integration is done
    // await api call to update username in backend, change to async function
  };

  const handleUpdateEmail = (newEmail) => {
    setUsername(newEmail); // comment this line out after api integration is done
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
