import React, { useState } from "react";
import YellowButton from "../YellowButton";
import TextInput from "./TextInput";

const ChangePasswordForm = () => {
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmNewpassword, setConfirmNewpassword] = useState("");

  const resetFields = () => {
    setOldpassword("");
    setNewpassword("");
    setConfirmNewpassword("");
  };
  // When user press enter button instead of clicking on the done button
  const handleEnter = (event) => {
    event.preventDefault();
    // await api to update password
    // Update button to disabled while awaiting
    // once done, button is enabled again, and clear all fields
    resetFields();
  };

  const handleDoneEdit = () => {
    resetFields();
  };

  return (
    <form
      className="flex-col flex space-y-4 mr-5 mb-4 items-baseline"
      onSubmit={handleEnter}
    >
      <label className="flex self-start text-xs sm:text-sm font-medium text-gray-700">
        Change password:
      </label>
      <TextInput
        label="Old password"
        value={oldpassword}
        setValue={setOldpassword}
        type="password"
      />
      <TextInput
        label="New password"
        value={newpassword}
        setValue={setNewpassword}
        type="password"
      />
      <TextInput
        label="Confirm new password"
        value={confirmNewpassword}
        setValue={setConfirmNewpassword}
        type="password"
      />
      <span className="flex-initial">
        <YellowButton
          text="Update"
          onClick={handleDoneEdit}
          textSize="text-sm"
          px="px-5"
        />
      </span>
    </form>
  );
};

export default ChangePasswordForm;
