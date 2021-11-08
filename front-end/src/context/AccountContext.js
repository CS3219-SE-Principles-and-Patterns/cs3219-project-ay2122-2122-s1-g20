import React, { useState, useEffect } from "react";
import { setTokenHeader, setSaltHeader, api } from "../utils/api";
import Cookies from "universal-cookie";

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState("");
  const [modules, setModules] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [jwtSalt, setJwtSalt] = useState("");

  const cookies = new Cookies();

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

  const isAuthenticated = async () => {
    try {
      const response = await fetch(
        "https://39t21kptu5.execute-api.ap-southeast-1.amazonaws.com/v1/api/user/login",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": cookies.get("token", { path: "/" }),
            "jwt-salt": cookies.get("salt", { path: "/" }),
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    isAuthenticated().then(async (res) => {
      const data = await res.json();
      if (res.error) {
        console.log(res.error);
      } else if (res.status == 200) {
        setUser(data.user, data.token.token);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

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
