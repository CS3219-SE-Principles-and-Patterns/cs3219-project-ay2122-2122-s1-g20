import React from "react";

import EditModules from "../../components/profile/EditModules";

const AddModulesPage = () => {
  return (
    <div className="max-w-7xl mt-10 mb-10 flex flex-col h-full justify-center items-center w-full mx-auto">
      <div className="text-3xl sm:text-4xl font-bold pt-7 mb-3">
        What modules are you taking this semester?
      </div>
      <EditModules
        isEditable
        nextPage="addModules" // update nextPage to home page
      />
    </div>
  );
};

export default AddModulesPage;
