import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ModuleCard from "../../components/ModuleCard";
import { AccountContext } from "../../context/AccountContext";
import YellowButton from "../YellowButton";
import SearchModules from "./SearchModules";

const EditModules = ({ isProfilePage, nextPage }) => {
  const { modules, handleDeleteModule } = useContext(AccountContext);

  const textSize = isProfilePage ? "text-sm" : "text-base";
  const [editable, setEditable] = useState(isProfilePage ? false : true);

  const handleEditModules = () => {
    setEditable(true);
  };
  const handleConfirmUpdate = () => {
    // update backend database
    // => upload to cloudinary, button loads
    if (isProfilePage) {
      setEditable(false);
    }
  };
  const renderModules = modules.map((mod) => (
    <div key={mod}>
      <ModuleCard
        moduleName={mod}
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
          isProfilePage ? "mb-12 " : "mx-14 mb-14"
        }`}
      >
        {renderModules}
      </div>

      <div>
        {editable ? (
          <Link to={`${nextPage ? nextPage : "#"}`}>
            <YellowButton
              text="Confirm"
              onClick={handleConfirmUpdate}
              textSize={textSize}
              px="px-10"
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default EditModules;
