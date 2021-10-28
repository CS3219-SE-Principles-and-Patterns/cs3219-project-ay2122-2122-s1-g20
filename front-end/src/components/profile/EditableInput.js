import React, { useState } from "react";
import YellowButton from "../YellowButton";
import TextInput from "./TextInput";

const EditableInput = ({ label, value, setValue, onSubmit }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsDisabled(false);
    setIsEdit(true);
  };

  const handleDoneEdit = () => {
    setIsEdit(false);
    setIsDisabled(true);
    onSubmit(value);
  };

  // When user press enter button instead of clicking on the done button
  const handleEnter = (event) => {
    event.preventDefault();
    handleDoneEdit();
    onSubmit(value);
    // change to await onSubmit() when integrating api calls
    // change to async function
    // set the button to disabled n loading when awaiting.
  };

  return (
    <form className="mr-4 mb-4 flex flex-row" onSubmit={handleEnter}>
      <TextInput
        label={label}
        value={value}
        setValue={setValue}
        isDisabled={label === "Email" ? true : isDisabled}
        editButton={
          label === "Email" ? undefined : !isEdit ? (
            <YellowButton
              text="Edit"
              onClick={handleEdit}
              textSize="text-sm"
              px="px-5"
            />
          ) : (
            <YellowButton
              text="Done"
              onClick={handleDoneEdit}
              textSize="text-sm"
              px="px-2"
            />
          )
        }
      />
    </form>
  );
};

export default EditableInput;
