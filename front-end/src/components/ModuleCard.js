import React from "react";
import { FiX } from "react-icons/fi";

const ModuleCard = ({ mod, onClose, isEditable }) => {
  return (
    <div className="mt-5 px-5 py-3 rounded-2xl min-h-full text-left flex justify-center items-center relative bg-blue-light text-purple-dark">
      {mod.moduleCode}
      <br />
      {mod.title}
      {onClose && isEditable ? (
        <button onClick={() => onClose(mod.moduleCode)}>
          <FiX className="absolute h-6 w-6 p-0.5 -top-1.5 -right-1 bg-grey-light bg-opacity-36 rounded-full" />
        </button>
      ) : null}
    </div>
  );
};

export default ModuleCard;
