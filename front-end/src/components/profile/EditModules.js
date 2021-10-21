import React, { useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import ModuleCard from "../../components/ModuleCard";
import { AccountContext } from "../../context/AccountContext";
import YellowButton from "../YellowButton";
import SearchModules from "./SearchModules";
import { api } from "../../utils/api";

const EditModules = ({ isProfilePage, nextPage }) => {
  const { modules, handleDeleteModule } = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState(false);

  const textSize = isProfilePage ? "text-sm" : "text-base";
  const [editable, setEditable] = useState(isProfilePage ? false : true);

  const handleEditModules = () => {
    setEditable(true);
  };
  const handleConfirmUpdate = async () => {
    // update backend database
    setIsLoading(true);
    await api
      .post("/profile/modules", { modules })
      .then((res) => console.log(res)) // res.data.updatedUser === null if cant find user to update.
      .catch((err) => console.log(err));
    handleUploadDone();
  };

  const handleUploadDone = () => {
    setIsLoading(false);
    if (isProfilePage) {
      setEditable(false);
    } else {
      handleOnClick();
    }
  };

  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push(nextPage && !isLoading ? nextPage : "#"),
    [history]
  );

  const renderModules = modules.map((mod) => (
    <div key={mod.moduleCode}>
      <ModuleCard
        mod={mod}
        onClose={handleDeleteModule}
        isEditable={editable}
      ></ModuleCard>
    </div>
  ));

  return (
    <div className="">
      <div className="flex flex-row mt-2 sm:space-x-3 space-x-1">
        {isProfilePage ? (
          <label className="mt-2.5 text-left text-xs sm:text-sm font-medium text-gray-700">
            List of modules for the current semester:
          </label>
        ) : null}
        {editable ? null : (
          <YellowButton
            text="Edit"
            onClick={handleEditModules}
            textSize="text-sm"
            px="px-5"
          />
        )}
      </div>
      {editable ? <SearchModules isProfilePage={isProfilePage} /> : null}
      <div
        className={`grid sm:grid-cols-3 grid-cols-2 gap-5 ${
          isProfilePage ? "mb-12 " : "mx-36 mb-14"
        }`}
      >
        {renderModules}
      </div>

      <div>
        {editable ? (
          <YellowButton
            text="Confirm"
            onClick={handleConfirmUpdate}
            textSize={textSize}
            px="px-10"
            isLoading={isLoading}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EditModules;
