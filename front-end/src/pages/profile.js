import React, { useContext } from "react";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import EditableInput from "../components/profile/EditableInput";
import EditModules from "../components/profile/EditModules";
import ProfilePic from "../components/profile/ProfilePic";
import { AccountContext } from "../context/AccountContext";

const ProfilePage = () => {
  const { username, setUsername, edit, setEdit, email, handleUpdateUsername } =
    useContext(AccountContext);

  return (
    <div className="p-4">
      <p className="text-4xl flex flex-row mx-auto font-bold text-black mt-16 lg:flex-nowrap justify-center">
        Your Account Details
      </p>
      <div className="flex gap-x-10 flex-row mx-auto mt-5 lg:mt-16 max-w-screen-lg flex-wrap lg:flex-nowrap justify-center">
        <div className="mb-6">
          <ProfilePic size="40" uploadButton="Change" doneButton="Save" />
        </div>
        <div className="mb-10 flex gap-y-5  flex-col h-full justify-center items-stretch w-8/12 mx-auto">
          <div className="flex flex-row justify-between flex-wrap">
            <EditableInput label="Email" value={edit} setValue={setEdit} />
            <EditableInput
              label="Username"
              value={username}
              setValue={setUsername}
              onSubmit={handleUpdateUsername}
            />
          </div>
          <EditModules isProfilePage />
          <ChangePasswordForm email={email} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
