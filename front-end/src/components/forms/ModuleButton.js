import React, { useState } from "react";
import PropTypes from "prop-types";

const ModuleButton = ({
  moduleCode,
  selectedMods,
  addSelectedMods,
  removeSelectedMods,
}) => {
  const [selected, setSelected] = useState(selectedMods.includes(moduleCode));

  const handleSelectMod = () => {
    if (selected) {
      removeSelectedMods(moduleCode);
    } else {
      addSelectedMods(moduleCode);
    }
    setSelected(!selected);
  };

  return (
    <div>
      <button
        onClick={handleSelectMod}
        className={`${
          selected
            ? "bg-purple-dark text-grey-light"
            : "bg-purple-light text-purple-dark"
        } py-3 px-4 rounded-2xl text-sm lg:text-base min-w-full`}
      >
        #{moduleCode}
      </button>
    </div>
  );
};

ModuleButton.propTypes = {
  moduleCode: PropTypes.string,
  selectedMods: PropTypes.array,
  addSelectedMods: PropTypes.func,
};

export default ModuleButton;
