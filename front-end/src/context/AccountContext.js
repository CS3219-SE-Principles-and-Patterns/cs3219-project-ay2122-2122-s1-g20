import React, { useState } from "react";

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  // const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [modules, setModules] = useState([
    "cs3219",
    "cs2102",
    "cs3103",
    "cs3235",
  ]);
  const [profilePic, setProfilePic] = useState("");

  const handleUpdateUsername = (newUsername) => {
    setUsername(newUsername); // comment this line out after api integration is done
    // await api call to update username in backend, change to async function
  };

  const handleUpdateEmail = (newEmail) => {
    setUsername(newEmail); // comment this line out after api integration is done
    // await api call to update username in backend, change to async function
  };

  const handleAddModules = (newModule) => {
    if (newModule !== "") {
      setModules([...modules, newModule]);
    }
  };

  const handleDeleteModule = (currMod) => {
    setModules(modules.filter((mod) => mod !== currMod));
  };
  return (
    <AccountContext.Provider
      value={{
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
