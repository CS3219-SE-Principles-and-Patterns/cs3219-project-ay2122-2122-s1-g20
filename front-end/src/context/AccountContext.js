import React, { useState } from "react";
import { setTokenHeader, setSaltHeader, api } from "../utils/api";

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState("");
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
    setEdit(user.email);
    if (user.modules) {
      setModules(user.modules);
    }
    if (user.profilePic) {
      setProfilePic(user.profilePic);
    }
  };

  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //
  //   if (token) {
  //     setToken(token);
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   localStorage.setItem("token", JSON.stringify(token));
  // }, [token]);

  const handleUpdateUsername = async (newUsername) => {
    await api
      .post("/user/updateUsername", { newUsername, email })
      .catch((err) => console.log(err));
  };

  const handleUpdateEmail = async (edit) => {
    await api
      .post("/user/updateEmail", { edit, email })
      .catch((err) => console.log(err));
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
        edit,
        setEdit,
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
