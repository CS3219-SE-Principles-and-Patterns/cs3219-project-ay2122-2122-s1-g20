import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import ModuleCard from "../../components/ModuleCard";

const AddModulesPage = () => {
  const [search, setSearch] = useState(null);
  // const [error, setError] = useState("");
  const [modules, setModules] = useState([]);

  const handleSearch = (event) => setSearch(event.target.value);
  const handleEnter = (event) => {
    event.preventDefault();
    handleAddModules();
  };

  const handleAddModules = () => {
    setModules([...modules, search]);
  };

  const handleDeleteModule = (currMod) => {
    setModules(modules.filter((mod) => mod !== currMod));
  };

  const renderModules = modules.map((mod) => (
    <div key={mod}>
      <ModuleCard moduleName={mod} onClose={handleDeleteModule}></ModuleCard>
    </div>
  ));

  return (
    <div className="max-w-7xl mt-10 mb-10 flex flex-col h-full justify-center items-center w-full mx-auto">
      <div className="text-3xl sm:text-4xl font-bold pt-7">
        What modules are you taking this semester?
      </div>

      <form className="relative flex-row my-5 space-x-5" onSubmit={handleEnter}>
        <input
          value={search}
          onChange={handleSearch}
          id="search"
          name="search"
          type="text"
          placeholder="Search for modules"
          className="text-xs sm:text-base w-64 sm:w-80 pl-12 pr-3 py-2 sm:py-3 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark focus:border-purple-dark"
        />
        <FiSearch className="absolute top-3.5 left-0 text-purple-dark" />
        <button
          type="button"
          className="text-xs sm:text-base font-medium rounded-md px-7 py-3 bg-yellow-dark shadow-sm hover:bg-opacity-75"
          onClick={handleAddModules}
        >
          Add
        </button>
      </form>

      <div className="grid grid-cols-3 gap-5 mb-14 mx-14">{renderModules}</div>

      {/* {error ? (
        <p className="text-base md:text-xl text-red-warning pt-7">
          {error}
        </p>
      ) : null} */}
      <div>
        <Link to="/addModules">
          <button
            // onClick={} => upload to cloudinary, button loads
            type="submit"
            className="text-base w-28 font-medium rounded-md py-2 bg-yellow-dark shadow-sm hover:bg-opacity-75"
          >
            Confirm
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddModulesPage;
