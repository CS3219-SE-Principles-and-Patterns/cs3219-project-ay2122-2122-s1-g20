import React, { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AccountContext } from "../../context/AccountContext";
import YellowButton from "../YellowButton";

const SearchModules = ({ isProfilePage }) => {
  const [searchInput, setSearchInput] = useState("");
  const { handleAddModules } = useContext(AccountContext);

  const textSize = isProfilePage ? "text-sm" : "text-base";
  const handleSearch = (event) => setSearchInput(event.target.value);
  const handleEnter = (event) => {
    event.preventDefault();
    setSearchInput("");
    handleAddModules(searchInput);
  };

  const handleOnPress = () => {
    setSearchInput("");
    handleAddModules(searchInput);
  };

  return (
    <form className="flex-row my-5 space-x-5" onSubmit={handleEnter}>
      <span className="relative">
        <input
          value={searchInput}
          onChange={handleSearch}
          id="searchInput"
          name="searchInput"
          type="text"
          placeholder="Search for modules"
          className={`text-xs sm:${textSize} w-64 sm:w-80 pl-12 pr-3 py-2 sm:py-3 rounded-2xl ${
            isProfilePage ? "bg-blue-light" : "bg-purple-light"
          } focus:outline-none focus:ring-purple-dark focus:border-purple-dark`}
        />
        <FiSearch className="absolute top-1 left-4 text-purple-dark" />
      </span>
      <YellowButton
        text="Add"
        onClick={handleOnPress}
        textSize={textSize}
        px="px-7"
      />
    </form>
  );
};

export default SearchModules;
