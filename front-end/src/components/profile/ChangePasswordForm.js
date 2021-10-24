import React, { useState } from "react";
import YellowButton from "../YellowButton";
import TextInput from "./TextInput";
import AlertMessage from "../alerts/AlertMessage";
import { api } from "../../utils/api";

const ChangePasswordForm = (email) => {
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmNewpassword, setConfirmNewpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const resetFields = () => {
    setOldpassword("");
    setNewpassword("");
    setConfirmNewpassword("");
  };
  // When user press enter button instead of clicking on the done button
  const handleEnter = async (event) => {
    setIsLoading(true);
    event.preventDefault();
  };

  const handleDoneEdit = async () => {
    setIsLoading(true);
    const res = await api
      .post("/user/updatePassword", {
        email,
        oldpassword,
        newpassword,
        confirmNewpassword,
      })
      .catch((err) => console.log(err));
    console.log(res);

    setAlertMessage(res);
    handleUpdateDone();
  };

  const handleUpdateDone = () => {
    setIsLoading(false);
    resetFields();
  };
  return (
    <div>
      {alertMessage !== "" ? (
        <AlertMessage message={alertMessage} />
      ) : undefined}
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
            isLoading={isLoading}
          />
        </span>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
