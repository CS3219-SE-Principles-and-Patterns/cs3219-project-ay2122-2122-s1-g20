import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ModuleButton = ({ moduleCode, session, setSession }) => {
  const [selected, setSelected] = useState(session.module === moduleCode);
  useEffect(() => {
    if (session.module !== moduleCode) {
      setSelected(false);
    }
  }, [session]);

  const handleSelectMod = () => {
    if (selected) {
      setSession({ ...session, module: "" });
    } else {
      setSession({ ...session, module: moduleCode });
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
  session: PropTypes.object,
  setSession: PropTypes.func,
};

export default ModuleButton;
