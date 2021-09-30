import React, { useContext, useState } from "react";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
// import { Link } from "react-router-dom";
// import { FiSearch } from "react-icons/fi";
import EditableInput from "../components/profile/EditableInput";
import EditModules from "../components/profile/EditModules";
import ProfilePic from "../components/profile/ProfilePic";
import { AccountContext } from "../context/AccountContext";

const ProfilePage = () => {
  const {
    // setModules,
    // profilePic,
    // setProfilePic,
    username,
    setUsername,
    email,
    setEmail,
    handleUpdateUsername,
    handleUpdateEmail,
  } = useContext(AccountContext);

  const [editModules, setEditModules] = useState(false);

  console.log(editModules, setEditModules);
  // const handleDelete = editModules ? handleDeleteModule : null;

  return (
    <div className="flex flex-row mx-auto mt-10 max-w-screen-lg space-x-10 flex-wrap sm:flex-nowrap justify-center">
      <div className="mb-6">
        <ProfilePic size="72" uploadButton="Change" doneButton="Save" />
      </div>
      <div className="mb-10 flex flex-col h-full justify-center items-stretch w-8/12 mx-auto">
        <div className="flex flex-row justify-between flex-wrap">
          <EditableInput
            label="Username"
            value={username}
            setValue={setUsername}
            onSubmit={handleUpdateUsername}
          />
          <EditableInput
            label="Email"
            value={email}
            setValue={setEmail}
            onSubmit={handleUpdateEmail}
          />
        </div>
        <EditModules isProfilePage isEditable={editModules} />
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ProfilePage;
