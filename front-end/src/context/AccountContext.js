import React, { useState } from "react";

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  // const [token, setToken] = useState("");
  const [username, setUsername] = useState(""); //to obtain from account context
  const [email, setEmail] = useState("");
  const [modules, setModules] = useState([
    {
      moduleCode: "AC5001",
      title: "Architectural History of Singapore",
    },
    {
      moduleCode: "AC5002",
      title: "Conservation Approaches and Philosophies",
    },
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
